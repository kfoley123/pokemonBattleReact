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

    function getMoves(movesArray) {
        let apiMoves = [];
        movesArray.forEach((move) => {
            fetch(`https://pokeapi.co/api/v2/move/${move.move.name}`)
                .then((response) => response.json())
                .then((response) => {
                    let pokemonMove = {
                        name: move.move.name,
                        damage: response.power
                            ? Math.round(response.power / 2)
                            : 0,
                    };
                    apiMoves.push(pokemonMove);
                });
        });
        return apiMoves;
    }

    function generatePokemon(response, spritePosition) {
        let spriteImage = "";
        if (spritePosition === "front") {
            spriteImage = response.sprites.front_default;
        } else spriteImage = response.sprites.back_default;

        let moveSet = response.moves.slice(0, 4);

        let pokemonObj = {
            name: capitalize(response.species.name),
            sprite: spriteImage,
            hp: response.stats[0].base_stat,
            moves: getMoves(moveSet),
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
                playerHP={playerHP}
                setPlayerHP={setPlayerHP}
                oppPokemonObject={oppPokemonObject}
            />
        </>
    );
}
