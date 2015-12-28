window.requestAnimFrame = window.requestAnimationFrame || // La forme standardisée
	window.webkitRequestAnimationFrame || // Pour Chrome et Safari
	window.mozRequestAnimationFrame || // Pour Firefox
	window.oRequestAnimationFrame || // Pour Opera
	window.msRequestAnimationFrame || // Pour Internet Explorer
	function(callback) { // Pour les élèves du dernier rang
		window.setTimeout(callback, 1000 / 60);
	};



// Fonction Constructeur dessin : 

//  var InitDraw = function(url){
//  	var draw = document.createElement('img');
//  	draw.src = "img/"+ url ; 
//  	draw.style.position = "absolute";
//  }

var ObjetRyu = null;
var perso;

$('document').ready(function() {



	/////
	// Bush//
	/////
	var bushUncoin = function() {

		var bush = document.createElement('img');
		$(bush).attr('src', 'img/buisson.png');
		$(bush).css({
			'z-index': '5',
			'position': 'absolute',
		});


		var reference = {
			y: 329,
			x: 10,
			width: 100,
			height: 100,
			borderWidth: 5,
			elementHTML: bush,
			creation: function() {
				this.elementHTML.style.top = this.y + "px";
				this.elementHTML.style.left = this.x + "px";
				document.body.appendChild(this.elementHTML);
				return this;
			}
		};
		// on ne peut pas utitliser le nom de la reference dans l'objet crée
		reference.animate = function() {
			reference.x--;
			if (reference.x <= -1004) {
				reference.x = 0;

			}
			reference.elementHTML.style.left = reference.x + 'px';
			window.requestAnimationFrame(function() {
				reference.animate();
			});

		};

		return reference;
	};

	bushUncoin().creation().animate();



	/////
	//Nuage //
	/////

	var usineNuage = function() {

		var nuage = document.createElement('img');
		nuage.src = "img/Nuage.png";
		nuage.style.position = "absolute";


		var referenceNuage = {
			y: Math.floor(Math.random() * 300),
			step: Math.random() * 10,
			x: 2000,
			width: 100,
			height: 100,
			borderWidth: 5,
			elementHTML: nuage,
			creation: function() {
				$('.nuage').append(this.elementHTML);
				this.elementHTML.style.top = this.y + "px";
				this.elementHTML.style.left = this.x + "px";
				return this;
			}
		};

		referenceNuage.animate = function() {

			referenceNuage.x = referenceNuage.x - referenceNuage.step;


			if (referenceNuage.x <= -4) {
				referenceNuage.x = window.innerWidth; //taille de la fenetre
				referenceNuage.y = Math.floor(Math.random() * 300);
			}
			referenceNuage.elementHTML.style.left = referenceNuage.x + 'px';
			referenceNuage.elementHTML.style.top = referenceNuage.y + 'px';
			window.requestAnimationFrame(function() {
				referenceNuage.animate();

			});

		};

		return referenceNuage;
	};

	var Clouds = [usineNuage(), usineNuage(), usineNuage()];

	/////
	//Tuyau //
	/////



	var usineObstacle = function(random) {

		var obs = document.createElement('img');
		obs.style.position = "absolute";
		obs.style.zIndex = "6"
			// var randomTuyau = function(){

		// 	Math.random
		// 	if (0){
		// 		petit tuyau
		// 	} else {
		// 		tuyau gris
		// 	}
		// }

		var referenceTuyau = {
			y: 282,
			step: Math.random() * 10,
			stepy: Math.random() * 5,
			x: 2000,
			src: 'img/petit-tuyau.png',
			width: 100,
			height: 100,
			elementHTML: obs,
			creation: function() {
				document.body.appendChild(this.elementHTML);
				this.elementHTML.style.top = this.y + "px";
				this.elementHTML.style.left = this.x + "px";
				this.elementHTML.setAttribute('src', this.src);
				return this;


			}
		};

		referenceTuyau.animate = function() {
			referenceTuyau.x = referenceTuyau.x - referenceTuyau.step;
			// referenceTuyau.y = referenceTuyau.y - referenceTuyau.stepy;

			// if (referenceTuyau.x < parseFloat(container.style.left)) {
			// 	alert('aie');
			// } 

			if (referenceTuyau.x <= 0) {
				$(this.elementHTML).remove();
				// referenceTuyau.y = Math.floor(Math.random() * 300);
			}
			referenceTuyau.elementHTML.style.left = referenceTuyau.x + 'px';
			referenceTuyau.elementHTML.style.top = referenceTuyau.y + 'px';
			window.requestAnimationFrame(function() {
				referenceTuyau.animate();
			});
			return this;
		};

		var referenceTuyauGris = {
			y: 282,
			step: Math.random() * 10,
			stepy: Math.random() * 5,
			numero: "",
			x: 2000,
			width: 100,
			src: "img/tuyau-gris.png",
			height: 100,
			borderWidth: 5,
			elementHTML: obs,
			creation: function() {
				document.body.appendChild(this.elementHTML);
				this.elementHTML.style.top = this.y + "px";
				this.elementHTML.style.left = this.x + "px";
				this.elementHTML.setAttribute('src', this.src);

				return this;
			}
		};



		var referenceBee = {
			y: 82,
			step: Math.random() * 10,
			stepy: Math.random() * 5,
			numero: "",
			x: 2000,
			width: 100,
			src: "img/abeille.png",
			height: 100,
			borderWidth: 5,
			elementHTML: obs,
			creation: function() {
				document.body.appendChild(this.elementHTML);
				this.elementHTML.style.top = this.y + "px";
				this.elementHTML.style.left = this.x + "px";
				this.elementHTML.setAttribute('src', this.src);

				return this;
			}
		};

		referenceBee.animate = function() {

			referenceBee.x = referenceBee.x - referenceBee.step;
			// referenceBee.y = referenceBee.y - referenceBee.stepy;

			// if (referenceBee.x < parseFloat(container.style.left)) {
			// 	alert('aie');
			// } 

			if (referenceBee.x <= 0) {
				$(this.elementHTML).remove();

				// referenceBee.y = Math.floor(Math.random() * 300);
			}
			referenceBee.elementHTML.style.left = referenceBee.x + 'px';
			referenceBee.elementHTML.style.top = referenceBee.y + 'px';
			window.requestAnimationFrame(function() {
				referenceBee.animate();
			});
			return this;
		};

		//request animation frame pour le sinus 
		referenceBee.sinus = function() {
			var start, xf = 0;
			var animation = function(timestamp) {
				start = (start) ? start : timestamp;
				var delay = timestamp - start;
				if (delay > 20) {
					referenceBee.elementHTML.style.top = Math.sin(xf * Math.PI / 200) * 268 + 82 + 'px';
					xf += 2.4;
					referenceBee.x += 5;
					referenceBee.elementHTML.style.left = referenceBee.x + 'px';
					start = timestamp;
				}
				if (xf <= 200) {
					requestAnimationFrame(animation);
				}
			}
			requestAnimationFrame(animation);
			// referenceBee.x = referenceBee.x - referenceBee.step;
			// referenceBee.y = referenceBee.y - referenceBee.stepy;

			// if (referenceBee.x < parseFloat(container.style.left)) {
			// 	alert('aie');
			// } 

			if (referenceBee.x <= 0) {
				$(this.elementHTML).remove();

				// 	// referenceBee.y = Math.floor(Math.random() * 300);
				// }
				// referenceBee.elementHTML.style.left = referenceBee.x + 'px';
				// window.requestAnimationFrame(function() {
				// 	referenceBee.animate();
				// });

			};

		};

		if (random == 1) {
			return referenceTuyau;

		} else if (random == 2) {
			return referenceBee;
		} else {
			return referenceTuyauGris;
		}
	};

	// var Obstacle = [usineObstacle(0), usineObstacle(1), usineObstacle()];

	var creationObstacle = function() {

		setInterval(function() {
			var typeObstacle = Math.round(Math.random() * 2);

			// if (usineObstacle(typeObstacle).sinus() != undefined) {

			// 	var nouvelObstacle = usineObstacle(typeObstacle).creation().animate().sinus();
			// 	console.log(nouvelObstacle);
			// } else {
			var nouvelObstacle = usineObstacle(typeObstacle).creation().animate();
			// }
			// juste des abeilles
			// var nouvelObstacle = usineObstacle(2).creation().animate().sinus;
		}, 3000);

	};

	creationObstacle();

	/////
	//Ryu //
	/////
	///


	//pourrait etre dezhors!! 
	ObjetRyu = function() {
		this.isJumping = false;
		this.enAttente = true;
		this.isHaiduken = false;
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



	perso = new ObjetRyu();
	// Positionnement générale de ryu! 
	// $('document').append($('#container'));
	$('#contenu').wrap($('<div id="container"></div>'));
	$('#contenu').css('position', 'absolute');

	$('#container').css({
		'z-index': '40',
		'position': 'absolute',
		'left': '30px',
		'top': '474px',
		'width': '80px',
		'height': '80px',
		'overflow': 'hidden'
	});


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

	//launch position attente
	ruyFixed();



	var RyuMove = function() {
		perso.isJumping = true;
		perso.enAttente = false;
		var tActuel;
		var tPrecedent;
		var frameMove = 0;

		var jump = function() {
			$('#container').animate({
				'top': '-=300px'
			}, 200).delay(400).animate({
				'top': '+=300px'
			}, 200);
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
	RyuHaiduken();

	var creationNuage = function() {

		for (var i = 0; i < Clouds.length; i++) {
			Clouds[i].creation().animate();
		}
	};

	creationNuage();

	/////
	//Déplacement //
	/////

	document.addEventListener('keydown', function(e) {

		switch (e.keyCode) {

			case 38:

				if (!perso.isJumping) {
					RyuMove();
					perso.isJumping = true;

				}
				break;
			case 8:
				spriteHaiduken();

				break;
		}

	}, false);

	document.addEventListener('keyup', function(e) {


		console.log('keuup');
		switch (e.keyCode) {

			case 38:
				if (perso.isJumping) {
					perso.isJumping = false;
					perso.enAttente = true;


				}
				ruyFixed();

				break;
		}

	}, false);


	//Démarrage
	// autreRecursion(0);

	// var stopAutreRecursion = function(){
	//   start = false;

	//Execution 

}); // end