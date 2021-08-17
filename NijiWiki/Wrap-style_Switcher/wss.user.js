// ==UserScript==
// @name         Wrap-style Switcher for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      0.6
// @description  編集フォームの折返し切り替えや改行時のスクロールずれを解決します
// @author       UnonUsr-Dev
// @match        https://wikiwiki.jp/nijisanji/?cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/?cmd=revert*
// @match        https://wikiwiki.jp/nijisanji/?cmd=add*
// @match        https://wikiwiki.jp/nijisanji/?cmd=areaedit*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDE5aDZ2LTJINHYyek0yMCA1SDR2MmgxNlY1em0tMyA2SDR2MmgxMy4yNWMxLjEgMCAyIC45IDIgMnMtLjkgMi0yIDJIMTV2LTJsLTMgMyAzIDN2LTJoMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNHoiLz48L3N2Zz4=
// @updateURL    https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Wrap-style_Switcher/wss.user.js
// @downloadURL  https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Wrap-style_Switcher/wss.user.js
// ==/UserScript==

void(((w, d) => {
	'use strict';
	// エディタの既定値
	// 　false: 旧エディタ, true: 新エディタ
	const DEFAULT_EDITOR = true;
	// 折返しの既定値
	// 　false: 折返しなし, true: 折返しあり
	const DEFAULT_WRAP_STYLE = false;
	// デバッグフラグ
	const DEBUG = false;
	let ef, t, b, cm, et;
	const fEditorType = () => {
		if (cm = ef.querySelector("div.edit_form>div.CodeMirror")) return "CodeMirror";
		return "textarea";
	}
	// トグルボタンの動作
	const fToggleWrap = () => {
		let bWrapState
		switch (fEditorType()) {
			case "CodeMirror":
				// [新エディタ]
				if (bWrapState = cm.classList.contains("CodeMirror-wrap")) {
					cm.classList.remove("CodeMirror-wrap");
				} else {
					cm.classList.add("CodeMirror-wrap");
				}
				// wrap をONにしたとき水平スクロールの最大値がずれる現象の対処
				cm.querySelector("div.CodeMirror-scroll").style.width = bWrapState == false ? "" : "100%";
				// wrap をONにしたとき垂直スクロールがおかしくなる現象の対処
				w.dispatchEvent(new Event("resize", {
					bubbles: true,
					cancelable: false,
					composed: true
				}));
				break;
			default:
				// [旧エディタ]
				bWrapState = t.getAttribute("wrap") != "off"
				t.setAttribute("wrap", bWrapState == false ? "soft" : "off");
				break;
		}
		b.innerText = "折返し" + (bWrapState == true ? "ON" : "OFF");
	}
	// [旧エディタ] wrap="off" 時のスクロール位置修正
	const fFixHorizontalScroll = () => {
		if (t.getAttribute("wrap") != "off") return;
		if (t.value.substr(0, t.selectionStart).slice(-1) == "\n") t.scrollLeft = 0;
	}
	// 初期化関数
	const fLoad = () => {
		if (DEBUG) console.log("Wrap-style Switcher 2434: get form");
		if (!(ef = d.querySelector("#content>div>form"))) return void 0;
		if (DEBUG) console.log("Wrap-style Switcher 2434: get editor-toggle button");
		if (!(et = ef.querySelector("div>p>a[href='#']"))) return void 0;
		if (DEBUG) console.log("Wrap-style Switcher 2434: get textarea[name$='msg']");
		if (!(t = ef.querySelector("div.edit_form>textarea[name='msg'], div.edit_form>textarea[name='areaedit_msg']"))) return void 0;
		if (DEFAULT_EDITOR) {
			if (fEditorType() != "CodeMirror" && et.innerText.indexOf("新エディタ") != -1) return void et.click();
		} else {
			if (fEditorType() == "CodeMirror" && et.innerText.indexOf("旧エディタ") != -1) return void et.click();
		}
		// [新?・旧エディタ] 改行時のスクロールずれ修正 (新エディタの方はずれない？、悪影響無さそうなので旧仕様を保持)
		t.style.overflowAnchor = "none";
		// [旧エディタ] スクロールの位置修正をイベントリスナー追加
		t.addEventListener("keyup", fFixHorizontalScroll);
		// ボタン設定、追加
		b = d.createElement("button");
		b.id = "wrap-switcher-button";
		b.type = "button";
		b.innerText = "Loading...";
		b = ef.querySelector("div.preview-buttons").appendChild(b);
		b.onclick = fToggleWrap;
		// デフォルトで実行させたいので最後にn回実行
		// TODO: たまに折り返さない不具合 // 取り敢えずtimeoutで対処
		setTimeout(() => {
			fToggleWrap();
			if (DEFAULT_WRAP_STYLE == true) fToggleWrap();
		}, 1000);
		// Intervalを解除
		clearInterval(idLoad);
		if (DEBUG) console.log("Wrap-style Switcher 2434: done.");
	}
	const fTimeout = () => {
		clearInterval(idLoad);
		if (DEBUG) console.log("Wrap-style Switcher 2434: timeout.");
	}
	// 初期化関数をページ読み込み後に実行させる
	// -> 非アクティブのバックグラウンドタブでonloadイベントが発火しない事があるため実装変更
	//    -> w.addEventListener("load", f) -> setInterval(f, 100)
	const idLoad = setInterval(fLoad, 100);
	setTimeout(fTimeout, 10000)
})(window, document))
