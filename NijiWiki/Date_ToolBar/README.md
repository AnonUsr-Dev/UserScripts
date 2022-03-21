## はじめに
スケジュールの連続登録を補助する日付ツールバーを追加します

## スクリーンショット
<table>
<tr align="center">
<th>適<br>応<br>前</th>
<td><img src="https://user-images.githubusercontent.com/84770944/159233387-e5508400-c94d-4214-ac90-d1f972568975.png"></td>
</tr>
<tr align="center">
<th>適<br>応<br>後</th>
<td><img src="https://user-images.githubusercontent.com/84770944/159233410-a0cfecbb-c32f-4958-9975-1941d3ba9b9d.png"></td>
</tr>
</table>

## 各機能説明
![image](https://user-images.githubusercontent.com/84770944/159233026-40951838-69ff-48e5-9e28-686bd877bd05.png)  
1. 詳細表示のトグルボタン  
2. 生成されるリンクの種類  
View Page Mode: off=`配信予定/(日付) の編集`、on=`配信予定/(日付)` へのリンク (ダブルクリックで状態ホールド)  
World Page Mode: off=`配信予定/(日付) の編集`、on=`海外ライバー総合/配信予定/(日付) の編集` へのリンク  
3. 日付を選択 または ダブルクリック で指定日にジャンプします  
`[国内]、[国外]`は選択された日付に対応する`[国内]、[国外]`ページへのリンク  
4. リンクをクリックした時点の日付に基づく`[昨日]、[今日]、[明日]`ページへのリンク  
クリックした日が 2022/03/25 なら [昨日]は`2022-03-24`、[今日]は`2022-03-25`、[明日]は`2022-03-26` へのリンク  
5. 現在編集中のページの日付に基づくスピナーボックスに入力された日数分前後のページへのリンク  
画像の場合だと [1日前]は`2022-03-20`、[1日後]は`2022-03-22` へのリンク  
6. 分からなかったらマウスオーバーでリンク先が出るので読んでください  
7. 親ページのリンク (連続で移動すると戻るのがめんどくさくなる為)  

## インストール
1. ブラウザに合ったUserScriptを実行できる拡張機能を [Tampermonkey](https://www.tampermonkey.net/) 等からインストールする  
(Tampermonkey以外でも動くはずですが動作テストしてません)
2. [UserScript](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Date_ToolBar/dtb.user.js#raw-url) の [Raw] からインストール  
3. インストールする  
4. 配信予定のEditページで自動実行されます  

大体[Wrap-style Switcher](https://github.com/AnonUsr-Dev/UserScripts/blob/main/NijiWiki/Wrap-style_Switcher/README.md#%E4%BD%BF%E3%81%84%E6%96%B9)の手順と同じなので分からなかったら参考にしてください

## 動作テスト環境
- Chrome 最新版 (Official Build) (64 ビット)  
- Firefox 最新版 (64 ビット)  
- Microsoft Edge 最新版 (公式ビルド) (64 ビット)  
- Kinza 最新版 (64 ビット) // 制作環境  
- Tampermonkey v4.14  

## 更新履歴
- 2022/03/21 `1` update
  - 中クリック対応の為各ボタンをリンクに変更、それに伴うコードの整理  
  - 動作モード切り替えの追加  
  - 連続移動の際に位置を固定したかったのでツールバーの位置調整  
  - リンクに 国内、国外、昨日、明日 を追加  
  - 使用頻度の低い物の表示切り替え非表示  
  - 画像、ドキュメントの更新  
----
- 2021/08/29 `0.4` update
  - カレンダー選択後すぐににページ移動するようにしました
- 2021/08/25 `0.3` update
  - フォーム送信後のページにツールバーが表示されるようにしました (**直接編集ページに飛びます**)  
  - アイコンを追加しました  
  - 更新履歴を降順に変更しました  
- 2021/07/25 `0.2` update
  - Ref Pageの表記を変更しました (`Ref Page`→`参照元ページ`)
- 2021/07/24 `0.1` new
  - 初版公開  
  - 自動アップデートに対応しました (要らない場合は`@updateURL`行を削除して保存してください)  
