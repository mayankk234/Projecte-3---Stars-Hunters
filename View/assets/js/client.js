/****************************************/
//CLIENTS FUNCIONS
/****************************************/
import { Nau } from './nau.js';







/****************************************/
//INIT
/****************************************/
function init(){
    let nau = new Nau(1);
    let mourenau = setInterval(function () {
        nau.moure();

    }, 1000 / 60);
}
$(document).ready(function() {
    init();
});
