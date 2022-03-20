// ページトップ矢印イベント追加
( function() {
    const $arrow = document.getElementById( "toPageTopArrow" );

    $arrow.addEventListener( "click", function(e){
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, false );
} )();