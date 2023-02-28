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
            for (let i = 0; i < nausjugadors.length; i++) {
                if (nausjugadors[i] != undefined) {
                    afegirPuntuacio(nausjugadors[i].njugador);
                }
            }
            alert("El joc ha començat");
            mourenau = setInterval(function () {
                if (nau.moure()) {
                    connexio.send(JSON.stringify(nau));
                    let estrellaColisio = colisioNauEstrella(nau);
                    if (estrellaColisio != undefined) {
                        //Fem array per enviar a servidor
                        estrellaColisio = {
                            "accio": "eliminar",
                            "id": estrellaColisio
                        }
                        connexio.send(JSON.stringify(estrellaColisio));
                    }
                }         
            }, 1000 / 60);
        } else if (missatge.data == "no"){
            console.log("S'esta a a espera a que el servidor comenci el joc");
        } else if (typeof missatge == "object") {
            let objecte = JSON.parse(missatge.data);
            if (objecte[0] != undefined && objecte[0].njugador != undefined) {
                let naujugador = objecte;
                for(let i = 0; i < naujugador.length; i++){
                    nausjugadors[i] = naujugador[i];
                }
                actualitzarposicionsNaus();
            } else {
                if (objecte != undefined && objecte.accio != undefined) {
                    if (objecte.accio == "eliminar") {
                        eliminarEstrella(objecte);
                    } else if (objecte.accio == "puntuacions"){
                        actualitzarPuntuacions(objecte);
                    } else if (objecte.accio == "reiniciar"){
                        alert("El jugador " + objecte.guanyador + " ha guanyat");
                        clearInterval(mourenau);
                    }
                } else if (objecte[0] != undefined && objecte[0].x != undefined) {
                    estrelles = objecte;
                    actualitzarposicionsEstrelles(estrelles);
            }
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

function afegirPuntuacio(njugador){
    let puntuacions = $("#Puntuacions");
    let row = document.createElement("div");
    row.setAttribute("class", "row");

    let col = document.createElement("div");
    col.setAttribute("class", "col-12");

    let puntuacio = document.createElement("p");
    puntuacio.setAttribute("id", "puntuacio" + njugador);
    puntuacio.innerHTML = "Jugador " + njugador + ": 0";

    col.appendChild(puntuacio);
    row.appendChild(col);
    puntuacions.append(row);
}

function actualitzarPuntuacions(puntuacions){
    for (let i = 0; i < puntuacions.puntuacions.length; i++) {
        $("#puntuacio" + (i + 1)).html("Jugador " + (i + 1) + ": " + puntuacions.puntuacions[i]);
    }
}


function cercaNauSVG(njugador){
    return document.getElementById("nau" + njugador) ? true : false;
}

function actualitzarposicionsEstrelles(estrelles){
    for (let i = 0; i < estrelles.length; i++) {
        //Si es troba la estrella al SVG pero a l'array no, esborrem la estrella del SVG
        if (cercaEstrellaSVG(estrelles[i].id)) {
            if (estrelles[i].x == -1) {
                document.getElementById(estrelles[i].id).remove();
                continue;
            }
        } else {
            afegirEstrella(estrelles[i].x, estrelles[i].y, estrelles[i].id);
        }
    }
}

function cercaEstrellaSVG(id){
    return document.getElementById(id) ? true : false;
}

function eliminarEstrella(accioEstrelles){
    let estrellaIdEliminar = accioEstrelles.id;
    for (let i = 0; i < document.getElementById("joc").children.length; i++) {
        if (document.getElementById("joc").children[i].id.includes("estrella")) {
            let estrellaSVG = document.getElementById("joc").children[i];
            if (estrellaSVG.id == estrellaIdEliminar) {
                estrellaSVG.remove();
                estrelles.splice(i, 1);
            }
        }
    }
}

function colisioNauEstrella(nau){
    for (let estrella of estrelles) {
        // if (nau.x + 20 >= estrella.x && nau.x <= estrella.x + 20 && nau.y + 20 >= estrella.y && nau.y <= estrella.y + 20) {
        //     return estrella.id;
        // }
        let distanciaX = nau.x - estrella.x;
        let distanciaY = nau.y - estrella.y;
        let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
        if (distancia < 20) {
            console.log("Nau x: " + nau.x + " Nau y: " + nau.y + " Estrella x: " + estrella.x + " Estrella y: " + estrella.y + " Distancia: " + distancia + "");
            return estrella.id;
        }
    }
    return undefined;
}