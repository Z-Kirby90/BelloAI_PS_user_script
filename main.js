///initialisation variables ici en fait
//var e = document.getElementsByClassName("has-tooltip");

var txtalst = document.getElementsByClassName("textbox")
var txta = txtalst[(txtalst.length - 1)]

let types = ["Fire","Water","Grass","Insect","Poison","Ghost","Steel","Fairy","Rock","Dragon","Dark","Fighting","Psychic","Ground","Normal","Electric","Ice","Flying"]

function has_node_name(array,name) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].nodeName == name) {
            return true;
        }
    }
    return false;
}

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
}

function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function getRandomIntRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

pk_form = [
    "nidoran",
    "minior",
    "deoxys",
    "squawkabilly",
    "pumpkaboo",
    "darmanitan",
    "gourgeist",
    "wormadam",
    "oricorio",
    "zygarde",
    "eiscue",
    "tatsugiri",
    "meloetta"
]

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
        } else if (this.stats[1] == this.stats[3]) {
            this.domAtk = "Both"
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

async function fetch_pkmn(name) {
    var res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    var poke = await res.json();
    return poke;
}

async function get_pk_from_fetch(name) {

    if (name.toLowerCase() == "eiscue") {
        return new pokemon("Eiscue",["Ice"],["Ice Face"],[75,80,110,65,90,50])
    }

    let res = await fetch_pkmn(name.toLowerCase())

    let types = []

    res.types.forEach(e => types.push(capitalize(e.type.name)))

    let abilities = []

    res.abilities.forEach(e => abilities.push(capitalize(e.ability.name)))

    let stats = []

    res.stats.forEach(e => stats.push(e.base_stat))

    let poke = new pokemon(capitalize(res.name),types,abilities,stats)

    return poke
}

async function get_move_from_fetch(name) {

    let res = await fetch(`https://pokeapi.co/api/v2/move/${name.toLowerCase().replaceAll(" ","-")}`)

    let data = await res.json()

    let category = ""

    if (data.damage_class.name == "special") {
        category = "SpA"
    } else {
        category = "Atk"
    }

    let description = ""

    if (data.effect_entries.length != 0) {
        description = data.effect_entries[0].effect
    }

    let mo = new move(capitalize(data.name),capitalize(data.type.name),category,data.power,data.accuracy,description)

    return mo
}

async function get_self_team_name(w_active = true) {
    let _e = document.getElementsByClassName("has-tooltip");
    let _team = []
    let _team_index = []
    for (var n = 0; n < _e.length; n++) {
        for (var i = 0; i < 7; i ++) {
            //console.log(e[n].dataset.tooltip == `switchpokemon|${i}`)
            if (_e[n].dataset.tooltip == `switchpokemon|${i}`) {
                if ((_e[n].value.includes("fainted")) || ((_e[n].value.includes(",active")) && (w_active == false))) {continue};

                //Form Madness
                if (pk_form.includes(_e[n].childNodes[1].data.toLowerCase())) {
                    let popp
                    let name
                    switch (_e[n].childNodes[1].data.toLowerCase()) {
                        case "oricorio" :
                            _team.push("oricorio-sensu")
                            _team_index.push(n)
                            break;
                        case "meloetta" :
                            _e[n].childNodes[1].dispatchEvent(eMouseup)
                            _e[n].childNodes[1].dispatchEvent(eMousedown)
                            
                            await wait(500)
                            popp = document.getElementsByClassName("tooltip tooltip-switchpokemon")[0]
                            if (popp.children[0].children[0].innerHTML == "") {
                                _team.push("meloetta-aria")
                                _team_index.push(n)
                            } else {
                                _team.push("meloetta-pirouette")
                                _team_index.push(n)
                            }
                            break;
                        case "squawkabilly" :
                            _e[n].childNodes[1].dispatchEvent(eMouseup)
                            _e[n].childNodes[1].dispatchEvent(eMousedown)
                            
                            await wait(500)
                            popp = document.getElementsByClassName("tooltip tooltip-switchpokemon")[0]
                            _team.push(popp.children[0].children[0].innerHTML.replace("(","").replace(")","") + "-plumage")
                            _team_index.push(n)
                            break;
                        case "lycanroc" :
                            _e[n].childNodes[1].dispatchEvent(eMouseup)
                            _e[n].childNodes[1].dispatchEvent(eMousedown)
                                
                            await wait(500)
                            popp = document.getElementsByClassName("tooltip tooltip-switchpokemon")[0]
                            name = popp.children[0].children[0].innerHTML.replace("(","").replace(")","")
                            if (name == "lycanrock") {
                                name = "lycanrock-midday"
                            }
                            _team.push(name)
                            _team_index.push(n)
                            break;
                        default :
                            _e[n].childNodes[1].dispatchEvent(eMouseup)
                            _e[n].childNodes[1].dispatchEvent(eMousedown)
                                
                            await wait(500)
                            popp = document.getElementsByClassName("tooltip tooltip-switchpokemon")[0]
                            _team.push(popp.children[0].children[0].innerHTML.replace("(","").replace(")",""))
                            _team_index.push(n)
                            break;
                    }
                    continue;
                }

                _team.push(_e[n].childNodes[1].data.replaceAll(" ","-"))
                _team_index.push(n)
            }
        }
    }

    return _team
}

async function get_self_team(w_active = true) {

    let team = []

    let t = await get_self_team_name(w_active)

    t.forEach(async e => {
        let pk = await get_pk_from_fetch(e)
        team.push(pk)
    })

    return team
}

let self_team = []

function get_self_moves_name() {

    if ((document.getElementsByClassName("movemenu")).length == 0) {
        return []
    }

    let move_btn = Array.from(document.getElementsByClassName("movemenu")[0].children);
    let _move_btn = []

    move_btn.forEach(e => {
        if ((e.nodeName == "BUTTON") && (e.disabled != true)) {
            _move_btn.push(e)
        }
    })

    let move_names = []

    _move_btn.forEach(e => {
        move_names.push(e.dataset.move)
    })

    return move_names
}

async function get_self_moves_from_fetch() {

    let move_lst = get_self_moves_name()

    let mv_lst = []

    if (move_lst.length == 0) {

        return []

    } else {

        let mv_promises = move_lst.map(e => get_move_from_fetch(e));

        let mv_lst = await Promise.all(mv_promises);

        return mv_lst
    }
}

///Switch-out here
async function switch_out(_pokemon_name) {

    let no = document.getElementsByClassName("switchmenu")[0]

    for (var i = 0; i < no.children.length; i++) {
        if (no.children[i].nodeName == "EM") {
            let c = choose_random_move()
            choose_move()
            return false
        }
    }

    //_pokemon_name = _pokemon_name.split("-")[0]

    if (_pokemon_name == null) {
        var choice = await choose_random_move()
        choose_move(choice)
        return false
    }

    var switchs = document.getElementsByName("chooseSwitch");

    if (_pokemon_name == undefined) {
        switchs[0].dispatchEvent(eMousedown)
        switchs[0].dispatchEvent(eMouseup)
        switchs[0].dispatchEvent(eClick)
    }

    console.log("%c " + _pokemon_name + " was choosen","color : green")

    for (var i = 0; i < switchs.length; i++) {
        if (_pokemon_name.toLowerCase().replaceAll("-"," ") == switchs[i].childNodes[1].data.toLowerCase()) {
            switchs[i].dispatchEvent(eMousedown)
            switchs[i].dispatchEvent(eMouseup)
            switchs[i].dispatchEvent(eClick)
            
            return true
        }
    }

    console.log("%c can't switch to " + String(_pokemon_name),"color:red;")
    console.log("%c Switching to random...","color:red;")

    let t = get_self_team_name()
    let c = t[getRandomIntRange(0, t.length - 1)]

    switch_out(c)
    
}

//Re-made

async function choose_better_pkmn() {

    _team = await get_self_team(false)

    let opponent = await get_pk_from_fetch(document.getElementsByClassName("statbar lstatbar leftstatbar")[0].children[0].innerHTML.split("<")[0].replaceAll(" ",""))

    if (_team.length == 0) {
       return null
    }

    if (opponent == undefined) {
        return _team[getRandomIntRange(0,Math.max(0,_team.length - 1))].name
    }

    _team.map(e => console.log(e))

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
}

function choose_move(move_name) {
    let e = document.getElementsByClassName("has-tooltip")

    let move_n = 0
    let move_e = []
    for (var i = 0; i < e.length; i++) {
        if (e[i].dataset.tooltip.includes("move|") && e[i].disabled != true) {
            move_n += 1

            move_e.push(e[i])

            console.log(e[i].childNodes[0].data) //Nom
            console.log(e[i].childNodes[2].innerHTML) //Type
        }
    }
    for (var i = 0; i < move_e.length; i++) {
        console.log(move_name.toLowerCase().replaceAll("-"," "))
        if (move_e[i].dataset.move.toLowerCase() == move_name.toLowerCase().replaceAll("-"," ")) {
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

async function choose_better_move() {

    let move_lst = await get_self_moves_from_fetch()

    let opponent = await get_pk_from_fetch(document.getElementsByClassName("statbar lstatbar leftstatbar")[0].children[0].innerHTML.split("<")[0].replace(" ",""))

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

async function has_se_move() {

    let move_lst = await get_self_moves_from_fetch()

    let opponent = await get_pk_from_fetch(document.getElementsByClassName("statbar lstatbar leftstatbar")[0].children[0].innerHTML.split("<")[0].replace(" ",""))

    move_lst.forEach(el => {
        if (is_weak_against(el, opponent)) {
            return true
        }
    })

    return false
}

async function has_passive_move(type = "boost") {

    let move_lst = await get_self_moves_from_fetch()

    for (var i = 0; i < move_lst.length; i++) {
        if (move_lst[i].description.includes("Raises") && move_lst.setup == true) {
            return true
        }
    }

    return false

}

async function choose_random_move() {
    let move_lst = await get_self_moves_from_fetch()

    return move_lst[getRandomIntRange(0,move_lst.length - 1)].name
}

async function choose_boost_move() {

    let move_lst = await get_self_moves_from_fetch()

    let opponent = await get_pk_from_fetch(document.getElementsByClassName("statbar lstatbar leftstatbar")[0].children[0].innerHTML.split("<")[0].replace(" ",""))

    move_lst.forEach(element => {
        if (element.setup == true) {
            return element.name
        }
    })

    return choose_random_move()
}

async function form_name_and_stuff(name,self_or_not) {
    if (pk_form.includes(name)) {
        let p
        switch (name.toLowerCase()) {
            case "oricorio" :
                p = await get_pk_from_fetch("oricorio-sensu")
                return [p,0]
                break;
            case "meloetta" :

                for (var i = 0; i < node.length; i++) {
                    if (self_or_not == "self") {
                        if (node[i].dataset.tooltip == "activepokemon|0|0") {
                            node[i].dispatchEvent(eMouseup)
                            node[i].dispatchEvent(eMousedown)
                            await wait(300)
                            let popup = document.getElementsByClassName("tooltip tooltip-activepokemon")[0]
                            let s_name = popup.children[0].children[0].innerHTML.replace("(","").replace(")","")
                            name = s_name.toLowerCase()
                        }
                    } else {
                        if (node[i].dataset.tooltip == "activepokemon|1|0") {
                            node[i].dispatchEvent(eMouseup)
                            node[i].dispatchEvent(eMousedown)
                            await wait(300)
                            let popup = document.getElementsByClassName("tooltip tooltip-activepokemon")[0]
                            let s_name = popup.children[0].children[0].innerHTML.replace("(","").replace(")","")
                            name = s_name.toLowerCase()
                        }
                    }
                }
                if (name == "") {
                    p = await get_pk_from_fetch("meloetta-aria")
                    return [p,0]
                } else {
                    p = await get_pk_from_fetch("meloetta-pirouette")
                    return [p,0]
                }

                break;
            case "squawkabilly":
                p = await get_pk_from_fetch("squawkabilly-yellow-plumage")
                return [p,0]
                break;
            case "minior" :
                name = "minior-yellow"
                p = await get_pk_from_fetch(name)
                return [p,0]
                break;
            case "lycanroc" :
                for (var i = 0; i < node.length; i++) {
                    if (self_or_not == "self") {
                        if (node[i].dataset.tooltip == "activepokemon|0|0") {
                            node[i].dispatchEvent(eMouseup)
                            node[i].dispatchEvent(eMousedown)
                            await wait(300)
                            let popup = document.getElementsByClassName("tooltip tooltip-activepokemon")[0]
                            let s_name = popup.children[0].children[0].innerHTML.replace("(","").replace(")","")
                            name = s_name.toLowerCase()
                        }
                    } else {
                        if (node[i].dataset.tooltip == "activepokemon|1|0") {
                            node[i].dispatchEvent(eMouseup)
                            node[i].dispatchEvent(eMousedown)
                            await wait(300)
                            let popup = document.getElementsByClassName("tooltip tooltip-activepokemon")[0]
                            let s_name = popup.children[0].children[0].innerHTML.replace("(","").replace(")","")
                            name = s_name.toLowerCase()
                        }
                    }
                }
                if (name.toLowerCase() == "lycanrock") {
                    p = await get_pk_from_fetch("lycanrock-midday")
                    return [p,0]
                } else {
                    p = await get_pk_from_fetch(name)
                    return [p,0]
                }
                break;
            case "eiscue" :
                return [new pokemon("Eiscue",["Ice"],["Ice Face"],[75,80,110,65,90,50]),0]
                break;
            default :
                let node = document.getElementsByClassName("has-tooltip");
                for (var i = 0; i < node.length; i++) {
                    if (self_or_not == "self") {
                        if (node[i].dataset.tooltip == "activepokemon|0|0") {
                            node[i].dispatchEvent(eMouseup)
                            node[i].dispatchEvent(eMousedown)
                            await wait(300)
                            let popup = document.getElementsByClassName("tooltip tooltip-activepokemon")[0]
                            let s_name = popup.children[0].children[0].innerHTML.replace("(","").replace(")","")
                            name = s_name.toLowerCase()
                        }
                    } else {
                        if (node[i].dataset.tooltip == "activepokemon|1|0") {
                            node[i].dispatchEvent(eMouseup)
                            node[i].dispatchEvent(eMousedown)
                            await wait(300)
                            let popup = document.getElementsByClassName("tooltip tooltip-activepokemon")[0]
                            let s_name = popup.children[0].children[0].innerHTML.replace("(","").replace(")","")
                            name = s_name.toLowerCase()
                        }
                    }
                }
                p = await get_pk_from_fetch(name)
                return [p,0]
        }
    } else {
        return 0
    }
}

stopit = false

async function startGameLoop() {
    game_status = "wait"
    while (!(stopit)) {
        /*
        if (game_status = "inactive") {
            continue;
        }
        */

        var skip = document.getElementsByName("skipTurn")[0];

        if (skip != undefined) {
            skip.click();
        }

        await wait(200)

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

                console.log("K.O")

                switch_out(choice);
            }
            console.log('No Action')
            await wait(200)
            continue;
        }

        ///Initialisation variables ici (peut-être)

        let self_name = document.getElementsByClassName("statbar rstatbar leftstatbar")[0].children[0].innerHTML.split("<")[0].slice(0,-1).replaceAll(" ","-")

        let skip_mesure = [0,0]

        skip_mesure[0] = await form_name_and_stuff(self_name)

        let selfPk;

        if (skip_mesure[0] == 0) {
            selfPk = await get_pk_from_fetch(self_name)
        } else {
            selfPk = skip_mesure[0][0]
        }

        self_team = await get_self_team()

        let opponent_name = document.getElementsByClassName("statbar lstatbar leftstatbar")[0].children[0].innerHTML.split("<")[0].slice(0,-1).replaceAll(" ","-")
        let opponentPk = await get_pk_from_fetch(opponent_name)


        ///All about stat raise

        var multi = {domAtk : 1} //Stat Multiplier
        
        var stbar = document.getElementsByClassName("statbar rstatbar leftstatbar")

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

        ///Actual thinking

        if (weak_against(selfPk,opponentPk)) {
            if ((selfPk.stats[2] < opponentPk.stats[1]) || (selfPk.stats[4] < opponentPk.stats[3])) {
                var choice = await choose_better_pkmn();
                switch_out(choice)
            }
            else if ((selfPk.stats[5] > opponentPk.stats[5]) && (multi.domAtk > 1.5)) {
                if (has_se_move()) { //se = super effective
                    var choice = await choose_better_move()
                    if (choice.power == null) {
                        var choice = await choose_better_pkmn();
                        switch_out(choice)
                    }
                    choose_move(choice)
                }
            }
        }
        else {
            if (weak_against(opponentPk,selfPk)) {
                if ((selfPk.stats[0] > 50) && (has_passive_move("boost") == true)) {
                    if ((multi.domAtk >= 3.5)) {
                        var choice = await choose_better_move()
                        choose_move(choice)
                    }
                    var choice = await choose_boost_move()
                    choose_move(choice)
                }
                if (has_se_move()) {
                    var choice = await choose_better_move()
                    choose_move(choice)
                }
            }
            else {
                if (has_se_move()) {
                    var choice = await choose_better_move()
                    choose_move(choice)
                }
                else {
                    var choice = await choose_random_move()
                    choose_move(choice)
                }
            }
        }

        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

//startGameLoop()