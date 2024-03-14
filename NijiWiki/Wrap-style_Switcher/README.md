## はじめに
編集フォームの折返しが使いにくいと思ったのでスクリプト書きました  
新エディタが折り返しに対応してからは初期状態の設定やフォーム周りの調整が主な機能です  

**※ 0.2以前のバージョンは現行版と競合する可能性があるのでダッシュボードから手動で削除してください**  
0.3以降は同一スクリプトとして認識されると思うのでUpdateの確認だけで大丈夫です  

## 動作
||折り返しなし|折り返しあり|
|---|---|---|
|新|![image](https://user-images.githubusercontent.com/84770944/149642914-df15e368-5f6a-4a7a-9682-62841e239c9c.png)|![image](https://user-images.githubusercontent.com/84770944/149642920-5c1dc57a-8575-42ee-9944-bd2eb1e5cf8f.png)|
|旧|![image](https://user-images.githubusercontent.com/84770944/149642922-cfb9fbfe-eee2-438c-a6a6-a65a661a0ef6.png)|![image](https://user-images.githubusercontent.com/84770944/149642924-58a6209b-a79d-4510-a6cf-d70ffd2782d0.png)|


## 使い方
1. ブラウザに合ったUserScriptを実行できる拡張機能を [Tampermonkey](https://www.tampermonkey.net/) 等からインストールする  
(Tampermonkey以外でも動くはずですが動作テストしてません)
2. 0.2以前のバージョンがインストールされている場合ダッシュボードからアンインストールする
![image](https://user-images.githubusercontent.com/84770944/126610500-982ecfd7-b81f-4fa8-acea-6566a2c300f3.png)
3. [UserScript](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Wrap-style_Switcher/wss.user.js#raw-url) の [Raw] からインストール  
![image](https://user-images.githubusercontent.com/84770944/126606836-344aedad-f8a2-4134-80d6-22c11baf93f1.png)
4. インストールする  
![image](https://user-images.githubusercontent.com/84770944/126608337-f8cc994d-80f8-49cc-aea3-ff15e9ba46d8.png)
5. Editページで自動実行されます(折返しの切り替えは以下に追加されたボタンから)  
![image](https://user-images.githubusercontent.com/84770944/124894586-c2fa0680-e016-11eb-9dae-cb7851e9cd07.png)

## 初期状態
初期状態を変えたい場合はTampermonkeyのダッシュボードから Wrap-style Switcher for NijiWiki を選び  
ソースのの論理値を変えて保存してください  
既定値は次の画像のように設定されています  
  
![image](https://user-images.githubusercontent.com/84770944/148936378-589d6a5c-6965-49fa-bb31-43ca38005166.png)

## 動作テスト環境
- Chrome 最新版 (Official Build) (64 ビット)  
- Firefox 最新版 (64 ビット)  
- Microsoft Edge 最新版 (公式ビルド) (64 ビット)  
- Chrome Dev 最新版 (Official Build) (64 ビット) // 制作環境  
- Tampermonkey v4.18  
  - `v4.18`で読み込みがうまくいかない場合は`v4.18`特有のバグの可能性があるので[回避策](https://github.com/Tampermonkey/tampermonkey/issues/1617#issuecomment-1287637401)を試してみるか`v4.16.1`を使うかTampermonkey側のアップデートを待ってください  

## 更新履歴
- 2024/03/15 `8` update
  - `β版 ver 0.4.0` 仕様変更に対応
---
- 2023/04/11 `7` update
  - `β版 ver 0.3.0` 仕様変更に対応 
- 2022/09/10 `6` update
  - 脳筋コーディングしてた折り返し方法を最適化  
  - typoの修正  
- 2022/09/09 `5` update
  - styleが適応されない時があるので調整  
  - 待機関数まわりの調整  
- 2022/09/07 `4` update
  - やっぱり折り返しがうまくいかないので対応  
  - ごちゃごちゃしてた処理周りを一新しました  
  - バックグラウンドタブで読み込み中に負荷かかってる気がするので待機入れました  
  - version `2` のレイアウトの既定値設定が効かないバグの修正  
- 2022/08/30 `3` update  
  - wikiwikiの仕様変更に対応しました  
    - ~折り返しがうまくいかないバグがあるので試行錯誤中~
      - version `3` のコードで折り返すようになったので様子見  
- 2022/01/16  
  - ドキュメントの整理 (動作画像の更新 等)  
  - レイアウトの既定値設定が効かない既知のバグがあります (修正の優先度低)
- 2022/01/11 `2` update  
  - wikiwikiの仕様変更に対応しました  
  - 諸々の調整 (変数の整理、セレクタの整理 等)  
  - レイアウトの既定値設定を追加しました (デフォルト: 従来)  
- 2021/12/13 `1` update  
  - wikiwikiの仕様変更に応急処置しました  
  - "タイムスタンプを更新しない"の非表示設定を追加しました (デフォルト: 非表示)  
- 2021/08/26 `0.9` update  
  - 一部ページから移動した際`location.search`の順序が違う為に動作しない問題を修正しました  
- 2021/08/18 `0.8` update  
  - エディタ切替のリンクがチェックボックスになったので対応しました  
  - 初期状態が変わったので判定文周り調整しました  
  - 更新履歴を降順に変更しました  
- 2021/08/18 `0.7` update  
  - 稀に折返しの初期化がうまく行かない現象の応急処置を調整しました  
- 2021/08/17 `0.6` update  
  - `新エディタ(β版 ver 0.1.2)`に対応しました  
  - ([@WIKIWIKI_Japan](https://twitter.com/WIKIWIKI_Japan/status/1427618449887350786) とのことです)  
- 2021/08/11 `0.5` update  
  - `#areaedit`のフォームで動作しないと報告頂いたためareaedit pluginの編集フォームに対応しました  
  - 初期化関数が何らかの原因により要素を見つけられない場合に無限ループするので一応タイムアウトつけました  
  - iconの追加  
- 2021/07/21 `0.4` update  
  - 自動アップデートに対応 (要らない場合は`@updateURL`行を削除して保存してください)  
- 2021/07/21 `0.3` update  
  - 新エディタ対応  
  - githubに移行  
  - Bookmarklet版とDevTools版を削除  
- 2021/07/08  
  - ドキュメントの整理  
- 2021/07/07 `0.2` update  
  - UserScript 追加  
  - 非アクティブのバックグラウンドタブで`onload`イベントが発火しない事があるため、`addEventListener`でのイベント待機から要素が取れるまで`setInterval()`をループさせる実装に変更
  - テスト環境 追加 (FireFox, Microsoft Edge)  
- 2021/07/06 `0.1` new
  - gistに初版公開  
## 関連スクリプト
- [AnonUsr-Dev/UserScripts/NijiWiki](https://github.com/AnonUsr-Dev/UserScripts/tree/main/NijiWiki)

