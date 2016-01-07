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
			this.isCrouching = false; // Frame se baisser
			this.spriteHeight = 80;
			this.src = 'img/test.png';
			this.energie = 100;
			this.spriteX = [0, -116, -232, -348, -464, -580, -696, -812, -928, -1044]; // coordonnées X des sprites pour 10 frames 
			// 0 -> walk -100 -> Jump -200 -> Crouch -300 -> Walk Shoot  -400 -> Run
			this.spriteY = [0, -100, -200, -300, -400]; //bullet
		// Perso Idle
			this.ruyFixed = function() {
				this.enAttente = true;
				var frameFixed = 0;
				var tActuel;
				var tPrecedent;

				var Perso = this; // reference à l'objet
				var animate = function(actuel) {

					tActuel = actuel;
					tPrecedent = tPrecedent || actuel;
					var delai = tActuel - tPrecedent;

					if (delai > 70) {
						
						tPrecedent = tActuel;

						frameFixed++;
						if (frameFixed == Perso.spriteX.length) {
							frameFixed = 0;
						}

						$('#contenu').css('left', Perso.spriteX[frameFixed] + "px");
						$('#contenu').css('top', Perso.spriteY[0] + "px");
						// $('#contenu').css('width', Perso.idle[frameFixed].w + "px");
						// $('#contenu').css('height', Perso.idle[frameFixed].h + "px");

					}
					if (this.enAttente) {
						window.requestAnimationFrame(animate);
						
					}
				};
				animate();

			};








		};



		// Perso Idle
		// var perso.ruyFixed = function() {
		// 	perso.enAttente = true;

		// 	var frameFixed = 0;

		// 	var tActuel;
		// 	var tPrecedent;
		// 	var animate = function(actuel) {

		// 		tActuel = actuel;
		// 		tPrecedent = tPrecedent || actuel;
		// 		var delai = tActuel - tPrecedent;

		// 		if (delai > 70) {

		// 			tPrecedent = tActuel;

		// 			frameFixed++;
		// 			if (frameFixed == perso.spriteX.length) {
		// 				frameFixed = 0;
		// 			}

		// 			$('#contenu').css('left', perso.spriteX[frameFixed] + "px");
		// 			$('#contenu').css('top', perso.spriteY[0] + "px");
		// 			// $('#contenu').css('width', perso.idle[frameFixed].w + "px");
		// 			// $('#contenu').css('height', perso.idle[frameFixed].h + "px");

		// 		}

		// 		if (perso.enAttente) {
		// 			window.requestAnimationFrame(animate);
		// 			perso.isHaiduken = false;

		// 		}
		// 	};


		// 	animate();

		// };

		// Saut Perso
		var RyuMove = function() {
			perso.isJumping = true;


			var jump = function() {

				$('#container').animate({
					'top': '-=300px'
				}, 200, function() {
					$(this).delay(500).animate({
						'top': '+=300px'
					}, 200);
				});

			};
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
					// console.log(delai);
					// console.log(frame);
					// tPrecedent = tActuel;
					frameMove++;
					if (frameMove == perso.spriteX.length) {

						frameMove = 0;
					}
					$('#contenu').css('left', perso.spriteX[frameMove] + "px");
					$('#contenu').css('top', perso.spriteY[1] + "px");
					tPrecedent = tActuel;

				}
				if (perso.isJumping) {
					var animationRequestId = window.requestAnimationFrame(spriteJumping);
					perso.enAttente = false;
					perso.isHaiduken = false;
					//remise a 0
				} else {
					perso.ruyFixed();
				}

			};

			if (!perso.isRunning) {
				jump();
			} else {
				jumpMove();
			}
			setTimeout(function() {
				// met a flase le jump a la fin du saut
				perso.isJumping = false;
			}, 900); // temps du saut
			spriteJumping();

		};



		// attaque au fusil
		var RyuHaiduken = function() {


			perso.isHaiduken = true;

			var tActuel;
			var tPrecedent;
			var frameHaiduken = 0;



			var spriteHaiduken = function(actuel) {

				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;

				var delai = tActuel - tPrecedent;

				if (delai > 70) {

					frameHaiduken++;
					if (frameHaiduken == perso.spriteX.length) {
						frameHaiduken = 0;
					}

					$('#contenu').css('left', perso.spriteX[frameHaiduken] + "px");
					$('#contenu').css('top', perso.spriteY[3] + "px");
					tPrecedent = tActuel;


				}
				if (perso.isHaiduken) {
					var animationRequestId = window.requestAnimationFrame(spriteHaiduken);

					perso.enAttente = false;


				} else {
					perso.ruyFixed();
				}

			};
			spriteHaiduken();
			setTimeout(function() {
				perso.isHaiduken = false;
			}, 300)
		};



		// Running right
		var RyuRunning = function(direction, vitesse) {

			perso.isRunning = true;

			var tActuel;
			var tPrecedent;
			var frameRunning = 0;

			var spriteRunning = function(actuel) {

				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;

				var delai = tActuel - tPrecedent;

				if (delai > 70) {
					$('#container').animate({
						'left': direction + vitesse + 'px'
					}, vitesse);
					frameRunning++;
					if (frameRunning == 8) {
						frameRunning = 0;
					}

					$('#contenu').css('left', perso.spriteX[frameRunning] + "px");
					$('#contenu').css('top', perso.spriteY[4] + "px");
					tPrecedent = tActuel;

				}
				if (perso.isRunning) {
					var animationRequestId = window.requestAnimationFrame(spriteRunning);

					perso.enAttente = false;

				} else {
					perso.ruyFixed();
				}

			};
			spriteRunning();
		};

		// Running right
		var RyuRunningLeft = function(vitesse) {

			perso.isRunning = true;

			var tActuel;
			var tPrecedent;
			var frameRunning = 0;

			var spriteRunning = function(actuel) {

				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;

				var delai = tActuel - tPrecedent;

				if (delai > 70) {
					$('#container').animate({
						'left': '-=4px'
					}, vitesse);
					frameRunning++;
					if (frameRunning == 8) {
						frameRunning = 0;
					}

					$('#contenu').css('left', perso.spriteX[frameRunning] + "px");
					$('#contenu').css('top', perso.spriteY[4] + "px");
					tPrecedent = tActuel;

				}
				if (perso.isRunning) {
					var animationRequestId = window.requestAnimationFrame(spriteRunning);

					perso.enAttente = false;

				} else {
					perso.ruyFixed();
				}

			};
			spriteRunning();
		};



		//perso is crouching
		var RyuCrouching = function() {

			perso.isCrouching = true;

			var tActuel;
			var tPrecedent;
			var frameCrouching = 0;
			var spriteCrouching = function(actuel) {
				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;

				var delai = tActuel - tPrecedent;

				if (delai > 70) {
					frameCrouching++;
					if (frameCrouching == perso.spriteX.length) {
						frameCrouching = 0;
					}
					$('#contenu').css('left', perso.spriteX[frameCrouching] + "px");
					$('#contenu').css('top', perso.spriteY[2] + "px");
					tPrecedent = tActuel;
				}
				if (perso.isCrouching) {
					var animationRequestId = window.requestAnimationFrame(spriteCrouching);

					perso.enAttente = false;

				} else {
					perso.ruyFixed();
				}

			};
			spriteCrouching();
		};



		//perso is ding