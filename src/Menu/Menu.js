import React from "react";
import cs from "classnames";

export default function Menu(props) {
    const {
        textBoxtext,
        isMenuHidden,
        isOppTurn,
        attackMenu,
        changePokemon,
        item,
        isBattleMenuHidden,
        battleMenu,
        run,
        returnToMain,
        isPartyMenuHidden,
        isItemMenuHidden,
    } = props;

    return (
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
                <button className="item" disabled={isOppTurn} onClick={item}>
                    ITEM
                </button>
                <button className="run" disabled={isOppTurn} onClick={run}>
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
    );
}
