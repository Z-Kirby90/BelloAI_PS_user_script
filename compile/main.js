///initialisation variables ici en fait
var e = document.getElementsByClassName("has-tooltip");
//Emprunt
var txtalst = document.getElementsByClassName("textbox")
var txta = txtalst[(txtalst.length - 1)]

function click(node) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('mousedown', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
    
    node.click();
}

function simulateEnterKeyPress() {
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13, // Code de la touche "Entrée"
      which: 13,   // Propriété `which` pour la compatibilité avec certains navigateurs
      bubbles: true // Pour que l'événement se propage
    })
    txta.dispatchEvent(enterEvent);
};

function msg(_string = "") {
    txtalst = document.getElementsByClassName("textbox")
    for (var i = 0; i < txtalst.length; i++) {
        if (txtalst[i].nodeName == "TEXTAREA") {
            txta = txtalst[i]
        }
    }
    //txta = txtalst[(txtalst.length - 1)]
    txta.value = _string;
    simulateEnterKeyPress();
}


function smKP(element) {
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13, // Code de la touche "Entrée"
      which: 13,   // Propriété `which` pour la compatibilité avec certains navigateurs
      bubbles: true // Pour que l'événement se propage
    })
    element.dispatchEvent(enterEvent);
};

const eMousedown = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
const eMouseup = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
const eClick = new MouseEvent('click', { bubbles: true, cancelable: true });


function lst_is_same(liste1, liste2) {
    if (liste1.length !== liste2.length) {
        return false;
    }

    for (let i = 0; i < liste1.length; i++) {
        if (liste1[i] !== liste2[i]) {
            return false;
        }
    }

    return true;
}


async function wait(time) {
    await new Promise(res => setTimeout(res,time))
}

class multiplier {
    constructor() {
        this.domAtk = 1
        this.Attack = 1
        this.Defence = 1
        this.Special_Defence = 1
        this.Special_Attack = 1
        this.Speed = 1
    }
}

class pokemon {
    constructor(_name,_types,_abilities,_stats) {
        this.name = _name
        this.types = _types
        this.abilities = _abilities
        this.stats = _stats
        if (this.stats[1] > this.stats[3]) {
            this.domAtk = "Atk"
        } else {
            this.domAtk = "SpA"
        }
    }
}

class move {
    constructor(_name,_type,_category,_power,_accuracy,_description) {
        this.name = _name
        this.type = _type
        this.category = _category
        this.power = _power
        this.accuracy = _accuracy
        this.description = _description

        //special varible to know if it's a "setup" move
        this.setup = false
    }

    is_setup(yesno) {
        this.setup = yesno
    }
}


/*
//Pokemon
let known_pokemon = []
var e = document.getElementsByClassName("has-tooltip")
let current_turn = ""
for (var i = 0; i < e.length; i++) {
    console.log(i)
    if (e[i].className == "turn has-tooltip") {
        current_turn = Number(e[i].innerHTML.replace("Turn ",""))
        break;
    }
    if (e[i].className == "picon has-tooltip") {
        console.log(e[i].ariaLabel.replace(" (active)","").replace(" (fainted)"))
        known_pokemon.push(e[i].ariaLabel.replace(" (active)","").replace(" (fainted)"))
    }
}
*/

//Team
let team = []
let team_index = []
let active_pkmn_team = 0;

//DT Pokemon
async function get_dt(_pokemon_name) {
    if (document.getElementsByClassName("result").length > 0) {
        for (var i = 0; i < document.getElementsByClassName("result").length + 1; i++) {
            document.getElementsByClassName("result")[0].remove()
        }
    }
    msg("/dt " + String(_pokemon_name))
    await new Promise(resolve => setTimeout(resolve,1000))
    let _element = document.getElementsByClassName("col typecol")[0]
    let _type = []
    for (var i = 0; i < _element.children.length; i++) {
        _type.push(String(_element.children[i].alt))
    }

    let _abilities = []
    _element = document.getElementsByClassName("col abilitycol")
    for (var i = 0; i < _element.length; i++) {
        _abilities.push(_element[i].innerHTML.replace("<em>","").replace("</em>",""))
    }
    if (document.getElementsByClassName("col twoabilitycol").length != 0) {
        for (var i = 0; i < document.getElementsByClassName("col twoabilitycol").length; i++) {
            _abilities.push(document.getElementsByClassName("col twoabilitycol")[0].innerHTML.split("<br>")[0])
            _abilities.push(document.getElementsByClassName("col twoabilitycol")[0].innerHTML.split("<br>")[1])
        }
    }
    if (_abilities[1] == "") {
        _abilities.splice(_abilities.length - 1, 1)
    }

    let _stats = []
    _element = document.getElementsByClassName("col statcol")
    for (var i = 0; i < _element.length; i++) {
        _stats.push(_element[i].innerHTML.split("<br>")[1])
    }

    //console.log([_pokemon_name,_type,_abilities,_stats])

    //return [_pokemon_name,_type,_abilities,_stats]
    return new pokemon(_pokemon_name,_type,_abilities,_stats)

}

let types = ["Fire","Water","Grass","Insect","Poison","Ghost","Steel","Fairy","Rock","Dragon","Dark","Fighting","Psychic","Ground","Normal","Electric","Ice","Flying"]

async function get_pkmn_dt() {
    for (var n = 0; n < e.length; n++) {
        for (var i = 0; i < 7; i ++) {
            //console.log(e[n].dataset.tooltip == `switchpokemon|${i}`)
            if (e[n].dataset.tooltip == `switchpokemon|${i}`) {
                e[n].dispatchEvent(eMousedown);
                await new Promise(res => setTimeout(res,500));
            }
        }
    }
}

var selfPk;
var opponentPk;

//Fonction primordiales

const weak_table = {
    Fire: {
        weak: ["Water", "Rock", "Ground"],
        immune: [],
        resist: ["Steel", "Fire", "Grass", "Ice", "Fairy", "Bug"],
        effective: ["Grass", "Steel", "Ice", "Bug"]
    },
    Water: {
        weak: ["Electric", "Grass"],
        immune: [],
        resist: ["Fire", "Water", "Ice", "Steel"],
        effective: ["Fire", "Rock", "Ground"]
    },
    Grass: {
        weak: ["Fire", "Ice", "Poison", "Flying", "Bug"],
        immune: [],
        resist: ["Water", "Electric", "Grass", "Ground"],
        effective: ["Water", "Rock", "Ground"]
    },
    Electric: {
        weak: ["Ground"],
        immune: [],
        resist: ["Electric", "Flying", "Steel"],
        effective: ["Water", "Flying"]
    },
    Ice: {
        weak: ["Fire", "Fighting", "Rock", "Steel"],
        immune: [],
        resist: ["Ice"],
        effective: ["Grass", "Flying", "Ground", "Dragon"]
    },
    Fighting: {
        weak: ["Flying", "Psychic", "Fairy"],
        immune: [],
        resist: ["Bug", "Rock", "Dark"],
        effective: ["Normal", "Ice", "Rock", "Dark", "Steel"]
    },
    Poison: {
        weak: ["Ground", "Psychic"],
        immune: [],
        resist: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
        effective: ["Grass", "Fairy"]
    },
    Ground: {
        weak: ["Water", "Ice", "Grass"],
        immune: ["Electric"],
        resist: ["Poison", "Rock"],
        effective: ["Fire", "Electric", "Rock", "Steel", "Poison"]
    },
    Flying: {
        weak: ["Electric", "Ice", "Rock"],
        immune: ["Ground"],
        resist: ["Fighting", "Bug", "Grass"],
        effective: ["Grass", "Fighting", "Bug"]
    },
    Psychic: {
        weak: ["Bug", "Ghost", "Dark"],
        immune: [],
        resist: ["Fighting", "Psychic"],
        effective: ["Fighting", "Poison"]
    },
    Bug: {
        weak: ["Fire", "Flying", "Rock"],
        immune: [],
        resist: ["Grass", "Fighting", "Ground"],
        effective: ["Grass", "Psychic", "Dark"]
    },
    Rock: {
        weak: ["Water", "Grass", "Fighting", "Ground", "Steel"],
        immune: [],
        resist: ["Normal", "Fire", "Poison", "Flying"],
        effective: ["Fire", "Ice", "Flying", "Bug"]
    },
    Ghost: {
        weak: ["Ghost", "Dark"],
        immune: ["Normal", "Fighting"],
        resist: ["Poison", "Bug"],
        effective: ["Psychic", "Ghost"]
    },
    Dragon: {
        weak: ["Ice", "Dragon", "Fairy"],
        immune: [],
        resist: ["Fire", "Water", "Electric", "Grass"],
        effective: ["Dragon"]
    },
    Dark: {
        weak: ["Fighting", "Bug", "Fairy"],
        immune: ["Psychic"],
        resist: ["Ghost", "Dark"],
        effective: ["Psychic", "Ghost"]
    },
    Steel: {
        weak: ["Fire", "Fighting", "Ground"],
        immune: ["Poison"],
        resist: ["Normal", "Grass", "Ice", "Flying", "Psychic", "Bug", "Rock", "Dragon", "Steel", "Fairy"],
        effective: ["Ice", "Rock", "Fairy"]
    },
    Fairy: {
        weak: ["Poison", "Steel"],
        immune: ["Dragon"],
        resist: ["Fighting", "Bug", "Dark"],
        effective: ["Fighting", "Dragon", "Dark"]
    },
    Normal: {
        weak: ["Fighting"],
        immune: ["Ghost"],
        resist: [],
        effective: []
    }
};

//Self-Explanatory
function weak_against(pokemon1,pokemon2) {
    let multiplier = 1
    pokemon1.types.forEach(e => {
        pokemon2.types.forEach(ee => {
            if (weak_table[e].weak.includes(ee)) {
                multiplier *= 2
            }
            else if (weak_table[e].resist.includes(ee)) {
                multiplier *= 0.5
            } else if (weak_table[e].immune.includes(ee)) {
                multiplier = 0
                return false
            }
        })
    });

    if (multiplier >= 2) {
        return true
    }
    else {
        return false
    }
}

function is_weak_against(_move,_pokemon) {
    let multiplier = 1
    _pokemon.types.forEach(e => {
        if (weak_table[e].weak.includes(_move.type)) {
            multiplier *= 2
        } else if (weak_table[e].resist.includes(_move.type)) {
            multiplier *= 0.5
        } else if (weak_table[e].immune.includes(_move.type)) {
            multiplier = 0
            return false
        }
    })

    if (multiplier >= 2) {
        return true
    }
    else {
        return false
    }
}
function resistance_multiplier(_pokemon,_move) {
    let multiplier = 1
    _pokemon.types.forEach(e => {
        if (weak_table[e].weak.includes(_move.type)) {
            multiplier *= 2
        } else if (weak_table[e].resist.includes(_move.type)) {
            multiplier *= 0.5
        } else if (weak_table[e].immune.includes(_move.type)) {
            multiplier = 0
            return false
        }
    })

    return multiplier
}

let self_moves = [];
//let move_btn = Array.from(document.getElementsByClassName("movemenu")[0].children);

///Number
let move_number = 0
///PP
let atk_pp = []
///Name
let atk_names = []
///Type
let atk_types = []
///Power, Category & Accuracy
let atk_powers = []
let atk_category = []
let atk_accuracy = []
let placeholder_array = []

async function processMoves() {
    for (let e of move_btn) {
        if (e.nodeName == "BUTTON") {
            e.dispatchEvent(eMousedown);

            let popup = document.getElementsByClassName("tooltip tooltip-move")[0];

            let category_ = popup.children[0].children[2].src.replace("https://play.pokemonshowdown.com/sprites/categories/","").replace(".png","")

            let power_ = Number(popup.children[1].innerHTML.replace("Base power: ",""))

            let accuracy_ = Number(popup.children[2].innerHTML.replace("Accuracy: ","").replace("%",""))

            //let data = await get_attack_dt(popup);
            //placeholder_array.push(data);
            placeholder_array.push(await get_attack_dt(popup))
        }
    }
}

async function choose_better_pkmn() {

    var opponent = await get_opponent_pk()

    let _team = await get_self_team()

    while (_team.length == 0) {
        _team = await get_self_team()
    }

    if (opponent == undefined) {
        return _team[getRandomIntRange(0,Math.max(0,_team.length - 1))].name
    }

    console.log(_team)

    for (var n = 0; n < _team.length; n++) {
        if (weak_against(opponent,_team[n])) {
            return _team[n].name
        }
    }

    for (var n = 0; n < _team.length; n++) {
        if (weak_against(_team[n],opponent) == false) {
            console.log(_team[n].name)
            return _team[n].name
        }
    }
    
    return _team[getRandomIntRange(0,Math.max(0,_team.length - 1))].name

    //return _team[Math.round(Math.random() * _team.length)]
}

function getRandomIntRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

var self_team = []

async function get_self_team() {

    if (self_team.length > 6) {
        self_team = []
    }

    let same = true

    let lst_team = get_self_team_name()

    let lst_team_ = self_team.map(pokemons => pokemons.name)
    
    if (!lst_is_same(lst_team,lst_team_)) {
        same = false
    }

    let _self_team = []

    if (!same) {

        /*
        //Getting the Pokémons AND infos of them in our team
        for (var i = 0; i < team.length; i++) {
            //let _data = await get_dt(team[i])
            //_self_team.push(new pokemon(_data[0],_data[1],_data[2],_data[3]))
            let _data = await get_dt(team[i])
            _self_team.push(_data)
            await new Promise(resolve => setTimeout(resolve,200))
        }
        */

        let _e = document.getElementsByClassName("has-tooltip");

        for (var n = 0; n < _e.length; n++) {
            for (var i = 0; i < 7; i ++) {
                if (_e[n].dataset.tooltip == `switchpokemon|${i}`) {
                    if (_e[n].value.includes("fainted")) {continue};

                    let _data = await get_dt(e[n].childNodes[1].data)

                    _self_team.push(_data)
                    
                    await wait(150)
                }
            }
        }

        return _self_team
    }

    return self_team
}

function get_self_team_name() {
    let _e = document.getElementsByClassName("has-tooltip");
    let _team = []
    let _team_index = []
    for (var n = 0; n < _e.length; n++) {
        for (var i = 0; i < 7; i ++) {
            //console.log(e[n].dataset.tooltip == `switchpokemon|${i}`)
            if (_e[n].dataset.tooltip == `switchpokemon|${i}`) {
                if (_e[n].value.includes("fainted")) {continue};
                _team.push(e[n].childNodes[1].data)
                _team_index.push(n)
            }
        }
    }
    return _team
}

async function get_self_pk() {

    let startingNode;
    
    for (var i = 0; i < document.getElementsByClassName("has-tooltip").length; i++) {
        if (document.getElementsByClassName("has-tooltip")[i].dataset.tooltip == "activepokemon|0|0") {
            startingNode = document.getElementsByClassName("has-tooltip")[i]
        }
    }
    
    startingNode.dispatchEvent(eMouseup)
    startingNode.dispatchEvent(eMousedown)

    await wait(300)

    var NodeSelfPk = document.getElementsByClassName("tooltip tooltip-activepokemon")[0].childNodes
    var nodeSelfPkStats = document.getElementsByClassName("tooltip tooltip-activepokemon")[0].childNodes[4].childNodes
    let self_stat_lst = []

    let PV = Number(NodeSelfPk[1].childNodes[1].data.split("(")[1].split("/")[1].replace(")",""));

    let LV;

    if (NodeSelfPk[0].children.length > 5) {
        LV = Number(NodeSelfPk[0].children[2].innerHTML.replace("L",""))
    }
    if (NodeSelfPk[0].children.length <= 5) {
        LV = Number(NodeSelfPk[0].children[1].innerHTML.replace("L",""))
    }

    let selfPv = Math.round(((50 * ((PV) - (LV) - (10))) / LV) - (31/2) - (getRandomIntRange(0,126)/8)); //getRandomIntRange(126,252)

    self_stat_lst.push(selfPv)

    for (var i = 0; i < nodeSelfPkStats.length; i++) {
        if (nodeSelfPkStats[i].nodeName === "#text") {
            self_stat_lst.push(Number(nodeSelfPkStats[i].data) / 2)
        }
    }
    let selfname = NodeSelfPk[0].childNodes[0].data.replace(" ","")
    let selfType = []
    
    for (var i = 0; i < NodeSelfPk[0].children.length; i++) {
        if (NodeSelfPk[0].children[i].nodeName == "SPAN") {
            for (var ii = 0; ii < NodeSelfPk[0].children[i].children.length; ii++) {
                selfType.push(NodeSelfPk[0].children[i].children[ii].src.replace("https://play.pokemonshowdown.com/sprites/types/","").replace(".png",""))
            }
        }
    }

    let selfAbility = []
    selfAbility.push(NodeSelfPk[2].childNodes[1].data.replace(" ",""))
    return new pokemon(selfname,selfType,selfAbility,self_stat_lst)
}

async function get_opponent_pk() {

    let startingNode;
    
    for (var i = 0; i < document.getElementsByClassName("has-tooltip").length; i++) {
        if (document.getElementsByClassName("has-tooltip")[i].dataset.tooltip == "activepokemon|1|0") {
            startingNode = document.getElementsByClassName("has-tooltip")[i]
        }
    }

    startingNode.dispatchEvent(eMousedown)

    await wait(500)

    if (document.getElementsByClassName("tooltip tooltip-activepokemon")[0] == undefined) {
        return undefined
    }
    
    let NodePopup = document.getElementsByClassName("tooltip tooltip-activepokemon")[0].childNodes
    let name = NodePopup[0].childNodes[0].data.replace(" ","")

    let opponent_poke = await get_dt(name)

    return opponent_poke
}

function has_node_name(array,name) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].nodeName == name) {
            return true;
        }
    }
    return false;
}

function switch_out(_pokemon_name) {
    //var switchpanel = document.getElementsByClassName("switchcontrols")[0];
    var switchs = document.getElementsByName("chooseSwitch");

    if (_pokemon_name == undefined) {
        switchs[0].dispatchEvent(eMousedown)
        switchs[0].dispatchEvent(eMouseup)
        switchs[0].dispatchEvent(eClick)
    }

    console.log(_pokemon_name)

    for (var i = 0; i < switchs.length; i++) {
        if (_pokemon_name == switchs[i].childNodes[1].data) {
            switchs[i].dispatchEvent(eMousedown)
            switchs[i].dispatchEvent(eMouseup)
            switchs[i].dispatchEvent(eClick)
            
            //switchs[i].click()
            return true
        }
    }

    console.log("%c can't switch to " + String(_pokemon_name),"color:red;")
    console.log("%c Switching to random...","color:red;")

    let t = get_self_team_name()
    let c = t[getRandomIntRange(0, t.length - 1)]

    switch_out(c)
    
}

///Move Section

move_lst = []

async function get_moves() {

    console.log(move_lst)

    let same = true

    let currentMoves = [];

    for (let i = 0; i < e.length; i++) {
        if (e[i].dataset.tooltip.includes("move|")) {
            currentMoves.push(e[i].childNodes[0].data);
        }
    }

    if (move_lst.length > 0) {
        let _mv = move_lst.map(_move => _move.name)

        if (!lst_is_same(_mv,currentMoves)) {
            same = false
        }
    }

    /*
    if (move_lst.length > 0) {
        let _mv = []
        for (var i = 0; i < e.length; i++) {
            if (e[i].dataset.tooltip.includes("move|")) {
                if (!(e[i].childNodes[0].data == move_lst[0])) {
                    same = false;
                    break;
                }
            }
        }
    }

    if (move_lst.length > 0) {
        let _mv = []

        for (var i = 0; i < e.length; i++) {
            if (e[i].dataset.tooltip.includes("move|")) {
                _mv.push(e[i].childNodes[0].data)
            }
        }

        let _mv_ = []

        move_lst.forEach(element => {
            _mv_.push(element.name)
        })

        if (!lst_is_same(_mv,_mv_)) {
            same = false
        }
    }

    if (same == false) {
        move_lst = []
    }
    */



    if (move_lst.length <= 0 || same == false) {

        move_lst = []

        let move_n = 0
        let move_e = []
        for (var i = 0; i < e.length; i++) {
            if (e[i].dataset.tooltip.includes("move|") && (e[i].disabled == false || e[i].disabled == undefined)) {
                move_n += 1

                move_e.push(e[i])

                console.log(e[i].childNodes[0].data) //Nom
                console.log(e[i].childNodes[2].innerHTML) //Type
            }
        }

        for (var i = 0; i < move_n; i++) {

            move_e[i].dispatchEvent(eMousedown)

            if (document.getElementsByClassName("tooltip tooltip-move")[0] == undefined) {
                await wait(500)
            }

            let tooltip_popup = document.getElementsByClassName("tooltip tooltip-move")[0]
            //console.log(tooltip_popup)

            let move_name = tooltip_popup.childNodes[0].childNodes[0].data
            let move_type = tooltip_popup.childNodes[0].childNodes[2].src.replace("https://play.pokemonshowdown.com/sprites/types/","").replace(".png","")
            let move_category = tooltip_popup.childNodes[0].childNodes[4].src.replace("https://play.pokemonshowdown.com/sprites/categories/","").replace(".png","")
            let move_power;
            let move_description;
            if (move_category != "Status") {
                move_power = Number(tooltip_popup.childNodes[1].innerHTML.replace("Base power: ","").split(" ")[0])
                move_description = tooltip_popup.childNodes[3].innerHTML
            } else {
                move_power = 0
                move_description = tooltip_popup.childNodes[2].innerHTML
            }
            //let move_power = Number(tooltip_popup.childNodes[1].innerHTML.replace("Base power: ","").split(" ")[0])
            let move_accuracy = Number(tooltip_popup.childNodes[2].innerHTML.replace("Accuracy: ","").replace("%","").split(" ")[0])
            if (isNaN(move_accuracy)) {
                move_accuracy = 101
            }

            let new_move = new move(move_name,move_type,move_category,move_power,move_accuracy,move_description)

            if (move_category == "Status" && tooltip_popup.childNodes[2].innerHTML.includes("Raise")) {
                new_move.is_setup(true)
            }

            move_lst.push(new_move)
        }
    }

    return true
}

async function has_se_move() {
    await get_moves()

    let opponent = await get_opponent_pk()

    move_lst.forEach(el => {
        if (is_weak_against(el,opponent)) {
            return true
        }
    })

    return false
}

async function choose_better_move() {
    await get_moves()

    let opponent = await get_opponent_pk()

    move_lst.forEach(element => {
        if (is_weak_against(element,opponent)) {
            if (!(element.power <= 0)) {
                return element.name
            }
        } else {
            if (element.power >= 70) {
                return element.name
            } else {
                if (resistance_multiplier(opponent,element) >= 1) {
                    return element.name
                }
            }
        }
    })

    return move_lst[getRandomIntRange(0,move_lst.length - 1)].name
}

async function choose_boost_move() {
    await get_moves()

    let opponent = await get_opponent_pk()

    move_lst.forEach(element => {
        if (element.setup == true) {
            return element.name
        }
    })

    return choose_better_move(true)
}

async function choose_random_move() {
    await get_moves()

    return move_lst[getRandomIntRange(0,move_lst.length - 1)].name
}

async function choose_random_pokemon() {
    await get_moves()

    let _self_team = await get_self_team()

    return _self_team[getRandomIntRange(0,_self_team.length - 1)].name
}

async function has_passive_move(type = "boost") {
    await get_moves()

    for (var i = 0; i < move_lst.length; i++) {
        if (move_lst[i].description.includes("Raises") && move_lst.setup == true) {
            return true
        }
    }

    return false

}
function choose_move(move_name) {
    let move_n = 0
    let move_e = []
    for (var i = 0; i < e.length; i++) {
        if (e[i].dataset.tooltip.includes("move|")) {
            move_n += 1

            move_e.push(e[i])

            console.log(e[i].childNodes[0].data) //Nom
            console.log(e[i].childNodes[2].innerHTML) //Type
        }
    }
    for (var i = 0; i < move_e.length; i++) {
        if (move_e[i].dataset.move == move_name) {
            move_e[i].dispatchEvent(eMousedown)
            move_e[i].dispatchEvent(eMouseup)
            move_e[i].dispatchEvent(eClick)
            
            //move_e[i].click()
            console.log(String(move_name) + "%c was selected!","font-family: Arial Black; color: green")
            return true
        }
    }

    console.log(String(move_name) + "%c Wasn't found, selecting random move instead!","font-family: Arial Black; color: red")

    move_e[getRandomIntRange(0,move_e.length - 1)].click()

    return false
}
////await processMoves()

///Others
startOfTheTurn = false
let current_turn;


var stopit = false;
//Starting the A.I
async function startGameLoop() {
    game_status = "wait"
    while (!(stopit)) {

        /*
        if (game_status == "inactive") {
            if (window.location.href.includes("battle")) {
                game_status = "in-battle"
            } else {
                continue;
            }
        }
        */

        var skip = document.getElementsByName("skipTurn")[0];

        if (skip != undefined) {
            skip.click();
        }

        var controls = document.getElementsByClassName("controls")[0];

        // Vérification de l'état du jeu
        if (controls != undefined) {
            if (controls.childNodes.length == 3) {
                game_status = "action";
            } else if (controls.childNodes.length == 2) {
                var hasParagraph = has_node_name(controls.childNodes,"P");

                console.log("%c" + String(hasParagraph),"font-size:50px;")

                if (hasParagraph == true) {
                    game_status = "wait";
                }
                else {
                    game_status = "K.O";
                }
            }
        }

        if (controls == undefined) {
            game_status = "wait";
            continue;
        }

        if (game_status != "action") {
            if (game_status == "K.O") {

                var choice = "none"

                await wait(500)

                var choice = await choose_better_pkmn();

                /*
                while (choice == "none") {
                    try {
                        var choice = await choose_better_pkmn();
                        await wait(200)
                    } catch (error) {
                        console.log(error)
                    }
                }
                    */

                /*
                try {
                    var choice = await choose_better_pkmn();
                } catch (error) {
                    console.log(error)
                    await wait(200)
                    var choice = await choose_better_pkmn();
                }
                    */

                console.log("K.O")

                switch_out(choice);
            }
            console.log('No Action')
            await wait(200)
            continue;
        }

        ///Assuming it's random battle rn

        ///Turn
        /*
        let turn = document.getElementsByClassName("turn has-tooltip")[0]

        if (turn != undefined && window.location.href.includes("battle")) {
            current_turn = Number(turn.innerHTML.replace("Turn ",""))
            if (current_turn == 1) {
                startOfTheTurn = true
            }
        }

        if (startOfTheTurn) {
            startOfTheTurn = false
        }
        */


        ///Initialisation variables ici (peut-être)

        e = document.getElementsByClassName("has-tooltip");

        //HP
        let hp = document.getElementsByClassName("hptext") //Array of nodes
        if (hp.length >= 2) {
            let selfHp = Number(hp[0].innerHTML.replace("%","")) //Get in percentage the hp of your pokemon
            let opponentHp = Number(hp[1].innerHTML.replace("%","")) //Get in percentage the hp of the opposing pokemon
        }


        //Getting the names of the Pokémon of our team
        for (var n = 0; n < e.length; n++) {
            for (var i = 0; i < 7; i ++) {
                //console.log(e[n].dataset.tooltip == `switchpokemon|${i}`)
                if (e[n].dataset.tooltip == `switchpokemon|${i}`) {
                    if (e[n].value.includes("fainted")) {continue};
                    team.push(e[n].childNodes[1].data)
                    team_index.push(n)
                }
            }
        }

        let active_pokemon_name = document.getElementsByClassName("statbar rstatbar leftstatbar")[0].children[0].childNodes[0].data.replace(" ","")

        ///Useless rn
        
        /*Getting the active Pokémon on the field
        for (var i = 0; i < (team_index.length - 1); i++) {
            if ((e[team_index[i]].value.replace(String(team[i]) + ",","")) == "active") {
                active_pkmn_team = i
            }
        }*/



        ////Taking too much time

        /*
        for (var i = 0; i < e.length; i++) {
            if (e[i].dataset.tooltip == "activepokemon|0|0") {
                e[i].dispatchEvent(eMousedown)
            }
        }
        await wait(400)
        */


        //Player
        /*
        var NodeSelfPk = document.getElementsByClassName("tooltip tooltip-activepokemon")[0].childNodes
        var nodeSelfPkStats = document.getElementsByClassName("tooltip tooltip-activepokemon")[0].childNodes[4].childNodes
        let self_stat_lst = []
        for (var i = 0; i < nodeSelfPkStats.length; i++) {
            if (nodeSelfPkStats[i].nodeName === "#text") {
                self_stat_lst.push(Number(nodeSelfPkStats[i].data) / 2)
            }
        }
        let selfname = NodeSelfPk[0].childNodes[0].data.replace(" ","")
        let selfType = []

        selfType.push(NodeSelfPk[0].children[3].children[0].src.replace("https://play.pokemonshowdown.com/sprites/types/","").replace(".png",""))
        if (NodeSelfPk[0].children[3].children.length > 1) {
            selfType.push(NodeSelfPk[0].children[3].children[1].src.replace("https://play.pokemonshowdown.com/sprites/types/","").replace(".png",""))
        }

        let selfAbility = []
        selfAbility.push(NodeSelfPk[2].childNodes[1].data.replace(" ",""))
        */

        //selfPk = new pokemon(selfname,selfType,selfAbility,self_stat_lst)

        let selfPk = await get_self_pk()

        var multi = {domAtk : 1} //Stat Multiplier
        
        var stbar = document.getElementsByClassName("statbar rstatbar leftstatbar")
        //let sta = stbar[0].getElementsByClassName("status")[0]
        //let statraise_node = sta.getElementsByClassName("good")

        //for (var i = 0; i < stbar.length; i++) {console.log(stbar[i].children[0].children.length)} //1

        let sta;
        let statraise_node;

        for (var i = 0; i < stbar.length; i++) {
            if (stbar[i].children[0].children.length == 1) {
                sta = stbar[i].getElementsByClassName("status")[0]
                statraise_node = sta.getElementsByClassName("good")
            }
        }
        
        if (statraise_node != undefined) {
            for (var i = 0; i < statraise_node.length; i++) {
                if (statraise_node[i].innerHTML.split(";")[1] == selfPk.domAtk) {
                    multi.domAtk = Number(statraise_node[0].innerHTML.split("×")[0])
                }
            }
        }

        if (isNaN(multi.domAtk)) {
            multi.domAtk = 1
        }
        
        let opponentPk = await get_opponent_pk()

        //let sta = document.getElementsByClassName("status")[0]
        //sta.getElementsByClassName("good")[0].innerHTML.split(";")[1]


        /*pokemon.stats =>
            [PV, 0
            ATTACK, 1
            DEFENCE, 2
            SPE.ATTACK, 3
            SPE.DEFENCE, 4
            SPEED 5]
        */

        //Actual Thinking (crazy)

        if (game_status == "K.O") {
            var choice = await choose_better_pkmn();

            console.log("K.O")

            switch_out(choice);
            
        }
        if (weak_against(selfPk,opponentPk)) {
            if ((selfPk.stats[2] < opponentPk.stats[1]) || (selfPk.stats[4] < opponentPk.stats[3])) {
                var choice = await choose_better_pkmn();

                console.log("Weak")
                console.log(choice)

                switch_out(choice);
                
            }
            else if ((selfPk.stats[5] > opponentPk.stats[5]) && (multi.domAtk > 1.5)) {
                if (has_se_move()) { //se = super effective
                    var choice = await choose_better_move()
                    if (choice.power == 0) {
                        var choice = await choose_better_pkmn();

                        console.log("No Power")

                        switch_out(choice)
                        
                    }

                    console.log("SE first")

                    choose_move(choice)
                    
                }
            }
        }
        else {
            console.log("The ELSE")

            if (weak_against(opponentPk,selfPk)) {
                if ((selfPk.stats[0] > 50) && (has_passive_move("boost") == true)) {
                    if ((multi.domAtk >= 3.5)) {
                        var choice = await choose_better_move()
                        choose_move(choice)
                        console.log("Good DomAtk")
                    } else {
                        var choice = await choose_boost_move()
                        choose_move(choice)
                    }
                }
                if (has_se_move()) {
                    var choice = await choose_better_move()
                    choose_move(choice)
                    console.log("SE Move")
                }
            }
            else {
                if (has_se_move()) {
                    var choice = await choose_better_move()
                    choose_move(choice)
                    console.log("SE Move 2")          
                }
                else {
                    var choice = await choose_random_move()
                    choose_move(choice)
                    console.log("random move")
                }
            }
        }

        await new Promise(resolve => setTimeout(resolve, 300));
    }
}
//startGameLoop()

/*
try {
    startGameLoop()
} catch (error) {
    console.log(error)
}
    */