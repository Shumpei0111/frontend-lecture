## Cookieを使ってユーザデータの読み書きをしよう

このテキストはメモアプリを題材に、Cookieを使用した実装方法を見ていきます。

## この講座のゴール

- Vue.jsのコンポーネント構成を知る
- JavaScriptでCookieを操作する方法を知る
- Cookieの設定方法を知る

## この講座で扱わないこと

- サードパーティCookieについて
- サーバサイドから付与されるCookieについて
- ファイル起動時のCookie管理について

## メモアプリ

+----------------------------------------------------------+

<a href="https://lecture-cookie-memo.vercel.app/" target="_blank" rel="noopener noreferrer">
https://lecture-cookie-memo.vercel.app/</a>

(別ウィンドウで開きます)

`cooptech / frontend`

+----------------------------------------------------------+

### 登場人物

- 🌍 **App** ... アプリケーション本体。Vue.jsで動作
- 📝 **Taskクラス** ... 新規タスクを生成する
- 🏭 **TaskContainerクラス** ... 生成したタスクの管理、ユーザの履歴の保持・管理
- 🍪 **CookieManagerクラス** ... Cookie の操作

### アプリの動き - タスク

基本的にはタスクを登録する。それだけです。

登録されたタスクは、タスクリストに入ります。

また、タスクは「登録」「完了」または「復帰」という状態が存在します。

- **登録(add)** ... タスクが登録された
- **完了(finish)** ... タスクのチェックボックスがチェックされた
- **復帰(back)** ... チェックされた状態からチェックが外れた

状態が変わるごとに履歴が更新されます。

履歴は`TaskContainer`クラスが管理しています。

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

- 入力

<div style="background:white; padding:16px;">
    <img style="width:100%;" src="/src/content/img/cookie-memo-input.svg?6">
</div>

1. ユーザから入力を受け付ける
2. App は`Task`クラスから task インスタンスを生成
3. task インスタンスは App から`TaskContainer`クラスに通知してタスクリストと履歴に追加させる

追加する際、タスクリストと履歴にはそれぞれ別のオブジェクトを追加する。

- タスクリストには id と入力値、isFinish というプロパティのオブジェクトを追加する
- 履歴には id（タスクリストと同値）、ステータス（ `add` | `finish` | `back` ） を追加する

4. タスクリストと履歴が更新されると、 App はリアクティブにモデルを変更する
5. モデルが変更されたら `CookieManager` クラスは Cookie の値を変更結果に上書きする

- 起動時

<div style="background:white; padding:0 16px;">
    <img style="width:100%;" src="/src/content/img/cookie-memo-load.svg?4">
</div>

1. Cookie が使用できるか`CookieManager`クラスが判定する
2. 使用できる場合、 Cookie を読み込み、結果をAppへ返却する
3. App は受け取った値を元に、`TaskContainer`クラスへ返却する
4. タスクリストと履歴が更新されるので、リアクティブにモデルが変更される

- タスクの状態更新

1. チェックボックスにチェックを入れる（外す）
2. task 生成時に割り振られた id をタスクリスト、履歴の中から探す
3. タスクリストの中からヒットした id のタスクに設定されている `isFinish` を `true` か `false` に反転させる
4. 履歴の中からヒットした id のタスクに設定されているステータスを更新する

- 削除

1. 履歴のみ削除の場合は履歴に格納されているオブジェクトと Cookie の中から 履歴を管理する値を削除する
2. タスクを削除する場合はタスクリストに格納されているオブジェクトと、履歴に格納されているオブジェクト、 Cookie の値を削除する

## Cookie について

### Cookie を扱うためのライブラリ

基本的に自分で Cookie を扱うライブラリを使うより、

既にある有名なライブラリを使用する方がいいでしょう。

- [js-cookie(npm)](https://www.npmjs.com/package/js-cookie)

操作方法などは各自で調べてみてください。

以下に続く項目は、JavaScript で操作する際の基本的な知識です。

引用元の多くは、[JAVASCRIPT.INFO](https://ja.javascript.info/cookie)様を使用させていただきました。


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

特定の値が欲しい場合は、JavaScript の配列を扱う関数や、正規表現などから取得・操作が可能です。

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

JavaScript が Cookie を書き込む場合、ブラウザを通して key 名を探し、

存在すればその値を更新します。

そして、**他のプロパティ、例えば「userData」などは影響を受けません。**

### Cookie の書き込み エスケープについて

ブラウザにとって特別な文字に解釈できる値、

例えば「<」「>」「=」「/」などは、 Cookie に保存する前に JavaScript でエスケープする必要があります。

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

Cookie の期限を設定するオプションとしてもう一つ、`max-age` があります。

`max-age` は「秒」で設定します。

```js
// 1分後に消去される Cookie
document.cookie = "geininType=ippatsu; max-age=60";
```

即期限を切る場合、`0`または`マイナスの値`を設定します。

```js
// すぐに消去されるCookie
document.cookie = "geininType=ippatsu; max-age=0";
```

ユーザビリティや情報鮮度的に、保存されている値がそのまま残っていると都合が悪い時などに使えるかもしれません。

尚、消去される際は、Cookie に保存された値のみではなく、`key=value` ごとブラウザから消去されます。

### Cookie のオプションについて - secure

このオプションが設定されている場合、HTTPS 通信でのみ Cookie にアクセスすることが可能です。

```js
document.cookie = "pinMoney=1000000; secure";
```
secure 設定がない場合、HTTP 通信でも取得可能ですが、

原則、HTTPS 通信でのみアクセスできるようにしておく方がよいでしょう。

### Cookie のオプションについて - samesite

もう一つセキュリティ関連のオプションとして、 `samesite` があります。

`samesite` オプションに設定できる値はいくつかありますが、`lax`を設定することが一般的です。

```js
document.cookie = "pinMoney=10000000000; accountNumber=1812; samesite=lax";
```

そのほか設定できる値として、

- `samesite=strict`
- `samesite` (値なし)

があります。

`samesite` オプションは、 XSRF | CSRF (クロスサイト・リクエスト・フォージェリ) 攻撃から守るためのオプションです。

**■XSRF(CSRF)**

悪意のあるサイトにアクセスしてしまった場合、アクセスしたユーザのブラウザを経由して、

攻撃対象のサイト・サービスに向けてユーザの意図しない書き込みや、

銀行口座に入った自分のお金が攻撃者へ送金されるような攻撃を仕掛けることが可能です。

<div style="margin: 40px 0;">

<img src="/src/content/img/cookie-memo-csrf.png" width="600" style="display:block;margin-bottom:12px;">

引用：[ウェブセキュリティの常識（徳丸浩 | EGセキュア ソリューションズ）](https://www.slideshare.net/ockeghem/kobe-minicamp2017)

</div>

その際、Cookie に `samesite` オプションを設定していると、その Cookie の情報は外部サイトへ送信されません。

ただ、`samesite=strict`、または値なしの`samesite`の場合、AJAX でも送信されないので、少々不都合があります。

そこで、`samesite=lax`を使用します。

lax モードの Cookie は、以下の条件を満たしている場合は送信が可能です。

1. HTTP メソッドが `GET` | 安全 である（`POST` ではない）

2. `iframe` から送信されるものではない

大抵のWeb サイトであれば条件を満たしていることが多いと思うので、一般的に利用されるモードになります。

### Cookie のオプションについて - httpOnly（サーバサイド）

サーバサイドプログラムからクライアントサイド（ブラウザ）へ Cookie を送信（set-cookie） する際、

`httpOnly` オプションを設定することができます。

このオプションが設定された Cookie は、 JavaScript からアクセスすることができません。

このオプションが使用できる場合、セキュリティはより強固なものになるでしょう。
