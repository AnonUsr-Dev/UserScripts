// ==UserScript==
// @name         Date ToolBar for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      2
// @description  配信予定の日付移動を補助するツールバーを追加します
// @author       AnonUsr-Dev
// @match        https://wikiwiki.jp/nijisanji/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A%E3%83%AA%E3%82%B9%E3%83%88
// @match        https://wikiwiki.jp/nijisanji/%E6%B5%B7%E5%A4%96%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E7%B7%8F%E5%90%88/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A%E3%83%AA%E3%82%B9%E3%83%88
// @match        https://wikiwiki.jp/nijisanji/?*cmd=edit*page=%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A%2F*
// @match        https://wikiwiki.jp/nijisanji/?*cmd=edit*page=%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*
// @match        https://wikiwiki.jp/nijisanji/?*cmd=edit*page=%E6%B5%B7%E5%A4%96%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E7%B7%8F%E5%90%88%2F%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A%2F*
// @match        https://wikiwiki.jp/nijisanji/?*cmd=edit*page=%E6%B5%B7%E5%A4%96%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E7%B7%8F%E5%90%88/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*
// @match        https://wikiwiki.jp/nijisanji/?*page=%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A%2F*cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/?*page=%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/?*page=%E6%B5%B7%E5%A4%96%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E7%B7%8F%E5%90%88%2F%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A%2F*cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/?*page=%E6%B5%B7%E5%A4%96%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E7%B7%8F%E5%90%88/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*
// @match        https://wikiwiki.jp/nijisanji/%E6%B5%B7%E5%A4%96%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E7%B7%8F%E5%90%88/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMCAzaC0xVjFoLTJ2Mkg3VjFINXYySDRjLTEuMSAwLTIgLjktMiAydjE2YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnptMCAxOEg0VjhoMTZ2MTN6Ii8+PC9zdmc+
// @updateURL    https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Date_ToolBar/dtb.user.js
// @downloadURL  https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Date_ToolBar/dtb.user.js
// ==/UserScript==
// @matches
//  https://wikiwiki.jp/nijisanji/
//   配信予定リスト
//   海外ライバー総合/配信予定リスト
//   ?*cmd=edit*page=配信予定/*
//   ?*cmd=edit*page=海外ライバー総合/配信予定/*
//   ?*page=配信予定/*cmd=edit*
//   ?*page=海外ライバー総合/配信予定/*cmd=edit*
//   配信予定/*
//   海外ライバー総合/配信予定/*

void(((d) => {
	"use strict";
	/*#### options ####*/
	const options = {
		"FOLD_OPENED": false
	}
	/*#### debug ####*/
	const debug = {};
	debug.status = false;
	debug.label = "Date ToolBar";
	debug.timestamp = {};
	debug.timestamp.format = {"timeZone": "JST", "hour12": false, "hour": "2-digit", "minute": "2-digit", "second": "2-digit"};
	debug.timestamp.now = (() => new Date().toLocaleTimeString('ja-JP', debug.timestamp.format));
	debug.log = ((...p) => debug.status && console.log(`[${debug.timestamp.now()}][${debug.label}]`, ...p));
	/*#### define ####*/
	const fs = {}, vs = {}, es = {};
	es.div = {}; es.a = {}; es.btn = {}; es.inDate = {}; es.inNum = {}; es.inChk = {}; es.label = {}; es.span = {};
	fs.link = {};
	fs.link.date = {};
	fs.link.date.format = {"timeZone": "JST", "hour12": false, "year": "numeric", "month": "2-digit", "day": "2-digit"};
	fs.link.date.toString = ((date) => date.toLocaleString("ja-JP", fs.link.date.format).replaceAll("/", "-"));
	fs.link.date.fromString = ((s) => new Date((s.split(/[^\d]/).map((x, i) => `000${x}`.slice(-[4, 2, 2][i])).join("-")) + " 00:00:00 GMT+0900"));
	fs.link.parse = (href) => {
		const parts = decodeURIComponent(href.replace(fs.link.wiki, ""));
		const result = {};
		result.pageType = parts.match("配信予定リスト") ? "list" : "view";
		result.date = result.pageType === "list" ? new Date() : new Date(parts.match(/\d{4}-\d{2}-\d{2}/g)[0] + " 00:00:00 GMT+0900");
		result.dateString = fs.link.date.toString(result.date);
		result.isWorld = parts.match("海外ライバー総合") ? true : false;
		if (href.indexOf("?") !== -1) {
			const usp = new URLSearchParams(new URL(href).search);
			if (usp.has("cmd") && usp.get("cmd") === "edit") result.pageType = "edit";
			if (usp.has("page")) result.page = usp.get("page");
			if (usp.has("audqds")) result.audqds = usp.get("audqds");
			if (usp.has("audqdv")) result.audqdv = usp.get("audqdv");
		}
		return result;
	};
	fs.link.wiki = "https://wikiwiki.jp/nijisanji/";
	fs.link.addWorld = ((world, s) => `${(world?"海外ライバー総合/":"")}${s}`);
	fs.link.create = {};
	fs.link.create.get = ((type, date = null, dayOffset = 0, world = false) => {
		switch (type) {
			case "list":
				return fs.link.wiki + encodeURI(fs.link.addWorld(world, "配信予定リスト"));
				break;
			case "edit":
				date = date === null ? new Date() : new Date(date);
				date.setDate(date.getDate() + dayOffset);
				return fs.link.create.addQuery({
					"href": fs.link.wiki
				}, {
					"cmd": "edit",
					"page": fs.link.addWorld(world, `配信予定/${fs.link.date.toString(date)}`)
				});
				break;
			case "view":
				date = date === null ? new Date() : new Date(date);
				date.setDate(date.getDate() + dayOffset);
				return fs.link.create.addQuery({
					"href": fs.link.wiki + encodeURI(fs.link.addWorld(world, `配信予定/${fs.link.date.toString(date)}`))
				});
				break;
		}
	});
	fs.link.create.addQuery = (url = {}, xQuery = {}) => {
		url.u = new URL(url.href);
		url.usp = new URLSearchParams(url.u.search);
		// audqds: step, audqdv: view
		if (parseInt(vs.curStep) !== 1) xQuery.audqds = parseInt(vs.curStep);
		if (es.inChk.isView.disabled && es.inChk.isView.checked === true) xQuery.audqdv = 1;
		["cmd", "page", "refpage", "audqds", "audqdv"].forEach(x => {
			if (xQuery[x]) url.usp.set(x, xQuery[x]);
		})
		return url.u.origin + url.u.pathname + (url.usp.toString().length ? "?" : "") + url.usp.toString();
	}
	fs.link.create.label = ((type, date = null, dayOffset = 0, world = false) => {
		switch (type) {
			case "list":
				return fs.link.addWorld(world, "配信予定リスト");
				break;
			case "edit":
			case "view":
				date = date === null ? new Date() : new Date(date);
				date.setDate(date.getDate() + dayOffset);
				return fs.link.addWorld(world, `配信予定/${fs.link.date.toString(date)}${(type==="edit"?" の編集":"")}`);
				break;
		}
	});
	fs.link.navigate = ((href) => {
		location.href = href;
	});
	fs.link.update = (() => {
		const isView = es.inChk.isView.disabled ? (!es.inChk.isView.checked) : es.inChk.isView.checked;
		const isWorld = es.inChk.isWorld.checked;
		const pageType = (isView ? "view" : "edit");
		es.a.toYesterday.title = fs.link.create.label(pageType, null, -1, isWorld);
		es.a.toYesterday.href = fs.link.create.get(pageType, null, -1, isWorld);;
		es.a.toToday.title = fs.link.create.label(pageType, null, 0, isWorld);
		es.a.toToday.href = fs.link.create.get(pageType, null, 0, isWorld);
		es.a.toTomorrow.title = fs.link.create.label(pageType, null, 1, isWorld);
		es.a.toTomorrow.href = fs.link.create.get(pageType, null, 1, isWorld);
		es.a.toPrev.title = fs.link.create.label(pageType, vs.page.date, -vs.curStep, isWorld);
		es.a.toPrev.href = fs.link.create.get(pageType, vs.page.date, -vs.curStep, isWorld);
		es.a.toNext.title = fs.link.create.label(pageType, vs.page.date, vs.curStep, isWorld);
		es.a.toNext.href = fs.link.create.get(pageType, vs.page.date, vs.curStep, isWorld);
		es.a.toAffiliation.title = fs.link.create.label(pageType, fs.link.date.fromString(es.inDate.date.value), 0, !vs.page.isWorld);
		es.a.toAffiliation.href = fs.link.create.get(pageType, fs.link.date.fromString(es.inDate.date.value), 0, !vs.page.isWorld);
		es.label.isView.title = `View Page Mode [Mode: ${(isView?"View":"Edit")} Page, Hold: ${es.inChk.isView.disabled}]`;
		es.label.isWorld.title = `World Page Mode [Mode: ${(isWorld?"World":"Local")}]`;
	});
	/*#### main ####*/
	vs.page = fs.link.parse(location.href);
	vs.curStep = parseInt(vs.page.audqds) || 1;
	fs.load = () => {
		/*==== 要素を待機 ====*/
		/**/ debug.log("waiting '#title' element");
		if (!d.querySelector("#title")) return;
		/**/ debug.log("waiting '#pageload' element");
		if (!d.querySelector("#pageload")) return;
		/**/ debug.log("found waited elements");
		/*==== Intervalを解除 ====*/
		fs.timeout();
		/*==== 親ページへ戻る を追加 ====*/
		/**/ debug.log("add 'a.backToParent' element");
		if (vs.page.pageType !== "list") {
			es.a.backToParent = d.createElement("a");
			es.a.backToParent.innerText = fs.link.create.label("list", null, 0, vs.page.isWorld);
			es.a.backToParent.href = fs.link.create.get("list", null, 0, vs.page.isWorld);
			es.a.backToParent.draggable = false;
			const parent = d.querySelector("#pageload").parentElement;
			parent.insertBefore(es.a.backToParent, parent.firstChild);
			es.a.backToParent.outerHTML = "<label>親ページ: </label>" + es.a.backToParent.outerHTML;
		}
		/*==== 日付ツールバー を追加 ====*/
		/**/ debug.log("add 'div.datebar' element");
		es.div.datebar = d.createElement("div");
		d.querySelector("div.result-message, #title").before(es.div.datebar);
		d.querySelector("div.result-message, #title").before(d.createElement("hr"));
		es.div.datebar.id = "AnonUsr-Dev-DateBar";
		es.div.datebar.style = "text-align: right;"//justify-content: center; align-items: center;
		/*==== 日付ツールバーの要素 を追加 ====*/
		/**/ debug.log("add 'date toolbar' child elements");
		/*---- 要素: 詳細 ----*/
		/**/ debug.log("add 'button.detail' element");
		es.btn.detail = es.div.datebar.appendChild(d.createElement("button"));
		es.btn.detail.innerText = `　◀　`;
		es.btn.detail.title = "詳細を表示";
		es.btn.detail.type = "button";
		es.btn.detail.opened = false;
		es.btn.detail.style.fontSize = "7px";
		es.btn.detail.style.height = "22px";
		es.btn.detail.onclick = () => {
			es.btn.detail.opened = !es.btn.detail.opened;
			es.btn.detail.innerText = `　${es.btn.detail.opened?"▶":"◀"}　`;
			es.inNum.step.style.display = es.span.chkboxes.style.display = es.a.toAffiliation.style.display = es.btn.detail.opened ? "" : "none";
			es.a.toYesterday.style.display = (es.btn.detail.opened || new Date().getHours() <= 6) ? "" : "none";
			es.a.toTomorrow.style.display = es.btn.detail.opened ? "" : "none";
		};
		/*---- 要素: spacer[　] ----*/
		es.div.datebar.appendChild(d.createElement("span")).innerText = "　";
		/*-------- 要素: チェックボックス --------*/
		/**/ debug.log("add 'input.checkbox' elements");
		es.span.chkboxes = es.div.datebar.appendChild(d.createElement("span"));
		es.span.chkboxes.style.display = "none";
		/*---- 要素: isView ----*/
		es.label.isView = es.span.chkboxes.appendChild(d.createElement("label"));
		es.label.isView.for = "AnonUsr-Dev-CBView";
		es.label.isView.innerHTML = `V:<input type="checkbox" id="${es.label.isView.for}">`;
		es.inChk.isView = es.label.isView.querySelector("#" + es.label.isView.for);
		es.inChk.isView.type = "checkbox";
		es.inChk.isView.checked = vs.page.audqdv && vs.page.audqdv === "1" ? true : false;
		es.inChk.isView.oninput = fs.link.update;
		es.inChk.isView.ondblclick = es.label.isView.ondblclick = () => {
			es.inChk.isView.disabled = !es.inChk.isView.disabled;
			es.label.isView.title = `View Page Mode [Link: ${(es.inChk.isView.checked?"View":"Edit")} Page, Hold: ${es.inChk.isView.disabled}]`;
		}
		/*---- 要素: spacer[ ] ----*/
		es.span.chkboxes.appendChild(d.createElement("span")).innerText = " ";
		/*---- 要素: isWorld ----*/
		es.label.isWorld = es.span.chkboxes.appendChild(d.createElement("label"));
		es.label.isWorld.for = "AnonUsr-Dev-CBWorld";
		es.label.isWorld.innerHTML = `W:<input type="checkbox" id="${es.label.isWorld.for}">`;
		es.inChk.isWorld = es.label.isWorld.querySelector("#" + es.label.isWorld.for);
		es.inChk.isWorld.type = "checkbox";
		es.inChk.isWorld.checked = vs.page.isWorld;
		es.inChk.isWorld.oninput = fs.link.update;
		es.label.isView.title = `View Page Mode [Mode: ${(es.inChk.isView.checked?"View":"Edit")} Page, Hold: ${es.inChk.isView.disabled}]`;
		es.label.isWorld.title = `World Page Mode [Mode: ${(es.inChk.isWorld.checked?"World":"Local")}]`;
		/*---- 要素: spacer[　] ----*/
		es.span.chkboxes.appendChild(d.createElement("span")).innerText = "　";
		/*-------- 要素: 日付入力 --------*/
		/**/ debug.log("add 'input.date' element");
		es.inDate.date = es.div.datebar.appendChild(d.createElement("input"));
		es.inDate.date.type = "date";
		es.inDate.date.value = vs.page.dateString;
		es.inDate.date.pvalue = vs.page.dateString;
		es.inDate.date.title = "ダブルクリックで移動";
		es.inDate.date.style.fontSize = "12px";
		es.inDate.date.style.height = "22px";
		es.inDate.date.oninput = () => {
			const p = es.inDate.date.pvalue, c = es.inDate.date.value;
			const f = ((d) => d.split(/[^\d]/g).filter((x, i) => (i !== 1)).join());
			if (p === c || f(p) === f(c)) return;
			const pageType = ((es.inChk.isView.disabled ? (!es.inChk.isView.checked) : es.inChk.isView.checked) ? "view" : "edit")
			fs.link.navigate(fs.link.create.get(pageType, fs.link.date.fromString(es.inDate.date.value), 0, es.inChk.isWorld.checked));
		}
		es.inDate.date.ondblclick = () => {
			const pageType = ((es.inChk.isView.disabled ? (!es.inChk.isView.checked) : es.inChk.isView.checked) ? "view" : "edit")
			fs.link.navigate(fs.link.create.get(pageType, fs.link.date.fromString(es.inDate.date.value), 0, es.inChk.isWorld.checked));
		}
		/*---- 要素: [国内/国外] ----*/
		es.a.toAffiliation = es.div.datebar.appendChild(d.createElement("a"));
		es.a.toAffiliation.innerText = `[国${vs.page.isWorld?"内":"外"}]`;
		es.a.toAffiliation.style.display = "none";
		/*---- 要素: spacer[　] ----*/
		es.div.datebar.appendChild(d.createElement("span")).innerText = "　";
		/*-------- 要素: [昨日/今日/明日](現在日時から移動) --------*/
		/**/ debug.log("add 'Yesterday, Today, Tomorrow' elements");
		/*---- 要素: [昨日] ----*/
		es.a.toYesterday = es.div.datebar.appendChild(d.createElement("a"));
		es.a.toYesterday.innerText = "[昨日]";
		es.a.toYesterday.style.display = (new Date().getHours() <= 6) ? "" : "none";
		/*---- 要素: spacer[ ] ----*/
		es.div.datebar.appendChild(d.createElement("span")).innerText = " ";
		/*---- 要素: [今日] ----*/
		es.a.toToday = es.div.datebar.appendChild(d.createElement("a"));
		es.a.toToday.innerText = "[今日]";
		/*---- 要素: spacer[ ] ----*/
		es.div.datebar.appendChild(d.createElement("span")).innerText = " ";
		/*---- 要素: [明日] ----*/
		es.a.toTomorrow = es.div.datebar.appendChild(d.createElement("a"));
		es.a.toTomorrow.innerText = "[明日]";
		es.a.toTomorrow.style.display = "none";
		/*---- 要素: spacer[　] ----*/
		es.div.datebar.appendChild(d.createElement("span")).innerText = "　";
		/*-------- 要素: [n日前/n日/n日後](現在ページから移動) --------*/
		/**/ debug.log("add 'Prev, Step, Next' elements");
		/*---- 要素: [n日前] ----*/
		es.a.toPrev = es.div.datebar.appendChild(d.createElement("a"));
		es.a.toPrev.innerText = `[${vs.curStep}日前]`;
		/*---- 要素: spacer[ ] ----*/
		es.div.datebar.appendChild(d.createElement("span")).innerText = " ";
		/*---- 要素: [n日] ----*/
		es.inNum.step = es.div.datebar.appendChild(d.createElement("input"));
		es.inNum.step.type = "number";
		es.inNum.step.value = vs.curStep;
		es.inNum.step.min = 1;
		es.inNum.step.step = 1;
		es.inNum.step.style.width = "5em";
		es.inNum.step.style.display = "none";
		es.inNum.step.style.fontSize = "12px";
		es.inNum.step.style.height = "22px";
		es.inNum.step.onchange = () => {
			if (!Number.isInteger(parseInt(es.inNum.step.value))) es.inNum.step.value = 1;
			vs.curStep = parseInt(es.inNum.step.value);
			es.a.toPrev.innerText = `[${vs.curStep}日前]`;
			es.a.toNext.innerText = `[${vs.curStep}日後]`;
			fs.link.update();
		};
		/*---- 要素: spacer[ ] ----*/
		es.div.datebar.appendChild(d.createElement("span")).innerText = " ";
		/*---- 要素: [n日後] ----*/
		es.a.toNext = es.div.datebar.appendChild(d.createElement("a"));
		es.a.toNext.innerText = `[${vs.curStep}日後]`;
		/*==== 書式設定 ====*/
		es.div.datebar.querySelectorAll("label, a, span").forEach(e => {
			e.draggable = false;
			e.style.cssText += (["-webkit-", "-khtml-", "-moz-", "-ms-", ""].map(x => `${x}user-select: none;`).join(" "));
			e.onmousemove = e.onfocus = fs.link.update;
		})
		/*==== リンクの初期化 ====*/
		fs.link.update();
		if (options.FOLD_OPENED) es.btn.detail.click();
		/*==== 終了 ====*/
		/**/ debug.log("load complete.");
	};
	const idLoadInterval = setInterval(fs.load, 100);
	fs.timeout = () => {
		clearInterval(idLoadInterval);
		clearTimeout(idLoadTimeout);
	};
	const idLoadTimeout = setTimeout(fs.timeout, 30000);
})(document));
