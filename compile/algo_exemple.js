///initialisation variables ici en fait

async function startGameLoop() {
    while (true) {
        if (game_status = "inactive") {
            continue;
        }
        class selfPk {
            constructor() {
                this.name = ""
            }
        }
        ///Initialisation variables ici (peut-être)

        if (weak_against(selfPk.types,opponentPk.types)) {
            if ((selfPk.defence < opponentPk.attack) || (selfPk.special_defence < opponentPk.special_attack)) {
                var choice = choose_better_pkmn();
                switch_out(choice)
                continue;
            }
            else if ((selfPk.speed > opponentPk.speed) && (selfPk.multiplier.domAtk > 1.5)) {
                if (has_se_move()) { //se = super effective
                    var choice = choose_better_move()
                    if (choice.power == 0) {
                        var choice = choose_better_pkmn();
                        switch_out(choice)
                        continue;
                    }
                    choose_move(choice)
                    continue;
                }
            }
        }
        else {
            if (weak_against(opponentPk.types,selfPk.types)) {
                if ((selfPk.hp > 50) && (has_passive_move("boost") == true)) {
                    if ((selfPk.multiplier.domAtk == 4)) {
                        var choice = choose_better_move()
                        choose_move(choice)
                        continue;
                    }
                    var choice = choose_boost_move()
                    choose_move(choice)
                    continue;
                }
                if (has_se_move()) {
                    var choice = choose_better_move()
                    choose_move(choice)
                    continue;
                }
            }
            else {
                if (has_se_move()) {
                    var choice = choose_better_move()
                    choose_move(choice)
                    continue;
                }
                else {
                    var choice = choose_random_move()
                    choose_move()
                    continue;
                }
            }
        }



        await new Promise(resolve => setTimeout(resolve, 180));
    }
}
startGameLoop()