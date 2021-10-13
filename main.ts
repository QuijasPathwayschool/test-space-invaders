input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.AB, function () {
    shoot = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    music.playTone(392, music.beat(BeatFraction.Whole))
    shoot.set(LedSpriteProperty.Brightness, 60)
    for (let index = 0; index < 4; index++) {
        shoot.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
        if (shoot.isTouching(enemy)) {
            enemy.delete()
            game.addScore(1)
            shoot.delete()
        }
    }
    if (shoot.get(LedSpriteProperty.Y) == 0) {
        shoot.delete()
    }
})
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
})
let shoot: game.LedSprite = null
let enemy: game.LedSprite = null
let player: game.LedSprite = null
player = game.createSprite(2, 4)
enemy = game.createSprite(randint(0, 4), 0)
let spd = 500
let enemycount = 0
game.setScore(0)
let countwall = 0
game.setLife(3)
basic.forever(function () {
    while (countwall <= 1) {
        enemy.move(1)
        basic.pause(spd)
        enemy.ifOnEdgeBounce()
        if (enemy.get(LedSpriteProperty.X) == 0 || enemy.get(LedSpriteProperty.X) == 4) {
            countwall += 1
        }
    }
    countwall = 0
    enemy.change(LedSpriteProperty.Y, 1)
    basic.pause(spd)
    if (enemy.isTouching(player)) {
        game.gameOver()
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    }
    if (enemy.get(LedSpriteProperty.Y) >= 4) {
        enemy.delete()
        game.removeLife(1)
    }
    if (enemy.isDeleted()) {
        enemy = game.createSprite(randint(0, 4), 0)
        enemycount += 1
    }
    if (enemycount > 5) {
        spd += -75
        enemycount = 0
    }
})
