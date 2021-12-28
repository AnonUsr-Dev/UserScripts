// ==UserScript==
// @name         Custom Editor CSS for wikiwiki.jp
// @namespace    https://github.com/AnonUsr-Dev/UserScripts
// @version      3
// @description  wikiwiki.jpの編集で使用されているコードハイライトのテーマを変更します。
// @author       AnonUsr-Dev
// @match        https://wikiwiki.jp/*/?*
// @icon         data:image/svg+xml;charset=utf8,%3C!--%20Generator%3A%20Adobe%20Illustrator%2018.1.1%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200)%20--%3E%3Csvg%20version%3D%221.1%22%20id%3D%22_x32_%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20512%20512%22%20style%3D%22width%3A%2032px%3B%20height%3A%2032px%3B%20opacity%3A%201%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%20.st0%7Bfill%3A%234B4B4B%3B%7D%3C%2Fstyle%3E%3Cg%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M378.413%2C0H208.297h-13.182L185.8%2C9.314L57.02%2C138.102l-9.314%2C9.314v13.176v265.514%20c0%2C47.36%2C38.528%2C85.895%2C85.896%2C85.895h244.811c47.353%2C0%2C85.881-38.535%2C85.881-85.895V85.896C464.294%2C38.528%2C425.766%2C0%2C378.413%2C0z%20M432.497%2C426.105c0%2C29.877-24.214%2C54.091-54.084%2C54.091H133.602c-29.884%2C0-54.098-24.214-54.098-54.091V160.591h83.716%20c24.885%2C0%2C45.077-20.178%2C45.077-45.07V31.804h170.116c29.87%2C0%2C54.084%2C24.214%2C54.084%2C54.092V426.105z%22%20style%3D%22fill%3A%20rgb(255%2C%20255%2C%20255)%3B%22%3E%3C%2Fpath%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M169.574%2C268.949c5.837%2C0%2C9.104%2C2.171%2C12.499%2C6.786c2.709%2C3.805%2C5.432%2C5.167%2C8.825%2C5.167%20c5.028%2C0%2C9.105-3.673%2C9.105-8.965c0-2.171-0.684-4.078-1.774-5.977c-4.622-8.288-14.802-14.669-28.655-14.669%20c-16.171%2C0-28.124%2C7.603-33.012%2C22.685c-1.899%2C6.11-2.57%2C10.865-2.57%2C24.989c0%2C14.125%2C0.67%2C18.881%2C2.57%2C24.99%20c4.888%2C15.081%2C16.841%2C22.685%2C33.012%2C22.685c13.853%2C0%2C24.033-6.382%2C28.655-14.67c1.09-1.899%2C1.774-3.805%2C1.774-5.976%20c0-5.3-4.078-8.965-9.105-8.965c-3.393%2C0-6.116%2C1.361-8.825%2C5.16c-3.394%2C4.622-6.662%2C6.794-12.499%2C6.794%20c-7.471%2C0-11.814-3.938-13.853-10.187c-1.089-3.393-1.494-6.654-1.494-19.83c0-13.175%2C0.406-16.436%2C1.494-19.829%20C157.76%2C272.887%2C162.103%2C268.949%2C169.574%2C268.949z%22%20style%3D%22fill%3A%20rgb(255%2C%20255%2C%20255)%3B%22%3E%3C%2Fpath%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M255.149%2C289.595l-4.888-0.684c-10.725-1.494-14.398-5.02-14.398-10.187c0-5.837%2C4.343-9.915%2C12.498-9.915%20c5.698%2C0%2C11.409%2C1.634%2C15.892%2C3.805c1.899%2C0.95%2C3.938%2C1.494%2C5.837%2C1.494c4.888%2C0%2C8.7-3.666%2C8.7-8.693%20c0-3.261-1.494-5.977-4.762-8.016c-5.432-3.394-15.612-6.11-25.806-6.11c-19.97%2C0-32.733%2C11.269-32.733%2C28.25%20c0%2C16.304%2C10.32%2C25.13%2C29.2%2C27.713l4.901%2C0.677c10.99%2C1.494%2C14.258%2C4.888%2C14.258%2C10.32c0%2C6.389-5.306%2C10.872-15.082%2C10.872%20c-6.787%2C0-12.219-1.767-19.83-5.977c-1.634-0.956-3.672-1.634-5.837-1.634c-5.166%2C0-8.965%2C3.938-8.965%2C8.832%20c0%2C3.254%2C1.634%2C6.382%2C4.748%2C8.42c6.116%2C3.799%2C16.031%2C7.876%2C29.074%2C7.876c24.032%2C0%2C36.266-12.358%2C36.266-29.067%20C284.223%2C300.865%2C274.307%2C292.311%2C255.149%2C289.595z%22%20style%3D%22fill%3A%20rgb(255%2C%20255%2C%20255)%3B%22%3E%3C%2Fpath%3E%20%3Cpath%20class%3D%22st0%22%20d%3D%22M338.697%2C289.595l-4.888-0.684c-10.738-1.494-14.398-5.02-14.398-10.187c0-5.837%2C4.344-9.915%2C12.484-9.915%20c5.712%2C0%2C11.423%2C1.634%2C15.892%2C3.805c1.913%2C0.95%2C3.952%2C1.494%2C5.851%2C1.494c4.887%2C0%2C8.686-3.666%2C8.686-8.693%20c0-3.261-1.494-5.977-4.748-8.016c-5.432-3.394-15.626-6.11-25.806-6.11c-19.969%2C0-32.733%2C11.269-32.733%2C28.25%20c0%2C16.304%2C10.32%2C25.13%2C29.2%2C27.713l4.888%2C0.677c11.004%2C1.494%2C14.258%2C4.888%2C14.258%2C10.32c0%2C6.389-5.292%2C10.872-15.068%2C10.872%20c-6.8%2C0-12.232-1.767-19.829-5.977c-1.634-0.956-3.673-1.634-5.851-1.634c-5.153%2C0-8.965%2C3.938-8.965%2C8.832%20c0%2C3.254%2C1.634%2C6.382%2C4.762%2C8.42c6.117%2C3.799%2C16.032%2C7.876%2C29.06%2C7.876c24.047%2C0%2C36.266-12.358%2C36.266-29.067%20C367.758%2C300.865%2C357.843%2C292.311%2C338.697%2C289.595z%22%20style%3D%22fill%3A%20rgb(255%2C%20255%2C%20255)%3B%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E
// @updateURL    https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Wrap-style_Switcher/cec.user.js
// @downloadURL  https://github.com/AnonUsr-Dev/UserScripts/raw/main/NijiWiki/Wrap-style_Switcher/cec.user.js
// ==/UserScript==

void(((d,l,s,t)=>{
	// デバッグモード(切り替え用コンボボックスの可視状態等): true: 表示: false: 非表示
	const DEBUG = false;
    // デフォルトのテーマ番号
	const DEFAULD_THEME_NO = 37;

	if (!(s=l.pathname.split("/"))) return;
	if (s.length<2) return;
	if (s[2]||!l.search) return;
	const ts = [
		/*00*/"3024-day.css",
		/*01*/"3024-night.css",
		/*02*/"abbott.css",
		/*03*/"abcdef.css",
		/*04*/"ambiance-mobile.css",
		/*05*/"ambiance.css",
		/*06*/"ayu-dark.css",
		/*07*/"ayu-mirage.css",
		/*08*/"base16-dark.css",
		/*09*/"base16-light.css",
		/*10*/"bespin.css",
		/*11*/"blackboard.css",
		/*12*/"cobalt.css",
		/*13*/"colorforth.css",
		/*14*/"darcula.css",
		/*15*/"dracula.css",
		/*16*/"duotone-dark.css",
		/*17*/"duotone-light.css",
		/*18*/"eclipse.css",
		/*19*/"elegant.css",
		/*20*/"erlang-dark.css",
		/*21*/"gruvbox-dark.css",
		/*22*/"hopscotch.css",
		/*23*/"icecoder.css",
		/*24*/"idea.css",
		/*25*/"isotope.css",
		/*26*/"juejin.css",
		/*27*/"lesser-dark.css",
		/*28*/"liquibyte.css",
		/*29*/"lucario.css",
		/*30*/"material-darker.css",
		/*31*/"material-ocean.css",
		/*32*/"material-palenight.css",
		/*33*/"material.css",
		/*34*/"mbo.css",
		/*35*/"mdn-like.css",
		/*36*/"midnight.css",
		/*37*/"monokai.css",
		/*38*/"moxer.css",
		/*39*/"neat.css",
		/*40*/"neo.css",
		/*41*/"night.css",
		/*42*/"nord.css",
		/*43*/"oceanic-next.css",
		/*44*/"panda-syntax.css",
		/*45*/"paraiso-dark.css",
		/*46*/"paraiso-light.css",
		/*47*/"pastel-on-dark.css",
		/*48*/"railscasts.css",
		/*49*/"rubyblue.css",
		/*50*/"seti.css",
		/*51*/"shadowfox.css",
		/*52*/"solarized.css",
		/*53*/"ssms.css",
		/*54*/"the-matrix.css",
		/*55*/"tomorrow-night-bright.css",
		/*56*/"tomorrow-night-eighties.css",
		/*57*/"ttcn.css",
		/*58*/"twilight.css",
		/*59*/"vibrant-ink.css",
		/*60*/"xq-dark.css",
		/*61*/"xq-light.css",
		/*62*/"yeti.css",
		/*63*/"yonce.css",
		/*64*/"zenburn.css"
	];
    const log = console.log;
	const CSS_ROOT = "https://anonusr-dev.github.io/UserScripts/Custom_Editor_CSS/theme/";
	t = ts[DEFAULD_THEME_NO];
	d.querySelector("head").innerHTML += `<link rel="stylesheet" id="anonusrdev_customwikisyntax_css" href="${CSS_ROOT+t}" type="text/css">`;
	d.querySelector("head").innerHTML += `<style id="anonusrdev_customwikisyntax_css_plugin" type="text/css"></style>`;
	const fUpdatePluginColor = (t) => {
		const tds = [..."10001000010000000111000010100000000100011000001000001100010001100"];
		const pc = ["hsl(320deg 100% 75%)", "hsl(320deg 100% 25%)"][parseInt(tds[ts.indexOf(t)])];
		d.querySelector("#anonusrdev_customwikisyntax_css_plugin").innerHTML = `.cm-s-wiki-syntax span.cm-plugin{color:${pc};}`
	}
	fUpdatePluginColor(t);
	if (DEBUG == false) return;
	const fLoad = () => {
		const p = d.querySelector("div#title");//d.querySelector("div#content>div.wiki-editor>div.checked-form>form>div.edit_form>p");
		if (DEBUG) log("CEC4wiki2: get highlight bar element");
		if (!p) return;
		if (DEBUG) log("CEC4wiki2: find highlight bar element");
		fTimeout();
		p.outerHTML += `<div class="toolbox toolbox-searchbar"><select id="anonusrdev_customwikisyntax_debug">${
			ts.map((x,j)=>{return(`<option value="${x}"${(x==t?" selected":"")}>${("0"+j).slice(-2)+" "+x}</option>`);}).join("\n")
		}</select></div>`;
		d.querySelector("#anonusrdev_customwikisyntax_debug").onchange = function() {
			d.querySelector("#anonusrdev_customwikisyntax_css").href = CSS_ROOT + this.value;
			fUpdatePluginColor(this.value);
		}
	}
	const fTimeout = () => {
		clearInterval(idLoad);
	}
	const idLoad = setInterval(fLoad, 100);
	setTimeout(fTimeout, 5000);
})(document,location));
