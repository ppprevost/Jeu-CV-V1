var tabObstacle = [];

var usineObstacle = function(random) {

	var obs = document.createElement('div');
	var img = document.createElement('img');
	img.style.position = "absolute";
	obs.style.zIndex = "6";
	var colisionPositionPersoX = $('#container').position().left;
	var colisionPositionPersoY = $('#container').position().top;

	var referenceDinosaur = {
		step: Math.round(Math.random() * 10) + 1,
		//c'est une soustraction qui lance l'animation si = 0 pas de déplacement !!!
		x: window.innerWidth,
		energie: null,
		y: null,
		src: null,
		className: null,
		spriteX: null,
		spriteY: null,
		width: null,
		height: null,

		elementHTML: obs,
		creation: function() { // on crée le dinosaur et on lui affecte une position initial et ses sprites
			document.body.appendChild(this.elementHTML);
			this.elementHTML.style.top = this.y + "px";
			this.elementHTML.style.left = this.x + "px";
			this.elementHTML.appendChild(img);

			if (this.choix != undefined && this.visuel != undefined) {
				img.setAttribute('src', this.src + this.visuel[this.choix]);
			} else {
				img.setAttribute('src', this.src);
			}
			$(this.elementHTML).addClass(this.className);
			$('.' + this.className).css({
				'z-index': '40',
				'position': 'absolute',
				'left': this.x + "px",
				'top': this.y + "px",
				'width': this.width + "px",
				'height': this.height + "px",
				'overflow': 'hidden'
			});

			/////
			//Dinosaur Frame  //
			/////

			return this; // pour le chainage de methode

		},
		moveDinosaur: function() {
			var tActuel;
			var tPrecedent;
			var frame = 0;
			var dino = this; // correspond bien a l'objet
			var spriteObstacle = function(actuel) {
				// console.log(this); // correspond a rien ou a la methode qui n'est pas un objet 
				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;
				var delai = tActuel - tPrecedent;
				if (delai > 100) {
					tPrecedent = tActuel;
					frame++;
					if (frame == dino.spriteX.length) {
						frame = 0;
					}
					$(img).css('left', dino.spriteX[frame] + "px");
					$(img).css('top', dino.spriteY[0]);
				}
				window.requestAnimationFrame(spriteObstacle);

			};
			spriteObstacle();
			return this;
		},
		// probleme de reference a l'objet ==> soit on fait une reference avec la var animation soir on sot de l'objet la methode. 

		animate: function() {
			this.x = this.x - this.step;
			this.elementHTML.style.left = this.x + 'px';
			this.elementHTML.style.top = this.y + 'px';
			var animation = this;
			if (this.x <= -80) {
				$(this.elementHTML).remove();
				for (i in tabObstacle) {
					if (tabObstacle[i] == this) {
						delete tabObstacle[i];
						tabObstacle.splice(i, 1);
					}
				}
				// for (var i = 0; i < tabObstacle.length; i++) {
				// 	// this et non pas this.elementHTML
				// 	if (tabObstacle[i] == this) {

				// 	}
				// }
			}
			this.alive = true; // sert a la methode boum

			window.requestAnimationFrame(function() {
				animation.animate();
			});
			return this;
		},
		boum: function() {
			// stop la methode animate et lance la methode boum

			this.energie -= 30;
			if (this.energie > 0) {
				this.alive = true;
			} else {
				this.alive = false;
				// on supprime l'element dans la memoire et on le supprime du tableau ! Attention cela va de pair car si l'on ne supprime pas du tableau, les objets prennent du temps a se supprimer ( et donc conflit avec les balles) et si l'on supprime uniquement de la memoire , le tableau s'incrémente de undefined a l'inifi et risque de fuite memoire
				for (i in tabObstacle) {
					if (tabObstacle[i] == this) {
						delete tabObstacle[i];
						tabObstacle.splice(i, 1);
					}
				}
				// cacher l'element puis le supprimer du DOM
				$(this.elementHTML).fadeOut(1000, function() {
					$(this.elementHTML).remove();
				});
			}
		},
		chainage: function() {
			this.creation().animate().moveDinosaur();
		}
	};

	/////
	//Diplo //
	/////

	var referenceDiplo = Object.create(referenceDinosaur);

	referenceDiplo.y = 410;
	referenceDiplo.energie = 100;
	referenceDiplo.src = 'img/Dino/diplo.png';
	referenceDiplo.className = 'containerDiplo';
	referenceDiplo.spriteX = [0, -228, -456, -684, -912, -1140, -1368, -1596];
	// 	//0 -> Attack  -100 -> Run
	referenceDiplo.spriteY = [0, -150, -300, -450];
	referenceDiplo.width = 228;
	referenceDiplo.height = 150;


	var referenceRaptor = Object.create(referenceDinosaur);

	/////
	//Raptor //
	/////
	referenceRaptor.y = 410;
	referenceRaptor.energie = 200;
	referenceRaptor.src = 'img/Dino/';
	referenceRaptor.visuel = ['pachy.png', 'raptor-bleu.png', 'raptor-vert.png'];
	referenceRaptor.className = "containerRaptor";
	referenceRaptor.spriteX = [0, -249, -498, -747, -996, -1245, -1494, -1743];
	//0 -> Attack  -100 -> Run
	referenceRaptor.spriteY = [0, -150, -300, -450];
	referenceRaptor.width = 249;
	referenceRaptor.height = 150;
	referenceRaptor.choix = Math.round(Math.random() * 2);


	/////
	//Pterodactyle //
	/////
	var referencePtero = Object.create(referenceDinosaur)

	referencePtero.y = 282;
	referencePtero.energie = 80;
	referencePtero.src = "img/Dino/ptero.png",
		referencePtero.className = 'containerPtero',
		referencePtero.spriteX = [0, -128, -256, -384, -512];
	// 	//0 -> Attack  -100 -> Run
	referencePtero.spriteY = [0, -100];
	referencePtero.width = 128;
	referencePtero.height = 100;


	if (random == 1) {
		tabObstacle.push(referenceDiplo);
		return referenceDiplo;

	} else if (random == 2) {
		tabObstacle.push(referencePtero);
		return referencePtero;
	} else {
		tabObstacle.push(referenceRaptor);
		return referenceRaptor;
	}
};


var creationObstacle = function() {

	setInterval(function() {
		var typeObstacle = Math.round(Math.random() * 2);

		// var nouvelObstacle = 
		usineObstacle(typeObstacle).chainage();
	}, 1000);

};

//fonction usine balle

var bulletHaiduken = function() {

	var obs = document.createElement('div');
	var img = document.createElement('img');


	var ObjetHaiduken = {
		x: $('#container').position().left + 100,
		y: $('#container').position().top + 45,
		className: 'containerBullet',
		src: 'img/item.png',
		spriteItemX: [0, -29, -58, -87, -116, -145, -174, -203, -232, -261],
		spriteItemY: [0], //balle 
		width: 29,
		height: 13,
		elementHTML: obs,

		creation: function() {
			$('#game').append($(this.elementHTML));
			$(this.elementHTML).addClass(this.className);
			$(this.elementHTML).append('<audio autoplay><source src="son/fusil.mp3"><source src="son/fusil.ogg"></audio>');
			$('.containerBullet').append(img);

			$('.bullet').css({
				'position': 'absolute'
			});

			img.setAttribute('src', this.src);
			$('.containerBullet').css({
				'overflow': 'hidden',
				'width': this.width + 'px',
				'height': this.height + 'px',
				'position': 'absolute',
				'left': this.x + 'px', // retranchement des valeurs des positions du hero
				'top': this.y + 'px'

			});

			//sprite bullet
			var moveBullet = function() {

				var tActuel;
				var tPrecedent;
				var frameBullet = 0;
				var spriteBullet = function(actuel) {
					tActuel = actuel;
					tPrecedent = tPrecedent || actuel;

					var delai = tActuel - tPrecedent;

					if (delai > 50) {
						frameBullet++;
						if (frameBullet == ObjetHaiduken.spriteItemX.length) {
							frameBullet = 0;
						}
						$(img).css('left', ObjetHaiduken.spriteItemX[frameBullet] + "px");
						$(img).css('top', ObjetHaiduken.spriteItemY[0] + "px");
						tPrecedent = tActuel;


					}
					// if (perso.isHaiduken) {
					var animationRequestId = window.requestAnimationFrame(spriteBullet);

					// }
				};
				spriteBullet();

			};
			moveBullet()
			return this;
		}

	};

	ObjetHaiduken.collisionObstacle = function() {
		//On parcourt le tableau d'obstacle et si on trouve un obstacle aux prochaines coordonnées de la balle on le supprimer ou on déclenche une méthode qui le supprime.

		for (var i = 0; i < tabObstacle.length; i++) {
			if (tabObstacle[i] != undefined) { // s'il existe et qu'il es vivant alors detection collision avec bullet
				if (ObjetHaiduken.x + ObjetHaiduken.width >= tabObstacle[i].x && ObjetHaiduken.x + ObjetHaiduken.width <= tabObstacle[i].x + tabObstacle[i].width) {
					// si dino derriere alors il peut quand meme tirer 
					// ObjetHaiduken <= dino.x ca marche pas si derriere

					tabObstacle[i].boum();

					return true;
				}
			}
		}

	};

	ObjetHaiduken.animate = function() {
		if (this.collisionObstacle()) {

			//suppression de la balle
			$(this.elementHTML).remove();
			delete this;

		} else {
			ObjetHaiduken.x += 15;
			$(this.elementHTML).css('left', ObjetHaiduken.x);

			if ($(this.elementHTML).position().left >= $(window).width()) {
				$(this.elementHTML).remove();

			}
			window.requestAnimationFrame(function() {
				ObjetHaiduken.animate();
			});
		}
	};

	return ObjetHaiduken;

};