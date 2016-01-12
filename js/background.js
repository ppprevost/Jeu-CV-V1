//creation des backgrounds, du timer et des conditions de temps pour l'affichage des competences et la mort ou la victoire

/////
// Terre//
/////

var Field = function() {

	var bush = document.createElement('img');
	$(bush).attr('src', 'img/field.png');
	$(bush).css({
		'z-index': '5',
		'position': 'absolute',
		'overflow': 'hidden',

	});

	var reference = {
		y: 548,
		x: 0,
		width: 100,
		height: 100,
		borderWidth: 5,
		elementHTML: bush,
		creation: function() {
			$('#game').append(this.elementHTML)
			this.elementHTML.style.top = this.y + "px";
			this.elementHTML.style.left = this.x + "px";

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


/////
//Nuage //
/////
//
var usineNuage = function() {

	var nuage = document.createElement('img');
	nuage.src = "img/Nuage.png";
	nuage.style.position = "absolute";
	nuage.style.zIndex = 0;

	var referenceNuage = {
		y: Math.floor(Math.random() * 200),
		step: Math.round(Math.random() * 10) + 1,
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
			referenceNuage.y = Math.floor(Math.random() * 200);
		}
		referenceNuage.elementHTML.style.left = referenceNuage.x + 'px';
		referenceNuage.elementHTML.style.top = referenceNuage.y + 'px';
		window.requestAnimationFrame(function() {
			referenceNuage.animate();

		});
	};

	return referenceNuage;
};

// affichaga aléatoire des éléments en background
var usineBackground = function() {


	var background = document.createElement('img');


	var ReferenceBackground = {
		objetRandom: Math.round(Math.random() * 22) + 1,
		y: 470,
		x: window.innerWidth,
		src: 'img/background/background',
		className: 'objetBackground',
		width: 90,
		height: 80,
		elementHTML: background,
		creation: function() {
			$('#background').append($(this.elementHTML));
			$(this.elementHTML).css({
				'top': this.x,
				'left': this.y
			});

			$(this.elementHTML).addClass(this.className);
			$(this.elementHTML).attr('src', this.src + this.objetRandom + '.png');
			$('.' + this.className).css({
				'z-index': '20',
				'position': 'absolute',
				'left': this.x + "px",
				'top': this.y + "px",
				'width': this.width + "px",
				'height': this.height + "px",

			});
			// chainage
			return this;

		}
	};

	ReferenceBackground.animate = function() {
		ReferenceBackground.x--;

		if (ReferenceBackground.x <= 0) {
			$(this.elementHTML).remove();
			delete this;

		}
		ReferenceBackground.elementHTML.style.left = ReferenceBackground.x + 'px';
		ReferenceBackground.elementHTML.style.top = ReferenceBackground.y + 'px';
		window.requestAnimationFrame(function() {
			ReferenceBackground.animate();
		});

	};
	return ReferenceBackground;
};

var creationBackground = function() {
	usineBackground().creation().animate();

	setInterval(function() {
		usineBackground().creation().animate();
	}, 10000);

};

/*
Background Timer 
 */
var win;
var creationTimer = function() {

	$('#compteur').prepend("<div id='timer'></div>");
	$('#timer').html("00 : 00");

	var seconde = 0;
	var minute = 0;

	var chrono = function() {
		seconde += 1;
		if (seconde > 59) {
			seconde = 0;
			minute += 1;
		}
		if (seconde < 10 && minute < 10) {
			$('#timer').html("0" + minute + ": 0" + seconde);;

		}
		if (seconde >= 10 && minute < 10) {
			$('#timer').html("0" + minute + ": " + seconde)
				// $('#timer').append("<p> Bravo vous avez tenu " + seconde + " secondes et " + minute + " minute(s)</p>")
		}

		/////
		//Affichage des compétences //
		/////

		if (seconde >= 10 && seconde < 15 && minute == 0) {
			$('#skill .html5').show(300);
			$('.nextskill').html('New Skill : ' + $('.html5').attr('alt'))
		} else if (seconde >= 15 && seconde < 20 && minute == 0) {
			$('#skill .jquery').show(300)
			$('.nextskill').html('New Skill : ' + $('.jquery').attr('alt'))
		} else if (seconde >= 20 && seconde < 30 && minute == 0) {
			$('#skill .angular').show(300);
			$('.nextskill').html('Congratulations! New Skill : ' + $('.angular').attr('alt'));
		} else if (seconde >= 30 && seconde < 40 && minute == 0) {
			$('#skill .bootstrap').show(300);
			$('.nextskill').html('Congratulations! New Skill : ' + $('.bootstrap').attr('alt'));
		} else if (seconde >= 40 && seconde < 50 && minute == 0) {
			$('#skill .mongodb').show(300);
			$('.nextskill').html('Congratulations! New Skill : ' + $('.mongodb').attr('alt'))
		} else if (seconde >= 50 && minute == 0) {
			$('#skill .analytics').show(300);
			$('.nextskill').html('Congratulations! New Skill : ' + $('.analytics').attr('alt'));
		} else if (seconde >= 00 && seconde < 10 && minute == 1) {
			$('#skill .nodejs').show(300);
			$('.nextskill').html('Congratulations! New Skill : ' + $('.nodejs').attr('alt'));

		} else if (seconde >= 20 && seconde < 25 && minute == 1) {
			$('#skill .meteor').show(300);
			$('.nextskill').html('Congratulations! New Skill : ' + $('.meteor').attr('alt'));

			//You win ! 
		} else if (seconde >= 25 && minute == 1) {
			win = true;
			clearInterval(launchChrono);
			$('.nextskill').html(' You made it ! You survive')
			$('.endGame').fadeIn('slow')
			$('.endGame').html('<p>Congratulations, you survive in the middle of the dinosaur jungle. Please see my skills below</p> ');
			tabObstacle = [];
			$('#obstacle').remove()

		}


		//demander a camille
		// tabCompetences = [' .html5', ' .jquery', ' .angular', ' .bootstrap', ' .mongodb', ' .analytics', ' .nodejs', ' .meteor'];

		// var d = 0;
		// var testTimer = function() {

		// 			$('#skill' + tabCompetences[d]).show(300);
		// 			$('.nextskill').html('New Skill : ' + $(tabCompetences[d]).attr('alt'));
		// 			console.log(d)
		// 			d++;

		// }
		// if seconde <25 && minute ==1
		// if (d < tabCompetences.length) {
		// var intervalle = setInterval(testTimer,2000)
		// }
		// if(d == tabCompetences.length){
		// 	clearInterval(intervalle)
		// }


		// you die ! 
		if (perso.energie <= 0 && !win) {

			clearInterval(launchChrono);
			$('.nextskill').html('Ohhhhh You loose ! Refresh to start again !');
			// affichage du message de mort et possibilité de recommencer
			$('.endGame').fadeIn('slow');
			$('.endGame').append('<p>You die !</p><div class="startAgain">Reload</div >');
			$('.startAgain').css({
				'border': '1px solid red',
				'cursor': 'pointer'

			});
			//supprimer les élements du Dom
			setTimeout(function() {

				tabObstacle = [];
				$('#sound').remove()
				$('.nuage').remove()
			}, 2000)
		}
		// lance un rafraichissement de la page des lors que l'on clique sur le bouton 
		$('.startAgain').click(function() {
			location.reload();
		});
		
	};


	var launchChrono = setInterval(chrono, 1000);

};

//declaration de variable son
var sonOn = true;
// Arreter le son