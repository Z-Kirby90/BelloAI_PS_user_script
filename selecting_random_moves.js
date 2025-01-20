/*
var moves = document.getElementsByName("chooseMove");
var controls = document.getElementsByClassName("controls")[0];
var movespanel = document.getElementsByClassName("movecontrols")[0];
var switchpanel = document.getElementsByClassName("switchcontrols")[0];
var switchs = document.getElementsByName("chooseSwitch");
game_status = "action";
if (controls.childNodes.length == 3) {
    game_status = "action";
}
if (controls.childNodes.length == 2) {
    game_status = "wait";
}

if (game_status == "action") {
    if (moves.length != 0) {
        moves[Math.round(Math.random() * (moves.length - 1))].click()
    }
    else {
        switchs[Math.round(Math.random() * (switchs.length - 1))].click()
    }
}
*/

//moves[Math.round(Math.random() * (moves.length - 1))].click()

function has_node_name(array,name) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].nodeName == name) {
            return true;
        }
    }
    return false;
}

async function startGameLoop() {
    while (true) {
        if (document.getElementsByName("acceptChallenge")[0] != undefined) {
            document.getElementsByName("acceptChallenge")[0].click();
        }
        if (document.getElementsByName("closeAndMainMenu")[0] != undefined) {
            document.getElementsByName("closeAndMainMenu")[0].click()
            console.log("end")
            return "end";
        }
        var skip = document.getElementsByName("skipTurn")[0];
        var moves = document.getElementsByName("chooseMove");
        var controls = document.getElementsByClassName("controls")[0];
        var movespanel = document.getElementsByClassName("movecontrols")[0];
        var switchpanel = document.getElementsByClassName("switchcontrols")[0];
        var switchs = document.getElementsByName("chooseSwitch");
        let game_status = "action";

        if (skip != undefined) {
            skip.click();
        }
        
        // Vérification de l'état du jeu
        if (controls != undefined) {
            if (controls.childNodes.length == 3) {
                game_status = "action";
            } else if (controls.childNodes.length == 2) {
                var hasParagraph = has_node_name(controls.childNodes,"p");

                if (hasParagraph) {
                    game_status = "wait";
                }
                else {
                    game_status = "K.O";
                }
            }
        }
        if (controls == undefined) {
            game_status = "wait";
        }

        // Si on est en mode action, choisissez un mouvement ou un switch au hasard
        if (game_status === "action") {
            if (moves.length !== 0) {
                moves[Math.floor(Math.random() * moves.length)].click();
            } else if (switchs.length !== 0) {
                switchs[Math.floor(Math.random() * switchs.length)].click();
            }
        }
        if (game_status === "K.O") {
            if (switchs.length !== 0) {
                switchs[Math.floor(Math.random() * switchs.length)].click();
            }
        }

        // Pause asynchrone pour éviter le gel de la page
        await new Promise(resolve => setTimeout(resolve, 180)); // Pause de 500 ms
    }
}

// Démarrer la boucle
startGameLoop();
