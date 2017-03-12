//Execution function

$('document').ready(function () {
    "use strict";
    //introduction jeu intro.js
    intro();

    $('.sound').click(function () {
        if (sonOn) {
            sonOn = false;
            $(this).html('Sound off')
        } else {
            sonOn = true;
            $(this).html('Sound on');
        }
    });
    //declencheur du jeu
    $('.launch').click(function () {
        //suppression du dom de l'intro
        document.getElementById('introSon').pause();
        $(this).hide('puff', 1500, function () {
            $(this).remove();
            launchGame();
        });

        $('.how-to-play').hide('puff', 1500, function () {
            $('.how-to-play').remove();
        });
        $('#intro').hide(1500, function () {
            $('#intro').remove();
        });


    }) //click

});// end

let launchGame = function () {
    //affichage du tableau
    $('.misc').show(1500)
    //tableau des scores en arriere plan
    // $('.container').css('z-index', 1500);

    // met le jeu en pause a la perte du focus de la fenetre
    // var timeOut;
    // $(window).focus(function() {
    // 	alert('Jeu mis en pause, appuyer sur ok pour continuer');
    // 	timeOut = '';
    // });
    var main = document.getElementById('main');
    setInterval(function () {
        //lancement du son
        if (sonOn & !perso.isDying) {
            main.play()
            main.loop = true;
            main.volume = 0.07;
        } //stopper le son
        else {
            main.pause()
        }
    }, 400)

    // Chargement du terrain
    field.creation().animate();

    //Chargement des nuages


    creationNuage();
    //chagement des objets Background
    creationBackground();

    //chargement du compteur
    creationTimer();

    // crer un nouvel hero à l'aide de la fonction constructeur !
    perso = new ObjetRyu();
    // Positionnement générale de ryu!
    $('#game').append("<img id='contenu'></div>");
    $('#contenu').attr('src', perso.src).wrap($('<div id="container"></div>')).css('position', 'absolute');


    //launch frame idle
    perso.creation().heroFixed();

    /////
    // Test des Collisions //
    /////
    // detecter les collisions du Hero avec les Dinos
    perso.testCollision();
    // detecter les collisions des balles avec les Dinos

    // Affichage de la vie
    $('#health').text(perso.energie)

    // Affichage du score
    $('#score').text(perso.score);

    //Affichage de la dynamite
    $('#supply').html(perso.supply);


    // var Obstacle = [usineObstacle(0), usineObstacle(1), usineObstacle()];

    creationObstacle();

    /////
    //Déplacement //
    /////

    var container = document.getElementById('container');
    var hammer = Hammer(container, {
        transform_always_block: true,
        tap_always: false,
        drag_min_distance: 0
    });

    hammer.on("tap", (event) => {
        actionHammer(event);
    });


    var actionHammer = (event) => {
        switch (event.type) {
            case "tap":
                persoIsShootingWithSpace(event);
                break;

        }
    };

}; // launch game






