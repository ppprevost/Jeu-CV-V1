// Welcome to my Dinosaur's game ! Hope you enjoy it
// Pierre-Philippe PREVOST Copyright
// introduction with jquery ui


var intro = function(){

	
	$('#game').prepend("<div id='intro'></div>");
	$('#intro').append("<div></div>");
	

//son T rex
	document.getElementById('introSon').play()
	document.getElementById('introSon').volume = 0.1
	

	var dinoArrival = $(window).width()+200;
	for (var i = 0; i < 7; i++) {
		$("#intro").prepend("<img>");
		

	}

//hunter
var hunter = $('#intro img:nth-of-type(2)');
hunter.attr('src','img/intro/hunter.png').addClass('perso-hunter').css({'left':'-400px'}).animate({'left':'+=' + window.innerWidth*0.30+'px'},2000,'easeInOutCirc',function(){

	dino1.animate({'left':'-=' + window.innerWidth*0.48 +'px'},2000,'easeInExpo');
	dino2.animate({'left':'-='+ window.innerWidth*0.44 +'px'},2000,'easeInExpo');
	dino3.animate({'left':'-=' + window.innerWidth*0.40 +'px'},2000,'easeInExpo');
	dino4.animate({'left':'-=' + window.innerWidth*0.36 + 'px'},2000,'easeInExpo');
	dino5.animate({'left':'-='+ window.innerWidth*0.32+ 'px'},2000, function(){
	logo.animate({'top':'+=250px'},3500)});

});

//logo
var logo = $('#intro img:nth-of-type(7)');
logo.attr('src','img/intro/logo.png').addClass('perso-logo').css('top','-250px');

//Dino
var dino1=$('#intro img:nth-of-type(1)').attr('src','img/intro/diplo.png').addClass('perso-dino').css({'left':dinoArrival + 'px'})
;

var dino2=$('#intro img:nth-of-type(3)');
dino2.attr('src','img/intro/ptero.png').addClass('perso-ptero').css({'left':dinoArrival+'px','z-index':'11'});

var dino3 =$('#intro img:nth-of-type(4)');
dino3.attr('src','img/intro/raptor.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'12'});

var dino4=$('#intro img:nth-of-type(5)');
dino4.attr('src','img/intro/raptor2.png').addClass('perso-dino').css({'left':dinoArrival+'px','top':'220px','z-index':'13'});
var dino5 =$('#intro img:nth-of-type(6)');

dino5.attr('src','img/intro/pachy.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'13'});


$('.perso-dino').css({
	'width':'350px',
	'position':'absolute',
	'top': '200px'
});

$('.perso-ptero').css({
	
	'position':'absolute',
	top: '230px'
});


$('.perso-logo').css({
	'cursor':'pointer',
	'position':'absolute',
	// centrage du logo
	'left':(window.innerWidth/2)-($('.perso-dino').width()/2)-15 +'px'
});

$('.perso-hunter').css({
	'position':'absolute',
	top: '150px',
	width:'350px'
});

// Explications du jeu
$('.how-to-play').click(function() {

		if ($('.explanations').css('display') == 'none') {
			$('.explanations').fadeIn('slow', function() {
				$(document).click(function() {
					if ($('.explanations').css('display') == 'block') {
						
						$(document).off('click');
						$('.explanations').fadeOut('slow');
					}

				});
			});
			$('.explanations').html('<p>Use "Up", "Left", "Down", "Right" to move,<p/><p> "D" for Dynamiting and "Space" to Shoot </p><p>Are you ready to survive 1:30?</p>').append('<iframe width="420" height="315" src="https://www.youtube.com/embed/NNZ5XWnEgvA" frameborder="0" allowfullscreen></iframe>');
		}

	});


}; // end of intro


