export class Estrella{
    constructor(x,y, id){
        this.x = x + 20;
        this.y = y + 20;
        this.id = id;
    }
}

let svg = document.getElementById('joc');

export function afegirEstrella(x,y,nEstrella){
    let estrella = document.createElementNS("http://www.w3.org/2000/svg", "image");
    estrella.setAttributeNS(null, "id", nEstrella);
    estrella.setAttributeNS(null, "x", x);
    estrella.setAttributeNS(null, "y", y );
    estrella.setAttributeNS(null, "width", 40);
    estrella.setAttributeNS(null, "height", 40);
    estrella.setAttributeNS("http://www.w3.org/1999/xlink", "href", "assets/img/estrella.svg");
    
    svg.appendChild(estrella);
    return estrella;
}

export function moureEstrella(x,y,nEstrella){
    let estrella = document.getElementById(nEstrella);
    if (estrella == null) return false;
    estrella.setAttributeNS(null, "x", x);
    estrella.setAttributeNS(null, "y", y);
    return true;
}