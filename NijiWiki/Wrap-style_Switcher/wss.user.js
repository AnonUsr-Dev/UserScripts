// ==UserScript==
// @name         Wrap-style Switcher for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      8.1
// @description  編集フォームの折返し切り替えや改行時のスクロールずれを解決します
// @author       AnonUsr-Dev
// @match        https://wikiwiki.jp/nijisanji/?*cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/?*cmd=revert*
// @match        https://wikiwiki.jp/nijisanji/?*cmd=add*
// @match        https://wikiwiki.jp/nijisanji/?*cmd=areaedit*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDE5aDZ2LTJINHYyek0yMCA1SDR2MmgxNlY1em0tMyA2SDR2MmgxMy4yNWMxLjEgMCAyIC45IDIgMnMtLjkgMi0yIDJIMTV2LTJsLTMgMyAzIDN2LTJoMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNHoiLz48L3N2Zz4=
// @updateURL    https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Wrap-style_Switcher/wss.user.js
// @downloadURL  https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Wrap-style_Switcher/wss.user.js
// ==/UserScript==

void(async function __MAIN__(w, d){
	'use strict';
	// エディタの既定値
	// 　false: 旧エディタ, true: 新エディタ
	const DEFAULT_EDITOR = true;
	// 折返しの既定値
	// 　false: 折返しなし, true: 折返しあり
	const DEFAULT_WRAP_STYLE = false;
	// "タイムスタンプを更新しない"を隠す
	// 　false: 隠さない, true: 隠す
	const HIDDEN_ADMIN_TIMESTAMP = true;
	// レイアウトの既定値 (tabレイアウトは現在非対応)
	// 　false: 従来(below), true: 横並び(right)
	const DEFAULT_LAYOUT = false;

	// バックグラウンド待機のタイムアウト動作
	// 　false: 終了, true: 続行
	const TIMEOUT_BACKGROUND_CONTINUE = true;
	// バックグラウンド待機のタイムアウト時間(ms)
	// 　TIMEOUT_BACKGROUND_WAIT<=0: 即時終了または即時続行, false or Infinity: タイムアウト無効
	const TIMEOUT_BACKGROUND_WAIT = Infinity;
	// 主要要素獲得のタイムアウト時間(ms) (大体初回で獲得出来るので適当な値でOK)
	// 　TIMEOUT_ELEMENT_WAIT<0: で初回で獲得できなければ終了, TIMEOUT_ELEMENT_WAIT=0 or Infinity: タイムアウト無効
	const TIMEOUT_ELEMENT_WAIT = 10_000;

	// デバッグ関係
	const debug = {
		status: false,
		label: "Wrap-style Switcher 2434",
		console: { log: (...args) => void(debug.status && console.log(`${debug.label}:`, ...args)) }
	}

	const Visibility = (()=>{
		const objectTypes = ["object", "function"];
		const undef = void 0;
		const isPrimitive = (value) => value == null ? value === null || value === undef : !objectTypes.includes(typeof value);
		const isBoolean = (value) => typeof value=="boolean";
		const isTimeValue = (value) => Number.isSafeInteger(value) && 0 <= value && value < 0x7fffffff;
		const normalizeEventOptions = (value, forceValue={}) => ({...(isPrimitive(value) ? {capture: !!value} : value), ...(isPrimitive(forceValue) ? {} : forceValue)});
		const Self = {
			get state(){return document.visibilityState},
			get isVisible(){return this.state === "visible"},
			onchange(listener, options){return document.addEventListener("visibilitychange", listener, normalizeEventOptions(options))},
			onechange(listener, options){return this.onchange("visibilitychange", listener, normalizeEventOptions(options, {once: true}))},
			offchange(listener, options){return document.removeEventListener("visibilitychange", listener, normalizeEventOptions(options))},
			wait: function(status, timeout){
				const hasTimeout = isTimeValue(timeout);
				return new Promise((resolve, reject) => {
					const dispose = (result, promiseFn) => {
						this.offchange(onChange);
						if (hasTimeout) clearTimeout(timerId);
						return promiseFn(result);
					}
					const onChange = (event) => {
						const state = this.state, isMatched = this.isVisible === status, result = event ? undef : isMatched;
						if (!isMatched) return result;
						dispose(state, resolve);
						return result;
					}
					const timerId = !hasTimeout ? null : setTimeout(()=>dispose(this.state, reject), timeout);
					if (onChange() === false) this.onchange(onChange);
				});
			}
		}
		return Self;
	})();

	const fs = {
		awaitElement: function awaitElement(selector, filter, timeout) {
			const tE = this;
			filter = ({
				boolean: () => filter,
				function: filter
			})[typeof filter];
			if (filter === void 0) filter = () => true;
			return new Promise((resolve, reject) => {
				const interval = 50,
					retryCount = Math.abs(timeout) / interval;
				let tryCount = 0;
				(function await () {
					const elements = Array.from(tE.querySelectorAll(selector)).filter(filter);
					debug.console.log(`[awaitElement]`, "filter element count:", elements.length, `(${selector})`);
					const element = elements[0];
					if (element) return resolve(element);
					if (retryCount && retryCount < tryCount++) return reject(element);
					setTimeout(await, interval);
				})();
			});
		},
		getTextAreaEditor: ()=>es.form.querySelector("textarea[name='msg'],textarea[name='areaedit_msg']"),
		getCodeMirrorEditor: ()=>es.form.querySelector(".cm-editor .cm-content"),
		getCodeMirrorEditorAsync: (filter, timeout)=>fs.awaitElement.call(es.form, ".cm-editor .cm-content", filter, timeout),
		getCodeMirrorEditors: ()=>es.form.querySelectorAll(".cm-editor .cm-content"),
		getEditorType: () => es.form__cbHighlight.checked,
		setEditorType: (status) => {
			return new Promise(resolve => {
				(function await () {
					if (fs.getEditorType() === status) return resolve();
					es.form__cbHighlight.click();
					setTimeout(await, 100);
				})();
			})
		},
		getEditorLayout: () => {
			if (es.form.querySelector(".edit_form .react-tabs")) return "tab";
			if (es.form.querySelector(".edit_form .editor-main-area.below")) return "below";
			if (es.form.querySelector(".edit_form .editor-main-area.right")) return "right";
			return "unknown";
		},
		setEditorLayout: (status) => {
			status = [ /*"tab",*/ "right", "below"].includes(status) ? status : "below";
			const target = es.form__ulLayout.querySelector(`li.${status}`);
			return new Promise(resolve => {
				(function await () {
					if (fs.getEditorLayout() === status && target.classList.contains("active")) return resolve();
					es.form__ulLayout.querySelector(`li.${status}`).click();
					setTimeout(await, 500);
				})();
			})
		},
		getWrapStyle: () => {
			return new Promise((resolve, reject)=>{
				const editorTypeName = fs.getEditorType() ? "CodeMirror" : "textarea";
				if (editorTypeName === "CodeMirror") {
					return fs.getCodeMirrorEditorAsync(e=>e.cmView).then(form__cm=>{
						es.form__cm = form__cm;
						return resolve(es.form__cm.classList.contains("cm-lineWrapping"));
					});
				} else if (editorTypeName === "textarea") {
					es.form__taMsg = fs.getTextAreaEditor();
					return resolve(es.form__taMsg.getAttribute("wrap") !== "off");
				} else {
					return reject(null);
				}
			})
		},
		setWrapStyle: (status) => {
			const editorTypeName = fs.getEditorType() ? "CodeMirror" : "textarea";
			return fs.getWrapStyle().then(wrapStyle=>{
				if (editorTypeName === "CodeMirror") {
					es.form__cm = es.form.querySelector(".cm-editor .cm-content");
					es.form__cm.classList[status ? "add" : "remove"]("cm-lineWrapping");
					return true;
				} else if (editorTypeName === "textarea") {
					es.form__taMsg = fs.getTextAreaEditor();
					if (wrapStyle !== status) es.form__taMsg.setAttribute("wrap", status ? "soft" : "off");
					return true;
				} else {
					return null;
				}
			})
		},
		setWrapStyleAll: (status) => {
			const editorTypeName = fs.getEditorType() ? "CodeMirror" : "textarea";
			return fs.getWrapStyle().then(wrapStyle=>{
				if (editorTypeName === "CodeMirror") {
					for(const form__cm of fs.getCodeMirrorEditors()){
						es.form__cm.classList[status ? "add" : "remove"]("cm-lineWrapping");
					}
					return true;
				} else if (editorTypeName === "textarea") {
					es.form__taMsg = fs.getTextAreaEditor();
					if (wrapStyle !== status) es.form__taMsg.setAttribute("wrap", status ? "soft" : "off");
					return true;
				} else {
					return null;
				}
			})
		},
		handle: {
			fixHorizontalScroll: () => {
				const taMsg = es.form__taMsg = fs.getTextAreaEditor();
				if (taMsg.getAttribute("wrap") !== "off") return;
				if (taMsg.value.substr(0, taMsg.selectionStart).slice(-1) === "\n") taMsg.scrollLeft = 0;
			},
			toggleWrap: () => {
				es.form__btnToggleWrap.disabled = true;
				fs.getWrapStyle().then(wrapStyle=>{
					fs.setWrapStyleAll(!wrapStyle);
				}).finally(()=>{
					fs.getWrapStyle().then(wrapStyle=>{
						es.form__btnToggleWrap.textContent = `折り返し${wrapStyle?"ON":"OFF"}`;
						es.form__btnToggleWrap.disabled = false;
					})
				})
			}
		}
	}

	const es = {};
	debug.console.log("[Visibility.wait] await visibilityState...");
	if ((await Visibility.wait(true, TIMEOUT_BACKGROUND_WAIT).catch(n => n)) === "hidden" && TIMEOUT_BACKGROUND_CONTINUE === false) {
		return void debug.console.log("[Visibility.wait] visibilityState timeout"); }
	debug.console.log("[awaitElement] await form...");
	if ((es.form = await fs.awaitElement.call(d, "#content>div.wiki-editor form", true, TIMEOUT_ELEMENT_WAIT).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] form timeout"); }
	debug.console.log("[awaitElement] await highlight checkbox...");
	if ((es.form__cbHighlight = await fs.awaitElement.call(es.form, ".edit_form input[type='checkbox']", e => e.parentElement.textContent.includes(" ver "), TIMEOUT_ELEMENT_WAIT).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] highlight checkbox timeout"); }
	debug.console.log("[awaitElement] await layout list...");
	if ((es.form__ulLayout = await fs.awaitElement.call(es.form, ".edit_form .wiki-editor-layout-changer>ul", true, TIMEOUT_ELEMENT_WAIT).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] layout list timeout"); }

	debug.console.log("[querySelector] get CodeMirror...");
	es.form__cm = fs.getCodeMirrorEditor();
	debug.console.log(`[querySelector] ${es.form__cm?"enable":"disable"} CodeMirror`);

	es.style = document.documentElement.appendChild(d.createElement("style"));
	if (HIDDEN_ADMIN_TIMESTAMP) {
		debug.console.log(`invisiblized admin timestamp`);
		es.style.textContent = ".no-timestamp{display:none!important;}";
	}

	debug.console.log(`[EditorType] set`);
	await fs.setEditorType(DEFAULT_EDITOR);
	debug.console.log(`[EditorLayout] set`);
	await fs.setEditorLayout(DEFAULT_LAYOUT);
	debug.console.log(`[WrapStyle] set`);
	await fs.setWrapStyleAll(DEFAULT_WRAP_STYLE);

	document.addEventListener("click", async({target})=>{
		if(!target?.matches(".diff-view-toggle>button"))return;
		await fs.setWrapStyleAll(DEFAULT_WRAP_STYLE);
	})

	es.form__cbHighlight.addEventListener("input", ()=>{
		if (fs.getEditorType()) return;
		es.form__taMsg = fs.getTextAreaEditor();

		// [旧エディタ] 改行時のスクロールずれ修正
		es.form__taMsg.style.overflowAnchor = "none";
		// [旧エディタ] スクロール位置修正のリスナーを追加
		es.form__taMsg.addEventListener("keyup", fs.handle.fixHorizontalScroll);
	})

	// [新・旧エディタ] ボタン追加
	const buttons = [
		{name:"ToggleWrap",id:"wrap-switcher-button",text:`折り返し${await fs.getWrapStyle()?"ON":"OFF"}`,title:"エディターの折り返しを切り替えます",onclick:fs.handle.toggleWrap}
	];
	buttons.forEach(button=>{
		const fullname = `form__btn${button.name}`;
		es[fullname] = es.form.querySelector("div.preview-buttons").appendChild(d.createElement("button"));
		es[fullname].id = button.id;
		es[fullname].type = "button";
		es[fullname].textContent = button.text;
		es[fullname].title = button.title;
		es[fullname].addEventListener("click",button.onclick);
	})
})(window, document);
