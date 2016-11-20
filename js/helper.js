let creationRequest = () => {
    $('#background').append($(this.elementHTML));
    $(this.elementHTML).css({
        'top': this.x,
        'left': this.y
    });

    $(this.elementHTML).addClass(this.className);
    $(this.elementHTML).attr('src', this.src + this.objetRandom + '.png');
    $('.' + this.className).css({
        'z-index': '20',
        'position': 'absolute',
        'left': this.x + "px",
        'top': this.y + "px",
        'width': this.width + "px",
        'height': this.height + "px",

    });
};


let animateRequestFrame = (tempo, context, condition, endOfAnimation, numberOfFrame, isIdle) => {
    let tActuel;
    let tPrecedent;
    let frame = 0;
    let refPerso = context;
    let spriteAnimation = function (actuel) {
        tActuel = actuel;
        tPrecedent = tPrecedent || actuel;
        var delai = tActuel - tPrecedent;
        if (delai > tempo) {
            frame++;
            if (frame == refPerso.spriteX.length) {
                if (endOfAnimation == "repeat") frame = 0;

            }
            $('#contenu').css('left', refPerso.spriteX[frame] + "px");
            $('#contenu').css('top', refPerso.spriteY[numberOfFrame] + "px");
            // if (isIdle) {
            //     $('#contenu').css('width', refPerso.idle[frameFixed].w + "px");
            //     $('#contenu').css('height', refPerso.idle[frameFixed].h + "px");
            // }

            tPrecedent = tActuel;
        }
        if (condition()) {
            requestAnimationFrame(spriteAnimation);
            if (!isIdle)
                refPerso.enAttente = false;
        } else {
            if (!isIdle)
                refPerso.heroFixed()
        }
    };
    spriteAnimation();
};

document.addEventListener('keydown', function (e) {

    switch (e.keyCode) {

        case 38: //haut

            if (!perso.isJumping) {
                perso.heroMove();
                perso.isJumpingUp = true;
            }

            break;
        case 39: //droite
            e.preventDefault();
            if (!perso.isRunning && !perso.isJumping) {
                perso.RyuRunning();
            }

            break;

        case 37: //gauche
            e.preventDefault();
            if (!perso.isRunning && !perso.isJumping && !perso.isCrouching) {
                perso.isRunningLeft = true;
                perso.RyuRunning();

            }

            break;
        case 32: //espace
            persoIsShootingWithSpace(e);
            break;

        case 40: // bas
            e.preventDefault();
            if (!perso.isCrouching && !perso.isHaiduken) {
                perso.RyuCrouching()
            }
            break;

        case 68: // d as Dynamite !!
            if (!perso.isDynamiting && perso.supply > 0) {


                // methode de shoot
                perso.RyuDynamite()
                ObjetBalleEnMouvement();
            }
            break;
    }

}, false);

document.addEventListener('keyup', function (e) {
    switch (e.keyCode) {

        case 32:
            // if (perso.isHaiduken) {

            // }

            break;
        case 38:
            if (perso.isJumping) {

                // c'est le delay d'apres saut qui fait passer la variable is jumping en false
                perso.isJumpingUp = false;
            }

            break;
        case 39:
            e.preventDefault();
            if (perso.isRunning) {
                perso.isRunning = false;

            }

            break;

        case 37:
            e.preventDefault();
            if (perso.isRunning) {
                perso.isRunningLeft = false;
                perso.isRunning = false;

            }

            break;
        case 40:

            if (perso.isCrouching) {
                perso.isCrouching = false;
            }
            break;

        case 68: // d as Dynamite !!

            break;
    }


}, false);


let persoIsShootingWithSpace = (event) => {
    event.preventDefault();
    if (!perso.isHaiduken && !perso.isJumping && !perso.isCrouching) {
        // on lance l'animation du Hero avec son fusil
        perso.RyuHaiduken();
        // on lance la fonction usine retournant balle
        ObjetBalleEnMouvement();

    } else if (!perso.isHaiduken && !perso.isJumping && perso.isCrouching)
    // Get Low
    {
        usineBullet().creation().animate();
        perso.RyuHaiduken(); // remplacer le visuel correspondant par Crouching + shot
    }

    // Get low and Shoot
    else if (!perso.isHaiduken && !perso.isJumping && !perso.isCrouching && perso.isRunning) {
        usineBullet().creation().animate();
        perso.RyuHaiduken(); // remplacer le visuel correspondant par Crouching + shot
    }

    // Jump and Shoot
    else if (!perso.isHaiduken && perso.isJumping && !perso.isCrouching && !perso.isRunning) {

        usineBullet().creation().animate();
        perso.RyuHaiduken();

    }
    // jump move and shoot
    else if (!perso.isHaiduken && perso.isJumping && !perso.isCrouching && perso.isRunning) {
        usineBullet().creation().animate();
        perso.RyuHaiduken();
    }
    //Run and Shoot
    else if (!perso.isHaiduken && !perso.isJumping && !perso.isCrouching && perso.isRunning) {
        usineBullet().creation().animate();
        perso.RyuHaiduken();
    }


}


/*
 // Background Timer

 */
// var win bind the event win
var win;
// permet d'incrementer les compétences
var d = 0;


var creationTimer = function () {

    $('#compteur').prepend("<div id='timer'></div>");
    $('#timer').html("00 : 00");

    var seconde = 0;
    var minute = 0;

    var chrono = function () {
        seconde += 1;
        if (seconde > 59) {
            seconde = 0;
            minute += 1;
        }
        if (seconde < 10 && minute < 10) {
            $('#timer').html("0" + minute + ": 0" + seconde);
            ;

        }
        if (seconde >= 10 && minute < 10) {
            $('#timer').html("0" + minute + ": " + seconde)
            // $('#timer').append("<p> Bravo vous avez tenu " + seconde + " secondes et " + minute + " minute(s)</p>")
        }

        /////
        //Affichage des compétences //
        /////

        tabCompetences = ['', ' .html5', ' .jquery', ' .angular', ' .bootstrap', ' .mongodb', ' .analytics', ' .nodejs', ' .meteor'];


        /////////////////
        // you die ! 	 //
        /////////////////
        if (perso.energie <= 0 && !win) {

            clearInterval(launchChrono);
            $('.nextskill').html('Ohhhhh You loose ! Reload !');
            // affichage du message de mort et possibilité de recommencer
            $('.endGame').fadeIn('slow');
            $('.endGame').append('<p>You die !</p><div class="startAgain">Reload</div >');
            $('.startAgain').css({
                'border': '1px solid red',
                'cursor': 'pointer'

            });
            //supprimer les élements du Dom
            setTimeout(function () {

                tabObstacle = [];
                $('#sound').remove();
                $('.nuage').remove();
            }, 2000);
        }

        if (d / 10 < tabCompetences.length) { // On incrémente alors les compétences
            // chargement tous les 10 secondes
            if (d > 0 && d % 10 === 0) {
                $('#skill' + tabCompetences[d / 10]).show('pulsate', 1500).animate({
                    width: '+=150'
                }, 2000, 'easeInQuint', function () {
                    $(this).delay(2500).animate({
                        width: '-=150'
                    }, 2000, 'easeOutExpo');
                });

                $('.nextskill').html('New Skill : ' + $(tabCompetences[d / 10]).attr('alt'));

            }
            d++;
        } else { // i d = 80; si il arrive au bout du tableau il gagne
            sonOn = false;
            win = true;
            clearInterval(launchChrono);
            $('.nextskill').html(' You made it ! You survive');
            $('.endGame').fadeIn('slow');
            $('.endGame').html('<p>Congratulations, you survive in the middle of the dinosaur jungle. Please see my skills below</p> ');
            tabObstacle = [];
            document.getElementById('winner').play()
            document.getElementById('winner').volume = 0.5;
            $('#obstacle').remove();

        }


        //////////////////////////////////////////////////////////////////////////////////
        // lance un rafraichissement de la page des lors que l'on clique sur le bouton  //
        //////////////////////////////////////////////////////////////////////////////////
        $('.startAgain').click(function () {
            location.reload();
        });

    };

    var launchChrono = setInterval(chrono, 1000);

};


//declaration de variable son
var perso;
var sonOn = true;
// Arreter le son




