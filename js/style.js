//Execution function

$('document').ready(function() {


	//introduction jeu intro.js
	intro();

	// lance un rafraichissement de la page des lors que l'on clique sur le bouton 
	$('.startAgain').click(function() {
		location.reload();
	});

	$('.sound').click(function() {

		if (sonOn) {
			sonOn = false;
			$(this).html('Sound off')
		} else {
			sonOn = true;
			$(this).html('Sound on');
		}
	})

	//declencheur du jeu
	$('.launch').click(function() {
		//suppression du dom de l'intro
		document.getElementById('introSon').pause();
		$(this).hide('puff', 1500, function() {
			$(this).remove();
			launchGame();
		});

		$('.how-to-play').hide('puff', 1500, function() {
			$('.how-to-play').remove();
		});
		$('#intro').hide(1500, function() {
			$('#intro').remove();
		});


	}) //click

	var launchGame = function() {

		//affichage du tableau
		$('.misc').show(1500)
//tableau des scores en arriere plan
		// $('.container').css('z-index', 1500);

		// met le jeu en pause a la perte du focus de la fenetre
		// var timeOut;
		// $(window).focus(function() {
		// 	alert('Jeu mis en pause, appuyer sur ok pour continuer');
		// 	timeOut = '';
		// });
		var main = document.getElementById('main');
		setInterval(function() {
			//lancement du son
			if (sonOn & !perso.isDying) {
				main.play()
				main.loop = true;
				main.volume = 0.07;
			} //stopper le son
			else {
				main.pause()
			}
		}, 400)


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

		//Affichage de la dynamite
		$('#supply').html(perso.supply);

		//launch frame idle
		perso.heroFixed();

		// var Obstacle = [usineObstacle(0), usineObstacle(1), usineObstacle()];


		creationObstacle();

		

		/////
		//Déplacement //
		/////

		document.addEventListener('keydown', function(e) {

			switch (e.keyCode) {

				case 38: //haut

					if (!perso.isJumping) {
						perso.heroMove();
						perso.isJumpingUp = true;
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
					if (!perso.isRunning && !perso.isJumping && !perso.isCrouching) {
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

					} else if (!perso.isHaiduken && !perso.isJumping && perso.isCrouching)
					// Get Low
					{
						usineBullet().creation().animate();
						perso.RyuHaiduken(); // remplacer le visuel correspondant par Crouching + shot
					}

					// Get low and Shoot
					else if (!perso.isHaiduken && !perso.isJumping && !perso.isCrouching && perso.isRunning)

					{
						usineBullet().creation().animate();
						perso.RyuHaiduken(); // remplacer le visuel correspondant par Crouching + shot
					}

					// Jump and Shoot 
					else if (!perso.isHaiduken && perso.isJumping && !perso.isCrouching && !perso.isRunning) {

						usineBullet().creation().animate();
						perso.RyuHaiduken();

					}
					// jump move and shoot
					else if (!perso.isHaiduken && perso.isJumping && !perso.isCrouching && perso.isRunning) {
						usineBullet().creation().animate();
						perso.RyuHaiduken();
					}
					//Run and Shoot
					else if (!perso.isHaiduken && !perso.isJumping && !perso.isCrouching && perso.isRunning) {
						usineBullet().creation().animate();
						perso.RyuHaiduken();
					}

					break;

				case 40: // bas
					e.preventDefault();
					if (!perso.isCrouching && !perso.isHaiduken) {
						perso.RyuCrouching()
					}
					break;

				case 68: // d as Dynamite !!
					if (!perso.isDynamiting && perso.supply > 0) {


						// methode de shoot
						perso.RyuDynamite()
						ObjetBalleEnMouvement();
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
						perso.isJumpingUp = false;
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

				case 68: // d as Dynamite !!
					if (perso.isDynamiting) {


					}


					break;
			}



		}, false);

	}; // launch game



}); // end