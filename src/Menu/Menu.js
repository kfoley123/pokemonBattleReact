import React, { useEffect, useCallback } from "react";
import "./Menu.css";
import bulbasaurSprite from "../images/bulbasaurSprite.png";
import charmanderSprite from "../images/charmanderSprite.png";
import squirtleSprite from "../images/squirtleSprite.png";
import eeveeSprite from "../images/eeveeSprite.png";
import ghastlySprite from "../images/ghastlySprite.png";
import rhydonSprite from "../images/rhydonSprite.png";

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

    const mainMenu = (
        <div>
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

    const itemMenu = (
        <div>
            <ul className="itemList">
                <li>
                    Potion <p>x3</p>
                </li>
                <li>
                    Pokeball <p>x6</p>
                </li>
                <li>
                    Berry <p>x3</p>
                </li>
                <li>
                    Silk Scarf <p>x1</p>
                </li>
                <li>
                    Revive <p>x1</p>
                </li>
                <li>
                    Super Potion <p>x3</p>
                </li>
            </ul>
        </div>
    );

    const PKMNmenu = (
        <div>
            <ul className="partyList">
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={charmanderSprite}
                        alt="charmander sprite"
                    />
                    Charmander
                </button>
                <button className="partyItem ">
                    <img
                        className="sprite"
                        src={bulbasaurSprite}
                        alt="bulbasaur sprite "
                    />
                    Bulbasaur
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={squirtleSprite}
                        alt="squirtle sprite "
                    />
                    Squirtle
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={rhydonSprite}
                        alt="rhydon sprite"
                    />
                    Rhydon
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={ghastlySprite}
                        alt="ghastly sprite"
                    />
                    Ghastly
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={eeveeSprite}
                        alt="eevee sprite"
                    />
                    Eevee
                </button>
            </ul>
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
                {!gameData.isBattleMenuHidden && battleMenu}
            </div>

            {!gameData.isItemMenuHidden && itemMenu}

            {!gameData.isPartyMenuHidden && PKMNmenu}

            <button className="back" onClick={returnToMain}>
                back
            </button>
        </div>
    );
}
