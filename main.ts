let myTextSprite = fancyText.create("Passionate Highs", 0, 5)
fancyText.setFont(myTextSprite, fancyText.geometric_sans_11)
myTextSprite.setPosition(80, 60)
utmMusic.playSongLoop(utmMusic.UTMSong.TESTFORPASH)
animation.runMovementAnimation(
myTextSprite,
animation.animationPresets(animation.bobbing),
5000,
true
)
