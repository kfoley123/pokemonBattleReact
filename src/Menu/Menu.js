import React, { useEffect } from "react";
import cs from "classnames";

export default function Menu(props) {
    const {
        playerPokemonObject,
        gameData,
        setGameData,
        opponentHP,
        setOpponentHP,
        playerHP,
        setPlayerHP,
        oppPokemonObject,
    } = props;

    const battleMenu = playerPokemonObject.moves.map((move) => {
        return (
            <button
                className="attack"
                key={move.name}
                name={move.name}
                onClick={doMove}
            >
                {move.name}
            </button>
        );
    });

    function attackMenu() {
        setGameData((prevState) => {
            return {
                ...prevState,
                isMenuHidden: true,
                isBattleMenuHidden: false,
            };
        });
    }

    function changePokemon() {
        setGameData((prevState) => {
            return {
                ...prevState,
                isMenuHidden: true,
                isPartyMenuHidden: false,
            };
        });
    }

    function run() {
        alert("You can't run from a trainer battle!");
    }

    function item() {
        setGameData((prevData) => {
            return {
                ...prevData,
                isMenuHidden: true,
                isItemMenuHidden: false,
            };
        });
    }

    function returnToMain() {
        setGameData((prevData) => {
            return {
                ...prevData,
                isMenuHidden: false,
                isBattleMenuHidden: true,
                isItemMenuHidden: true,
                isPartyMenuHidden: true,
            };
        });
    }

    function disableMenu(isDisabled) {
        setGameData((prevData) => {
            return {
                ...prevData,
                isOppTurn: isDisabled,
            };
        });
    }

    function doMove(moveEvent) {
        var clickedMoveName = moveEvent.target.name;
        setGameData((prevData) => {
            return {
                ...prevData,
                textBoxtext: ` ${playerPokemonObject.name} used ${clickedMoveName} `,
            };
        });

        playerPokemonObject.moves.forEach((move) => {
            if (move.name === clickedMoveName) {
                var newHP = opponentHP - move.damage;
                if (newHP < 0) {
                    newHP = 0;
                }
                setOpponentHP(newHP);
            }
        });

        returnToMain();
        disableMenu(true);
    }

    function doOppMove() {
        var opponentMove =
            oppPokemonObject.moves[
                Math.floor(Math.random() * oppPokemonObject.moves.length)
            ];
        setGameData((prevData) => {
            return {
                ...prevData,
                textBoxtext: `Opponent ${oppPokemonObject.name} used ${opponentMove.name}`,
            };
        });

        var tempHP = playerHP - opponentMove.damage;
        if (tempHP < 0) {
            tempHP = 0;
        }
        setPlayerHP(tempHP);

        disableMenu(false);
    }

    useEffect(() => {
        if (opponentHP > 0 && gameData.isOppTurn) {
            setTimeout(() => {
                doOppMove();
                disableMenu(false);
            }, 3000);
        }

        if (opponentHP === 0) {
            setTimeout(() => alert("Opponent's pokemon has fainted!"), 1000);
            disableMenu(true);
        }
        if (playerHP === 0) {
            setTimeout(() => alert("Player's pokemon has fainted!"), 1000);
            disableMenu(true);
        }
    }, [opponentHP, playerHP]);

    return (
        <div className="menu">
            <div
                className={cs("textBox", {
                    hidden: gameData.textBoxtext === "",
                })}
            >
                {gameData.textBoxtext}
            </div>
            <div
                className={cs("mainMenu", {
                    hidden: gameData.isMenuHidden,
                })}
            >
                <button
                    className="fight"
                    disabled={gameData.isOppTurn}
                    onClick={attackMenu}
                >
                    FIGHT
                </button>
                <button
                    className="pkmn"
                    disabled={gameData.isOppTurn}
                    onClick={changePokemon}
                >
                    PKMN
                </button>
                <button
                    className="item"
                    disabled={gameData.isOppTurn}
                    onClick={item}
                >
                    ITEM
                </button>
                <button
                    className="run"
                    disabled={gameData.isOppTurn}
                    onClick={run}
                >
                    RUN
                </button>
            </div>
            <div
                className={cs("fightMenu", {
                    hidden: gameData.isBattleMenuHidden,
                })}
            >
                {battleMenu}
            </div>
            <button className="back" onClick={returnToMain}>
                back
            </button>

            <div
                className={cs("partyList", {
                    hidden: gameData.isPartyMenuHidden,
                })}
            >
                <ul>
                    <li>Charmander</li>
                    <li>Bulbasaur</li>
                    <li>Squirtle</li>
                    <li>Rhydon</li>
                    <li>Ghastly</li>
                    <li>Eevee</li>
                </ul>
            </div>

            <div
                className={cs("itemList", {
                    hidden: gameData.isItemMenuHidden,
                })}
            >
                <ul>
                    <li>Potion</li>
                    <li>Pokeball</li>
                    <li>Berry</li>
                    <li>Silk Scarf</li>
                    <li>Revive</li>
                    <li>Super Potion</li>
                </ul>
            </div>
        </div>
    );
}
