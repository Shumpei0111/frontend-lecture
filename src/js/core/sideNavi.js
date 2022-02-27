export default class SideNavi {
    constructor() {
        this.$sideNavi = document.getElementById( "sideNavi" );

        this._menu = [
            {
                name: "Cookieで作るメモアプリ",
                url: "./cookie-memo.html",
                pageType: "lecture",
                isTargetBlank: false,
                subMenu: [
                    {
                        name: "履修登録",
                        url: "./register.html"
                    },
                    {
                        name: "Readme",
                        url: ""
                    },
                ],
            },
            {
                name: "GitHub",
                url: "https://github.com/Shumpei0111/frontend-lecture",
                pageType: "global",
                isTargetBlank: true,
            }
        ];

        this.userData = {
            name: null,
            icon: null
        };
    }

    setUserData( data ) {
        const { name, icon } = data;
        this.name = name ? name : "";
        this.icon = icon ? icon : "";

        this.createUserIcon();
    }

    createUserIcon() {
        // 登録ユーザを表示するDOMを作成
        const wrapper = document.createElement( "div" );
        wrapper.id = "userAvatar";

        // ユーザ名,アイコンのDOM作成
        const nameSpan = document.createElement( "span" );
        const nameTextNode = document.createTextNode( `${this.name}さん` );
        nameSpan.appendChild( nameTextNode );

        const iconSpan = document.createElement( "span" );
        const userIcon = ( () => {
            if( this.icon === "dog" ) return "🐶";
            if( this.icon === "monkey" ) return "🐵";
            if( this.icon === "bird" ) return "🐓";
            if( this.icon === "peach" ) return "🍑";
        } )();
        const iconTextNode = document.createTextNode( userIcon );
        iconSpan.appendChild( iconTextNode );

        const editTag = document.createElement( "span" );
        editTag.id = "editUserData";
        editTag.classList.add( "edit-userAvatar" );
        const editTextNode = document.createTextNode( "[編集]" );
        editTag.appendChild( editTextNode );

        const appendItems = [ iconSpan, nameSpan, editTag ];
        appendItems.map( item => {
            wrapper.appendChild( item );
        } );

        this.$sideNavi.appendChild( wrapper );


        // ユーザ情報編集画面遷移前の処理
        const $editUserData = document.getElementById( "editUserData" );
        $editUserData.addEventListener( "click", () => {
            Cookies.remove( "userData" );
            location.href = "/register.html";
        }, false );
    }

    createMenu() {
        const menuWrapper = document.createElement( "div" );
        menuWrapper.id = "sideMenuWrapper";

        const listContainer = document.createElement( "ul" );


        // サイドメニューに挿入するコンテンツを呼び出してDOMに突っ込む
        this._menu.forEach( item => {
            const liTag = document.createElement( "li" );
            const box = document.createElement( "div" );

            const aTag = document.createElement( "a" );
            const listName = document.createTextNode( item.name );

            aTag.appendChild( listName );
            aTag.href = item.url;

            if( item.isTargetBlank ) {
                aTag.setAttribute( "target", "_blank" );
                aTag.setAttribute( "rel", "noopener noreferrer" );
            }

            box.appendChild( aTag );
            liTag.appendChild( box );
            listContainer.appendChild( liTag );

        } );


        // サイドメニュー挿入
        menuWrapper.appendChild( listContainer );
        this.$sideNavi.appendChild( menuWrapper );
    }
}