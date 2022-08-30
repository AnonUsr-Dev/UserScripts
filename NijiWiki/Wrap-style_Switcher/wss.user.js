// ==UserScript==
// @name         Wrap-style Switcher for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      3
// @description  編集フォームの折返し切り替えや改行時のスクロールずれを解決します
// @author       AnonUsr-Dev
// @match        https://wikiwiki.jp/nijisanji/?*
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
	// "タイムスタンプを更新しない"を隠す
	// 　false: 隠さない, true: 隠す
	const HIDDEN_ADMIN_TIMESTAMP = true;
	// レイアウトの既定値 (tabレイアウトは現在非対応)
	// 　false: 従来(below), true: 横並び(right)
	const DEFAULT_LAYOUT = false;

	// デバッグ関係
	const DEBUG = true;
	const DEBUG_LABEL = "Wrap-style Switcher 2434";
	const fLog = console.log;

	// スクリプトの実行ページ判定
	const search = new URLSearchParams(d.location.search);
	const aAllowCmdParams = ["edit", "revert", "add", "areaedit"];
	if (aAllowCmdParams.includes(search.get("cmd").toLowerCase()) == false) return;
	const elms = {
		"form": null,
		"inpChkHL": null,
		"divCM": null,
		"taMsg": null,
		"btnWrap": null,
		"ulLoBar": null
	}
	// スクリプト開始
	const fEditorType = () => {
		if (elms.divCM = elms.form.querySelector("div.edit_form>div.editor-main-area>div.editor-widgets-container>div.CodeMirror")) return "CodeMirror";
		return "textarea";
	}
	// トグルボタンの動作
	const fToggleWrap = () => {
		let bWrapState;
		switch (fEditorType()) {
			case "CodeMirror":
				// [新エディタ]
				if (bWrapState = elms.divCM.classList.contains("CodeMirror-wrap")) {
					elms.divCM.classList.remove("CodeMirror-wrap");
				} else {
					elms.divCM.classList.add("CodeMirror-wrap");
				}
				// wrap をONにしたとき水平スクロールの最大値がずれる現象の対処
				elms.divCM.querySelector("div.CodeMirror-scroll").style.width = bWrapState == false ? "" : "100%";
				// wrap をONにしたとき垂直スクロールがおかしくなる現象の対処
				w.dispatchEvent(new Event("resize", {
					bubbles: true,
					cancelable: false,
					composed: true
				}));
				break;
			default:
				// [旧エディタ]
				bWrapState = elms.taMsg.getAttribute("wrap") != "off";
				elms.taMsg.setAttribute("wrap", bWrapState == false ? "soft" : "off");
				break;
		}
		elms.btnWrap.innerText = "折返し" + (bWrapState == true ? "ON" : "OFF");
		return;
	}
	// [旧エディタ] wrap="off" 時のスクロール位置修正
	const fFixHorizontalScroll = () => {
		if (elms.taMsg.getAttribute("wrap") != "off") return;
		if (elms.taMsg.value.substr(0, elms.taMsg.selectionStart).slice(-1) == "\n") elms.taMsg.scrollLeft = 0;
	}
	// 初期化関数
	const fLoad = () => {
		if (DEBUG) fLog(DEBUG_LABEL + ": get form");
		if (!(elms.form = d.querySelector("div#content>div.wiki-editor form"))) return void 0;
		if (DEBUG) fLog(DEBUG_LABEL + ": get textarea[name$='msg']");
		if (!(elms.taMsg = elms.form.querySelector("textarea[name='msg'],textarea[name='areaedit_msg']"))) return void 0;
		if (DEBUG) fLog(DEBUG_LABEL + ": get editor-toggle checkbox");
		if (!(elms.inpChkHL = elms.form.querySelector("div.edit_form>div.wiki-edit-form-header>p>label>input[type=checkbox]"))) return void 0;
		if (DEBUG) fLog(DEBUG_LABEL + ": switch editor style");
		if (DEFAULT_EDITOR != elms.inpChkHL.checked) return void elms.inpChkHL.click();
		if (DEBUG) fLog(DEBUG_LABEL + ": get editor-toggle layout");
		if (!(elms.ulLoBar = elms.form.querySelector("div.edit_form>div.wiki-edit-form-header>div.wiki-editor-layout-changer>ul"))) return void 0;
		if (DEBUG) fLog(DEBUG_LABEL + ": switch editor layout");
		if (DEFAULT_LAYOUT == false || elms.ulLoBar.querySelector("li.active").classList.contains("tab")) {
			elms.ulLoBar.querySelector("li.below").click();
		} else {
			elms.ulLoBar.querySelector("li.right").click();
		}
		if (DEBUG) fLog(DEBUG_LABEL + ": set visible state of admin timestamp section");
		if (HIDDEN_ADMIN_TIMESTAMP) elms.form.querySelector("div.edit_form>div.no-timestamp>label>input[type='checkbox'][name='notimestamp']").parentElement.style.display = "none";
		// [新?・旧エディタ] 改行時のスクロールずれ修正 (新エディタの方はずれない？、悪影響無さそうなので旧仕様を保持)
		elms.taMsg.style.overflowAnchor = "none";
		// [旧エディタ] スクロールの位置修正をイベントリスナー追加
		elms.taMsg.addEventListener("keyup", fFixHorizontalScroll);
		// ボタン設定、追加
		elms.btnWrap = d.createElement("button");
		elms.btnWrap.id = "wrap-switcher-button";
		elms.btnWrap.type = "button";
		elms.btnWrap.innerText = "Loading...";
		elms.btnWrap = elms.form.querySelector("div.preview-buttons").appendChild(elms.btnWrap);
		elms.btnWrap.onclick = fToggleWrap;
		// Intervalを解除
		clearInterval(idLoad);
		if (DEBUG) fLog(DEBUG_LABEL + ": load completed.");
	}
	// Wrap-style 初期化関数
	const fInitWrapState = () => {
		if (!elms.btnWrap) return;
		if (DEFAULT_EDITOR == true && !elms.form.querySelector("div.edit_form>div.editor-main-area>div.editor-widgets-container>div.CodeMirror")) return;
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
	const idLoad = setInterval(fLoad, 100);
	const idInitWrapState = setInterval(fInitWrapState, 100);
	setTimeout(fTimeout, 10000)
})(window, document));
