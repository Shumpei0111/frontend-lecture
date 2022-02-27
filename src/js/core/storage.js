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
        const parseData = data ? JSON.parse( data ) : { name: "", icon: "" };

        if( parseData && parseData.name || parseData && parseData.icon ) {
            this.userData.name = parseData.name;
            this.userData.icon = parseData.icon;
        }

        return parseData;
    }

    registerUserData() {
        const $form = document.getElementById( "registerForm" );

        if( !$form ) { return; }

        this.userData.name = document.getElementById( "registUserName" ).value;
        this.userData.icon = $form.icon.value;
        Cookies.set( "userData", JSON.stringify( this.userData ), this.baseOption );
    }
}