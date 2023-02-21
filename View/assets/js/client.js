/****************************************/
//CLIENTS FUNCIONS
/****************************************/
import { Nau, afegirNau, moureNau } from './nau.js';
import { moureEstrella, afegirEstrella } from '../../../Controller/estrella.js';
var nausjugadors = new Array();

var estrelles;

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
            console.log("Jugador " + missatge.data);
            connexio.send(JSON.stringify(nau));
        //Si el missatge es un objecte, es tracta d'una nau
        } else if (missatge.data == "start"){
            alert("El joc ha començat");
            mourenau = setInterval(function () {
                if (nau.moure()) {
                    connexio.send(JSON.stringify(nau));
                    colisioNauEstrella(nau);
                }         
            }, 1000 / 60);
        } else if (missatge.data == "no"){
            console.log("S'esta a a espera a que el servidor comenci el joc");
        } else if (typeof missatge == "object") {
            let objecte = JSON.parse(missatge.data);
            if (objecte[0].njugador == undefined) {
                estrelles = objecte;
                actualitzarposicionsEstrelles(estrelles);
            } else {
                let naujugador = objecte;
                for(let i = 0; i < naujugador.length; i++){
                    nausjugadors[i] = naujugador[i];
                }
                actualitzarposicionsNaus();
            }
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

function actualitzarposicionsNaus(){
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

function actualitzarposicionsEstrelles(estrelles){
    for (let i = 0; i < document.getElementById("joc").children.length; i++) {
        if (document.getElementById("joc").children[i].id.includes("estrella")) {
            let estrellaSVG = document.getElementById("joc").children[i];
            if (estrelles.find(estrella => estrella.id == estrellaSVG.id) == undefined) {
                estrellaSVG.remove();
            }
        }
    }
    for (let i = 0; i < estrelles.length; i++) {
        if (!moureEstrella(estrelles[i].x, estrelles[i].y,estrelles[i].id)) {
            afegirEstrella(estrelles[i].x, estrelles[i].y, estrelles[i].id);
        }
    }
}

function colisioNauEstrella(nau){
    for (let estrella of estrelles) {
        if (nau.x + 40 >= estrella.x && nau.x <= estrella.x + 40 && nau.y + 40 >= estrella.y && nau.y <= estrella.y + 40) {
            return estrella.id;
        }
    }
    return undefined;
}