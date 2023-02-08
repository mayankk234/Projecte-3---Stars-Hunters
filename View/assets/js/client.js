/****************************************/
//CLIENTS FUNCIONS
/****************************************/
import { Nau, afegirNau, moureNau } from './nau.js';
var nausjugadors = new Array();

var nau;

/****************************************/
//INIT
/****************************************/
function init(){
    
    var domini;
    if (window.location.protocol == "file:") domini = "localhost";
    else domini = window.location.hostname;
    var url = "ws://" + domini + ":8180";
    let connexio = new WebSocket(url);

    
    
    connexio.onopen = function () {
        console.log("Connexió establerta");
        connexio.send("jugador");
    };
    connexio.onmessage = function (missatge) {
        if (missatge.data <= 6) {
            nau = new Nau(missatge.data);
            nausjugadors[nau.njugador - 1] = nau;
            mourenau = setInterval(function () {
                nau.moure();
                connexio.send(JSON.stringify(nau));
        
            }, 1000 / 60);
            console.log("Jugador " + missatge.data);
            connexio.send(JSON.stringify(nau));
        //Si el missatge es un objecte, es tracta d'una nau
        } else if (typeof missatge == "object") {
            let naujugador = JSON.parse(missatge.data);
            for(let i = 0; i < naujugador.length; i++){
                nausjugadors[i] = naujugador[i];
            }
            actualitzarposicions();
        }
        
    };
    connexio.onclose = function () {
        console.log("Connexió tancada");
    };
    connexio.onerror = function () {
        console.log("Error de connexió");
    };

    let mourenau;
    
}
$(document).ready(function() {
    init();
});

function actualitzarposicions(){
    for (let i = 0; i < nausjugadors.length; i++) {
        if (nausjugadors[i].njugador != nau.njugador) {
            if (nausjugadors[i].x == -1) {
                nausjugadors.splice(i, 1);
                continue;
            }
            if (!moureNau(nausjugadors[i].x, nausjugadors[i].y, nausjugadors[i].njugador, nausjugadors[i].rotacio)){
                afegirNau(nausjugadors[i].x, nausjugadors[i].y, nausjugadors[i].njugador, nausjugadors[i].rotacio);
            }
        }
    }
}
