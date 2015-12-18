		// Coordonnée Perso

		
		/**
		 * [ObjetRyu fonction constructeur pour creer des héros]
		 */
		var ObjetRyu = function() {
			this.isJumping = false; // Frame Saut
			this.enAttente = true; // Frame idle
			this.isHaiduken = false; //Frame attack
			this.pixelY = 1;
			this.height = 80;
			this.width = 80;
			this.spriteWidth = 400;
			this.spriteWidth = 400;
			this.spriteHeight = 80;
			this.idle = [{
				x: 0,
				y: -240,
				w: 80,
				h: 80
			}, {
				x: -72,
				y: -240,
				w: 80,
				h: 80
			}, {
				x: -133,
				y: -240,
				w: 80,
				h: 80
			}, {
				x: -71,
				y: -240,
				w: 80,
				h: 80
			}];

			this.jump = [{
				x: 0,
				y: -640,
				w: 80,
				h: 80
			}, {
				x: -72,
				y: -640,
				w: 80,
				h: 80
			}, {
				x: -133,
				y: -640,
				w: 80,
				h: 80
			}, {
				x: -204,
				y: -640,
				w: 80,
				h: 80
			}, {
				x: -275,
				y: -640,
				w: 80,
				h: 80
			}, {
				x: -346,
				y: -640,
				w: 80,
				h: 80
			}, {
				x: -417,
				y: -640,
				w: 80,
				h: 80
			}];

			this.haiduken = [{
				x: 0,
				y: 0,
				w: 80,
				h: 80
			}, {
				x: -65,
				y: 0,
				w: 80,
				h: 80
			}, {
				x: -133,
				y: 0,
				w: 80,
				h: 80
			}, {
				x: -213,
				y: 0,
				w: 80,
				h: 80
			}];


		};

		var perso; // Prototype du joueur 

		// Perso Idle
		var ruyFixed = function() {

			var frameFixed = 0;
			perso.isJumping = false;
			var tActuel;
			var tPrecedent;
			var animate = function(actuel) {

				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;
				var delai = tActuel - tPrecedent;

				if (delai > 200) {

					tPrecedent = tActuel;
					// console.log(delai);
					// console.log(frameFixed);
					// tPrecedent = tActuel;
					frameFixed++;
					if (frameFixed == perso.idle.length) {
						frameFixed = 0;
					}

					$('#contenu').css('left', perso.idle[frameFixed].x + "px");
					$('#contenu').css('top', perso.idle[frameFixed].y + "px");
					// $('#contenu').css('width', perso.idle[frameFixed].w + "px");
					// $('#contenu').css('height', perso.idle[frameFixed].h + "px");

				}

				if (perso.enAttente) {
					window.requestAnimationFrame(animate);
				}
			};
			animate();
		};

		// Saut Perso
		var RyuMove = function() {
			perso.isJumping = true;
			perso.enAttente = false;
			var tActuel;
			var tPrecedent;
			var frameMove = 0;

			var jump = function() {
				$('#container').animate({
					'top': '-=300px'
				}, 200, function() {
					$(this).delay(500).animate({
						'top': '+=300px'
					}, 200);
				});
			};
			jump();

			var spriteJumping = function(actuel) {

				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;

				var delai = tActuel - tPrecedent;

				if (delai > 200) {
					// console.log(delai);
					// console.log(frame);
					// tPrecedent = tActuel;
					frameMove++;
					if (frameMove == perso.jump.length) {
						frameMove = 0;
					}
					$('#contenu').css('left', perso.jump[frameMove].x + "px");
					$('#contenu').css('top', perso.jump[frameMove].y + "px");
					tPrecedent = tActuel;

				}
				if (perso.isJumping) {
					var animationRequestId = window.requestAnimationFrame(spriteJumping);
					perso.isJumping = true;
					perso.enAttente = false;
				}

			};
			spriteJumping();
		};

		var RyuHaiduken = function() {
			// perso.isJumping = true;
			// perso.enAttente = false;
			var tActuel;
			var tPrecedent;
			var frameHaiduken = 0;
			var spriteHaiduken = function(actuel) {


				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;

				var delai = tActuel - tPrecedent;

				if (delai > 200) {
					// console.log(delai);

					// console.log(frame);
					// tPrecedent = tActuel;
					frameHaiduken++;
					if (frameHaiduken == perso.haiduken.length) {
						frameHaiduken = 0;
					}

					$('#contenu').css('left', perso.haiduken[frameHaiduken].x + "px");
					$('#contenu').css('top', perso.haiduken[frameHaiduken].y + "px");
					tPrecedent = tActuel;

				}
				// if (!perso.isHaiduken) {
				var animationRequestId = window.requestAnimationFrame(spriteHaiduken);
				perso.isHaiduken = true;
				// }

			};


		};