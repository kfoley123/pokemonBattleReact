import React, { useEffect, useState } from "react";
import cs from "classnames";
import "./App.css";
import Foe from "./Foe";

export default function App() {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [isBattleMenuHidden, setIsBattleMenuHidden] = useState(true);
    const [isPartyMenuHidden, setIsPartyMenuHidden] = useState(true);
    const [isItemMenuHidden, setIsItemMenuHidden] = useState(true);
    const [playerHP, setPlayerHP] = useState();
    const [opponentHP, setOpponentHP] = useState();
    const [textBoxtext, setTextBoxText] = useState("");
    const [isOppTurn, setIsOppTurn] = useState(false);

    const [playerPokemonObject, setplayerPokemonObject] = useState({
        name: "",
        sprite: "",
        hp: 999,
        moves: [],
    });
    const [oppPokemonObject, setOppPokemonObject] = useState({
        name: "",
        sprite: "",
        hp: 999,
        moves: [],
    });

    function randomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function capitalize(name) {
        let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        return capitalizedName;
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber(251)}`)
            .then((response) => response.json())
            .then((response) => {
                let moveSet = [];

                response.moves.forEach((move) => {
                    let pokemonMove = {
                        name: move.move.name,
                        damage: 15,
                    };
                    moveSet.push(pokemonMove);
                });

                let pokemonObj = {
                    name: capitalize(response.species.name),
                    sprite: response.sprites.back_default,
                    hp: response.stats[0].base_stat,
                    moves: moveSet.slice(0, 4),
                };
                setplayerPokemonObject(pokemonObj);
                setPlayerHP(pokemonObj.hp);
            });

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber(251)}`)
            .then((response) => response.json())
            .then((response) => {
                let moveSet = [];

                response.moves.forEach((move) => {
                    let pokemonMove = {
                        name: move.move.name,
                        damage: 15,
                    };
                    moveSet.push(pokemonMove);
                });

                let pokemonObj = {
                    name: capitalize(response.species.name),
                    sprite: response.sprites.front_default,
                    hp: response.stats[0].base_stat,
                    moves: moveSet.slice(0, 4),
                };

                setOppPokemonObject(pokemonObj);
                setOpponentHP(pokemonObj.hp);
            });
    }, []);

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
        setIsMenuHidden(true);
        setIsBattleMenuHidden(false);
    }

    function changePokemon() {
        setIsMenuHidden(true);
        setIsPartyMenuHidden(false);
    }

    function item() {
        setIsMenuHidden(true);
        setIsItemMenuHidden(false);
    }

    function Run() {
        alert("You can't run from a trainer battle!");
    }

    function returnToMain() {
        setIsMenuHidden(false);
        setIsBattleMenuHidden(true);
        setIsItemMenuHidden(true);
        setIsPartyMenuHidden(true);
    }

    function disableMenu(isDisabled) {
        setIsOppTurn(isDisabled);
    }

    function doOppMove() {
        var opponentMove =
            oppPokemonObject.moves[
                Math.floor(Math.random() * oppPokemonObject.moves.length)
            ];
        setTextBoxText(
            `Opponent ${oppPokemonObject.name} used ${opponentMove.name}`
        );

        var tempHP = playerHP - opponentMove.damage;
        if (tempHP < 0) {
            tempHP = 0;
        }
        setPlayerHP(tempHP);

        disableMenu(false);
    }

    function doMove(moveEvent) {
        var clickedMoveName = moveEvent.target.name;
        setTextBoxText(` ${playerPokemonObject.name} used ${clickedMoveName} `);

        playerPokemonObject.moves.forEach((move) => {
            if (move.name === clickedMoveName) {
                var newHP = opponentHP - move.damage;
                if (newHP < 0) {
                    newHP = 0;
                }
                setOpponentHP(newHP);
            }
        });
        disableMenu(true);
        returnToMain();
        setIsOppTurn(true);
    }

    useEffect(() => {
        if (opponentHP > 0 && isOppTurn) {
            setTimeout(() => {
                doOppMove();
                setIsOppTurn(false);
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
        <>
            <Foe oppPokemonObject={oppPokemonObject} opponentHP={opponentHP} />
            <div className="team">
                <h2>{playerPokemonObject.name}</h2>
                <h3>L20</h3>
                <div
                    className={cs({
                        healthBar: playerHP === playerPokemonObject.hp,
                        healthBar75:
                            playerHP < playerPokemonObject.hp * 0.99 &&
                            playerHP >= playerPokemonObject.hp * 0.51,
                        healthBar50:
                            playerHP < playerPokemonObject.hp * 0.51 &&
                            playerHP >= playerPokemonObject.hp * 0.26,
                        healthBar25:
                            playerHP < playerPokemonObject.hp * 0.25 &&
                            playerHP > 0,
                        healthBar0: playerHP === 0,
                    })}
                ></div>
                <p className="remainingHealth">{playerHP}</p>
                <img src={playerPokemonObject.sprite} alt="sprite" />
            </div>
            <div className="menu">
                <div
                    className={cs("textBox", {
                        hidden: textBoxtext === "",
                    })}
                >
                    {textBoxtext}
                </div>
                <div
                    className={cs("mainMenu", {
                        hidden: isMenuHidden,
                    })}
                >
                    <button
                        className="fight"
                        disabled={isOppTurn}
                        onClick={attackMenu}
                    >
                        FIGHT
                    </button>
                    <button
                        className="pkmn"
                        disabled={isOppTurn}
                        onClick={changePokemon}
                    >
                        PKMN
                    </button>
                    <button
                        className="item"
                        disabled={isOppTurn}
                        onClick={item}
                    >
                        ITEM
                    </button>
                    <button className="run" disabled={isOppTurn} onClick={Run}>
                        RUN
                    </button>
                </div>
                <div
                    className={cs("fightMenu", {
                        hidden: isBattleMenuHidden,
                    })}
                >
                    {battleMenu}
                </div>
                <button className="back" onClick={returnToMain}>
                    back
                </button>

                <div
                    className={cs("partyList", {
                        hidden: isPartyMenuHidden,
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
                        hidden: isItemMenuHidden,
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
        </>
    );
}
