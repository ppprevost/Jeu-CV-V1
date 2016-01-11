// Coordonnée Perso

/**
 * [ObjetRyu fonction constructeur pour creer des héros]
 */
var ObjetRyu = function() {
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
	this.width = 116;
	this.height = 100;
	this.x = 200;
	this.supply = 3;
	this.y = 454;
	this.isCrouching = false; // Frame se baisser
	this.spriteHeight = 80;
	this.src = 'img/test.png';
	this.energie = 100;
	this.spriteX = [0, -116, -232, -348, -464, -580, -696, -812, -928, -1044]; // coordonnées X des sprites pour 10 frames 
	// 0 -> walk -100 -> Jump -200 -> Crouch -300 -> Walk Shoot  -400 -> Run -500 -> Die  -600 -> runShoot -700 -> crouchShoot -800 -> crouchDynamite -900->jumpShoot -1000 ->  Dynamite
	this.spriteY = [0, -100, -200, -300, -400, -500, -600, -700, -800, -900, -1000]; //bullet
	this.creation = function() {
			$('#container').css({
				'z-index': '40',
				'position': 'absolute',
				'left': this.x + 'px',
				'top': this.y + 'px',
				'width': this.width + 'px',
				'height': this.height + 'px',
				'overflow': 'hidden'
			});

		}
		// test conflict. Improve code and factorise some move ! 
	this.testCollision = function() {
			var refPerso = this
			for (var i = 0; i < tabObstacle.length; i++) {
				if ( // tester toujours avec la valeur de x + width
					this.x + this.width >= tabObstacle[i].x && this.x + this.width <= tabObstacle[i].x + tabObstacle[i].width &&
					//tester tjrs avec la valeur de y + height
					this.y + this.height >= tabObstacle[i].y && this.y + this.height <= tabObstacle[i].y + tabObstacle[i].height
				) {
					this.isConflict = true;
					if (this.isConflict) {
						this.energie -= 10;
						if (!perso.isHurting) {
							// this.RyuHurt();
							this.isHurting = true;
						}

						this.isConflict = false;

						// le contact enleve juste un point
						// des conflit on supprime l'bstacle du tableau
						tabObstacle.splice(i, 1);
						$('#health').text(this.energie)
						//Sonne le glas
						if (refPerso.energie <= 0) {
							refPerso.RyuDie();
							setTimeout(function() {

								$('#obstacle').remove();
								tabObstacle = [];
								$('#sound').remove()

							}, 1000)
						}

					}
				}
			}
			//tester les collisions toutes les x ms
			setTimeout(function() {
				refPerso.testCollision();
			}, 100);
		},
		this.recupDynamite = function(){
			
		}
		// Perso Idle
	this.ruyFixed = function() {
		this.enAttente = true;
		var frameFixed = 0;
		var tActuel;
		var tPrecedent;

		var refPerso = this; // reference à l'objet
		var animate = function(actuel) {

			tActuel = actuel;
			tPrecedent = tPrecedent || actuel;
			var delai = tActuel - tPrecedent;

			if (delai > 70) {

				tPrecedent = tActuel;

				frameFixed++;
				if (frameFixed == refPerso.spriteX.length) {
					frameFixed = 0;
				}
				$('#contenu').css('left', refPerso.spriteX[frameFixed] + "px");
				$('#contenu').css('top', refPerso.spriteY[0] + "px");
				// Pour regler la taille du sprite
				//  $('#contenu').css('width', refPerso.idle[frameFixed].w + "px");
				// $('#contenu').css('height', refPerso.idle[frameFixed].h + "px");

			}
			if (refPerso.enAttente) {
				window.requestAnimationFrame(animate);

			}

		};
		animate();

	};
	//jump
	this.RyuMove = function() {
		this.isJumping = true;
		var refPerso = this;
		this.isJumpingUp = false;
		this.isJumpingDown = false;


		var jumpDown = function() {
			$('#container').animate({
				'top': '+=7px'
			}, 20)


		}


		var tActuel;
		var tPrecedent;
		var frameMove = 0;
		var spriteJumping = function(actuel) {
			tActuel = actuel;
			tPrecedent = tPrecedent || actuel;

			var delai = tActuel - tPrecedent;
			var jump = function() {

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
			var jumpMove = function() {
				if (refPerso.isJumpingUp) {
					refPerso.y -= 15;
					refPerso.x += 3
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

			if (delai > 40) {
				tPrecedent = tActuel;

				if (!refPerso.isRunning) { // saut verticale
					jump();
				} else {
					jumpMove();
				}

				if (!refPerso.isHaiduken) {

					frameMove++;
					if (frameMove == refPerso.spriteX.length) {
						frameMove = 0;
					}

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
				refPerso.ruyFixed();
			}

		};


		// setTimeout(function() {
		// 	// met a flase le jump a la fin du saut
		// 	refPerso.isJumping = false;
		// }, 900); // temps du saut
		spriteJumping();

	};
	// attaque au fusil
	this.RyuHaiduken = function() {
		perso.isHaiduken = true;
		perso.isDynamiting = false;
		var tActuel;
		var tPrecedent;
		var frameHaiduken = 0;
		var refPerso = this;

		var spriteHaiduken = function(actuel) {

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


				
				tPrecedent = tActuel;
			}
			if (refPerso.isHaiduken) {
				var animationRequestId = window.requestAnimationFrame(spriteHaiduken);

				refPerso.enAttente = false;


			} else {
				refPerso.ruyFixed();
			}

		};
		spriteHaiduken();
		setTimeout(function() {
			refPerso.isHaiduken = false;

		}, 800)
	};
	this.RyuDynamite = function() {
		this.isDynamiting = true;
		this.isHaiduken = false;
		this.supply -=1;
		var tActuel;
		var tPrecedent;
		var frameHaiduken = 0;
		var refPerso = this;
		$('#supply').html(perso.supply);


		var spriteDynamite = function(actuel) {

			tActuel = actuel;
			tPrecedent = tPrecedent || actuel;
			var delai = tActuel - tPrecedent;

			if (delai > 70) {
				frameHaiduken++;
				// si le perso lance de la Dynamite
				
					if (frameHaiduken == 8) {
						frameHaiduken = 0;
					}
					$('#contenu').css('left', refPerso.spriteX[frameHaiduken] + "px");
					$('#contenu').css('top', refPerso.spriteY[10] + "px");

			

				
			}

			tPrecedent = tActuel;

			if (refPerso.isDynamiting) {
				
				var animationRequestId = window.requestAnimationFrame(spriteDynamite);
				refPerso.enAttente = false;

			} else {
				refPerso.ruyFixed();
			}

		};
		spriteDynamite();
		setTimeout(function() {
			perso.isDynamiting = false
		}, 3000)
	};

	// Running right
	this.RyuRunning = function() {
		this.isRunning = true;
		var tActuel;
		var tPrecedent;
		var frameRunning = 0;
		var refPerso = this;

		var spriteRunning = function(actuel) {

			tActuel = actuel;
			tPrecedent = tPrecedent || actuel;

			var delai = tActuel - tPrecedent;

			if (delai > 70) {

				if (refPerso.isRunningLeft) {
					refPerso.x -= 5;
				} else {
					refPerso.x += 5;
				}

				$('#container').css('left', refPerso.x);
				frameRunning++;
				if (frameRunning == 8) {
					frameRunning = 0;
				}

				// si il ne saute pas et qu'il ne sort pas son fusil ! 
				if (!refPerso.isHaiduken && !refPerso.isJumping) {
					$('#contenu').css('left', refPerso.spriteX[frameRunning] + "px");

					$('#contenu').css('top', refPerso.spriteY[4] + "px");
				}
				tPrecedent = tActuel;

			}

			if (refPerso.isRunning) {
				var animationRequestId = window.requestAnimationFrame(spriteRunning);
				refPerso.enAttente = false;

			} else {
				refPerso.ruyFixed();
			}

		};
		spriteRunning();
	};
	this.RyuCrouching = function() {
		this.isCrouching = true;
		var tActuel;
		var tPrecedent;
		var frameCrouching = 0;
		var refPerso = this;
		var spriteCrouching = function(actuel) {
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
			if (refPerso.isCrouching && !refPerso.isHaiduken) {
				var animationRequestId = window.requestAnimationFrame(spriteCrouching);
				refPerso.enAttente = false;

			} else {
				refPerso.ruyFixed();
			}

		};
		spriteCrouching();
	};


	// perso is hurting 

	this.RyuHurt = function() {
		this.isHurting = true;

		var tActuel;
		var tPrecedent;
		var frameCrouching = 0;
		var refPerso = this;
		var spriteHurting = function(actuel) {
			tActuel = actuel;
			tPrecedent = tPrecedent || actuel;

			var delai = tActuel - tPrecedent;

			if (delai > 70) {
				frameCrouching++;
				$('#contenu').css('left', refPerso.spriteX[frameCrouching] + "px");
				$('#contenu').css('top', refPerso.spriteY[9] + "px");
				tPrecedent = tActuel;
			}
			if (refPerso.isHurting) {
				var animationRequestId = window.requestAnimationFrame(spriteHurting);
				this.enAttente = false;

			} else {
				refPerso.ruyFixed();
			}

		};
		spriteHurting();
		setTimeout(function() {

		}, 1000);
	};

	//perso is ding
	this.RyuDie = function() {
		this.isDying = true;
		this.enAttente = false;
		var tActuel;
		var tPrecedent;
		var frameCrouching = 0;
		var refPerso = this;
		console.log('fin du jeu')
		var spriteDie = function(actuel) {
			tActuel = actuel;
			tPrecedent = tPrecedent || actuel;

			var delai = tActuel - tPrecedent;
			if (delai > 70) {
				frameCrouching++;

				$('#contenu').css('left', refPerso.spriteX[frameCrouching] + "px");
				$('#contenu').css('top', refPerso.spriteY[5] + "px");
				tPrecedent = tActuel;
			}
			if (refPerso.idDying) {
				var animationRequestId = window.requestAnimationFrame(spriteDie);

			}
		};
		spriteDie();
	};

}; // end of Object