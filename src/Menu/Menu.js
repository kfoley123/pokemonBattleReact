import React from "react";
import cs from "classnames";

export default function Menu(props) {
    const {
        playerPokemonObject,
        gameData,
        attackMenu,
        changePokemon,
        item,
        run,
        returnToMain,
        doMove,
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

    return (
        <div className="menu">
            <div
                className={cs("textBox", {
                    hidden: gameData.textBoxtext === "",
                })}
            >
                {gameData.textBoxtext}
            </div>
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
                    className="item"
                    disabled={gameData.isOppTurn}
                    onClick={item}
                >
                    ITEM
                </button>
                <button
                    className="run"
                    disabled={gameData.isOppTurn}
                    onClick={run}
                >
                    RUN
                </button>
            </div>
            <div
                className={cs("fightMenu", {
                    hidden: gameData.isBattleMenuHidden,
                })}
            >
                {battleMenu}
            </div>
            <button className="back" onClick={returnToMain}>
                back
            </button>

            <div
                className={cs("partyList", {
                    hidden: gameData.isPartyMenuHidden,
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
                    hidden: gameData.isItemMenuHidden,
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
