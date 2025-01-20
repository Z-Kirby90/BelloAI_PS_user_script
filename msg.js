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
function if_trash_talk() {
    let msglst = ["uh,","stop wasting both our time,","ok?","like,","idc,","because,","it's a game so,","stop and play it?","I mean","You plan on doing that for how many times?","because,","like,","lame","so,","stop wasting our time,","ok?","ok"]
    simulateEnterKeyPress();
    msg("hey,")

    for (var i = 0; i < msglst.length; i++) {
        setTimeout(function(message) {
            return function() {
                msg(message);
            };
        }(msglst[i]), 500 + (750 * i));
    }
}
/*
for (var i = 0; i < msglst.length; i++) {
    setTimeout(msg(msglst[i]),500 + (1000 * i));
}
*/
/*
simulateEnterKeyPress();
msg("hey,")
setTimeout(msg("uh,"),500);
setTimeout(msg("stop wasting both our time,"),1000);
setTimeout(msg("ok?"),1500);
setTimeout(msg("like,"),2000);
setTimeout(msg("idc,"),2500);
setTimeout(msg("because,"),3000);
setTimeout(msg("it's a game so,"),3500);
setTimeout(msg("stop?"),4000);
setTimeout(msg("I mean,"),4500);
setTimeout(msg("is that really how you plan do live?"),5000);
setTimeout(msg("saying things like that to everyone you encounter?"),5500);
setTimeout(msg("because,"),6000);
setTimeout(msg("like,"),6500);
setTimeout(msg("we idc,"),7000);
setTimeout(msg("so,"),8000);
setTimeout(msg("stop wasting our time,"),8500);
setTimeout(msg("ok?"),9000);
setTimeout(msg("ok"),9500);
*/