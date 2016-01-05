	var tabObstacle = [];

	var usineObstacle = function(random) {

		var obs = document.createElement('div');
		var img = document.createElement('img');
		img.style.position = "absolute";
		obs.style.zIndex = "6";
		var colisionPositionPersoX = $('#container').position().left;
		var colisionPositionPersoY = $('#container').position().top;


		/////
		//Diplo //
		/////
		var referenceDiplo = {
			y: 410,
			step: Math.round(Math.random() * 10)+1, // +1 car c'est une soustraction qui lance l'animation si = 0 pas de déplacement
			x: window.innerWidth,
			src: 'img/Dino/diplo.png',
			className: 'containerDiplo',
			spriteX: [0, -228, -456, -684, -912, -1140, -1368, -1596],
			//0 -> Attack  -100 -> Run
			spriteY: [0, -150, -300, -450],
			width: 228,
			height: 150,
			elementHTML: obs,
			creation: function() {
				document.body.appendChild(this.elementHTML);
				this.elementHTML.style.top = this.y + "px";
				this.elementHTML.style.left = this.x + "px";
				this.elementHTML.appendChild(img);
				img.setAttribute('src', this.src);
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
				/////
				//Diplo Frame dans methode creation//
				/////
				var moveDiplo = function() {
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
								frame = 0
							};

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
			
tab = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]; //Hit Box marge d'erreur (nul)

// for (var i = 0; i < tab.length; i++) {
	

			// //collision Diplo
			// if (referenceDiplo.x <= colisionPositionPersoX ) {
			// 	$(this.elementHTML).remove();
			// }
			
	// }		

			if (referenceDiplo.x <= -80) {
				$(this.elementHTML).remove();
				delete this;
				
			}
			referenceDiplo.elementHTML.style.left = referenceDiplo.x + 'px';
			referenceDiplo.elementHTML.style.top = referenceDiplo.y + 'px';
			window.requestAnimationFrame(function() {
				referenceDiplo.animate();
			});

			return this;
		};
		referenceDiplo.boum =function(){
			$(this.elementHTML).hide(1000).delay(1200).remove();
			delete this;
		}


		/////
		//Objet Raptor //
		/////

		var referenceRaptor = {
			y: 410,
			step: Math.random() * 10, // pour regler la vitesse en x
		
			x: window.innerWidth,
			width: 249,
			src: 'img/Dino/',
			visuel: ['pachy.png', 'raptor-bleu.png', 'raptor-vert.png'],
			choix: Math.round(Math.random() * 2),
			className: "containerRaptor",
			spriteX: [0, -249, -498, -747, -996, -1245, -1494, -1743],
			//0 -> Attack  -100 -> Run
			spriteY: [0, -150, -300, -450],
			height: 150,
			elementHTML: obs,
			creation: function() {
				document.body.appendChild(this.elementHTML);
				this.elementHTML.style.top = this.y + "px";
				this.elementHTML.style.left = this.x + "px";
				this.elementHTML.appendChild(img);
				img.setAttribute('src', this.src + this.visuel[this.choix]);

				$(this.elementHTML).addClass(referenceRaptor.className);
				$('.' + this.className).css({
					'z-index': '40',
					'position': 'absolute',
					'left': this.x + "px",
					'top': this.y + "px",
					'width': this.width + "px",
					'height': this.height + "px",
					'overflow': 'hidden'
				});

				/////
				//Raptor Frame dans methode creation//
				/////
				var moveRaptor = function() {
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
								frame = 0
							};

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
				delete this;

			}
			referenceRaptor.elementHTML.style.left = referenceRaptor.x + 'px';
			referenceRaptor.elementHTML.style.top = referenceRaptor.y + 'px';
			window.requestAnimationFrame(function() {
				referenceRaptor.animate();
			});
			return this;

		};
		referenceRaptor.boum =function(){
			$(this.elementHTML).hide(1000).delay(1200).remove();
			delete this;
			
		}

		/////
		//Pterodactyle //
		/////
		var referencePtero = {
			y: 282,
			step: Math.round(Math.random() * 10)+1,
			stepy: Math.random() * 5,
			numero: "",
			x: 2000,
			width: 128,
			spriteX: [0, -128, -256, -384, -512],
			//0 -> Attack  -100 -> Run
			spriteY: [0, -100],
			src: "img/Dino/ptero.png",
			className: 'containerPtero',
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
				$('.' + this.className).css({
					'z-index': '40',
					'position': 'absolute',
					'left': this.x + "px",
					'top': this.y + "px",
					'width': this.width + "px",
					'height': this.height + "px",
					'overflow': 'hidden'
				});
				/////
				//Ptero Frame dans methode creation//
				/////
				var movePtero = function() {
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
								frame = 0
							};

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

			referencePtero.x = referencePtero.x - referencePtero.step;

			if (referencePtero.x <= -80) {
				$(this.elementHTML).remove();
				for(property in tabObstacle){
				if(tabObstacle[property] == this){
					delete tabObstacle[property];
				}
				}
				

				for (var i = 0; i < tabObstacle.length; i++) {
					// this et non pas this.elementHTML
					if (tabObstacle[i] == this){
					tabObstacle.splice(i,1);
					}
				};
				

			
				
			}
			referencePtero.elementHTML.style.left = referencePtero.x + 'px';
			referencePtero.elementHTML.style.top = referencePtero.y + 'px';
			window.requestAnimationFrame(function() {
				referencePtero.animate();
			});
			
		};

		referencePtero.alive = true;

		referencePtero.boum =function(){
			this.alive = false;
			$(this.elementHTML).hide(1000,function(){
				$(this.elementHTML).remove()
			});

			//suppression de l'objet dans le tableau
			// suppression de l'obstacle cote obstacle ou cote perso ==> preference cote perso 
			for(property in tabObstacle){
				if(tabObstacle[property] == this){
					delete tabObstacle[property];
				}
			}
			
		}

		if (random == 1) {
			tabObstacle.push(referenceDiplo);
			return referenceDiplo;

		} else if (random == 2) {
			tabObstacle.push(referencePtero);
			return referencePtero;
		} else {
			tabObstacle.push(referenceRaptor);
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
			var nouvelObstacle = usineObstacle(2).creation().animate();
			// }
			
		}, 2000);

	};