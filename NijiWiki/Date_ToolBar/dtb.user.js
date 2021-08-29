// ==UserScript==
// @name         Date ToolBar for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      0.4
// @description  配信予定の日付移動を補助するツールバーを追加します
// @author       AnonUsr-Dev
// @match        https://wikiwiki.jp/nijisanji/?cmd=edit*
// @match        https://wikiwiki.jp/nijisanji/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*
// @match        https://wikiwiki.jp/nijisanji/%E6%B5%B7%E5%A4%96%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E7%B7%8F%E5%90%88/%E9%85%8D%E4%BF%A1%E4%BA%88%E5%AE%9A/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMCAzaC0xVjFoLTJ2Mkg3VjFINXYySDRjLTEuMSAwLTIgLjktMiAydjE2YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnptMCAxOEg0VjhoMTZ2MTN6Ii8+PC9zdmc+
// @updateURL    https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Date_ToolBar/dtb.user.js
// @downloadURL  https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Date_ToolBar/dtb.user.js
// ==/UserScript==

void(((d) => {
	"use strict";
	const DEBUG = false;
	const log = console.log;
	const pathname = decodeURIComponent(location.pathname);
	const urlSource = location.search.length ? location.href : d.referrer;
	const search = new URLSearchParams(new URL(urlSource).search);
	const sPage = search.get("page");
	const sPageRef = search.get("refpage");
	const dateInitStep = Number.isInteger(parseInt(search.get("auddtb"))) ? parseInt(search.get("auddtb")) : 1;
	const dateInit = sPage.replace("海外ライバー総合/", "").replace("配信予定/", "");
	const dateMin = ~sPage.indexOf("海外ライバー総合/") ? "2021-05-16" : "2018-02-08";
	const divDateBar = d.createElement("div");
	switch (true) {
		case dateInit.length && sPage.indexOf("配信予定/") != -1:
			break;
		default:
			return;
	}
	let aBack;
	let inputDate, inputNum;
	let btnDate, btnTDay, btnPrev, btnNext;
	const fNavByDate = (sDate) => {
		if (!/\d{4}[\-\/]\d{2}[\-\/]\d{2}/.test(sDate)) return;
		sDate = sDate.replaceAll("/", "-");
		search.set("page", sPage.replace(/配信予定\/\d{4}-\d{2}-\d{2}/, "配信予定/" + sDate));
		if (search.get("auddtb")) {
			if (inputNum.value != 1) {
				search.set("auddtb", inputNum.value);
			} else {
				search.delete("auddtb");
			}
		} else {
			if (inputNum.value != 1) {
				search.append("auddtb", inputNum.value);
			}
		}
		if (DEBUG) {
			log((search.toString()));
			log(decodeURIComponent(search.toString()));
		} else {
			location.href = urlSource.split("?")[0] + "?" + search.toString();
		}
	}
	const fGetDate = (n = 0, d) => {
		(d = d ? d : new Date()).setDate(d.getDate() + n);
		return d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2);
	}
	const fGetInputDate = () => {
		return inputDate.value;
	}
	const fGetInputNum = () => {
		return parseInt(inputNum.value);
	}
	const fLoad = () => {
		if (!d.querySelector("#title")) return;
		if (!d.querySelector("#ctime")) return;
		aBack = d.createElement("a");
		// aBack: refpage へ戻る
		aBack.href = encodeURI("/nijisanji/" + sPageRef);
		aBack.innerText = sPageRef;
		d.querySelector("#ctime").before(aBack);
		aBack.outerHTML = "参照元ページ: " + aBack.outerHTML;
		// divDateBar: DateBarを追加
		d.querySelector("#title").after(divDateBar);
		divDateBar.id = "AnonUsr-Dev-DateBar";
		divDateBar.style.textAlign = "right";
		// input: type=date
		inputDate = divDateBar.appendChild(d.createElement("input"));
		inputDate.type = "date";
		inputDate.value = dateInit;
		inputDate.pvalue = dateInit;
		inputDate.min = dateMin;
		inputDate.oninput = () => {
			let v = [inputDate.pvalue, inputDate.value];
			if (v[0] == v[1]) return;
			v[0] = v[0].split(/[^\d]/g);
			v[1] = v[1].split(/[^\d]/g);
			if (v[0][0] + v[0][2] == v[1][0] + v[1][2]) return;
			fNavByDate(fGetInputDate());
		}
		// button: 入力日へ移動
		btnDate = divDateBar.appendChild(d.createElement("button"));
		btnDate.type = "button";
		btnDate.innerText = "GO";
		btnDate.onclick = () => {
			fNavByDate(fGetInputDate());
		};
		// span: スペーサー
		divDateBar.appendChild(d.createElement("span")).innerText = "　";
		// button: 今日へ移動
		btnTDay = divDateBar.appendChild(d.createElement("button"));
		btnTDay.type = "button";
		btnTDay.innerText = "今日";
		btnTDay.onclick = () => {
			fNavByDate(fGetDate(0));
		};
		// span: スペーサー
		divDateBar.appendChild(d.createElement("span")).innerText = "　";
		// button: n日前へ移動
		btnPrev = divDateBar.appendChild(d.createElement("button"));
		btnPrev.type = "button";
		btnPrev.innerText = dateInitStep + "日前";
		btnPrev.onclick = () => {
			fNavByDate(fGetDate(-fGetInputNum(), new Date(fGetInputDate())));
		};
		// span: スペーサー
		divDateBar.appendChild(d.createElement("span")).innerText = " ";
		// input: n日を指定
		inputNum = divDateBar.appendChild(d.createElement("input"));
		inputNum.type = "number";
		inputNum.value = dateInitStep;
		inputNum.min = 1;
		inputNum.step = 1;
		inputNum.style.width = "5em";
		inputNum.onchange = () => {
			if (!Number.isInteger(fGetInputNum())) {
				inputNum.value = 1;
			}
			btnPrev.innerText = inputNum.value + "日前";
			btnNext.innerText = inputNum.value + "日後";
		};
		// span: スペーサー
		divDateBar.appendChild(d.createElement("span")).innerText = " ";
		// button: n日後へ移動
		btnNext = divDateBar.appendChild(d.createElement("button"));
		btnNext.type = "button";
		btnNext.innerText = dateInitStep + "日後";
		btnNext.onclick = () => {
			fNavByDate(fGetDate(+fGetInputNum(), new Date(fGetInputDate())));
		};
		// Intervalを解除
		clearInterval(idLoad);
		if (DEBUG) console.log("Date ToolBar for 2434: done.");
	}
	const idLoad = setInterval(fLoad, 100);
})(document));
