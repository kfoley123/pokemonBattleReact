import React, { useEffect, useCallback } from "react";
import "./Menu.css";
import Items from "../Items/Items";
import PKMN from "../PKMN/PKMN";
import BattleMenu from "../BattleMenu/BattleMenu";

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

    const mainMenu = (
        <div className="mainMenu">
            <button disabled={gameData.isOppTurn} onClick={attackMenu}>
                FIGHT
            </button>
            <button disabled={gameData.isOppTurn} onClick={changePokemon}>
                PKMN
            </button>
            <button disabled={gameData.isOppTurn} onClick={item}>
                ITEM
            </button>
            <button disabled={gameData.isOppTurn} onClick={run}>
                RUN
            </button>
        </div>
    );

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

    const disableMenu = useCallback(
        (isDisabled) => {
            setGameData((prevData) => {
                return {
                    ...prevData,
                    isOppTurn: isDisabled,
                };
            });
        },
        [setGameData]
    );

    function doMove(moveEvent) {
        var clickedMoveName = moveEvent.target.name;
        setGameData((prevData) => {
            return {
                ...prevData,
                textBoxtext: ` ${playerPokemonObject.name} used ${clickedMoveName}! `,
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

    const doOppMove = useCallback(() => {
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
    }, [disableMenu, oppPokemonObject, playerHP, setGameData, setPlayerHP]);

    useEffect(() => {
        if (opponentHP > 0 && gameData.isOppTurn && !gameData.endGame) {
            setTimeout(() => {
                doOppMove();
                disableMenu(false);
            }, 3000);
        }

        if (opponentHP === 0 || playerHP === 0) {
            if (!gameData.endGame) {
                alert(
                    opponentHP === 0
                        ? "Opponent's pokemon has fainted!"
                        : "Player's pokemon has fainted!"
                );

                setGameData((prevData) => {
                    return { ...prevData, endGame: true };
                });
            }

            disableMenu(true);
        }
    }, [opponentHP, playerHP, gameData, doOppMove, disableMenu, setGameData]);

    return (
        <div className="framed buttons compact">
            <div className="textBox">{gameData.textBoxtext}</div>

            {!gameData.isMenuHidden && mainMenu}

            <div className="movesMenu">
                {!gameData.isBattleMenuHidden && (
                    <BattleMenu
                        moves={playerPokemonObject.moves}
                        doMove={doMove}
                    />
                )}
            </div>

            {!gameData.isItemMenuHidden && <Items />}

            {!gameData.isPartyMenuHidden && <PKMN />}

            <button className="back" onClick={returnToMain}>
                back
            </button>
        </div>
    );
}
