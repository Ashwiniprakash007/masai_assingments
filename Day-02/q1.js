
function outer(){
    let message="Hello World";
    function inner(){
        console.log(message)
    }
    return inner
}
let clouser = outer();
clouser()