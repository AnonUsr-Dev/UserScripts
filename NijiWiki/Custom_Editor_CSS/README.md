## はじめに
目が疲れるのとmonokaiが使いたくてスクリプト書きました  
wikiwiki.jpの編集で使用されているコードハイライトのテーマを変更します  
ダークテーマ多め 全65種  

## スクリーンショット
#### 適応例
<span>
<img src="https://user-images.githubusercontent.com/84770944/147560952-8a9f05d9-2824-4b2c-a119-ba45209907aa.png" style="width:49%;"> <img src="https://user-images.githubusercontent.com/84770944/147560945-47f67f3b-41a6-444c-9200-4b817bf88a03.png" style="width:49%;">
</span>
<span>
<img src="https://user-images.githubusercontent.com/84770944/147560915-25bc2e14-d2f6-4213-9a1f-913fc94bdcbe.png" style="width:49%;"> <img src="https://user-images.githubusercontent.com/84770944/147560896-9f756c92-2e44-4985-b0de-acc7ed7ec42f.png" style="width:49%;">
</span>

## インストール
1. ブラウザに合ったUserScriptを実行できる拡張機能を [Tampermonkey](https://www.tampermonkey.net/) 等からインストールする  
(Tampermonkey以外でも動くはずですが動作テストしてません)
2. [UserScript](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Custom_Editor_CSS/cec.user.js#raw-url) の [Raw] からインストール  
3. インストールする  
4. エディタページで自動実行されます  

大体[Wrap-style Switcher](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Wrap-style_Switcher/README.md#%E4%BD%BF%E3%81%84%E6%96%B9)の手順と同じなので分からなかったら参考にしてください

## プレビューとスタイルの変更  
![image](https://user-images.githubusercontent.com/84770944/147382296-848ee3d8-1fc8-4b0c-9b28-ce94ac065dab.png)  
### プレビュー  
- `DEBUG`を`true`にして保存することでテーマ切り替えのコンボボックスが表示されます  
  - `DEBUG`のまま使用するのはコンボボックスが邪魔なのであまりおすすめしません
- または [CodeMirror: Theme Demo](https://codemirror.net/demo/theme.html)  
### スタイルの変更  
- `DEFAULD_THEME_NO`の数値を変更して保存します  
- コンボボックスの表示名の頭の数値か配列中のコメントアウトの数値を使ってください  

## 動作テスト環境
- Chrome 最新版 (Official Build) (64 ビット)  
- Firefox 最新版 (64 ビット)  
- Microsoft Edge 最新版 (公式ビルド) (64 ビット)  
- Kinza 最新版 (64 ビット) // 制作環境  
- Tampermonkey v4.13  

## 更新履歴
- 2021/12/28 `3` update
  - DEBUGモード中にフォーム内要素がおかしくなるのを修正
  - version`2`の変更点を適応例の画像に反映
----
- 2021/12/25 `2` update
  - DEBUGモードを追加しました。DEBUGモード中のみテーマの切り替えが出来るようになります
  - プラグインだけ.cm-pluginで拡張定義してあるみたいなのでダークテーマ用の同系色を適応するようにしました
- 2021/12/24 `1` new
  - 初版公開
  - 自動アップデートに対応しました (要らない場合は`@updateURL`行を削除して保存してください)
