//Emprunt
var txtalst = document.getElementsByClassName("textbox")
var txta = txtalst[(txtalst.length - 1)]
console.log(txta.value)
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

async function wait(time) {
    await new Promise(res => setTimeout(res,time))
}
///à supprimer après


const eMousedown = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
const eMouseup = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
const eClick = new MouseEvent('click', { bubbles: true, cancelable: true });


//HP
let hp = document.getElementsByClassName("hptext") //Array of nodes
if (hp.length >= 2) {
    selfHp = Number(hp[0].innerHTML.replace("%","")) //Get in percentage the hp of your pokemon
    opponentHp = Number(hp[1].innerHTML.replace("%","")) //Get in percentage the hp of the opposing pokemon
}


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


//Team
let team = []
let team_index = []
let active_pkmn_team = 0;
for (var n = 0; n < e.length; n++) {
    for (var i = 0; i < 7; i ++) {
        console.log(e[n].dataset.tooltip == `switchpokemon|${i}`)
        if (e[n].dataset.tooltip == `switchpokemon|${i}`) {
            if (e[n].value.includes("fainted")) {continue};
            team.push(e[n].childNodes[1].data)
            team_index.push(n)
        }
    }
}
for (var i = 0; i < (team_index.length - 1); i++) {
    if ((e[team_index[i]].value.replace(String(team[i]) + ",","")) == "active") {
        active_pkmn_team = i
    }
}

//DT Pokemon
async function get_dt(_pokemon_name) {
    if (document.getElementsByClassName("result").length > 0) {
        for (var i = 0; i < document.getElementsByClassName("result").length; i++) {
            document.getElementsByClassName("result")[0].remove()
        }
    }
    msg("/dt " + String(_pokemon_name))
    await new Promise(resolve => setTimeout(resolve,800))
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

    console.log([_pokemon_name,_type,_abilities,_stats])
    return [_pokemon_name,_type,_abilities,_stats]

}

let types = ["Fire","Water","Grass","Insect","Poison","Ghost","Steel","Fairy","Rock","Dragon","Dark","Fighting","Psychic","Ground","Normal","Electric","Ice","Flying"]


//peut-être obsolète si inconnu ou incomplet
/*
for (var i = 0; i < 12; i++) {
    //e[i].dispatchEvent(eMousedown)
    var go = async () => {e[i].dispatchEvent(eMousedown);await new Promise(resolve => setTimeout(resolve,1000));console.log([document.getElementsByClassName("tooltip tooltip-pokemon")[0].children[1].innerHTML,document.getElementsByClassName("tooltip tooltip-pokemon")[0].children[2].innerHTML,document.getElementsByClassName("tooltip tooltip-pokemon")[0].children[3].innerHTML]);}
    setTimeout(() => {return go()},500 + (250 * i));
}
*/
//6
/*
for (var i = 0; i < e.length; i++) {
    if (e[i].dataset.id == "p1a") {
        console.log(i)
        console.log(e[i])
    }
}
*/
async function get_pkmn_dt() {
    for (var n = 0; n < e.length; n++) {
        for (var i = 0; i < 7; i ++) {
            console.log(e[n].dataset.tooltip == `switchpokemon|${i}`)
            if (e[n].dataset.tooltip == `switchpokemon|${i}`) {
                e[n].dispatchEvent(eMousedown);
                await new Promise(res => setTimeout(res,500));
            }
        }
    }
}

class pokemon {
    constructor(_name,_types,_abilities,_stats) {
        this.name = _name
        this.types = _types
        this.abilities = _abilities
        this.stats = _stats
    }
}
var selfpk;
var self_team = []
for (var i = 0; i < team.length; i++) {
    let _data = await get_dt(team[i])
    //let pk = new pokemon(_data[0],_data[1],_data[2],_data[3])
    self_team.push(new pokemon(_data[0],_data[1],_data[2],_data[3]))
    await new Promise(resolve => setTimeout(resolve,500))
}

/*
for (var i = 0; i < move_btn.length; i++) {

    ///Name
    move_btn.forEach(e => {
        if (e.dataset.move != undefined && e.nodeName == "BUTTON") {
            console.log(e.dataset.move)
        }
    });

    ///Type
    move_btn.forEach(e => {
        if (e.nodeName == "BUTTON") {
            console.log(e.children[1].innerHTML)
        }
    });
    //type
    ///document.getElementsByClassName("movemenu")[0].children[3].children[1].innerHTML
    //pp
    ///(document.getElementsByClassName("movemenu")[0].children[0].children[2].innerHTML).split("/") // ['24','24']
}*/

class move {
    constructor(_name,_type,_power,_accuracy,_category,_pp) {
        this.name = _name
        this.type = _type
        this.power = _power
        this.accuracy = _accuracy
        this.category = _category
        this.pp = _pp
    }
}

let self_moves = [];
let move_btn = Array.from(document.getElementsByClassName("movemenu")[0].children);

async function get_attack_dt(element) {
    element.dispatchEvent(eMousedown)

    await new Promise(res => setTimeout(res,800))

    let category_ = element.children[0].children[2].src.replace("https://play.pokemonshowdown.com/sprites/categories/","").replace(".png","")

    let power_ = Number(element.children[1].innerHTML.replace("Base power: ",""))

    let accuracy_ = Number(element.children[2].innerHTML.replace("Accuracy: ","").replace("%",""))

    return [category_,power_,accuracy_]
}

///Number
let move_number = 0
move_btn.forEach(e => {
    if (e.nodeName == "BUTTON") {
        move_number += 1
    }
})

///PP
let atk_pp = []
for (var i = 0; i < move_number; i++) {
    atk_pp.push(Number(document.getElementsByClassName("movemenu")[0].children[i].children[2].innerHTML.split("/")[0]))
}

///Name
let atk_names = []
move_btn.forEach(e => {
    if (e.dataset.move != undefined && e.nodeName == "BUTTON") {
        atk_names.push(e.dataset.move)
        //console.log(e.dataset.move)
    }
});

///Type
let atk_types = []
move_btn.forEach(e => {
    if (e.nodeName == "BUTTON") {
        atk_types.push(e.children[1].innerHTML)
        //console.log(e.children[1].innerHTML)
    }
});

///Power, Category & Accuracy
let atk_powers = []
let atk_category = []
let atk_accuracy = []
let placeholder_array = []
/*
move_btn.forEach(async e => {
    if (e.nodeName == "BUTTON") {
        e.dispatchEvent(eMousedown)

        let popup = document.getElementsByClassName("tooltip tooltip-move")[0]

        placeholder_array.push(await get_attack_dt(popup))
        await new Promise(res => setTimeout(res,100))
        //console.log(placeholder_array)

        let category_ = popup.children[0].children[2].src.replace("https://play.pokemonshowdown.com/sprites/categories/","").replace(".png","")

        let power_ = Number(popup.children[1].innerHTML.replace("Base power: ",""))

        let accuracy_ = Number(popup.children[2].innerHTML.replace("Accuracy: ","").replace("%",""))
    }
})
*/
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

await processMoves()

for (var i = 0; i < move_number; i++) {
    atk_category.push(placeholder_array[i][0])
    atk_powers.push(placeholder_array[i][1])
    atk_accuracy.push(placeholder_array[i][2])
}

for (var i = 0; i < move_number; i++) {
    self_moves.push(new move(atk_names[i],atk_types[i],atk_powers[i],atk_accuracy[i],atk_category[i],atk_pp[i]))
}

for (var i = 0; i < self_moves.length; i++) {
    console.log(self_moves[i])
}


async function get_move_dt(_move) {
    msg(`/dt ${_move}`)
    if (document.getElementsByClassName("utilichart").length > 1) {
        while (document.getElementsByClassName("utilichart").length != 1) {
            document.getElementsByClassName("utilichart").item(0).remove()
        }
    }
    Array.from(document.getElementsByTagName("font")).forEach(e => {e.remove()})
    await new Promise(res => setTimeout(res,500));
}