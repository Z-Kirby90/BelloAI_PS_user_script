async function fetch_pkmn(name) {
    var res = await fetch(`https://pokeapi.co/api/v2/${name}`);
    var pokemon = await res.json();
    return pokemon;
}
