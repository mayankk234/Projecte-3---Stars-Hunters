//El fitxer ha de fer connexió entre els diferents jugadors i el servidor
//El servidor ha de ser capaç de rebre les dades dels jugadors i enviar-les a tots els jugadors
//La vista del joc és un svg que es dibuixa amb dades rebudes del servidor
import WebSocket, {WebSocketServer} from "ws";

const wsServer = new WebSocketServer({port: 8180});

var jugadors = new Array();
var jugador = new Array();
var naus = new Array();

var x = 440, y = 660;

var estrelles = new Array();
var intervalEstrelles;
var comptadorEstrelles = 0;

var controlador = new Array();

var jocComencat = false;

jugadors[0] = false;
jugadors[1] = false;
jugadors[2] = false;
jugadors[3] = false;
jugadors[4] = false;
jugadors[5] = false;

// 

wsServer.on("connection", (client, peticio) => {
    var id = peticio.socket.remoteAddress + ":" + peticio.socket.remotePort;
    
    client.on("message", (missatge) => {
        if (missatge == "servidor") {
            if (controlador.length == 0) {
                controlador.push(id);
            } else {
                client.send("Ja hi ha un servidor");
            }
        } else if (missatge == "jugador") {
            if (jugadors.length <= 6) {
                //S'ha de comprovar quin numero de jugador esta lliure
                if (!jugadors[0]) {
                    // if (actualitzarPosicions == undefined) actualitzarPosicions = setInterval(actPos, 1000 / 60);
                    client.send("1");
                    jugadors[0] = true;
                    jugador[0] = id;
                    client.send(jocComencat == false ? "no" : "start");
                    if (estrelles.length > 0) {
                        client.send(JSON.stringify(estrelles));
                    }
                } else if (!jugadors[1]) {
                    client.send("2");
                    jugadors[1] = true;
                    jugador[1] = id;
                    client.send(jocComencat == false ? "no" : "start");
                    if (estrelles.length > 0) {
                        client.send(JSON.stringify(estrelles));
                    }
                } else if (!jugadors[2]) {
                    client.send("3");
                    jugadors[2] = true;
                    jugador[2] = id;
                    client.send(jocComencat == false ? "no" : "start");
                    if (estrelles.length > 0) {
                        client.send(JSON.stringify(estrelles));
                    }
                } else if (!jugadors[3]) {
                    client.send("4");
                    jugadors[3] = true;
                    jugador[3] = id;
                    client.send(jocComencat == false ? "no" : "start");
                    if (estrelles.length > 0) {
                        client.send(JSON.stringify(estrelles));
                    }
                } else if (!jugadors[4]) {
                    client.send("5");
                    jugadors[4] = true;
                    jugador[4] = id;
                    client.send(jocComencat == false ? "no" : "start");
                    if (estrelles.length > 0) {
                        client.send(JSON.stringify(estrelles));
                    }
                } else if (!jugadors[5]) {
                    client.send("6");
                    jugadors[5] = true;
                    jugador[5] = id;
                    client.send(jocComencat == false ? "no" : "start");
                    if (estrelles.length > 0) {
                        client.send(JSON.stringify(estrelles));
                    }
                }
            } else {
                client.send("Ja hi ha 6 jugadors");
            }
        } else if (missatge == "start") {
            if (jocComencat == false) {
                wsServer.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send("start");
                    }
                });
                jocComencat = true;
                intervalEstrelles = setInterval(() => {
                    estrelles.push({x: Math.random() * x, y: Math.random() * y, id: "estrella" + comptadorEstrelles});
                    comptadorEstrelles++;
                    wsServer.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(estrelles));
                        }
                    });
                }, 7500);
            }
        } else if (typeof missatge == "object") {
            //Saber quin jugador ha enviat la nau
            let index = jugador.indexOf(id);
            let nau = JSON.parse(missatge);
            if (index > -1) {
                naus[index] = nau;
            }
            actPos();
        };});
    client.on("close", () => {
        console.log("Client tancat");
        let index = jugador.indexOf(id);
        if (index > -1) {
            jugadors[index] = false;
            jugador[index] = undefined;
            let nau = naus[index];
            nau.x = -1;
            nau.y = -1;
            for (let i = 0; i < jugador.length; i++) {
                wsServer.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN && nau.njugador != i + 1) {
                        client.send(JSON.stringify(nau));
                    }
                });
            }
            naus[index] = undefined;
        }
        index = controlador.indexOf(id);
        if (index > -1) {
            controlador.splice(index, 1);
        }
    });
});

function actPos() {
    wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(naus));
        }
    });
    return;
}

var actualitzarPosicions;