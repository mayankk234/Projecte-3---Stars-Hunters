let svg = document.getElementById('joc');

const WIDTH = 480;
const HEIGHT = 600;

export function Nau(njugador) {
    this.njugador = njugador;
    this.controls = {
        left: false,
        right: false,
        up: false,
        down: false
    };
    //poner posicion random a la nave sin tonacar los bordes    
    this.x = Math.floor(Math.random() * 440);
    this.y = Math.floor(Math.random() * 560);
    this.rotacio = Math.floor(Math.random() * 360);
    this.nau = afegirNau(this.x, this.y, this.njugador, this.rotacio);
    this.limitx = WIDTH - this.nau.clientWidth - 40;
    this.limity = HEIGHT - this.nau.clientHeight - 40;
    this.eventListeners();
}
export function afegirNau(x, y, njugador, rotacio) {
    var nau = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    nau.setAttributeNS(null, 'id', 'nau' + njugador);
    nau.setAttributeNS(null, 'x', x);
    nau.setAttributeNS(null, 'y', y);
    nau.setAttributeNS(null, 'width', 40);
    nau.setAttributeNS(null, 'height', 40);
    nau.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'assets/img/nau' + njugador + '.svg');
    nau.setAttributeNS(null, 'transform', 'rotate(' + rotacio + ' ' + (x + 20) + ' ' + (y + 20) + ')');
    svg.appendChild(nau);
    return nau;
}

export function moureNau(x, y, njugador, rotacio){
    var nau = document.getElementById('nau' + njugador);
    if (nau == null) return false;
    nau.setAttributeNS(null, 'x', x);
    nau.setAttributeNS(null, 'y', y);
    nau.setAttributeNS(null, 'transform', 'rotate(' + rotacio + ' ' + (x + 20) + ' ' + (y + 20) + ')');
    return true;
}

Nau.prototype.eventListeners = function () {
    var self = this;
    document.addEventListener('keydown', function (e) {
        self.keydown(e);
    });
    document.addEventListener('keyup', function (e) {
        self.keyup(e);
    });
}

Nau.prototype.moure = function () {
    if (this.controls.left && this.controls.up){
        if (this.x > 0 && this.y > 0){
            this.x -= 1.5;
            this.y -= 1.5;
            this.rotacio = 315;
        } else{
            this.rotacio = 315;
        }
    } else if (this.controls.left && this.controls.down){
        if (this.x > 0 && this.y < this.limity){
            this.x -= 1.5;
            this.y += 1.5;
            this.rotacio = 225;
        } else{
            this.rotacio = 225;
        }
    } else if (this.controls.right && this.controls.up){
        if (this.x < this.limitx && this.y > 0){
            this.x += 1.5;
            this.y -= 1.5;
            this.rotacio = 45;
        } else {
            this.rotacio = 45;
        }
    } else if (this.controls.right && this.controls.down){
        if (this.x < this.limitx && this.y < this.limity){
            this.x += 1.5;
            this.y += 1.5;
            this.rotacio = 135;
        } else {
            this.rotacio = 135;
        }
    } else if (this.controls.left && this.controls.right || this.controls.up && this.controls.down) {}
     else if (this.controls.left) {
        if(this.x > 0){
            this.x -= 2;
            this.rotacio = 270;
        } else {
            this.rotacio = 270;
        }
    } else if (this.controls.right) {
        if(this.x < this.limitx){
            this.x += 2;
            this.rotacio = 90;
        } else {
            this.rotacio = 90;
        }
    } else if (this.controls.up) {
        if(this.y > 0){
            this.y -= 2;
            this.rotacio = 0;
        } else{
            this.rotacio = 0;
        }
    } else if (this.controls.down) {
        if(this.y < this.limity){
        this.y += 2;
        this.rotacio = 180;
        }
        else {
            this.rotacio = 180;
        }
    }
    this.nau.setAttributeNS(null, 'x', this.x);
    this.nau.setAttributeNS(null, 'y', this.y);
    // this.nau.setAttributeNS(null, 'transform', 'rotate(' + this.rotacio + ' ' + this.x + ' ' + this.y + ')');
    this.nau.setAttributeNS(null, 'transform', 'rotate(' + this.rotacio + ' ' + (this.x + 20) + ' ' + (this.y + 20) + ')');
    } 

Nau.prototype.keydown = function (e) {
    switch (e.keyCode) {
        case 37 || 65:
            this.controls.left = true;
            break;
        case 38 || 87:
            this.controls.up = true;
            break;
        case 39 || 68:
            this.controls.right = true;
            break;
        case 40 || 83:
            this.controls.down = true;
            break;
    }
}

Nau.prototype.keyup = function (e) {
    switch (e.keyCode) {
        case 37 || 65:
            this.controls.left = false;
            break;
        case 38 || 87:
            this.controls.up = false;
            break;
        case 39 || 68:
            this.controls.right = false;
            break;
        case 40 || 83:
            this.controls.down = false;
            break;
    }
}