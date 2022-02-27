import Storage from "./core/storage.js";

export const checkRegistered = ( userData ) => {
    if( userData ) location.href = "/index.html";
}

( () => {
    const $registerBtn = document.getElementById( "userDataRegisterButton" );
    if( !$registerBtn ) return;

    $registerBtn.addEventListener( "click", (e) => {
        e.preventDefault();
        const _storage = new Storage();
        _storage.registerUserData();
        location.href = "/index.html";
    }, false );
} )();