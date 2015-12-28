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
			x: window.innerWidth,
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

	var Clouds = [usineNuage(), usineNuage(), usineNuage(), usineNuage()];

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

		referenceTuyauGris.animate = function() {
			referenceTuyauGris.x = referenceTuyauGris.x - referenceTuyauGris.step;
			// referenceTuyauGris.y = referenceTuyauGris.y - referenceTuyauGris.stepy;

			// if (referenceTuyauGris.x < parseFloat(container.style.left)) {
			// 	alert('aie');
			// } 

			if (referenceTuyauGris.x <= 0) {
				$(this.elementHTML).remove();

				// referenceTuyauGris.y = Math.floor(Math.random() * 300);
			}
			referenceTuyauGris.elementHTML.style.left = referenceTuyauGris.x + 'px';
			referenceTuyauGris.elementHTML.style.top = referenceTuyauGris.y + 'px';
			window.requestAnimationFrame(function() {
				referenceTuyauGris.animate();
			});
			return this;
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


	//launch position attente
	ruyFixed();


	RyuHaiduken();

	// var creationNuage = function() {

	// 	for (var i = 0; i < Clouds.length; i++) {
	// 		Clouds[i].creation().animate();
	// 	}
	// };

	// creationNuage();

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