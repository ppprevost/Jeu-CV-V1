/////
// Terre//
/////

var Field = function() {

	var bush = document.createElement('img');
	$(bush).attr('src', 'img/field.png');
	$(bush).css({
		'z-index': '5',
		'position': 'absolute',
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

	var referenceNuage = {
		y: Math.floor(Math.random() * 200),
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

var usineBackground = function() {


	var background = document.createElement('img');


	var ReferenceBackground = {
		objetRandom: Math.round(Math.random() * 22) + 1,
		y: 470,
		x: window.innerWidth,
		src: 'img/background/background',
		className: 'objetBackground',
		width: 80,
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
Compteur 
 */

var creationTimer = function() {


	$('#game').prepend("<div id='timer'></div>");
	// $('#timer').html("00 : 00");

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
			$('#timer').append(" Bravo vous avez tenu " + seconde + " secondes")
		}

	};

	setInterval(chrono, 1000);

};