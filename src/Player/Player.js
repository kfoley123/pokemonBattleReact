import React from "react";
import cs from "classnames";
import "./Player.css";

export default function Player(props) {
    const { playerHP, playerPokemonObject } = props;
    return (
        <div className="playerContainer">
            <img
                className="playerSprite"
                src={playerPokemonObject.sprite}
                alt="sprite"
            />
            <div className=" framed">
                <div className="playerNameLevel">
                    <h2>{playerPokemonObject.name}</h2>
                    <h3 className="playerPokemonLevel">Lv 20</h3>
                </div>
                <div className="healthBox">
                    <div
                        className={cs("healthbar", {
                            healthBar: playerHP === playerPokemonObject.hp + 50,
                            healthBar75:
                                playerHP <
                                    (playerPokemonObject.hp + 50) * 0.99 &&
                                playerHP >= (playerPokemonObject.hp + 50) * 0.5,
                            healthBar50:
                                playerHP <
                                    (playerPokemonObject.hp + 50) * 0.5 &&
                                playerHP >=
                                    (playerPokemonObject.hp + 50) * 0.25,
                            healthBar25:
                                playerHP <
                                    (playerPokemonObject.hp + 50) * 0.25 &&
                                playerHP > 0,
                            healthBar0: playerHP === 0,
                        })}
                    ></div>
                    <p className="remainingHealth">
                        {playerHP}/{playerPokemonObject.hp + 50}
                    </p>
                </div>
            </div>
        </div>
    );
}
