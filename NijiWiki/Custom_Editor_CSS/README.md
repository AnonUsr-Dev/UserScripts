## はじめに
wikiwiki.jpの編集で使用されているコードハイライトのテーマを変更します。

## スクリーンショット
#### 適応例
###### monokai
![image](https://user-images.githubusercontent.com/84770944/147329573-c102433d-6bf2-4170-a828-ed3cca036f7c.png)
###### darcula
![image](https://user-images.githubusercontent.com/84770944/147329579-e63ce86c-7d32-4fac-a1a8-76715180db8e.png)

全65種  

## インストール
1. ブラウザに合ったUserScriptを実行できる拡張機能を [Tampermonkey](https://www.tampermonkey.net/) 等からインストールする  
(Tampermonkey以外でも動くはずですが動作テストしてません)
2. [UserScript](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Custom_Editor_CSS/cec.user.js#raw-url) の [Raw] からインストール  
3. インストールする  
4. エディタページで自動実行されます  

大体[Wrap-style Switcher](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Wrap-style_Switcher/README.md#%E4%BD%BF%E3%81%84%E6%96%B9)の手順と同じなので分からなかったら参考にしてください

## スタイルの変更  
配列の添字を変更して保存します。  
プレビュー: [CodeMirror: Theme Demo](https://codemirror.net/demo/theme.html)  

## 動作テスト環境
- Chrome 最新版 (Official Build) (64 ビット)  
- Firefox 最新版 (64 ビット)  
- Microsoft Edge 最新版 (公式ビルド) (64 ビット)  
- Kinza 最新版 (64 ビット) // 制作環境  
- Tampermonkey v4.13  

## 更新履歴
- 2021/12/24 `1` new
  - 初版公開  
  - 自動アップデートに対応しました (要らない場合は`@updateURL`行を削除して保存してください)  
----
