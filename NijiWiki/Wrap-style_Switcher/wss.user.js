// ==UserScript==
// @name         Wrap-style Switcher for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      0.7
// @description  編集フォームの折返し切り替えや改行時のスクロールずれを解決します
// @author       AnonUsr-Dev
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

    // デバッグ関係
	const DEBUG = false;
	const DEBUG_LABEL = "Wrap-style Switcher 2434";
	const fLog = console.log;

	// スクリプト開始
    let ef, t, b, cm, et;
	const fEditorType = () => {
		if (cm = ef.querySelector("div.edit_form>div.CodeMirror")) return "CodeMirror";
		return "textarea";
	}
	// トグルボタンの動作
	const fToggleWrap = () => {
		let bWrapState;
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
				bWrapState = t.getAttribute("wrap") != "off";
				t.setAttribute("wrap", bWrapState == false ? "soft" : "off");
				break;
		}
		b.innerText = "折返し" + (bWrapState == true ? "ON" : "OFF");
		return;
	}
	// [旧エディタ] wrap="off" 時のスクロール位置修正
	const fFixHorizontalScroll = () => {
		if (t.getAttribute("wrap") != "off") return;
		if (t.value.substr(0, t.selectionStart).slice(-1) == "\n") t.scrollLeft = 0;
	}
	// 初期化関数
	const fLoad = () => {
		if (DEBUG) fLog(DEBUG_LABEL + ": get form");
		if (!(ef = d.querySelector("#content>div>form"))) return void 0;
		if (DEBUG) fLog(DEBUG_LABEL + ": get editor-toggle button");
		if (!(et = ef.querySelector("div>p>a[href='#']"))) return void 0;
		if (DEBUG) fLog(DEBUG_LABEL + ": get textarea[name$='msg']");
		if (!(t = ef.querySelector("div.edit_form>textarea[name='msg'], div.edit_form>textarea[name='areaedit_msg']"))) return void 0;
		if (DEBUG) fLog(DEBUG_LABEL + ": switch editor style");
		if (((fEditorType() != "CodeMirror") == (DEFAULT_EDITOR ? true : false)) && (et.innerText.indexOf((DEFAULT_EDITOR ? "新" : "旧") + "エディタ") != -1)) return void et.click();
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
		// Intervalを解除
		clearInterval(idLoad);
		if (DEBUG) fLog(DEBUG_LABEL + ": load completed.");
	}
	const fInitWrapState = () => {
		if (!b) return;
		if (DEFAULT_EDITOR == true && !ef.querySelector("div.edit_form>div.CodeMirror")) return;
		// デフォルトで実行させたいので最後にn回実行
		fToggleWrap();
		if (DEFAULT_WRAP_STYLE == true) fToggleWrap();
		// Intervalを解除
		clearInterval(idInitWrapState);
		if (DEBUG) fLog(DEBUG_LABEL + ": wrap state initalized.");
	}
	const fTimeout = () => {
		clearInterval(idLoad);
		clearInterval(idInitWrapState);
		if (DEBUG) fLog(DEBUG_LABEL + ": timeout.");
	}
	// 初期化関数をページ読み込み後に実行させる
	// -> 非アクティブのバックグラウンドタブでonloadイベントが発火しない事があるため実装変更 (0.2)
	//    -> w.addEventListener("load", f) -> setInterval(f, 100)
	const idLoad = setInterval(fLoad, 100);
	const idInitWrapState = setInterval(fInitWrapState, 100);
	setTimeout(fTimeout, 10000)
})(window, document))
