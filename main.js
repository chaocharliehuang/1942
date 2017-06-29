var hero = {
    x: 300,
    y: 500
}

var enemies = [
    {x: 100, y: 100},
    {x: 200, y: 100},
    {x: 300, y: 100},
    {x: 400, y: 100}
];

var bullets = [];

var score = 0;

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
        enemies[i].y += 1;
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
            if (Math.abs(bullets[i].x - enemies[j].x) < 10 && 
            Math.abs(bullets[i].y - enemies[j].y) < 10) {
                console.log('collision!');
            }
        }
    }
}

function gameLoop() {
    displayHero();
    moveEnemies();
    displayEnemies();
    moveBullets();
    detectCollision();
}

setInterval(gameLoop, 20);

$(document).keydown(function(e) {
    if (e.keyCode === 37) {
        hero.x -= 10;
    } else if (e.keyCode === 39) {
        hero.x += 10;
    } else if (e.keyCode === 38) {
        hero.y -= 10;
    } else if (e.keyCode === 40) {
        hero.y += 10;
    } else if (e.keyCode === 32) {
        bullets.push({x: hero.x+7, y: hero.y-15});
        displayBullets();
    }
    displayHero();
});