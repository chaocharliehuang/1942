var hero = {
    x: 300,
    y: 520
}

var enemies = [];

function createEnemies() {
    enemies = [
        {x: 100, y: 0},
        {x: 200, y: 0},
        {x: 300, y: 0},
        {x: 500, y: 100},
        {x: 250, y: 100},
        {x: 550, y: 150},
        {x: 400, y: 0}
    ];
}

createEnemies();

var bullets = [];

var score = 0;

var explosionID = 0;

function displayScore() {
    $('#score').html(score);
}

function displayHero() {
    $('#hero').css('top', hero.y + "px");
    $('#hero').css('left', hero.x + "px");
}

function displayEnemies() {
    var output = '';
    for (var i = 0; i < enemies.length; i++) {
        output += "<div class='enemy1' style='top:" + enemies[i].y + 
        "px; left:" + enemies[i].x + "px;'></div>";
    }
    $('#enemies').html(output);
}

function displayBullets() {
    var output = '';
    for (var i = 0; i < bullets.length; i++) {
        output += "<div class='bullet' style='top:" + bullets[i].y + 
        "px; left:" + bullets[i].x + "px;'></div>";
    }
    $('#bullets').html(output);
}

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (score < 100) {
            enemies[i].y += 1;
        } else {
            enemies[i].y += 1*(score/100);
        }
        if (enemies[i].y > 540) {
            enemies[i].y = 0;
            enemies[i].x = Math.random()*500;
        }
    }
}

function moveBullets() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].y -= 3;

        if (bullets[i].y < 0) {
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
        }
    }
    displayBullets();
}

function detectCollision() {
    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
            if (Math.abs(bullets[i].x - enemies[j].x) < 20 && 
            Math.abs(bullets[i].y - enemies[j].y) < 20) {
                displayExplosion(enemies[j].x, enemies[j].y);
                removeEnemy(j, enemies);
                removeBullet(i, bullets);
                score += 10;
                displayScore();
                displayEnemies();
                displayBullets();
                break;
            }
        }
        break;
    }
    if (enemies.length === 0) {
        createEnemies();
    }
}

function detectEnemyCollision() {
    for (var i = 0; i < enemies.length; i++) {
        if (Math.abs(hero.x - enemies[i].x) < 20 && 
            Math.abs(hero.y - enemies[i].y) < 20) {
                score -= 50;
                displayScore();
                displayExplosion(hero.x, hero.y);
                hero.x = 520;
                hero.y = 520;
                displayHero();
                break;
            }
    }
}

function displayExplosion(x, y) {
    var explosionHTML = "<div class='explosion' style='top:" + y + 
        "px; left:" + x + "px;' id='explosion" + explosionID + "'></div>";
    $('#explosions').append(explosionHTML);
    var explosion = '#explosion' + explosionID;
    $(explosion).fadeOut(300);
    explosionID++;
}

function removeEnemy(enemyIndex, enemies) {
    enemies[enemyIndex] = enemies[enemies.length - 1];
    enemies.pop();
}

function removeBullet(bulletIndex, bullets) {
    bullets[bulletIndex] = bullets[bullets.length - 1];
    bullets.pop();
}

function gameLoop() {
    displayHero();
    moveEnemies();
    displayEnemies();
    moveBullets();
    detectCollision();
    detectEnemyCollision();
    if (score < 0) {
        var gameOverHTML = "<p>GAME OVER, YOU SUCK.</p>";
        gameOverHTML += "<p>YOUR TERRIBLE SCORE: " + score + "</p>";
        gameOverHTML += "<a href='./index.html'>TRY AGAIN, NOOB.</a>";
        $('body').html(gameOverHTML);
    }
}

setInterval(gameLoop, 20);

$(document).keydown(function(e) {
    if (e.keyCode === 37 && hero.x-10 > 0) { // left
        hero.x -= 10;
    } else if (e.keyCode === 39 && hero.x+10 < 990) { // right
        hero.x += 10;
    } else if (e.keyCode === 38 && hero.y-10 > 0) { // up
        hero.y -= 10;
    } else if (e.keyCode === 40 && hero.y+10 < 540) { // down
        hero.y += 10;
    } else if (e.keyCode === 32) { // spacebar
        bullets.push({x: hero.x+7, y: hero.y-15});
        displayBullets();
    }
    displayHero();
});