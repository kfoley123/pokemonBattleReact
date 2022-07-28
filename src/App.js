import React, { useEffect, useState } from "react";
import cs from "classnames";
import "./App.css";
import Foe from "./Foe/Foe";
import Player from "./Player/Player";
import Menu from "./Menu/Menu";

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

    function run() {
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
            <Player
                playerPokemonObject={playerPokemonObject}
                playerHP={playerHP}
            />
            <Menu
                textBoxtext={textBoxtext}
                isMenuHidden={isMenuHidden}
                isOppTurn={isOppTurn}
                attackMenu={attackMenu}
                changePokemon={changePokemon}
                item={item}
                isBattleMenuHidden={isBattleMenuHidden}
                battleMenu={battleMenu}
                run={run}
                returnToMain={returnToMain}
                isPartyMenuHidden={isPartyMenuHidden}
                isItemMenuHidden={isItemMenuHidden}
            />
        </>
    );
}
