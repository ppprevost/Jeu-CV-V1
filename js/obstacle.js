	
var usineObstacle = function(random) {

	var obs = document.createElement('div');
	var img = document.createElement('img');
	img.style.position = "absolute";
	obs.style.zIndex = "6";
	var colisionPositionPersoX = parseInt($('#container').position().left);
	var colisionPositionPersoY = parseInt($('#container').position().top);

			/////
			//Diplo //
			/////
			var referenceDiplo = {
				y: 410,
				step: Math.random() * 10,
				stepy: null,
				x: window.innerWidth,
				src: 'img/Dino/diplo.png',
				className : 'containerDiplo',
				spriteX: [0,-228, -456, -684, -912, -1140, -1368, -1596],
				//0 -> Attack  -100 -> Run
				spriteY: [0, -150, -300, -450],
				width: 228,
				height: 150,
				elementHTML: obs,
				creation: function() {
					document.body.appendChild(this.elementHTML);
					this.elementHTML.style.top = this.y + "px";
					this.elementHTML.style.left = this.x + "px";
					this.elementHTML.appendChild(img)
					img.setAttribute('src', this.src);
					$(this.elementHTML).addClass(this.className);
					$('.' +this.className).css({
						'z-index':'40',
						'position': 'absolute',
						'left': this.x + "px",
						'top': this.y + "px",
						'width':this.width + "px",
						'height':this.height + "px",
						'overflow':'hidden'
					});
					/////
					//Diplo Frame dans methode creation//
					/////
					var moveDiplo = function(){
						var tActuel;
						var tPrecedent;
						var frame = 0;
						var spriteObstacle = function(actuel) {

							tActuel = actuel;
							tPrecedent = tPrecedent || actuel;
							var delai = tActuel - tPrecedent;

							if (delai > 100) {

								tPrecedent = tActuel;
								frame++;
								if (frame == referenceDiplo.spriteX.length) {
									frame = 0};

									$(img).css('left', referenceDiplo.spriteX[frame] + "px");
									$(img).css('top', referenceDiplo.spriteY[0]);
									
								}
								window.requestAnimationFrame(spriteObstacle);

							};
							spriteObstacle();
						};
						moveDiplo();
						return this;

					}
				};

				referenceDiplo.animate = function() {
					referenceDiplo.x = referenceDiplo.x - referenceDiplo.step;
					referenceDiplo.y = referenceDiplo.y - referenceDiplo.stepy;

				// if (referenceDiplo.x - colisionPositionPerso / 2 && referenceDiplo.y < colisionPositionPerso) {
				// 	$(this.elementHTML).remove();
				// }

				if (referenceDiplo.x <= 0) {
					$(this.elementHTML).remove();
					// referenceDiplo.y = Math.floor(Math.random() * 300);
				}
				referenceDiplo.elementHTML.style.left = referenceDiplo.x + 'px';
				referenceDiplo.elementHTML.style.top = referenceDiplo.y + 'px';
				window.requestAnimationFrame(function() {
					referenceDiplo.animate();
				});
				
				return this;
			};


			/////
			//Objet Raptor //
			/////

			var referenceRaptor = {
				y: 410,
				step: Math.random() * 10, // pour regler la vitesse en x
				stepy: null,
				x: window.innerWidth,
				width: 249,
				src: 'img/Dino/',
				visuel:['pachy.png','raptor-bleu.png','raptor-vert.png'],
				choix:Math.round(Math.random()*2),
				className : "containerRaptor",
				spriteX: [0,-249, -498, -747, -996, -1245, -1494, -1743],
				//0 -> Attack  -100 -> Run
				spriteY: [0, -150, -300, -450],
				height: 150,
				elementHTML: obs,
				creation: function() {
					document.body.appendChild(this.elementHTML);
					this.elementHTML.style.top = this.y + "px";
					this.elementHTML.style.left = this.x + "px";
					this.elementHTML.appendChild(img);
					img.setAttribute('src', this.src+this.visuel[this.choix]);

					$(this.elementHTML).addClass(referenceRaptor.className);
					$('.' +this.className).css({
						'z-index':'40',
						'position': 'absolute',
						'left': this.x + "px",
						'top': this.y + "px",
						'width':this.width + "px",
						'height':this.height + "px",
						'overflow':'hidden'
					});

					/////
					//Raptor Frame dans methode creation//
					/////
					var moveRaptor = function(){
						var tActuel;
						var tPrecedent;
						var frame = 0;
						var spriteObstacle = function(actuel) {

							tActuel = actuel;
							tPrecedent = tPrecedent || actuel;
							var delai = tActuel - tPrecedent;

							if (delai > 70) {

								tPrecedent = tActuel;
								frame++;
								if (frame == referenceRaptor.spriteX.length) {
									frame = 0};

									$(img).css('left', referenceRaptor.spriteX[frame] + "px");
									$(img).css('top', referenceRaptor.spriteY[0]);
									
								}
								window.requestAnimationFrame(spriteObstacle);

							};
							spriteObstacle();
						};
						moveRaptor();
						return this;
					}
				};
				/////
				//Raptor déplacement dans methode animate//
				/////
				referenceRaptor.animate = function() {
					referenceRaptor.x = referenceRaptor.x - referenceRaptor.step;

				/////
				//Collision Raptor //
				/////
				// if ( !perso.isJumping){
				// 	$(this.elementHTML).remove();
				// }

				if (referenceRaptor.x <= -80) {
					$(this.elementHTML).remove();

				}
				referenceRaptor.elementHTML.style.left = referenceRaptor.x + 'px';
				referenceRaptor.elementHTML.style.top = referenceRaptor.y + 'px';
				window.requestAnimationFrame(function() {
					referenceRaptor.animate();
				});
				return this;

			};

				/////
				//Abeille //
				/////
				var referencePtero = {
					y: 82,
					step: Math.random() * 10,
					stepy: Math.random() * 5,
					numero: "",
					x: 2000,
					width: 128,
					spriteX: [0,-128, -256, -384, -512],
				//0 -> Attack  -100 -> Run
				spriteY: [0, -100],
				src: "img/Dino/ptero.png",
				className : 'containerPtero',
				height: 100,
				borderWidth: 5,
				elementHTML: obs,
				creation: function() {
					document.body.appendChild(this.elementHTML);
					this.elementHTML.style.top = this.y + "px";
					this.elementHTML.style.left = this.x + "px";
					this.elementHTML.appendChild(img);
					img.setAttribute('src', this.src);
					$(this.elementHTML).addClass(this.className);
					$('.' +this.className).css({
						'z-index':'40',
						'position': 'absolute',
						'left': this.x + "px",
						'top': this.y + "px",
						'width':this.width + "px",
						'height':this.height + "px",
						'overflow':'hidden'
					});
						/////
					//Ptero Frame dans methode creation//
					/////
					var movePtero = function(){
						var tActuel;
						var tPrecedent;
						var frame = 0;
						var spriteObstacle = function(actuel) {

							tActuel = actuel;
							tPrecedent = tPrecedent || actuel;
							var delai = tActuel - tPrecedent;

							if (delai > 100) {

								tPrecedent = tActuel;
								frame++;
								if (frame == referencePtero.spriteX.length) {
									frame = 0};

									$(img).css('left', referencePtero.spriteX[frame] + "px");
									$(img).css('top', referencePtero.spriteY[0]);
									
								}
								window.requestAnimationFrame(spriteObstacle);

							};
							spriteObstacle();
						};
						movePtero();
						return this;
					}
				};


				referencePtero.animate = function() {

					referencePtero.x = parseInt(referencePtero.x - referencePtero.step);

					
					if (
						referencePtero.x - colisionPositionPersoX - 40 / 2 < colisionPositionPersoX && referencePtero.y - colisionPositionPersoY - 40 / 2 == colisionPositionPersoY
						) {
						$(this.elementHTML).remove();
				}

				if (referencePtero.x <= 0) {
					$(this.elementHTML).remove();


				}
				referencePtero.elementHTML.style.left = referencePtero.x + 'px';
				referencePtero.elementHTML.style.top = referencePtero.y + 'px';
				window.requestAnimationFrame(function() {
					referencePtero.animate();
				});
				return this;
			};

				//request animation frame pour le sinus 
				referencePtero.sinus = function() {
					var start, xf = 0;
					var animation = function(timestamp) {
						start = (start) ? start : timestamp;
						var delay = timestamp - start;
						if (delay > 20) {
							referencePtero.elementHTML.style.top = Math.sin(xf * Math.PI / 200) * 268 + 82 + 'px';
							xf += 2.4;
							referencePtero.x += 5;
							referencePtero.elementHTML.style.left = referencePtero.x + 'px';
							start = timestamp;
						}
						if (xf <= 200) {
							requestAnimationFrame(animation);
						}
					}
					requestAnimationFrame(animation);
					// referencePtero.x = referencePtero.x - referencePtero.step;
					// referencePtero.y = referencePtero.y - referencePtero.stepy;

					// if (referencePtero.x < parseFloat(container.style.left)) {
					// 	alert('aie');
					// } 

					if (referencePtero.x <= 0) {
						$(this.elementHTML).remove();

						// 	// referencePtero.y = Math.floor(Math.random() * 300);
						// }
						// referencePtero.elementHTML.style.left = referencePtero.x + 'px';
						// window.requestAnimationFrame(function() {
						// 	referencePtero.animate();
						// });

};

};

if (random == 1) {
	return referenceDiplo;

} else if (random == 2) {
	return referencePtero;
} else {
	return referenceRaptor;
}
};


var creationObstacle = function() {

	setInterval(function() {
		var typeObstacle = Math.round(Math.random() * 2);

					// if (usineObstacle(typeObstacle).sinus() != undefined) {

					// 	var nouvelObstacle = usineObstacle(typeObstacle).creation().animate().sinus();
					// 	console.log(nouvelObstacle);
					// } else {
						var nouvelObstacle = usineObstacle(typeObstacle).creation().animate();
					// }

				}, 2000);

};