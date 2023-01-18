let svg = document.getElementById('joc');

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
    this.eventListeners();
}
function afegirNau(x, y, njugador, rotacio) {
    var nau = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    nau.setAttributeNS(null, 'x', x);
    nau.setAttributeNS(null, 'y', y);
    nau.setAttributeNS(null, 'width', 40);
    nau.setAttributeNS(null, 'height', 40);
    nau.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'assets/img/nau' + njugador + '.svg');
    nau.setAttributeNS(null, 'transform', 'rotate(' + rotacio + ' ' + x + ' ' + y + ')');
    svg.appendChild(nau);
    return nau;
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
        this.x -= 1.5;
        this.y -= 1.5;
        this.rotacio = 315;
    } else if (this.controls.left && this.controls.down){
        this.x -= 1.5;
        this.y += 1.5;
        this.rotacio = 225;
    } else if (this.controls.right && this.controls.up){
        this.x += 1.5;
        this.y -= 1.5;
        this.rotacio = 45;
    } else if (this.controls.right && this.controls.down){
        this.x += 1.5;
        this.y += 1.5;
        this.rotacio = 135;
    } else if (this.controls.left && this.controls.right || this.controls.up && this.controls.down) {}
     else if (this.controls.left) {
        this.x -= 2;
        this.rotacio = 270;
    } else if (this.controls.right) {
        this.x += 2;
        this.rotacio = 90;
    } else if (this.controls.up) {
        this.y -= 2;
        this.rotacio = 0;
    } else if (this.controls.down) {
        this.y += 2;
        this.rotacio = 180;
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