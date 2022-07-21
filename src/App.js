import React, { useState } from "react";
import cs from "classnames";
import "./App.css";

export default function App() {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [isBattleMenuHidden, setIsBattleMenuHidden] = useState(true);

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

    function doMove() {
        console.log("did the move");
    }

    const battleMenu = moveSet.map((move) => {
        return (
            <button className="attack" key={move.name} onClick={doMove}>
                {move.name}
            </button>
        );
    });

    function attackMenu() {
        setIsMenuHidden(true);
        setIsBattleMenuHidden(false);
    }

    return (
        <>
            <div className="foe">
                <h2>NAME</h2>
                <h3>L5</h3>
                <div className="healthBar OppRemainingHealth"></div>
                <img src="" alt="sprite" />
            </div>
            <div className="team">
                <h2>NAME</h2>
                <h3>L5</h3>
                <div className="healthBar"></div>
                <p className="remainingHealth"></p>
                <img src="" alt="sprite" />
            </div>
            <div className="menu">
                <div className="textBox hidden"></div>
                <div
                    className={cs("mainMenu", {
                        hidden: isMenuHidden,
                    })}
                >
                    <button className="fight" onClick={attackMenu}>
                        FIGHT
                    </button>
                    <button className="pkmn">PKMN</button>
                    <button className="item">ITEM</button>
                    <button className="run">RUN</button>
                </div>
                <div
                    className={cs("fightMenu", {
                        hidden: isBattleMenuHidden,
                    })}
                >
                    {battleMenu}
                </div>

                <div className="partyList hidden">
                    <ul>
                        <li>charmander</li>
                        <li>bulbasaur</li>
                        <li>squirtle</li>
                        <li>rhydon</li>
                        <li>ghastly</li>
                        <li>eevee</li>
                    </ul>
                </div>

                <div className="itemList hidden">
                    <ul>
                        <li>potion</li>
                        <li>pokeball</li>
                        <li>berry</li>
                        <li>silk scarf</li>
                        <li>revive</li>
                        <li>super potion</li>
                    </ul>
                </div>
                <button className="back">back</button>
            </div>
        </>
    );
}
