var intro = function(){

	
	$('#game').prepend("<div id='intro'></div>");
	$('#intro').append("<div></div>");

//son T rex

$('#intro').append('<audio autoplay><source src="son/trex_cri.mp3"><source src="son/trex_cri.ogg"></audio>');


	$('#intro').append('<audio autoplay><source src="son/raptor-cuisine.mp3"><source src="son/raptor-cuisine.ogg"></audio>');


	$('.launch').text("Start The Game");

	var dinoArrival = $(window).width()+200;
	for (var i = 0; i < 7; i++) {
		$("#intro").prepend("<img>");
		// $('#game').css({'position':'relative'});

	}

//hunter
var hunter = $('img:nth-of-type(2)');
hunter.attr('src','img/intro/hunter.png').addClass('perso-hunter').css({'left':'-400px'}).animate({'left':'+=600px'},2000,function(){

	dino1.animate({'left':'-=950px'},2000);
	dino2.animate({'left':'-=850px'},2000);
	dino3.animate({'left':'-=750px'},2000);
	dino4.animate({'left':'-=650px'},2000);
	dino5.animate({'left':'-=550px'},2000, function(){
	logo.animate({'top':'+=250px'},3000)});

});

//logo
var logo = $('img:nth-of-type(7)');
logo.attr('src','img/intro/logo.png').addClass('perso-logo').css('top','-250px');

//Dino
var dino1=$('img:nth-of-type(1)').attr('src','img/intro/diplo.png').addClass('perso-dino').css({'left':dinoArrival + 'px'})
;

var dino2=$('img:nth-of-type(3)');
dino2.attr('src','img/intro/ptero.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'11'});

var dino3 =$('img:nth-of-type(4)');
dino3.attr('src','img/intro/raptor.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'12'});
var dino4=$('img:nth-of-type(5)');
dino4.attr('src','img/intro/raptor2.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'13'});
var dino5=$('img:nth-of-type(6)');
dino5.attr('src','img/intro/pachy.png').addClass('perso-dino').css({'left':dinoArrival+'px'});



$('.perso-dino').css({
	width:'350px',
	'position':'absolute',
	top: '200px'
});


$('.perso-logo').css({
	'cursor':'pointer',
	'position':'absolute',
	'left':(window.innerWidth/2)-($('.perso-dino').innerWidth()/2) +'px'
});

$('.perso-hunter').css({
	'position':'absolute',
	top: '150px',
	width:'350px'
});

};


