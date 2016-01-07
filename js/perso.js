		// Coordonnée Perso

		/**
		 * [ObjetRyu fonction constructeur pour creer des héros]
		 */
		var ObjetRyu = function() {
			this.isJumping = false; // Frame Saut
			this.enAttente = true; // Frame idle
			this.isHaiduken = false; //Frame attack
			this.isRunning = false; //Frame attack
			this.isDying = false;
			this.isRunningLeft = false;
			this.isConflict = false; // test la collision
			this.score = 0;
			this.width = 116;
			this.height = 100;
			this.x = 200;
			this.y = 454;
			this.isCrouching = false; // Frame se baisser
			this.spriteHeight = 80;
			this.src = 'img/test.png';
			this.energie = 100;
			this.spriteX = [0, -116, -232, -348, -464, -580, -696, -812, -928, -1044]; // coordonnées X des sprites pour 10 frames 
			// 0 -> walk -100 -> Jump -200 -> Crouch -300 -> Walk Shoot  -400 -> Run
			this.spriteY = [0, -100, -200, -300, -400]; //bullet
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
								this.isConflict = false;
								// le contact enleve juste un point
								// des conflit on supprime l'bstacle du tableau
								tabObstacle.splice(i, 1);
								$('#health').text(this.energie)
							}
						}
					}
					//tester les collisions toutes les 16ms
					setTimeout(function() {
						refPerso.testCollision();
					}, 100);
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
						// $('#contenu').css('width', refPerso.idle[frameFixed].w + "px");
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

				var jump = function() {

					$('#container').animate({
						'top': '-=300px'
					}, 200, function() {
						$(this).delay(500).animate({
							'top': '+=300px'
						}, 200);
					});

				};

				// var jumpUp = function() {
				// 	refPerso.isJumpingUp = true;
				// 	$('#container').animate({
				// 		'top': '-=7px'
				// 	}, 20)
				// 	if($('#container').position().top >= 200){
				// 		refPerso.isJumpingUp=false;
				// 	}

				// }
				// var jumpDown = function(){
				// 	$('#container').animate({
				// 		'top': '+=7px'
				// 	}, 20)


				// }

				var jumpMove = function() {

					$('#container').animate({
						'top': '-=300px',
						'left': '+=100px'
					}, 200, function() {
						$(this).delay(200).animate({
							'top': '+=300px',
							'left': '+=100px'
						}, 200);
					});

				};
				var tActuel;
				var tPrecedent;
				var frameMove = 0;
				var spriteJumping = function(actuel) {
					tActuel = actuel;
					tPrecedent = tPrecedent || actuel;

					var delai = tActuel - tPrecedent;

					if (delai > 70) {

						frameMove++;
						if (frameMove == refPerso.spriteX.length) {

							frameMove = 0;
						}
						$('#contenu').css('left', refPerso.spriteX[frameMove] + "px");
						$('#contenu').css('top', refPerso.spriteY[1] + "px");
						tPrecedent = tActuel;

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

				if (!refPerso.isRunning) {
					jump();
					// jumpUp();
				} else {
					jumpMove();
				}
				setTimeout(function() {
					// met a flase le jump a la fin du saut
					refPerso.isJumping = false;
				}, 900); // temps du saut
				spriteJumping();

			};
			// attaque au fusil
			this.RyuHaiduken = function() {
				this.isHaiduken = true;
				var tActuel;
				var tPrecedent;
				var frameHaiduken = 0;
				var refPerso = this;

				var spriteHaiduken = function(actuel) {

					tActuel = actuel;
					tPrecedent = tPrecedent || actuel;
					var delai = tActuel - tPrecedent;
					if (delai > 70) {
						frameHaiduken++;
						if (frameHaiduken == refPerso.spriteX.length) {
							frameHaiduken = 0;
						}

						$('#contenu').css('left', refPerso.spriteX[frameHaiduken] + "px");
						$('#contenu').css('top', refPerso.spriteY[3] + "px");
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
						// $('#container').animate({
						// 	'left': direction + vitesse + 'px'
						// }, vitesse);

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

						$('#contenu').css('left', refPerso.spriteX[frameRunning] + "px");
						$('#contenu').css('top', refPerso.spriteY[4] + "px");
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
					if (refPerso.isCrouching) {
						var animationRequestId = window.requestAnimationFrame(spriteCrouching);
						refPerso.enAttente = false;

					} else {
						refPerso.ruyFixed();
					}

				};
				spriteCrouching();
			};
		};



		//perso is ding