const mdParser = async ( id ) => {
    const $target = document.getElementById( id );
    const src = $target.getAttribute( "src" );

    marked.setOptions({
        highlight: code => {
            return hljs.highlightAuto(code).value;
        }
    });

    fetch( src )
        .then( res => {
            return res.text();
        })
        .then( md => {
            $target.innerHTML = marked.parse( md );
        } )
};

export default mdParser;