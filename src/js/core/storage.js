export default class Storage {
    constructor() {
        this.baseOption = {
            expires: 365
        };

        this.userData = {
            name: null,
            icon: null
        };
    }

    getUserData() {
        const data = Cookies.get( "userData" );
        const parseData = JSON.parse( data );

        if( parseData && parseData.name || parseData && parseData.icon ) {
            this.userData.name = parseData.name;
            this.userData.icon = parseData.icon;
        }

        return parseData;
    }

    registerUserData() {
        const $form = document.getElementById( "registerForm" );

        if( !$form ) { return; }
        
        const userData = {
            name: null,
            icon: null,
        };

        userData.name = document.getElementById( "registUserName" ).value;
        userData.icon = $form.icon.value;
        Cookies.set( "userData", JSON.stringify( userData ), this.baseOption );
    }
}