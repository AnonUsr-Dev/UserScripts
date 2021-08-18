## はじめに
編集フォームの折返しが使いにくいと思ったのでスクリプト書きました  
  
**※ 0.2以前のバージョンは現行版と競合する可能性があるのでダッシュボードから手動で削除してください**  
  
0.3以降は同一スクリプトとして認識されると思うのでUpdateの確認だけで大丈夫です  

## 動作
#### 折り返しなし
![image](https://user-images.githubusercontent.com/84770944/126604148-9d896ec2-8a93-4528-9142-f2f327eaad4d.png)
#### 折り返しあり
![image](https://user-images.githubusercontent.com/84770944/126604164-3888d213-0724-471d-84be-794a8cf88c01.png)

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

初期状態を変えたい場合はTampermonkeyのダッシュボードから Wrap-style Switcher for NijiWiki を選び  
ソースの `DEFAULT_EDITOR` と `DEFAULT_WRAP_STYLE` の値を変えて保存してください  
既定値は次の画像のように設定されています  
![image](https://user-images.githubusercontent.com/84770944/126611020-8dd843e4-3df8-4d9f-bd80-36c22b1ffebb.png)

## 動作テスト環境
- Chrome 91.0.4472.124 (Official Build) (64 ビット)  
- Firefox 89.0.2 (64 ビット)  
- Microsoft Edge 91.0.864.64 (公式ビルド) (64 ビット)  
- Kinza 6.9.0 (64 ビット) // 制作環境  
- Tampermonkey v4.13  

## 更新履歴
- 2021/07/06 `0.1` new
  - gistに初版公開  
- 2021/07/07 `0.2` update  
  - UserScript 追加  
  - テスト環境 追加 (FireFox, Microsoft Edge)  
- 2021/07/08  
  - ドキュメントの整理  
- 2021/07/21 `0.3` update  
  - 新エディタ対応  
  - githubに移行  
  - Bookmarklet版とDevTools版を削除  
- 2021/07/21 `0.4` update  
  - 自動アップデートに対応 (要らない場合は`@updateURL`行を削除して保存してください)  
- 2021/08/11 `0.5` update  
  - `#areaedit`のフォームで動作しないと報告頂いたためareaedit pluginの編集フォームに対応しました  
  - 初期化関数が何らかの原因により要素を見つけられない場合に無限ループするので一応タイムアウトつけました  
  - iconの追加  
- 2021/08/17 `0.6` update  
  - `新エディタ(β版 ver 0.1.2)`に対応しました  
  - ([@WIKIWIKI_Japan](https://twitter.com/WIKIWIKI_Japan/status/1427618449887350786) とのことです)  
- 2021/08/18 `0.7` update  
  - 稀に折返しの初期化がうまく行かない現象の応急処置を調整しました  
- 2021/08/18 `0.8` update  
  - エディタ切替のリンクがチェックボックスになったので対応しました  
  - 初期状態が変わったので判定文周り調整しました  
