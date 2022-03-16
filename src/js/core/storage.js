export default class Storage {
    /**
     * constructor
     * 
     * new Storage()を呼び出した際に必ず実行される関数。
     * const storage = new Storage();
     */
    constructor() {
        this.baseOption = {
            path: "/",      // Cookieが
            expires: 1    // Cookieの有効期限 expires属性もmax-age属性も指定されていないCookieは、ブラウザを終了したら削除される。
        };

        this.userData = {
            name: null,
            icon: null
        };
    }

    /**
     * ブラウザのCookieに保存されている userData をキーとした値を返却します。
     * 存在しない場合でもオブジェクト形式で返却します。
     * @returns {Object}
     */
    getUserData() {
        const data = Cookies.get( "userData" );
        const parseData = data ? JSON.parse( data ) : { name: "", icon: "" };

        if( parseData && parseData.name || parseData && parseData.icon ) {
            this.userData.name = parseData.name;
            this.userData.icon = parseData.icon;
        }

        return parseData;
    }

    /**
     * 履修登録用関数。
     * 履修登録用のフォームが画面内に存在する場合のみ実行されます。
     * キー userData に保存します。
     */
    registerUserData() {
        const $form = document.getElementById( "registerForm" );

        if( !$form ) { return; }

        this.userData.name = document.getElementById( "registUserName" ).value;
        this.userData.icon = $form.icon.value;
        Cookies.set( "userData", JSON.stringify( this.userData ), this.baseOption );
    }
}