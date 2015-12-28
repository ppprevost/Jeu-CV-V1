

$('document').ready(function() {


// Chargement du terrain
Field().creation().animate();

//Chargement des nuages
var Clouds = [usineNuage(), usineNuage(), usineNuage()];

var creationNuage = function() {

	for (var i = 0; i < Clouds.length; i++) {
		Clouds[i].creation().animate();
	}
};

creationNuage();

//chagement des objets Background

creationBackground();

//chargement du compteur 
creationTimer();

// crer un nouvel hero à l'aide de la fonction constructeur ! 
perso = new ObjetRyu();
	// Positionnement générale de ryu! 
	$('#game').append("<img id='contenu'></div>")
	$('#contenu').attr('src',perso.src).wrap($('<div id="container"></div>')).css('position', 'absolute');

	$('#container').css({
		'z-index': '40',
		'position': 'absolute',
		'left': '200px',
		'top': '454px',
		'width': '100px',
		'height': '100px',
		'overflow': 'hidden'
	});

	//launch frame idle
	if(perso.enAttente)
		{ruyFixed();}

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
			}

			break;
			case 39:
			e.preventDefault();
			if (!perso.isRunning && !perso.isJumping) {
				
				RyuRunning(50);

			}

			break;
			case 32:
			e.preventDefault();
			if(!perso.isHaiduken && !perso.isJumping)
			{
				RyuHaiduken();

			}
			break;
		}

	}, false);

	document.addEventListener('keyup', function(e) {


		switch (e.keyCode) {

			case 32:
			if(perso.isHaiduken){
				RyuHaiduken();
				perso.isHaiduken=false;


			}
			
			break;
			case 38:
			if (perso.isJumping) {

				// c'est le delay d'apres saut qui fait passer la variable is jumping en false

			}

			

			break;
			case 39:
			e.preventDefault();
			if (perso.isRunning) {
				perso.isRunning = false;


			}


			break;	
		}

	}, false);


// })//click

}); // end