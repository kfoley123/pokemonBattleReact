import React, { useState } from "react";
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

    function doMove(moveEvent) {
        var clickedMoveName = moveEvent.target.name;
        setTextBoxText(` ${playerPKMN} used ${clickedMoveName} `);
        console.log(clickedMoveName);

        //timeout for textbox???
        // console.log(textBox);
        // moveSet.forEach((move) => {
        //     if (move.name === clickedMoveName) {
        //         var newHP = opponentHP - move.damage;
        //         if (newHP < 0) {
        //             newHP = 0;
        //         }
        //         opponentHP = newHP;
        //     }
        //     oppHealthBar.innerHTML = `HP ${opponentHP}`;
        //     // TODO: need to check opp heath and apply correct healthbar CSS class
        //     oppHealthBar.classList.remove("heathBar");
        //     oppHealthBar.classList.add("healthBar75");
        // });
    }

    return (
        <>
            <div className="foe">
                <h2>NAME</h2>
                <h3>L20</h3>
                <div className="healthBar"></div>
                <p className="remainingHealth">{opponentHP}</p>
                <img src="" alt="sprite" />
            </div>
            <div className="team">
                <h2>NAME</h2>
                <h3>L20</h3>
                <div className="healthBar"></div>
                <p className="remainingHealth">{playerHP}</p>
                <img src="" alt="sprite" />
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
                    <button className="fight" onClick={attackMenu}>
                        FIGHT
                    </button>
                    <button className="pkmn" onClick={changePokemon}>
                        PKMN
                    </button>
                    <button className="item" onClick={item}>
                        ITEM
                    </button>
                    <button className="run" onClick={Run}>
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
                <button className="back" onClick={returnToMain}>
                    back
                </button>
            </div>
        </>
    );
}
