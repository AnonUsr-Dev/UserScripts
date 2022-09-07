// ==UserScript==
// @name         Wrap-style Switcher for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      4
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

void(async (w, d) => {
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

	// デバッグ関係
	const debug = {
		status: false,
		label: "Wrap-style Switcher 2434",
		console: { log: (...args) => void(debug.status && console.log(`${debug.label}:`, ...args)) }
	}

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
					debug.console.log(selector, "filter element count:", elements.length);
					const element = elements[0];
					if (element) return resolve(element);
					if (retryCount && retryCount < tryCount++) return reject(element);
					setTimeout(await, interval);
				})();
			});
		},
		awaitVisible: function awaitVisible(status, timeout) {
			return new Promise((resolve, reject) => {
				const interval = 100,
					retryCount = Math.abs(timeout) / interval;
				let tryCount = 0;
				(function await () {
					const visibilityState = d.visibilityState;
					const visible = visibilityState === "visible";
					if (visible === !!status) return resolve(visibilityState);
					if (retryCount && retryCount < tryCount++) return reject(visibilityState);
					setTimeout(await, interval);
				})();
			});
		},
		getEditorType: () => es.form__cbHighlight.checked,
		setEditorType: (status) => {
			return new Promise(r => {
				(function await () {
					if (fs.getEditorType() === status) return r();
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
			return new Promise(r => {
				(function await () {
					if (fs.getEditorLayout() === status && target.classList.contains("active")) return r();
					es.form__ulLayout.querySelector(`li.${status}`).click();
					setTimeout(await, 500);
				})();
			})
		},
		getWrapStyle: () => {
			const editorTypeName = fs.getEditorType() ? "CodeMirror" : "textarea";
			if (editorTypeName === "CodeMirror") {
				es.form__cm = es.form.querySelector(".edit_form .CodeMirror");
				return es.form__cm.classList.contains("CodeMirror-wrap");
			} else if (editorTypeName === "textarea") {
				return es.form__taMsg.getAttribute("wrap") !== "off";
			} else {
				return null;
			}
		},
		setWrapStyle: (status) => {
			const editorTypeName = fs.getEditorType() ? "CodeMirror" : "textarea";
			const wrapStyle = fs.getWrapStyle();
			if (editorTypeName === "CodeMirror") {
				es.form__cm = es.form.querySelector(".edit_form .CodeMirror");
				es.form__cmMenu = es.form.querySelector(".edit_form .editor-menu");
				const style = es.form__cmMenu.appendChild(d.createElement("style"))
				if (!debug.status) style.textContent = `.edit_form .editor-menu ul.second-level-menu{opacity:0;}`;
				const ul_1 = es.form__cmMenu.querySelector("ul.top-level-menu");
				const menuCancel = () => {
					(function await () {
						if (ul_1.querySelector("ul.second-level-menu")) {
							ul_1.click();
							return setTimeout(await, 0);
						}
					})();
				}
				return new Promise((res, rej) => {
					const error = () => { menuCancel(); style.remove(); return rej(null); }
					const success = () => { menuCancel(); style.remove(); return res(true); }
					debug.console.log("[awaitElement]", "await li(display)")
					fs.awaitElement.call(ul_1, "li", e => e.textContent === "表示", 5000).then((li_1, ul_2) => {
						(function await_1() {
							if (!(ul_2 = li_1.querySelector("ul.second-level-menu"))) {
								li_1.click();
								return setTimeout(await_1, 0);
							}
							fs.awaitElement.call(ul_2, "li", e => e.textContent === "右端で折り返さない", 5000).then(li_2 => {
								const svg = li_2.querySelector(`svg`);
								const getStatus = () => fs.getWrapStyle() === status && status == !!svg.style.opacity.length;
								(function await_2() {
									const currentStatus = getStatus();
									if (currentStatus) return success();
									li_2.click();
									while (currentStatus !== getStatus());
									setTimeout(await_2, 50);
								})();
							}).catch(await_1)
						})();
					}).catch(error)
				})
			} else if (editorTypeName === "textarea") {
				if (wrapStyle !== status) es.form__taMsg.setAttribute("wrap", status ? "soft" : "off");
				return Promise.resove(true);
			} else {
				return Promise.reject(null);
			}
		},
		handle: {
			fixHorizontalScroll: () => {
				const taMsg = es.form__taMsg;
				if (taMsg.getAttribute("wrap") !== "off") return;
				if (taMsg.value.substr(0, taMsg.selectionStart).slice(-1) === "\n") taMsg.scrollLeft = 0;
			},
			toggleWrap: () => {
				es.form__btnToggleWrap.disabled = true;
				try {
					fs.setWrapStyle(!fs.getWrapStyle());
				} finally {
					es.form__btnToggleWrap.textContent = `折り返し${fs.getWrapStyle()?"ON":"OFF"}`;
					es.form__btnToggleWrap.disabled = false;
				}
			}
		}
	}

	const es = {};

	debug.console.log("[awaitVisible] await visibilityState...");
	if ((await fs.awaitVisible(true, 60000).catch(n => n)) === "hidden") {
		return void debug.console.log("[awaitVisible] visibilityState timeout"); }
	debug.console.log("[awaitElement] await form...");
	if ((es.form = await fs.awaitElement.call(d, "#content>div.wiki-editor form", true, 100000).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] form timeout"); }
	debug.console.log("[awaitElement] await msg textarea...");
	if ((es.form__taMsg = await fs.awaitElement.call(es.form, "textarea[name='msg'],textarea[name='areaedit_msg']", true, 100000).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] msg textarea timeout"); }
	debug.console.log("[awaitElement] await highlight checkbox...");
	if ((es.form__cbHighlight = await fs.awaitElement.call(es.form, ".edit_form input[type='checkbox']", e => e.parentElement.textContent.includes(" ver "), 100000).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] highlight checkbox timeout"); }
	debug.console.log("[awaitElement] await layout list...");
	if ((es.form__ulLayout = await fs.awaitElement.call(es.form, ".edit_form .wiki-editor-layout-changer>ul", true, 100000).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] layout list timeout"); }
	debug.console.log("[awaitElement] await notimestamp checkbox...");
	if ((es.form__cbNoTimestamp = await fs.awaitElement.call(es.form, ".edit_form input[type='checkbox'][name='notimestamp']", true, 100000).catch(n => null)) === null) {
		return void debug.console.log("[awaitElement] notimestamp checkbox timeout"); }

	debug.console.log("[querySelector] get CodeMirror...");
	es.form__cm = es.form.querySelector(".edit_form .CodeMirror");
	debug.console.log(`[querySelector] ${es.form__cm?"enable":"disable"} CodeMirror`);

	if (HIDDEN_ADMIN_TIMESTAMP) {
		debug.console.log(`invisiblized admin timestamp`);
		es.form__cbNoTimestamp.parentElement.style.display = "none";
	}

	debug.console.log(`[EditorType] set`);
	await fs.setEditorType(DEFAULT_EDITOR);
	debug.console.log(`[EditorLayout] set`);
	await fs.setEditorLayout(DEFAULT_LAYOUT);
	debug.console.log(`[WrapStyle] set`);
	await fs.setWrapStyle(DEFAULT_WRAP_STYLE);

	// [旧エディタ] 改行時のスクロールずれ修正
	es.form__taMsg.style.overflowAnchor = "none";

	// [旧エディタ] スクロールの位置修正をイベントリスナー追加
	es.form__taMsg.addEventListener("keyup", fs.handle.fixHorizontalScroll);

	// [新・旧エディタ] 折り返しボタン追加
	es.form__btnToggleWrap = es.form.querySelector("div.preview-buttons").appendChild(d.createElement("button"));
	es.form__btnToggleWrap.id = "wrap-switcher-button";
	es.form__btnToggleWrap.type = "button";
	es.form__btnToggleWrap.textContent = `折り返し${fs.getWrapStyle()?"ON":"OFF"}`;
	es.form__btnToggleWrap.addEventListener("click", fs.handle.toggleWrap);
})(window, document);
