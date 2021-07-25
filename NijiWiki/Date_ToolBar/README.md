## はじめに
スケジュールの連続登録を補助する日付ツールバーを追加します

## スクリーンショット
#### 適応前
![image](https://user-images.githubusercontent.com/84770944/126856309-c3e62bdf-c179-45be-bb04-e6683a01314d.png)
#### 適応後
![image](https://user-images.githubusercontent.com/84770944/126856314-276063a1-f123-4f85-9b1c-1a16fbebc8d3.png)

## 各機能説明
![image](https://user-images.githubusercontent.com/84770944/126856501-fd710de1-91f7-43a4-bfac-bc85f2431f68.png)
1. URL の SearchParameter `refpage` に設定されているページヘのリンクです (連続で移動すると戻るのがめんどくさくなる為)  
2. 日付を選択して [GO] で指定日にジャンプします  
3. 押された時点の日付にジャンプします  
押された日が 2021/07/25 なら `配信予定/2021-07-25 の編集` に移動  
4. 現在編集中のページからスピナーボックスに入力された日数分移動します  
画像の場合だと 1日前: `配信予定/2021-07-23 の編集`、1日後: `配信予定/2021-07-25  の編集` に移動  

## インストール
1. ブラウザに合ったUserScriptを実行できる拡張機能を [Tampermonkey](https://www.tampermonkey.net/) 等からインストールする  
(Tampermonkey以外でも動くはずですが動作テストしてません)
2. [UserScript](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Date_ToolBar/dtb.user.js#raw-url) の [Raw] からインストール  
3. インストールする  
4. 配信予定のEditページで自動実行されます  

大体[Wrap-style Switcher](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Wrap-style_Switcher/README.md#%E4%BD%BF%E3%81%84%E6%96%B9)の手順と同じなので分からなかったら参考にしてください

## 動作テスト環境
- Chrome 91.0.4472.124 (Official Build) (64 ビット)  
- Firefox 89.0.2 (64 ビット)  
- Microsoft Edge 91.0.864.64 (公式ビルド) (64 ビット)  
- Kinza 6.9.0 (64 ビット) // 制作環境  
- Tampermonkey v4.13  

## 更新履歴
- 2021/07/24 `0.1` new
  - 初版公開  
  - 自動アップデートに対応 (要らない場合は`@updateURL`行を削除して保存してください)  