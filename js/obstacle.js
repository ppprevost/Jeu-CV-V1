// pour tester les collisions je mets les objets obstacles dans ce tableau. Nous testerons par la suite les collisions avec l'usine Bullet
var tabObstacle = [];

var usineObstacle = function(random) {

	var obs = document.createElement('div');
	var img = document.createElement('img');
	img.style.position = "absolute";
	obs.style.zIndex = "6";
	var colisionPositionPersoX = $('#container').position().left;
	var colisionPositionPersoY = $('#container').position().top;

	var ReferenceDinosaur = {
		step: Math.round(Math.random() * 10) + 1, //c'est une soustraction qui lance l'animation si = 0 pas de déplacement !!!
		x: window.innerWidth,
		energie: null,
		y: null,
		src: null,
		className: null,
		spriteX: null,
		spriteXDead: null,
		spriteY: null,
		width: null,
		height: null,
		alive: true, // lance la methode boum et a la methode moveDinosaur qui va permettre de declencher le sprite correspondant en fonction de l'etat

		elementHTML: obs,
		creation: function() { // on crée le dinosaur et on lui affecte une position initial et ses sprites
			document.body.appendChild(this.elementHTML);
			this.elementHTML.style.top = this.y + "px";
			this.elementHTML.style.left = this.x + "px";
			this.elementHTML.appendChild(img);

			if (this.choix !== undefined && this.visuel !== undefined) {
				// methode pour la creation du visuel raptor
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

			if (this.className == 'containerPtero') {
				document.getElementById('ptero').play();
			} else if (this.className == 'containerRaptor') {
				document.getElementById('raptor').play();
			} else if (this.className == 'containerDiplo') {
				document.getElementById('diplo').play();
			}

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
					if (dino.alive) { // s'il est vivant alors sprite Run
						if (frame == dino.spriteX.length) {
							frame = 0;
						}
						$(img).css('top', dino.spriteY[0]);
						$(img).css('left', dino.spriteX[frame] + "px");
					} else { // s'il est mort alors sprite dead

						if (frame == dino.spriteX.length) {

						}
						$(img).css('top', dino.spriteY[1]);
						$(img).css('left', dino.spriteXDead[frame] + "px");
					}
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

			}

			window.requestAnimationFrame(function() {
				animation.animate();
			});
			return this;
		},
		boum: function() {
			//alive// stop la methode animate et lance la methode boum


			this.energie -= 60;
			if (this.energie <= 0) {
				this.alive = false;
				perso.score -= this.energie * 200;
				$('#score').text(perso.score);
				// on supprime l'element dans la memoire et on le supprime du tableau ! Attention cela va de pair car si l'on ne supprime pas du tableau, les objets prennent du temps a se supprimer ( et donc conflit avec les balles) et si l'on supprime uniquement de la memoire , le tableau s'incrémente de undefined a l'inifi et risque de fuite memoire
				for (i in tabObstacle) {
					if (tabObstacle[i] == this) {
						delete tabObstacle[i];
						tabObstacle.splice(i, 1);
					}
				}
				// lancer l'animation dead  puis le supprimer du DOM

				$(this.elementHTML).fadeOut(2000, function() {
					$(this.elementHTML).remove();
				});
			}
		},
		boumD: function() {

			$('#score').text(perso.score);
			for (var i = 0; i < tabObstacle.length; i++) {
				tabObstacle[i].energie -= 500;
				if (tabObstacle[i].energie <= 0) {
					// this.alive = false;

					$(tabObstacle[i].elementHTML).fadeOut(2000, function() {
						$(tabObstacle[i].elementHTML).remove();
						tabObstacle[i].alive = false;
						delete tabObstacle[i];
						tabObstacle.splice(0, tabObstacle.length);
					})
				}
			}



		},
		chainage: function() {
			if (this.className != 'spike') { // spike ne possede pas la methode move Dinosaur
				this.creation().animate().moveDinosaur();
			} else {
				this.creation().animate()
			}
		}

	};

	/////
	//Diplo //
	/////

	var referenceDiplo = Object.create(ReferenceDinosaur);

	referenceDiplo.y = 410;
	referenceDiplo.spriteXDead = [0, -228, -456, -684, -912, -1140, -1368, -1596, -1824, -2052];
	referenceDiplo.energie = 100;
	referenceDiplo.src = 'img/Dino/diplo.png';
	referenceDiplo.className = 'containerDiplo';
	referenceDiplo.spriteX = [0, -228, -456, -684, -912, -1140, -1368, -1596];
	// 	//0 -> Attack  -100 -> Run
	referenceDiplo.spriteY = [0, -150, -300, -450];
	referenceDiplo.width = 228;
	referenceDiplo.height = 150;
	referenceDiplo.classSon = 'diplo';


	var referenceRaptor = Object.create(ReferenceDinosaur);

	/////
	//Raptor //
	/////
	referenceRaptor.y = 410;
	referenceRaptor.energie = 200;
	referenceRaptor.src = 'img/Dino/';
	referenceRaptor.visuel = ['pachy.png', 'raptor-bleu.png', 'raptor-vert.png'];
	referenceRaptor.className = "containerRaptor";
	referenceRaptor.spriteX = [0, -249, -498, -747, -996, -1245, -1494, -1743];
	referenceRaptor.spriteXDead = [0, -249, -498, -747, -996, -1245, -1494, -1743, -1992, -2241];
	//0 -> Attack  -100 -> Run
	referenceRaptor.spriteY = [0, -150, -300, -450];
	referenceRaptor.width = 249;
	referenceRaptor.height = 150;
	referenceRaptor.choix = Math.round(Math.random() * 2);
	referenceRaptor.idSon = 'raptor';


	/////
	//Pterodactyle //
	/////
	var referencePtero = Object.create(ReferenceDinosaur);

	referencePtero.y = 282;
	referencePtero.energie = 60;
	referencePtero.src = "img/Dino/ptero.png";
	referencePtero.className = 'containerPtero';
	referencePtero.spriteX = [0, -128, -256, -384, -512];
	// 	//0 -> Attack  -100 -> Run
	referencePtero.spriteY = [0, -100];
	referencePtero.spriteXDead = [];
	referencePtero.width = 128;
	referencePtero.height = 100;
	referencePtero.idSon = "ptero";

	/////
	//Peaks //
	/////
	var referencePeaks = Object.create(ReferenceDinosaur);

	referencePeaks.y = 421;
	referencePeaks.energie = 500;
	referencePeaks.src = "img/dino/Spike.png";
	referencePeaks.className = "spike"
	referencePeaks.width = 128;
	referencePeaks.height = 128;
	referencePeaks.step = 3


	// Retour de l'objet en fonction de math random
	if (random == 1) {
		tabObstacle.push(referenceDiplo);
		return referenceDiplo;

	} else if (random == 2) {
		tabObstacle.push(referencePtero);
		return referencePtero;

	} else if (random == 3) {
		tabObstacle.push(referencePeaks)
		return referencePeaks;
	} else {
		tabObstacle.push(referenceRaptor);
		return referenceRaptor;
	}


}; // fin de la fonction usine


var creationObstacle = function() {


	setInterval(function() {
		var typeObstacle = Math.round(Math.random() * 4);
		var nouvelObstacle = usineObstacle(typeObstacle).chainage();
	}, 2000)

};

//fonction usine balle

var usineBullet = function() {
	var obs = document.createElement('div');
	var img = document.createElement('img');

	var ObjetBullet = {

		elementHTML: obs,
		spriteItemY: [0, -13],
		src: 'img/item.png',
		x: $('#container').position().left + 100,
		y: $('#container').position().top + 45,
		width: null,
		height: null,
		// 0 --> bullet  

		creation: function() {
			$('#game').append($(this.elementHTML));
			$(this.elementHTML).addClass(this.className);

			//Play sound when you pull the trigger
			if (this.className == 'containerBullet') {
				var sonRifle = document.getElementsByClassName('rifle');
				for (var i = 0; i < sonRifle.length; i++) {
					sonRifle[i].pause()
					sonRifle[i].currentTime = 0;
					sonRifle[i].play()
				}

			}

			// astuce : on peut viser l'element par sa classe ou bien par this.elementHTML . Ici je choisis la classe
			$('.' + this.className).append(img);


			//probleme image dynamite qui s'affichait pas bien ! 
			$(img).css({
				'position': 'absolute',
				'top': '-13px'
			});

			$('.bullet').css({
				'position': 'absolute'
			});

			img.setAttribute('src', this.src);
			// if the hero is Crouching and want to shoot ! 
			if (perso.isCrouching) {
				$(this.elementHTML).css({
					'overflow': 'hidden',
					'width': this.width + 'px',
					'height': this.height + 'px',
					'position': 'absolute',
					'left': this.x + 'px', // retranchement des valeurs des positions du hero
					'top': this.y + 30 + 'px',
					'z-index': '100'

				});
				// if the hero want to shoot and jump ! 
				if (perso.isJumping) {
					$(this.elementHTML).css({
						'overflow': 'hidden',
						'width': this.width + 'px',
						'height': this.height + 'px',
						'position': 'absolute',
						'left': this.x + 'px', // retranchement des valeurs des positions du hero
						'top': this.y + 'px',
						'z-index': '100'
					});
				}

			} else {
				$(this.elementHTML).css({
					'overflow': 'hidden',
					'width': this.width + 'px',
					'height': this.height + 'px',
					'position': 'absolute',
					'left': this.x + 'px', // retranchement des valeurs des positions du hero
					'top': this.y + 'px',
					'z-index': '100'

				});
			}

			return this;
		},
		//sprite bullet
		moveBullet: function() {
			var objetBullet = this // pour avoir une reference a l'objet meme dans une fonction 
			var tActuel;
			var tPrecedent;
			var frameBullet = 0;
			var spriteBullet = function(actuel) {
				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;

				var delai = tActuel - tPrecedent;

				if (objetBullet.className == 'containerBullet') {

					// if Bullet
					if (delai > 50) {

						frameBullet++;
						if (frameBullet == objetBullet.spriteItemX.length) {

							frameBullet = 0;
						}
						$(img).css('left', objetBullet.spriteItemX[frameBullet] + "px");

						$(img).css('top', objetBullet.spriteItemY[0] + "px");

						tPrecedent = tActuel;

					}
				} else {
					//if dynamite

					if (delai > 300) {

						frameBullet++;
						if (frameBullet == objetBullet.spriteItemX.length) {

							frameBullet = 0;
						}
						$(img).css('left', objetBullet.spriteItemX[frameBullet] + "px");



						$(img).css('top', '-13px');

						tPrecedent = tActuel;

					}

				}

				var animationRequestId = window.requestAnimationFrame(spriteBullet);

			};
			spriteBullet();
			return this;
		},

		collisionObstacle: function() {
			//On parcourt le tableau d'obstacle et si on trouve un obstacle aux prochaines coordonnées de la balle on le supprimer ou on déclenche une méthode qui le supprime.

			for (var i = 0; i < tabObstacle.length; i++) {
				if (tabObstacle[i] !== undefined) { // s'il existe et qu'il est vivant alors detection collision avec bullet

					if (this.x + this.width >= tabObstacle[i].x && this.x + this.width <= tabObstacle[i].x + tabObstacle[i].width &&
						// tester avec la valeur de height
						this.y + this.height >= tabObstacle[i].y && this.y + this.height <= tabObstacle[i].y + tabObstacle[i].height)

					{
						// si dino derriere alors il peut quand meme tirer 
						// ObjetBullet <= dino.x ca marche pas si derriere
						if (perso.isDynamiting) {
							tabObstacle[i].boumD();
						} else {
							tabObstacle[i].boum();
						}

						return true;
					}

				}
			}

		},

		animate: function() {
			var objetBullet = this
			if (this.collisionObstacle()) {

				if (perso.isDynamiting) {

					usineExplode().creation().animate()

				}
				//suppression de la balle
				$(this.elementHTML).remove();
				delete this;

			} else {
				this.x += 15;

				$(this.elementHTML).css('left', this.x);

				if ($(this.elementHTML).position().left >= $(window).width()) {
					$(this.elementHTML).remove();
				}

				window.requestAnimationFrame(function() {
					objetBullet.animate();
				});

			}
			return this;
		},


	}; // fin de objet parent


	var Bullet = Object.create(ObjetBullet);

	Bullet.className = 'containerBullet';
	Bullet.spriteItemX = [0, -29, -58, -87, -116, -145, -174, -203, -232, -261];

	Bullet.width = 29;
	Bullet.height = 13;

	var Dynamite = Object.create(ObjetBullet);

	Dynamite.className = 'containerDynamite';
	Dynamite.spriteItemX = [0, -51, -102, -153, -204];
	Dynamite.width = 51;
	Dynamite.height = 38;
	Dynamite.y = $('#container').position().top + 40;
	Dynamite.x = $('#container').position().left + 20;


	if (perso.isDynamiting) {
		return Dynamite;
	} else {
		return Bullet;
	}

};

var ObjetBalleEnMouvement = function() {
	usineBullet().creation().moveBullet().animate();
};



var usineExplode = function() {
	var obs = document.createElement('div');
	var img = document.createElement('img');

	var Explode = {

		elementHTML: obs,
		spriteItemY: [0, -13],
		src: 'img/dynamite.png',
		x: tabObstacle.x,
		className: 'Explode',
		y: tabObstacle.y,
		width: 198,
		spriteX: [0, -198, -396, -594, -792, -980],
		height: 173,
		// 0 --> bullet  

		creation: function() {
			for (var i = 0; i < tabObstacle.length; i++) {
				$('#game').append($(this.elementHTML));
				$(this.elementHTML).addClass(this.className);
				$('.' + this.className).append(img);
				img.setAttribute('src', this.src);


				$(this.elementHTML).css({
					'overflow': 'hidden',
					'width': this.width + 'px',
					'height': this.height + 'px',
					'position': 'absolute',
					'left': tabObstacle[i].x + 'px', // retranchement des valeurs des positions du hero
					'top': tabObstacle[i].y + 'px',
					'z-index': '800'

				});

			};

			$(img).css({
				'position': 'absolute',

			});

			return this;
		},
		animate: function() {
			var tActuel;
			var tPrecedent;
			var frame = 0;
			var that = this; // correspond bien a l'objet a l'interieur de la fonction
			var spriteExplode = function(actuel) {
				// console.log(this); // correspond a rien ou a la methode qui n'est pas un objet 
				tActuel = actuel;
				tPrecedent = tPrecedent || actuel;
				var delai = tActuel - tPrecedent;
				if (delai > 200) {
					tPrecedent = tActuel;
					frame++;
					// s'il est vivant alors sprite Run
					if (frame == that.spriteX.length) {

					}
					$(img).css('top', 0);
					$(img).css('left', that.spriteX[frame] + "px");

				}

				window.requestAnimationFrame(spriteExplode);

			};
			spriteExplode();
			//Explosion sound 

			document.getElementById('explosion').play();


			if (!tabObstacle.alive) {
				$(this.elementHTML).fadeOut(1000, function() {
					$(this.elementHTML).remove();
				})
			}

		}


	};
	return Explode
};