
var player = {
    name: 'Player',
    maxHealth : 100,
    health: 100,
    level: 1,
    exp: 0,
    gold: 50,
    attack: 10,
    armor: 1,
    healingPotions: 1,
    diamonds: 0,
    hasDagger: false,
    hasSteelSword: false,
}

var enemy = {
    name: 'Zombie',
    health: 50,
    maxHealth: 50,
    attack: 8,
    armor: 0
}

var xpTillLevel = player.level * 100;
var distance = 10 + 2 * player.level;
var hitPercentage = 50;

showStats();
showMainUI();

function showStats() {
    showPlayerLevel();
    showPlayerHealth();
    showPlayerGold();
    showPlayerExp();
    showPlayerInventoryBtn();
}

function showPlayerLevel() {
    document.querySelector('.player-level').innerText = "LVL : " + player.level;
}

function showPlayerHealth() {
    document.getElementById('player-health').max = player.maxHealth;
    document.getElementById('player-health').min = 0;
    document.getElementById('player-health').low = 20;
    document.getElementById('player-health').high = 60;
    document.getElementById('player-health').optimum = 80;
    document.getElementById('player-health').value = player.health;
    document.querySelector('.player-hp-value').innerText = player.health + '/' + player.maxHealth;
}

function showPlayerGold() {
    document.querySelector('.player-gold').innerText = "Gold : " + player.gold;
}

function showPlayerExp() {
    document.querySelector('.player-xp').innerText = 'Expierence : ' + player.exp + ' / ' + xpTillLevel;
}

function showPlayerInventoryBtn() {
    document.getElementById('player-inventory-btn').addEventListener('click', showPlayerInventory);
}

function showInventoryBtn() {
    document.querySelector('.player-inventory').innerHTML = '<button type = "submit" id = "player-inventory-btn">Inventory</button>';
}

function hidePlayerInventory() {
    document.querySelector('.player-inventory').innerHTML = '';
}

function showPlayerInventory() {
    hideCurrentUI();

    var inventoryBackground = document.createElement('div');
    inventoryBackground.className = 'player-inventory-bg';
    document.querySelector('.game_window').appendChild(inventoryBackground);

    var inventoryContent = document.createElement('div');
    inventoryContent.className = 'player-inventory-content';
    document.querySelector('.player-inventory-bg').appendChild(inventoryContent);
    inventoryContent.innerHTML = 
    '<div class = "label">Inventory</div><div class = "inventory-potions"></div><div class = "inventory-diamonds"></div><div class = "label"><button type = "submit" id = "healing-button-inv">Heal</button></div><div class = "label"><button type = "submit" id = "exit-inventory">Back</button></div>';
    document.getElementById('exit-inventory').addEventListener('click', showMainUI);

    document.querySelector('.inventory-potions').innerText = 'Healing Potions : ' + player.healingPotions;
    document.querySelector('.inventory-diamonds').innerText = 'Diamonds : ' + player.diamonds;

    document.getElementById('healing-button-inv').addEventListener('click', useHealingPotionInv);
}

function showMainUI() {
    document.querySelector('.game_window').innerHTML = 
    '<img src="map.jpg" usemap="#image-map" width = "1000px" height = "600px"><map name="image-map"><area  id = "shop" href = "#" onclick = "showShopUI()" coords="298,232,51" shape="circle"><area  id = "explore" href = "#" onclick = "showExploreUI()" coords="895,386,53" shape="circle"></map>';
}

function hideCurrentUI() {
    document.querySelector('.game_window').innerHTML = '';
}

function showShopUI() {
    hideCurrentUI();
    
    var shopBG = document.createElement('div');
    shopBG.className = 'shop';
    document.querySelector('.game_window').appendChild(shopBG);
    shopBG.innerHTML = 
    '<div class = "shop-content"><div class = "label">Buy</div><div class = "shop-item">Healing Potion (25 Gold)<button type = "submit" id = "buy-potion">Buy</button></div><div class = "shop-item">Dagger +2 Attack (50 Gold)<button type = "submit" id = "buy-dagger">Buy</button></div><div class = "shop-item"> Steel Sword +4 Attack (100 Gold)<button type = "submit" id = "buy-steel-sword">Buy</button></div><div class = "label">Sell</div><div class = "shop-item">Healing Potion (20 Gold)<button type = "submit" id = "sell-potion">Sell</button></div><div class = "shop-item">Diamond (100 Gold)<button type = "submit" id = "sell-diamond">Sell</button></div><div class = "label"><button type = "submit" id = "back-to-main">Back To Map</button></div></div>';
    document.getElementById('back-to-main').addEventListener('click', showMainUI);

    document.getElementById('buy-potion').addEventListener('click', buyPotion);
    document.getElementById('sell-potion').addEventListener('click', sellPotion);
}

function showBattleUI() {
    hideCurrentUI()
    hidePlayerInventory()
    var inventoryBackground = document.createElement('div');
    inventoryBackground.className = 'player-inventory-bg';
    document.querySelector('.game_window').appendChild(inventoryBackground);

    var fight = document.createElement('div');
    fight.className = 'fight';
    document.querySelector('.player-inventory-bg').appendChild(fight);

    var playerStats = document.createElement('div');
    playerStats.className = 'player-stats';
    document.querySelector('.fight').appendChild(playerStats);

    var img = document.createElement('div'); 
    img.className = 'enemy-img';
    img.innerHTML = "<img src='zombie2.png' height = '200px'>";
    img.height = 200;
    document.querySelector('.fight').appendChild(img);

    var playerEvents = document.createElement('div');
    playerEvents.className = 'player-events';
    document.querySelector('.enemy-img').appendChild(playerEvents);

    var enemyEvents = document.createElement('div');
    enemyEvents.className = 'enemy-events';
    document.querySelector('.enemy-img').appendChild(enemyEvents);

    var enemyEvents2 = document.createElement('div');
    enemyEvents2.className = 'enemy-events2';
    document.querySelector('.enemy-img').appendChild(enemyEvents2);

    var enemyStats = document.createElement('div');
    enemyStats.className = 'enemy-stats';
    document.querySelector('.fight').appendChild(enemyStats);

    showEnemyStats();
    showPlayerStats()
    
}

function showEnemyStats() {
    enemy.health = enemy.maxHealth;

    var enemyName = document.createElement('div');
    enemyName.className = 'label';
    enemyName.innerText = enemy.name;
    document.querySelector('.enemy-stats').appendChild(enemyName);

    var enemyHealth = document.createElement('div');
    enemyHealth.className = 'label';
    enemyHealth.innerText = 'Health : ' + enemy.health;
    enemyHealth.setAttribute('id', 'enemy-health');
    document.querySelector('.enemy-stats').appendChild(enemyHealth);

    var enemyDamage = document.createElement('div');
    enemyDamage.className = 'label';
    enemyDamage.innerText = 'Damage : ' + enemy.attack;
    document.querySelector('.enemy-stats').appendChild(enemyDamage);

    var enemyArmor = document.createElement('div');
    enemyArmor.className = 'label';
    enemyArmor.innerText = 'Armor : ' + enemy.armor;
    document.querySelector('.enemy-stats').appendChild(enemyArmor);

}

function showPlayerStats() {

    var playerName = document.createElement('div');
    playerName.className = 'label';
    playerName.innerText = player.name;
    document.querySelector('.player-stats').appendChild(playerName);
 
    var playerDamage = document.createElement('div');
    playerDamage.className = 'label';
    playerDamage.innerText = 'Attack : ' + player.attack;
    document.querySelector('.player-stats').appendChild(playerDamage);

    var playerArmor = document.createElement('div');
    playerArmor.className = 'label';
    playerArmor.innerText = 'Armor : ' + player.armor;
    document.querySelector('.player-stats').appendChild(playerArmor);

    var playerHealingPotions = document.createElement('div');
    playerHealingPotions.className = 'label';
    playerHealingPotions.setAttribute('id', 'player-potions');
    playerHealingPotions.innerText = 'Healing Potions : ' + player.healingPotions;
    document.querySelector('.player-stats').appendChild(playerHealingPotions);

    
    var attackButton = document.createElement('button');
    attackButton.setAttribute('id', 'attack-button');
    document.querySelector('.player-stats').appendChild(attackButton);
    document.getElementById('attack-button').addEventListener('click', attack);
    attackButton.innerText = 'Attack 50%';
    attackButton.style.marginLeft = '110px';

    var healingButton = document.createElement('button');
    healingButton.setAttribute('id', 'healing-button');
    document.querySelector('.player-stats').appendChild(healingButton);
    document.getElementById('healing-button').addEventListener('click', useHealingPotionBattle);
    healingButton.innerText = 'Heal';
    healingButton.style.marginLeft = '128px';
    healingButton.style.marginTop = '20px';

    var runButton = document.createElement('button');
    runButton.setAttribute('id', 'run-button');
    document.querySelector('.player-stats').appendChild(runButton);
    document.getElementById('run-button').addEventListener('click', runAttack);
    runButton.innerText = 'Run';
    runButton.style.marginLeft = '130px';
    runButton.style.marginTop = '20px';
}

function attack() {
    if (enemy.health > 0) {
        var percentage = Math.floor(Math.random() * 100) + 1;
        console.log('player hit percentage: ' + percentage);
        if (percentage < hitPercentage) {
            enemy.health -= player.attack;
            document.querySelector('.player-events').innerText = 'You hit for ' + player.attack + ' damage';
            document.getElementById('enemy-health').innerText = 'Health : ' + enemy.health;
        } else {
            document.querySelector('.player-events').innerText = 'You missed';
        }
    }
    enemyAttack()
}

function enemyAttack() {
    if (enemy.health === 0) {
        document.querySelector('.player-events').innerText = 'Enemy died';
        document.querySelector('.enemy-events').innerText = '';
        var btn = document.getElementById('attack-button');
        btn.parentNode.removeChild(btn);
        var runBtn = document.getElementById('run-button');
        runBtn.parentNode.removeChild(runBtn);
        enemyDied();
    } else {
        var enemyDmg = enemy.attack - player.armor;
        var enemyPercentage = Math.floor(Math.random() * 100) + 1;
        console.log('enemy hit percentage: ' + enemyPercentage);
        if (enemyPercentage < hitPercentage) {
            player.health = player.health - (enemy.attack - player.armor);
            document.querySelector('.enemy-events').innerText = 'Enemy hit you for ' + enemyDmg + ' damage';
            showPlayerHealth();
        } else {
            document.querySelector('.enemy-events').innerText = 'Enemy missed';
        }
        
        if (player.health === 0) {
            document.querySelector('.enemy-events').innerText = 'Player died';
            document.querySelector('.player-events').innerText = '';
        }
    }
}

function useHealingPotionInv() {
    if (player.healingPotions > 0) {
        if (player.health == 100) {
            alert('Your health is maximum already!');
        } else if (player.health > 74) {
            player.health = 100;
            player.healingPotions -= 1;
            showPlayerHealth();
            document.querySelector('.inventory-potions').innerText = 'Healing Potions : ' + player.healingPotions;
        } else {
            player.health += 25;
            player.healingPotions -= 1;
            showPlayerHealth();
            document.querySelector('.inventory-potions').innerText = 'Healing Potions : ' + player.healingPotions;
        }
    } else {
        alert("You don't have any potions left!")
    }
}

function useHealingPotionBattle() {
    if (player.healingPotions > 0) {
        if (player.health == 100) {
            alert('Your health is maximum already!');
        } else if (player.health > 74) {
            player.health = 100;
            player.healingPotions -= 1;
            showPlayerHealth();
            document.getElementById('player-potions').innerText = 'Healing Potions : ' + player.healingPotions;
            document.querySelector('.player-events').innerText = 'Your health is maximum now.';
            enemyAttack();
        } else {
            player.health += 25;
            player.healingPotions -= 1;
            showPlayerHealth();
            document.getElementById('player-potions').innerText = 'Healing Potions : ' + player.healingPotions;
            document.querySelector('.player-events').innerText = 'You healed for 25 points.';
            enemyAttack();
        }
    } else {
        alert("You don't have any potions left!")
    }
}

function enemyDied() {
    var gainedExp = Math.floor(Math.random() * 10 +1) + 10;
    var gainedGold = Math.floor(Math.random() * 5 + 1);
    if (gainedGold % 2 == 0) {
        player.gold += gainedGold;
        showPlayerGold();
        document.querySelector('.enemy-events2').innerText = 'You found ' + gainedGold + ' gold!';
    } else {
    }

    player.exp += gainedExp;
        if(player.exp >= xpTillLevel) {
            player.level += 1;
            player.maxHealth += 10;
            xpTillLevel = player.level * 100;
            showPlayerLevel();
            showPlayerExp();
            showPlayerHealth();
        } else {
            showPlayerExp();
            document.querySelector('.enemy-events').innerText = 'You gained ' + gainedExp + ' expierence!';
        }

    var continueBtn2 = document.createElement('button');
    continueBtn2.setAttribute('id', 'continue-btn-2');
    document.querySelector('.enemy-img').appendChild(continueBtn2);
    document.getElementById('continue-btn-2').addEventListener('click', backToExplore);
    continueBtn2.innerText = 'Continue';
    continueBtn2.style.marginLeft = '110px';
}

function backToExplore() {
    hideCurrentUI();
    showExploreUIAfterBattle();
}

function runAttack() {
    hideCurrentUI();
    showMainUI();
    showInventoryBtn();
    showPlayerInventoryBtn();
}

function buyPotion() {
    if (player.gold >= 25) {
        player.gold -= 25;
        player.healingPotions += 1;
        showPlayerGold();
    } else {
        alert('Not Enought Money');
    }
}   

function sellPotion() {
    if (player.healingPotions > 0) {
        player.gold += 20;
        player.healingPotions -= 1;
        showPlayerGold();
    } else {
        alert('No Potions');
    }
}

function showExploreUI() {
    hideCurrentUI();

    distance = 10 + 2 * player.level;
    
    var inventoryBackground = document.createElement('div');
    inventoryBackground.className = 'player-inventory-bg';
    document.querySelector('.game_window').appendChild(inventoryBackground);

    var inventoryContent = document.createElement('div');
    inventoryContent.className = 'player-inventory-content';
    document.querySelector('.player-inventory-bg').appendChild(inventoryContent);
    inventoryContent.innerHTML = 
    '<div class = "label">Exploring</div>';

    distanceLeft();

    var exploreEvents = document.createElement('div');
    exploreEvents.className = 'label';
    exploreEvents.setAttribute('id', 'explore-events');
    document.querySelector('.player-inventory-content').appendChild(exploreEvents);

    var continueBtn = document.createElement('div');
    continueBtn.className = 'label';
    document.querySelector('.player-inventory-content').appendChild(continueBtn);
    continueBtn.innerHTML = '<button type = "submit" id = "continue-explore">Continue</button>';
    document.getElementById('continue-explore').addEventListener('click', continueExplore);

    var returnBtn = document.createElement('div');
    returnBtn.className = 'label';
    document.querySelector('.player-inventory-content').appendChild(returnBtn);
    returnBtn.innerHTML = '<button type = "submit" id = "return">Stop Exploring</button>';
    document.getElementById('return').addEventListener('click', stopExplore);
}

function showExploreUIAfterBattle() {
    hideCurrentUI();
    
    var inventoryBackground = document.createElement('div');
    inventoryBackground.className = 'player-inventory-bg';
    document.querySelector('.game_window').appendChild(inventoryBackground);

    var inventoryContent = document.createElement('div');
    inventoryContent.className = 'player-inventory-content';
    document.querySelector('.player-inventory-bg').appendChild(inventoryContent);
    inventoryContent.innerHTML = 
    '<div class = "label">Exploring</div>';

    distanceLeft();

    var exploreEvents = document.createElement('div');
    exploreEvents.className = 'label';
    exploreEvents.setAttribute('id', 'explore-events');
    document.querySelector('.player-inventory-content').appendChild(exploreEvents);

    var continueBtn = document.createElement('div');
    continueBtn.className = 'label';
    document.querySelector('.player-inventory-content').appendChild(continueBtn);
    continueBtn.innerHTML = '<button type = "submit" id = "continue-explore">Continue</button>';
    document.getElementById('continue-explore').addEventListener('click', continueExplore);

    var returnBtn = document.createElement('div');
    returnBtn.className = 'label';
    document.querySelector('.player-inventory-content').appendChild(returnBtn);
    returnBtn.innerHTML = '<button type = "submit" id = "return">Stop Exploring</button>';
    document.getElementById('return').addEventListener('click', stopExplore);
}

function distanceLeft() {
    var distanceToGo = document.createElement('div');
    distanceToGo.className = 'label';
    distanceToGo.setAttribute('id', 'distance');
    document.querySelector('.player-inventory-content').appendChild(distanceToGo);
    distanceToGo.innerText = 'Distance to go : ' + distance + ' miles...';
}

function continueExplore() {
    if (distance > 0) {
        distance -= 1;
        var x = Math.floor(Math.random() * 5 + 1);
        document.getElementById('distance').innerText = 'Distance to go : ' + distance + ' miles...';
        console.log('random number - ' + x);
        if (x == 1 || x == 2) {
            showBattleUI();
        } else if (x == 3) {
            document.getElementById('explore-events').innerText = 'Nothing interesting happened on the road.';
        } else if (x == 4) {
            var foundGold = Math.floor(Math.random() * 5 +1);
            player.gold += foundGold;
            showPlayerGold();
            document.getElementById('explore-events').innerText = 'You found ' + foundGold + ' gold.';
        } else if (x == 5){
            document.getElementById('explore-events').innerText = 'You found secret entrance. Do you want to enter?';
        }
    } else {
        console.log('explore goal reached');
    }
    // showInventoryBtn();
}

function stopExplore() {
    hideCurrentUI();
    showMainUI();
    showInventoryBtn();
    showPlayerInventoryBtn();
}