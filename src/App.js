import React, { useEffect, useState } from "react";
import cs from "classnames";
import "./App.css";

export default function App() {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [isBattleMenuHidden, setIsBattleMenuHidden] = useState(true);
    const [isPartyMenuHidden, setIsPartyMenuHidden] = useState(true);
    const [isItemMenuHidden, setIsItemMenuHidden] = useState(true);
    const [playerHP, setPlayerHP] = useState(40);
    const [opponentHP, setOpponentHP] = useState(40);
    const [playerPKMN, setPlayerPKMN] = useState("Nidorino");
    const [oppPKMN, setOppPKMN] = useState("Gengar");
    const [textBoxtext, setTextBoxText] = useState("");
    const [isOppTurn, setIsOppTurn] = useState(false);

    const [playerPokemonObject, setplayerPokemonObject] = useState({});
    const [oppPokemonObject, setOppPokemonObject] = useState({});

    function randomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function capitalize(name) {
        let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        return capitalizedName;
    }

    console.log(capitalize("bob"));

    useEffect(() => {
        console.log("dog");
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber(251)}`)
            .then((response) => response.json())
            .then((response) => {
                let pokemonObj = {
                    name: capitalize(response.species.name),
                    sprite: response.sprites.back_default,
                };
                setplayerPokemonObject(pokemonObj);
            });

        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber(251)}`)
            .then((response) => response.json())
            .then((response) => {
                let pokemonObj = {
                    name: capitalize(response.species.name),
                    sprite: response.sprites.front_default,
                };
                setOppPokemonObject(pokemonObj);
            });
    }, []);

    const moveSet = [
        {
            name: "tackle",
            damage: 10,
        },
        {
            name: "growl",
            damage: 0,
        },
        {
            name: "scratch",
            damage: 12,
        },
        {
            name: "bite",
            damage: 15,
        },
    ];

    const battleMenu = moveSet.map((move) => {
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
        var opponentMove = moveSet[Math.floor(Math.random() * moveSet.length)];
        setTextBoxText(
            `Opponent ${oppPokemonObject.name} used ${opponentMove.name}`
        );
        console.log(opponentMove);

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

        moveSet.forEach((move) => {
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
        setTimeout(() => doOppMove(), 3000);
    }

    useEffect(() => {
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
            <div className="foe">
                <h2>{oppPokemonObject.name}</h2>
                <h3>L20</h3>
                <div
                    className={cs({
                        healthBar: opponentHP === 40,
                        healthBar75: opponentHP < 40 && opponentHP >= 30,
                        healthBar50: opponentHP < 30 && opponentHP >= 20,
                        healthBar25: opponentHP < 20 && opponentHP > 0,
                        healthBar0: opponentHP === 0,
                    })}
                ></div>
                <p className="remainingHealth">{opponentHP}</p>
                <img src={oppPokemonObject.sprite} alt="sprite" />
            </div>
            <div className="team">
                <h2>{playerPokemonObject.name}</h2>
                <h3>L20</h3>
                <div
                    className={cs({
                        healthBar: playerHP === 40,
                        healthBar75: playerHP < 40 && playerHP >= 30,
                        healthBar50: playerHP < 30 && playerHP >= 20,
                        healthBar25: playerHP < 20 && playerHP > 0,
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
                        <li>charmander</li>
                        <li>bulbasaur</li>
                        <li>squirtle</li>
                        <li>rhydon</li>
                        <li>ghastly</li>
                        <li>eevee</li>
                    </ul>
                </div>

                <div
                    className={cs("itemList", {
                        hidden: isItemMenuHidden,
                    })}
                >
                    <ul>
                        <li>potion</li>
                        <li>pokeball</li>
                        <li>berry</li>
                        <li>silk scarf</li>
                        <li>revive</li>
                        <li>super potion</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
