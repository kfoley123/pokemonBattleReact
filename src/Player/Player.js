import React from "react";
import cs from "classnames";

export default function Player(props) {
    const { playerHP, playerPokemonObject } = props;
    return (
        <div className="team">
            <h2>{playerPokemonObject.name}</h2>
            <h3>L20</h3>
            <div
                className={cs({
                    healthBar: playerHP === playerPokemonObject.hp,
                    healthBar75:
                        playerHP < playerPokemonObject.hp * 0.99 &&
                        playerHP >= playerPokemonObject.hp * 0.51,
                    healthBar50:
                        playerHP < playerPokemonObject.hp * 0.51 &&
                        playerHP >= playerPokemonObject.hp * 0.26,
                    healthBar25:
                        playerHP < playerPokemonObject.hp * 0.25 &&
                        playerHP > 0,
                    healthBar0: playerHP === 0,
                })}
            ></div>
            <p className="remainingHealth">{playerHP}</p>
            <img src={playerPokemonObject.sprite} alt="sprite" />
        </div>
    );
}
