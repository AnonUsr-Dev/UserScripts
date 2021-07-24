// ==UserScript==
// @name         Date ToolBar for NijiWiki
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      0.1
// @description  配信予定の日付移動を補助するツールバーを追加します
// @author       AnonUsr-Dev
// @match        https://wikiwiki.jp/nijisanji/?cmd=edit*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=
// @updateURL    https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Date_ToolBar/dtb.user.js
// @downloadURL  https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Date_ToolBar/dtb.user.js
// ==/UserScript==

void(
	((d) => {
		const DEBUG = false;
		const log = console.log;
		const search = new URLSearchParams(location.search);
		const sPage = search.get("page")
		const sPageRef = search.get("refpage");
		const dateInitStep = Number.isInteger(parseInt(search.get("auddtb"))) ? parseInt(search.get("auddtb")) : 1;
		const dateInit = sPage.replace("海外ライバー総合/", "").replace("配信予定/", "");
		const dateMin = ~sPage.indexOf("海外ライバー総合/") ? "2021-05-16" : "2018-02-08";
		const divDateBar = d.createElement("div");
		if (!dateInit.length) return;
		if (!~sPage.indexOf("配信予定/")) return;
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
				location.search = search.toString();
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
			aBack.outerHTML = "Ref Page: " + aBack.outerHTML;
			// divDateBar: DateBarを追加
			d.querySelector("#title").after(divDateBar);
			divDateBar.id = "UnonUsr-Dev-DateBar";
			divDateBar.style.textAlign = "right";
			// input: type=date
			inputDate = divDateBar.appendChild(d.createElement("input"));
			inputDate.type = "date";
			inputDate.value = dateInit;
			inputDate.min = dateMin;
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
	})(document)
)
