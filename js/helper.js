let animateRequestFrame = function (tempo, context, condition, endOfAnimation, numberOfFrame, isIdle) {
    let tActuel;
    let tPrecedent;
    let frame = 0;
    let refPerso = context;
    let spriteAnimation = function (actuel) {
        tActuel = actuel;
        tPrecedent = tPrecedent || actuel;
        var delai = tActuel - tPrecedent;
        if (delai > tempo) {
            frame++;
            if (frame == refPerso.spriteX.length) {
                if (endOfAnimation == "repeat") frame = 0;

            }
            $('#contenu').css('left', refPerso.spriteX[frame] + "px");
            $('#contenu').css('top', refPerso.spriteY[numberOfFrame] + "px");
            // if (isIdle) {
            //     $('#contenu').css('width', refPerso.idle[frameFixed].w + "px");
            //     $('#contenu').css('height', refPerso.idle[frameFixed].h + "px");
            // }

            tPrecedent = tActuel;
        }
        if (condition()) {
            requestAnimationFrame(spriteAnimation);
            if (!isIdle)
                refPerso.enAttente = false;
        } else {
            if (!isIdle)
            refPerso.heroFixed()
        }
    };
    spriteAnimation();
};