// Perso

/**
 * [ObjetRyu fonction constructeur pour creer des héros]
 */

class ObjetRyu {
    constructor() {
        this.isJumping = false; // Frame Saut
        this.enAttente = true; // Frame idle
        this.isHaiduken = false; //Frame attack
        this.isRunning = false; //Frame attack
        this.isHurting = false; // frame Hurt
        this.isDynamiting = false; // Dynamite Attack
        this.isRunningLeft = false;
        this.isConflict = false; // test la collision
        this.score = 0;
        this.isDying = false // Hero Die
        this.width = 110;
        this.height = 100;
        this.x = 200;
        this.supply = 3;
        this.y = 454;
        this.isCrouching = false; // Frame se baisser
        this.spriteHeight = 80;
        this.src = 'img/test.png';
        this.energie = 100;
        this.spriteX = [-10, -126, -242, -358, -474, -590, -706, -822, -938, -1054]; // coordonnées X des sprites pour 10 frames
        // 0 -> walk -100 -> Jump -200 -> Crouch -300 -> Walk Shoot  -400 -> Run -500 -> Die  -600 -> runShoot -700 -> crouchShoot -800 -> crouchDynamite -900->jumpShoot -1000 ->  Dynamite
        this.spriteY = [0, -100, -200, -300, -400, -500, -600, -700, -800, -900, -1000]; //bullet

    }
    creation() {
        $('#container').css({
            'z-index': '40',
            'position': 'absolute',
            'left': this.x + 'px',
            'top': this.y + 'px',
            'width': this.width + 'px',
            'height': this.height + 'px',
            'overflow': 'hidden'
        });
        return this;
    }

    testCollision() {
        var refPerso = this;
        for (var i = 0; i < tabObstacle.length; i++) {
            if ( // tester toujours avec la valeur de x + width
            this.x + this.width >= tabObstacle[i].x && this.x + this.width <= tabObstacle[i].x + tabObstacle[i].width &&
                //tester tjrs avec la valeur de y + height
            this.y + this.height >= tabObstacle[i].y && this.y + this.height <= tabObstacle[i].y + tabObstacle[i].height
                // pour les liannes
            || !perso.isCrouching && tabObstacle[i].className == "vine" && this.x + this.width >= tabObstacle[i].x && this.x + this.width <= tabObstacle[i].x + tabObstacle[i].width) {
                this.isConflict = true;
                if (this.isConflict) {
                    this.energie -= 10;
                    if (!perso.isHurting && sonOn) {
                        this.RyuHurt();
                    }
                    this.isConflict = false;
                    // le contact enleve juste un point
                    // des conflit on supprime l'bstacle du tableau
                    tabObstacle.splice(i, 1);
                    $('#health').text(this.energie);
                    //Sonne le glas
                    if (this.energie <= 0) {
                        this.RyuDie();
                    }
                }
            }

        }
        //tester les collisions toutes les x ms
        setTimeout(function () {
            refPerso.testCollision();
        }, 200);
    }

    heroFixed() {
        this.enAttente = true;
        animateRequestFrame(70,this,()=>this.enAttente,"repeat",0, true)

    }

    heroMove() {
        this.isJumping = true;
        var refPerso = this;
        this.isJumpingUp = false;

        var tActuel;
        var tPrecedent;
        var frameMove = 0;
        var spriteJumping = function (actuel) {
            tActuel = actuel;
            tPrecedent = tPrecedent || actuel;

            var delai = tActuel - tPrecedent;
            var jump = function () {

                if (refPerso.isJumpingUp) {
                    refPerso.y -= 15;
                    if (refPerso.y <= 200) {
                        refPerso.isJumpingUp = false;

                    }
                }
                if (!refPerso.isJumpingUp) {
                    refPerso.y += 15;
                    if (refPerso.y >= 454) {
                        refPerso.isJumping = false;
                    }
                }
            };
            var jumpMove = function () {
                if (refPerso.isJumpingUp) {
                    refPerso.y -= 15;
                    refPerso.x += 2;
                    if (refPerso.y <= 200) {
                        refPerso.isJumpingUp = false;

                    }
                }


                if (!refPerso.isJumpingUp) {
                    refPerso.y += 15;

                    if (refPerso.y >= 454) {
                        refPerso.isJumping = false;
                    }
                }

            }

            if (delai > 30) {

                tPrecedent = tActuel;

                if (!refPerso.isRunning) { // saut verticale
                    jump();
                } else {
                    jumpMove();
                }


                frameMove++;
                if (frameMove == refPerso.spriteX.length) {
                    frameMove = 0;
                }
                if (!refPerso.isHaiduken && !refPerso.isHurting) {

                    $('#contenu').css('left', refPerso.spriteX[frameMove] + "px");
                    $('#contenu').css('top', refPerso.spriteY[1] + "px");
                }
                $('#container').css('top', refPerso.y)

            }

            if (refPerso.isJumping) {

                window.requestAnimationFrame(spriteJumping);
                // window.requestAnimationFrame(jumpUp);

                refPerso.enAttente = false;

                //remise a 0
            } else {

                refPerso.heroFixed();
            }

        };


        // setTimeout(function() {
        // 	// met a flase le jump a la fin du saut
        // 	refPerso.isJumping = false;
        // }, 900); // temps du saut
        spriteJumping();

    }

    RyuHaiduken() {
        perso.isHaiduken = true;
        perso.isDynamiting = false;
        var tActuel;
        var tPrecedent;
        var frameHaiduken = 0;
        var refPerso = this;

        var spriteHaiduken = function (actuel) {

            tActuel = actuel;
            tPrecedent = tPrecedent || actuel;
            var delai = tActuel - tPrecedent;
            var tps = 70;
            if (perso.isCrouching) { // animation - rapide
                tps = 120;
            }
            if (delai > tps) {
                frameHaiduken++;
                // si le perso lance de la Dynamite


                // si le perso n'est pas bléssé
                if (!refPerso.isHurting) {

                    // tirer des balles
                    //Run and Shoot
                    if (refPerso.isRunning) {

                        if (frameHaiduken == 8) {
                            frameHaiduken = 0;

                        }
                        $('#contenu').css('left', refPerso.spriteX[frameHaiduken] + "px");
                        $('#contenu').css('top', refPerso.spriteY[6] + "px");

                    } else if (perso.isCrouching) {
                        // Crouch and Shoot

                        if (frameHaiduken == 5) {
                            frameHaiduken = 0;
                        }
                        $('#contenu').css('left', refPerso.spriteX[frameHaiduken] + "px");
                        $('#contenu').css('top', refPerso.spriteY[7] + "px");

                    } else if (perso.isJumping) {
                        // jump and shoot
                        if (frameHaiduken == refPerso.spriteX.length) {
                            frameHaiduken = 0;
                        }
                        $('#contenu').css('left', refPerso.spriteX[frameHaiduken] + "px");
                        $('#contenu').css('top', refPerso.spriteY[9] + "px");
                    } else {
                        // Walk and Shoot
                        if (frameHaiduken == refPerso.spriteX.length) {
                            frameHaiduken = 0;
                        }
                        $('#contenu').css('left', refPerso.spriteX[frameHaiduken] + "px");
                        $('#contenu').css('top', refPerso.spriteY[3] + "px");

                    }
                }


                tPrecedent = tActuel;
            }
            if (refPerso.isHaiduken) {
                var animationRequestId = window.requestAnimationFrame(spriteHaiduken);

                refPerso.enAttente = false;
            } else {
                if (refPerso.isCrouching) {
                    refPerso.RyuCrouching();
                } else {
                    refPerso.heroFixed();

                }
            }

        };
        spriteHaiduken();
        setTimeout(function () {
            refPerso.isHaiduken = false;

        }, 700)
    }

    //Dynamite attack !

    RyuDynamite() {
        this.isDynamiting = true;
        this.isHaiduken = false;
        this.supply -= 1;
        var tActuel;
        var tPrecedent;
        var frameHaiduken = 0;
        var refPerso = this;
        $('#supply').html(perso.supply);
        var spriteDynamite = function (actuel) {
            tActuel = actuel;
            tPrecedent = tPrecedent || actuel;
            var delai = tActuel - tPrecedent;

            if (delai > 70) {
                frameHaiduken++;
                // if he throw dynamite without jumping and crouching
                if (!refPerso.isJumping && !refPerso.isCrouching && !refPerso.isHurting) {
                    if (frameHaiduken <= 7) {
                        $('#contenu').css('left', refPerso.spriteX[frameHaiduken] + "px");
                        $('#contenu').css('top', refPerso.spriteY[10] + "px");
                    }

                }
                tPrecedent = tActuel;
            }
            if (refPerso.isDynamiting) {
                var animationRequestId = window.requestAnimationFrame(spriteDynamite);
                refPerso.enAttente = false;
            } else {
                refPerso.heroFixed();
            }

        };
        spriteDynamite();
        // animateRequestFrame(70,this,()=>{return !this.isJumping && !this.isCrouching && !this.isHurting}, null,10)
        // setTimeout(function () {
        //     perso.isDynamiting = false
        // }, 2000)
    };

    // Running right
    RyuRunning() {
        this.isRunning = true;
        var tActuel;
        var tPrecedent;
        var frameRunning = 0;
        var refPerso = this;

        var spriteRunning = function (actuel) {
            tActuel = actuel;
            tPrecedent = tPrecedent || actuel;
            var delai = tActuel - tPrecedent;
            if (delai > 70) {

                if (!refPerso.isCrouching) {
                    if (refPerso.isRunningLeft) {
                        refPerso.x -= 5;
                    } else {
                        refPerso.x += 5;
                    }
                }
                $('#container').css('left', refPerso.x);
                frameRunning++;
                if (frameRunning == 8) {
                    frameRunning = 0;
                }

                // si il ne saute pas, qu'il ne sort pas son fusil et qu'il n'est pas en train d'être blessé !
                if (!refPerso.isHaiduken && !refPerso.isJumping && !refPerso.isHurting && !refPerso.isDynamiting && !refPerso.isCrouching) {
                    $('#contenu').css('left', refPerso.spriteX[frameRunning] + "px");

                    $('#contenu').css('top', refPerso.spriteY[4] + "px");
                }
                tPrecedent = tActuel;

            }

            if (refPerso.isRunning) {
                var animationRequestId = window.requestAnimationFrame(spriteRunning);
                refPerso.enAttente = false;

            } else {
                refPerso.heroFixed();
            }

        };
        spriteRunning();
    }

    RyuCrouching() {
        this.isCrouching = true;
        var tActuel;
        var tPrecedent;
        var frameCrouching = 0;
        var refPerso = this;
        var spriteCrouching = function (actuel) {
            tActuel = actuel;
            tPrecedent = tPrecedent || actuel;

            var delai = tActuel - tPrecedent;

            if (delai > 70) {
                frameCrouching++;
                if (frameCrouching == refPerso.spriteX.length) {
                    frameCrouching = 0;
                }
                $('#contenu').css('left', refPerso.spriteX[frameCrouching] + "px");
                $('#contenu').css('top', refPerso.spriteY[2] + "px");
                tPrecedent = tActuel;
            }
            if (refPerso.isCrouching && !refPerso.isHaiduken && !refPerso.isHurting) {
                var animationRequestId = window.requestAnimationFrame(spriteCrouching);
                refPerso.enAttente = false;

            } else {
                refPerso.heroFixed();
            }

        };
        spriteCrouching();
        // animateRequestFrame(70,this,()=>{return this.isCrouching && !this.isHaiduken && !this.isHurting},"repeat",2);


    };

    // perso is hurting
    RyuHurt() {
        this.isHurting = true;
        document.getElementById('cri').play();
        document.getElementById('cri').volume = 0.1;
        animateRequestFrame(70,this,()=>this.isHurting,null,5);
        setTimeout(()=>this.isHurting = false,800);

    };

    //perso is ding
    RyuDie() {
        this.isDying = true;
        animateRequestFrame(70,this,()=>this.isDying,null,5);
    };


}

