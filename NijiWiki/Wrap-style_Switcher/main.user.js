// ==UserScript==
// @name         Wrap-style Switcher for NijiWiki
// @namespace    https://gist.github.com/AnonUsr-Dev/d5cec23f8ea25735c96ca403acceca95
// @version      0.3
// @description  Editフォームの折返し切り替えや改行時のスクロールずれを解決します
// @author       UnonUsr-Dev
// @match        https://wikiwiki.jp/nijisanji/?cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/?cmd=revert*
// @match        https://wikiwiki.jp/nijisanji/?cmd=add*
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

	let ef, t, b, cm;
	const fEditorType = () => {
		if (cm = d.querySelector("#edit-form>div>div.CodeMirror")) return "CodeMirror";
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
				w.dispatchEvent(new Event("resize", {bubbles: true, cancelable: false, composed: true}));
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
		if (!(ef = d.querySelector("#edit-form"))) return void 0;
		if (!(ef.querySelector("#to-new-editor") && ef.querySelector("#to-old-editor"))) return void 0;
		if (!(t = ef.querySelector("div.edit_form>textarea[name='msg']"))) return void 0;
		if (DEFAULT_EDITOR) {
			if (fEditorType() != "CodeMirror") return void ef.querySelector("#to-new-editor").click();
		} else {
			if (fEditorType() == "CodeMirror") return void ef.querySelector("#to-old-editor").click();
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
		b = ef.querySelector("#preview-buttons").appendChild(b);
		b.onclick = fToggleWrap;
		// デフォルトで実行させたいので最後にn回実行
		fToggleWrap();
		if (DEFAULT_WRAP_STYLE == true) fToggleWrap();
		// Intervalを解除
		clearInterval(idLoad);
		if (DEBUG) console.log("Wrap-style Switcher 2434: done.");
	}
	// 初期化関数をページ読み込み後に実行させる
	// -> 非アクティブのバックグラウンドタブでonloadイベントが発火しない事があるため実装変更
	//    -> w.addEventListener("load", f) -> setInterval(f, 100)
	const idLoad = setInterval(fLoad, 100);
})(window, document))
