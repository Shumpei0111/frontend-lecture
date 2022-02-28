import SideNavi from './core/sideNavi.js';
import Storage from './core/storage.js';
import { checkRegistered } from './userRegister.js';

( () => {
    // 履修登録確認
    const showRegisterLink = ( userData ) => {
        const $yet = document.getElementById( "yetRegist" );
        const $registed = document.getElementById( "registed" );

        if( !userData.name && !userData.icon ) {
            $yet.removeAttribute( "style", "display:none" );
            $registed.setAttribute( "style", "display:none" );
        }

        if( userData.name || userData.icon ) {
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
        if( _userData && _userData.name || _userData && _userData.icon ) {
            _sideNavi.setUserData( _userData );
        }

        if( location.pathname === "/index.html" || location.pathname === "/" ) {
            showRegisterLink( _userData );
        }

        if( location.pathname === "/register.html" ) {
            checkRegistered( _userData );
        }

    };

    window.addEventListener( "load", init, false );
} )();