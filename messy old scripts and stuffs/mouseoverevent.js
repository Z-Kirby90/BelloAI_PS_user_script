function mouseclick(_class = "picon has-tooltip",n = 0) {

    var e = document.getElementsByClassName(_class);
    // Create a synthetic click MouseEvent
    let evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    // Send the event to the checkbox element
    e[n].dispatchEvent(evt);
}
function mouseover(_class = "picon has-tooltip",n = 0) {

    var e = document.getElementsByClassName(_class);
    // Create a synthetic over MouseEvent
    let evt = new MouseEvent("down", {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    // Send the event to the checkbox element
    e[n].dispatchEvent(evt);
}
function mousedrag(_class = "picon has-tooltip",n = 0) {

    var e = document.getElementsByClassName(_class);
    // Create a synthetic over MouseEvent
    let evt = new MouseEvent("drag", {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    // Send the event to the checkbox element
    e[n].dispatchEvent(evt);
}
