$('document').ready(function() {


	//introduction jeu intro.js
	intro();

	//declencheur du jeu
	$('.launch').click(function() {
			//suppression du dom de l'intro
			$(this).remove();
			$('#intro').remove();

			//lancement du son
			// $('#game').append('<audio autoplay loop><source src="son/main.mp3"><source src="son/main.ogg"></audio>');

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
			$('#game').append("<img id='contenu'></div>");
			$('#contenu').attr('src', perso.src).wrap($('<div id="container"></div>')).css('position', 'absolute');
		
			perso.creation();

/////
// Test des Collisions //
/////
			// detecter les collisions du Hero avec les Dinos
			perso.testCollision();	
			// detecter les collisions des balles avec les Dinos
			
			// Affichage de la vie 
			$('#health').text(perso.energie)

			// Affichage du score 
			$('#score').text(perso.score);

			//launch frame idle
				perso.ruyFixed();
			


			// var Obstacle = [usineObstacle(0), usineObstacle(1), usineObstacle()];

			creationObstacle();

			// 
			/////
			//Déplacement //
			/////

			document.addEventListener('keydown', function(e) {

				switch (e.keyCode) {

					case 38: //haut

						if (!perso.isJumping) {
							perso.RyuMove();
						}

						break;
					case 39: //droite
						e.preventDefault();
						if (!perso.isRunning && !perso.isJumping) {

							perso.RyuRunning();

						}

						break;

					case 37: //gauche
						e.preventDefault();
						if (!perso.isRunning && !perso.isJumping) {
							perso.isRunningLeft = true;
							perso.RyuRunning();

						}

						break;
					case 32: //espace
						e.preventDefault();
						if (!perso.isHaiduken && !perso.isJumping && !perso.isCrouching) {
							// on lance l'animation du Hero avec son fusil
							perso.RyuHaiduken();
							// on lance la fonction usine retournant balle
							ObjetBalleEnMouvement();

						}
						else if(!perso.isHaiduken && !perso.isJumping && perso.isCrouching)
							// Get Low
							{
								usineBullet().creation().animate();
								perso.RyuHaiduken(); // remplacer le visuel correspondant par Crouching + shot
							}

							// Get low and Shoot
						else if(!perso.isHaiduken && !perso.isJumping && !perso.isCrouching && perso.isRunning)
							
							{
								usineBullet().creation().animate();
								perso.RyuHaiduken(); // remplacer le visuel correspondant par Crouching + shot
							}

							// Jump and Shoot 
						else if(!perso.isHaiduken && perso.isJumping && !perso.isCrouching && !perso.isRunning)	{

								usineBullet().creation().animate();
								perso.RyuHaiduken();
								console.log(perso.isHaiduken)

						}

						break;

					case 40: // bas
						e.preventDefault();
						if (!perso.isCrouching && !perso.isHaiduken) {
							perso.RyuCrouching()
						}
						break;

				}

			}, false);

			document.addEventListener('keyup', function(e) {


				switch (e.keyCode) {

					case 32:
						// if (perso.isHaiduken) {
						

						// }

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

					case 37:
						e.preventDefault();
						if (perso.isRunning) {
							perso.isRunningLeft = false;
							perso.isRunning = false;

						}


						break;
					case 40:

						if (perso.isCrouching) {
							perso.isCrouching = false;
						}
						break;
				}



			}, false);


		}) //click

}); // end