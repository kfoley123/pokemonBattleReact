import React, { useEffect } from "react";
import cs from "classnames";
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
                className="itemMenu"
                disabled={gameData.isOppTurn}
                onClick={item}
            >
                ITEM
            </button>
            <button className="run" disabled={gameData.isOppTurn} onClick={run}>
                RUN
            </button>
        </div>
    );

    const itemMenu = (
        <div
            className={cs({
                hidden: gameData.isItemMenuHidden,
            })}
        >
            <ul className="itemList">
                <li className="item">
                    Potion <p>x3</p>
                </li>
                <li className="item">
                    Pokeball <p>x6</p>
                </li>
                <li className="item">
                    Berry <p>x3</p>
                </li>
                <li className="item">
                    Silk Scarf <p>x1</p>
                </li>
                <li className="item">
                    Revive <p>x1</p>
                </li>
                <li className="item">
                    Super Potion <p>x3</p>
                </li>
            </ul>
        </div>
    );

    const PKMNmenu = (
        <div
            className={cs({
                hidden: gameData.isPartyMenuHidden,
            })}
        >
            <ul className="partyList">
                <li className="partyItem">
                    <img
                        className="sprite"
                        src={charmanderSprite}
                        alt="sprite img"
                    />
                    Charmander
                </li>
                <li className="partyItem">
                    <img
                        className="sprite"
                        src={bulbasaurSprite}
                        alt="sprite img"
                    />
                    Bulbasaur
                </li>
                <li className="partyItem">
                    <img
                        className="sprite"
                        src={squirtleSprite}
                        alt="sprite img"
                    />
                    Squirtle
                </li>
                <li className="partyItem">
                    <img
                        className="sprite"
                        src={rhydonSprite}
                        alt="sprite img"
                    />
                    Rhydon
                </li>
                <li className="partyItem">
                    <img
                        className="sprite"
                        src={ghastlySprite}
                        alt="sprite img"
                    />
                    Ghastly
                </li>
                <li className="partyItem">
                    <img
                        className="sprite"
                        src={eeveeSprite}
                        alt="sprite img"
                    />
                    Eevee
                </li>
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
    }, [opponentHP, playerHP, gameData.isOppTurn]);

    return (
        <div className="framed buttons compact">
            <div
                className={cs("framed nohd", {
                    hidden: gameData.textBoxtext === "",
                })}
            >
                {gameData.textBoxtext}
            </div>

            {!gameData.isMenuHidden && mainMenu}

            {!gameData.isBattleMenuHidden && battleMenu}

            {!gameData.isItemMenuHidden && itemMenu}

            {!gameData.isPartyMenuHidden && PKMNmenu}

            <button className="back" onClick={returnToMain}>
                back
            </button>
        </div>
    );
}
