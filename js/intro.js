var intro = function(){

	
$('#game').prepend("<div id='intro'></div>");
	$('#intro').append("<div></div>")


	$('.launch').text("Start The Game");

	var dinoArrival = $(window).width()+200;
	for (var i = 0; i < 7; i++) {
		$("#intro").prepend("<img>");
		// $('#game').css({'position':'relative'});

	}

//hunter
$('img:nth-of-type(2)').attr('src','img/intro/hunter.png').addClass('perso-hunter').css({'left':'-400px'}).animate({'left':'+=600px'},2000);

//Dino
$('img:nth-of-type(1)').attr('src','img/intro/diplo.png').addClass('perso-dino').css({'left':dinoArrival + 'px'}).animate({'left':'-=950px','z-index':'10'},2000);

$('img:nth-of-type(3)').attr('src','img/intro/ptero.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'11'});

$('img:nth-of-type(4)').attr('src','img/intro/raptor.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'12'}).animate({'left':'-=850px'},2000);
$('img:nth-of-type(5)').attr('src','img/intro/raptor2.png').addClass('perso-dino').css({'left':dinoArrival+'px','z-index':'13'}).animate({'left':'-=750px'},2000);
$('img:nth-of-type(6)').attr('src','img/intro/pachy.png').addClass('perso-dino').css({'left':dinoArrival+'px'}).animate({'left':'-=650px','z-index':'14'},2000);
//logo
$('img:nth-of-type(7)').attr('src','img/intro/logo.png').addClass('perso-logo').css('top','-200px').animate({'top':'+=200px'},2000);


$('.perso-dino').css({
	width:'350px',
	'position':'absolute',
	top: '200px',
});


$('.perso-logo').css({
	'cursor':'pointer',
	'position':'absolute',
	'left':(window.innerWidth/2)-($('.perso-dino').innerWidth()/2) +'px'
});

$('.perso-hunter').css({
	'position':'absolute',
	top: '150px',
	width:'350px',
});

}