## Cookieを使ってユーザデータの読み書きをしよう

このテキストはメモアプリを題材に、Cookieを使用した実装方法を見ていきます。

### この講座のゴール

- Vue.jsのコンポーネント構成を知る
- JSでCookieを操作する方法を知る
- Cookieの設定方法を知る

### この講座で扱わないこと

- サードパーティCookieについて
- サーバサイドから付与されるCookieについて
- ファイル起動時のCookie管理について

### メモアプリ

<a href="https://lecture-cookie-memo.vercel.app/" target="_blank" rel="noopener noreferrer">
https://lecture-cookie-memo.vercel.app/</a>

(別ウィンドウで開きます)

`cooptech / frontend`

### 登場人物

- 🌍 **App** ... アプリケーション本体。Vue.jsで動作
- 📝 **Taskクラス** ... 新規タスクを生成する
- 🏭 **TaskContainerクラス** ... 生成したタスクの管理、ユーザの履歴の保持・管理
- 🪣 **CookieManagerクラス** ... Cookie の操作

### アプリの動き - タスク

基本的にはタスクを登録する。それだけです。

登録されたタスクは、タスクリストに入ります。

また、タスクは「登録」「完了」または「復帰」という状態が存在します。

- **登録** ... タスクが登録された
- **完了** ... タスクのチェックボックスがチェックされた
- **復帰** ... チェックされた状態からチェックが外れた

履歴はタスクの状態が変わるたびにどんどん増えていきますが、

「履歴全消去」ボタンでまっさらにすることができます。

また、タスクリストにある「タスク全消去」で履歴もろとも全て削除されます。

### アプリの動き - Cookie

Cookie が使用可能なブラウザ かつ 「 Cookie を有効にする」 にチェックが入っていると、

Cookie を使用してタスクと履歴を保存することが可能です。

タスクを登録したり、履歴を消去したりしてリロードしてみてください。

Cookie が有効の場合は直前と同じ状態で画面が読み込まれます。

「タスク全消去」ボタンで Cookie に保存されているデータも空になります。

### アプリの動き - まとめ

以下の画像を参照してください。

- 起動時

1. Cookie が使用できるか`CookieManager`クラスが判定する
2. 使用できる場合、 Cookie を読み込み、結果をAppへ返却する
3. App は受け取った値を元に、`TaskContainer`クラスへ返却する
4. タスクリストと履歴が更新されるので、リアクティブにモデルが変更される

- 入力

1. ユーザから入力を受け付ける
2. App は`Task`クラスから task インスタンスを生成
3. task インスタンスは App から`TaskContainer`クラスに通知してタスクリストと履歴に追加させる
4. タスクリストと履歴が更新されると、 App はリアクティブにモデルを変更する
5. モデルが変更されたら`CookieManager`クラスは Cookie の値を変更結果に上書きする


### Cookie の読み込みについて

基本は `key=value;` の形式で複数のプロパティを繋げていく。

**■やってみよう**

開発者ツールを開き、コンソールに下記コードを貼り付けてみてください。

```js
document.cookie;
```
履修登録されている場合、`user`, `icon` を管理する、

エスケープ済みオブジェクト風文字列がコンソールに出力されているかと思います。

このページで保存されているCookieの値が表示されます。

冒頭の通り、Cookie は `key=value;` の形式で保存されます。

複数のペアが保存されている場合、 `;半角スペース`で区切られています。

特定の値が欲しい場合は、JSの配列を扱う関数や、正規表現などから取得・操作が可能です。

### Cookie の書き込みについて

以下の形式で追加することが可能です。

```js
document.cookie = "key=value";
```

**■やってみよう**

値を追加します。

```js
document.cookie = "today=sunnyDay";  // 値を追加する
document.cookie; // 読み込む
```
Cookie には `today=sunnyDay` が追加されました。

今度は、key は `today` のまま、値を変えてみましょう。

```js
document.cookie = "today=rainyDay";
document.cookie;
```

`today` の値は `rainyDay` になったかと思います。

JS が Cookie を書き込む場合、ブラウザを通して key 名を探し、

存在すればその値を更新します。

そして、**他のプロパティ、例えば「userData」などは影響を受けません。**

### Cookie の書き込み エスケープについて

ブラウザにとって特別な文字に解釈できる値、

例えば「<」「>」「=」「/」などは、 Cookie に保存する前に JS でエスケープする必要があります。

**■やってみよう**

FireFoxを立ち上げコンソールを開き、以下のコードの違いを確かめてみましょう。

```js
const key = "This_is_evil_script";
const value = "<script>alert(1);</script>";

// 👎
document.cookie = `${key}=${value}`;

// 👍
document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

```
執筆時(2022/03/18)現在、FireFoxであれば2つのコードを実行した際の結果が異なることがわかります。

### Cookie のオプションについて - はじめに

Cookie は保存する値のほか、いくつかのオプションが存在しています。

基本的にはそれらのオプションも設定して保存することが一般的です。

オプションは `key=value` の後に追加され、同様に `;半角スペース` で区切られます。

```js
document.cookie = "tokyo=danger; path=/; expires=Tue, 27 Mar 2022 03:14:07 GMT";
```

### Cookie のオプションについて - path

Cookie がアクセスできるパスを制限します。

`path=/hoge` で設定された場合、 `/hoge`や`/hoge/aaa`などでは取得可能ですが、

`/baz`では取得できません。

基本的には`path=/`と設定しておくのがいいでしょう。

### Cookie のオプションについて - domain

Cookie が取得可能なドメインを制限します。

通常は Cookie を設定したドメイン下でのみアクセスが可能です。

`mysite.com`で設定した Cookie は `sub.mysite.com`や `yoursite.com` では取得することができません。

`mysite.com`で設定した Cookie をサブドメインでも使用したい場合に設定することで取得可能です。

```js
// サブドメインでも使用可能にする
document.cookie = "okusuri=happy; domain=mysite.com";
```

### Cookie のオプションについて - expires

Cookie の期限を設定します。

期限を設定しないで保存する Cookie のことを **「セッションクッキー」** と呼びます。

セッションクッキーは、ブラウザを閉じると消去されるCookie のことです。

ブラウザを閉じても消去させたくない場合、 `expires`または`max-age`オプションを追加することでそれを可能にします。

```js
document.cookie = "isKakuteishinkoku=notFinishedYet; expires=Tue, 27 Mar 2022 03:14:07 GMT";
```

上記のように指定された場合、 `expires` に指定された期限になったらブラウザが自動で削除します。

また、`expires` は GMT タイムゾーンで指定する必要があります。

もう少し簡単な方法として、`max-age` があります。

### Cookie のオプションについて - max-age

Cookie の期限を設定するオプションとして、`max-age` があります。

`max-age` は「秒」で設定します。

```js
// 1分後に消去される Cookie
document.cookie = "geininType=ippatsu; max-age=60";
```


尚、Cookie に保存された値のみではなく、`key=value` ごとブラウザから消去されます。

### Cookie のオプションについて - secure

### Cookie のオプションについて - samesite

### Cookie のオプションについて - httpOnly（サーバサイド）

