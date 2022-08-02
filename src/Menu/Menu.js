import React from "react";
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
                    className="itemMenu"
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
        </div>
    );
}
