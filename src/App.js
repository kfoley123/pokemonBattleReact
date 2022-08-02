import React, { useEffect, useState } from "react";

import "./App.css";
import Foe from "./Foe/Foe";
import Player from "./Player/Player";
import Menu from "./Menu/Menu";

export default function App() {
    const [playerHP, setPlayerHP] = useState();
    const [opponentHP, setOpponentHP] = useState();

    const [gameData, setGameData] = useState({
        isMenuHidden: false,
        isBattleMenuHidden: true,
        isPartyMenuHidden: true,
        isItemMenuHidden: true,
        textBoxtext: "",
        isOppTurn: false,
    });

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

    function generatePokemon(response, spritePosition) {
        let moveSet = [];

        let spriteImage = "";
        if (spritePosition === "front") {
            spriteImage = response.sprites.front_default;
        } else spriteImage = response.sprites.back_default;

        response.moves.forEach((move) => {
            let pokemonMove = {
                name: move.move.name,
                damage: 15,
            };
            moveSet.push(pokemonMove);
        });

        let pokemonObj = {
            name: capitalize(response.species.name),
            sprite: spriteImage,
            hp: response.stats[0].base_stat,
            moves: moveSet.slice(0, 4),
        };
        return pokemonObj;
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber(251)}`)
            .then((response) => response.json())
            .then((response) => {
                let pokemonObj = generatePokemon(response, "back");
                setplayerPokemonObject(pokemonObj);
                setPlayerHP(pokemonObj.hp);
            });

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber(251)}`)
            .then((response) => response.json())
            .then((response) => {
                let pokemonObj = generatePokemon(response, "front");

                setOppPokemonObject(pokemonObj);
                setOpponentHP(pokemonObj.hp);
            });
    }, []);

    function disableMenu(isDisabled) {
        setGameData((prevData) => {
            return {
                ...prevData,
                isOppTurn: isDisabled,
            };
        });
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
                setGameData((prevData) => {
                    return { ...prevData, isOppTurn: false };
                });
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
                gameData={gameData}
                setGameData={setGameData}
                playerPokemonObject={playerPokemonObject}
                opponentHP={opponentHP}
                setOpponentHP={setOpponentHP}
                disableMenu={disableMenu}
            />
        </>
    );
}
