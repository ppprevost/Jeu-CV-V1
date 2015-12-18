

$('document').ready(function() {
	
// Chargement du Buisson qui bouge
	bushUncoin().creation().animate();

//Chargement des nuages
	var Clouds = [usineNuage(), usineNuage(), usineNuage()];

// crer un nouvel hero à l'aide de la fonction constructeur ! 
perso = new ObjetRyu();
	// Positionnement générale de ryu! 
	$('#contenu').wrap($('<div id="container"></div>'));
	$('#contenu').css('position', 'absolute');

	$('#container').css({
		'z-index': '40',
		'position': 'absolute',
		'left': '100px',
		'top': '474px',
		'width': '80px',
		'height': '80px',
		'overflow': 'hidden'
	});

	//launch frame idle
	ruyFixed();

	var creationNuage = function() {

		for (var i = 0; i < Clouds.length; i++) {
			Clouds[i].creation().animate();
		}
	};

	creationNuage();

		// var Obstacle = [usineObstacle(0), usineObstacle(1), usineObstacle()];

	creationObstacle();

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
				RyuHaiduken();
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




}); // end