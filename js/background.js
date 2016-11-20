class Field {
    constructor() {
        let bush = document.createElement('img');
        $(bush).attr('src', 'img/field.png');
        $(bush).css({
            'z-index': '5',
            'position': 'absolute',
        });
        this.y = 548;
        this.x = 0;
        this.width = 100;
        this.height = 100;
        this.borderWidth = 5;
        this.elementHTML = bush;
    }

    creation() {
        $('#game').append(this.elementHTML)
        this.elementHTML.style.top = this.y + "px";
        this.elementHTML.style.left = this.x + "px";
        return this;
    }

    animate() {
        this.x--;
        if (this.x <= -1004) {
            this.x = 0;
        }
        this.elementHTML.style.left = this.x + 'px';
        window.requestAnimationFrame(() => this.animate());
    }
}
var field = new Field();

/////
//Nuage //
/////
//
var usineNuage = function () {
    var nuage = document.createElement('img');
    nuage.src = "img/Nuage.png";
    nuage.style.position = "absolute";
    nuage.style.zIndex = 10;

    var referenceNuage = {
        y: Math.floor(Math.random() * 200),
        step: Math.round(Math.random() * 10) + 1,
        x: window.innerWidth,
        width: 100,
        height: 100,
        borderWidth: 5,
        elementHTML: nuage,
        creation: function () {
            $('.nuage').append(this.elementHTML);
            this.elementHTML.style.top = this.y + "px";
            this.elementHTML.style.left = this.x + "px";
            return this;
        }
    };

    referenceNuage.animate = function () {
        referenceNuage.x = referenceNuage.x - referenceNuage.step;


        if (referenceNuage.x <= -4) {
            referenceNuage.x = window.innerWidth; //taille de la fenetre
            referenceNuage.y = Math.floor(Math.random() * 200);
        }
        referenceNuage.elementHTML.style.left = referenceNuage.x + 'px';
        referenceNuage.elementHTML.style.top = referenceNuage.y + 'px';
        window.requestAnimationFrame(function () {
            referenceNuage.animate();

        });
    };

    return referenceNuage;
};
var Clouds = [usineNuage(), usineNuage(), usineNuage()];

var creationNuage = function () {

    for (var i = 0; i < Clouds.length; i++) {
        Clouds[i].creation().animate();
    }
};

// affichaga aléatoire des éléments en background (pierre, fleur etc...)
var usineBackground = function () {


    var background = document.createElement('img');

    var ReferenceBackground = {
        objetRandom: Math.round(Math.random() * 22) + 1,
        y: 470,
        x: window.innerWidth,
        src: 'img/background/background',
        className: 'objetBackground',
        width: 90,
        width: 90,
        height: 80,
        elementHTML: background,
        creation: function () {
          creationRequest();
            // chainage
            return this;
        }
    };

    ReferenceBackground.animate = function () {
        ReferenceBackground.x--;

        if (ReferenceBackground.x <= 0) {
            $(this.elementHTML).remove();
            delete this;

        }
        ReferenceBackground.elementHTML.style.left = ReferenceBackground.x + 'px';
        ReferenceBackground.elementHTML.style.top = ReferenceBackground.y + 'px';
        window.requestAnimationFrame(function () {
            ReferenceBackground.animate();
        });

    };
    return ReferenceBackground;
};

var creationBackground = function () {
    usineBackground().creation().animate();

    setInterval(function () {
        usineBackground().creation().animate();
    }, 10000);

};
