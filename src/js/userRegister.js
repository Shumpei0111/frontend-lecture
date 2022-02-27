import Storage from "./core/storage.js";

export const checkRegistered = ( userData ) => {
    if( userData && userData.name || userData && userData.icon ) location.href = "/index.html";
}

( () => {
    const $registerBtn = document.getElementById( "userDataRegisterButton" );
    if( !$registerBtn ) return;

    $registerBtn.addEventListener( "click", (e) => {
        e.preventDefault();

        const $name = document.getElementById( "registUserName" ).value;
        if( $name === "" ) {
            alert( "名前を入力してください" );
            return;
        }

        const _storage = new Storage();
        _storage.registerUserData();
        location.href = "/index.html";
    }, false );
} )();