window.onload = init;
import { afegirNau, moureNau } from './nau.js';

var nau;


function init() {
    var domini;
    if (window.location.protocol == "file:") domini = "localhost";
    else domini = window.location.hostname;
    var url = "ws://" + domini + ":8180";
    let connexio = new WebSocket(url);
    var xprevi = 0;
    var yprevi = 0;
    $('#start').on('click', function (event) {
        event.preventDefault();
        connexio.send("start");
    });

    connexio.onopen = function () {
        console.log("Connexió establerta");
        connexio.send("servidor");
    }

    connexio.onmessage = function (missatge) {
        if (typeof missatge == "object") {
            let objecte = JSON.parse(missatge.data);
            if(naujugador[0].njugador == undefined){
                let estrelles = objecte;

            }else{
                let naujugadors = objecte;
                for(let i = 0; i < naujugador.length; i++){
                    nausjugadors[i] = naujugador[i];
                }
                actualitzarposicionsNaus();
            }
        }
    }
}

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

function cercaNauSVG(njugador){
    return document.getElementById("nau" + njugador) ? true : false;
}
