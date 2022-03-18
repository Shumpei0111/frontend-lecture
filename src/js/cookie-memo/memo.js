/**
 * memo.js
 * 
 * メモアプリ 実行用のJS
 * 
 * [備考]
 * 現代のJSはWebpackなどのバンドル・ビルドツールを使用することが多く、
 * その場合は1つ・ないし数個のJSファイルに統合されることがほとんどです。
 * 
 * 今回は使用しないため、ファイルをモジュール化したような書き方をします。
 * 
 */

import mdParser from "../core/md-parser.js";

// モジュール
// 即時実行関数で全体をラップすると、グローバル(window)オブジェクトに展開されなくなります。
( () => {
    console.log("load");
    window.addEventListener( "load", () => {
        mdParser( "textContent" )
    }, false );
} )();