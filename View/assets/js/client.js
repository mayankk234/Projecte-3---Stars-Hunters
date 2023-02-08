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
    var xprevi = 0;
    var yprevi = 0;

    
    
    connexio.onopen = function () {
        console.log("Connexió establerta");
        connexio.send("jugador");
    };
    connexio.onmessage = function (missatge) {
        if (missatge.data <= 6) {
            nau = new Nau(missatge.data);
            nausjugadors[nau.njugador - 1] = nau;
            mourenau = setInterval(function () {
                if (nau.moure()) {
                    connexio.send(JSON.stringify(nau));
                }         
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
    //Prier comprovem que una nau no s'hagi eliminat
    for (let i = 0; i < 6; ++i) {
        if (cercaNauSVG(i + 1)) {
            if (nausjugadors[i] == undefined) {
                $("#nau" + (i + 1)).remove();
                continue;
            }
        }
    }
    for (let i = 0; i < nausjugadors.length; i++) {
        if (nausjugadors[i] != null) {
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

}

function cercaNauSVG(njugador){
    return document.getElementById("nau" + njugador) ? true : false;
}
