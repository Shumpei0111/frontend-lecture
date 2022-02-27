import SideNavi from './core/sideNavi.js';
import Storage from './core/storage.js';
import { checkRegistered } from './userRegister.js';

( () => {
    // 履修登録確認
    const showRegisterLink = ( userData ) => {
        const $yet = document.getElementById( "yetRegist" );
        const $registed = document.getElementById( "registed" );

        if( !userData ) {
            $yet.removeAttribute( "style", "display:none" );
            $registed.setAttribute( "style", "display:none" );
        }

        if( userData ) {
            $yet.setAttribute( "style", "display:none" );
            $registed.removeAttribute( "style", "display:none" );
        }
    };


    ///////////////////////////////////////
    //
    // 画面読み込み完了後に実行
    //
    const init = () => {
        const _storage = new Storage();
        const _userData = _storage.getUserData();

        const _sideNavi = new SideNavi();
        _sideNavi.createMenu();
        _sideNavi.setUserData( _userData );

        if( location.pathname === "/index.html" ) {
            showRegisterLink( _userData );
        }

        if( location.pathname === "/register.html" ) {
            checkRegistered( _userData );
        }

    };

    window.addEventListener( "load", init, false );
} )();