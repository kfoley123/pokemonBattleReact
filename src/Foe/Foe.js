import React from "react";
import cs from "classnames";

export default function Foe(props) {
    const { oppPokemonObject, opponentHP } = props;
    return (
        <div className="foe">
            <h2>{oppPokemonObject.name}</h2>
            <h3>L20</h3>
            <div
                className={cs({
                    healthBar: opponentHP === oppPokemonObject.hp,
                    healthBar75:
                        opponentHP < oppPokemonObject.hp * 0.99 &&
                        opponentHP >= oppPokemonObject.hp * 0.51,
                    healthBar50:
                        opponentHP < oppPokemonObject.hp * 0.51 &&
                        opponentHP >= oppPokemonObject.hp * 0.26,
                    healthBar25:
                        opponentHP <= oppPokemonObject.hp * 0.25 &&
                        opponentHP > 0,
                    healthBar0: opponentHP === 0,
                })}
            ></div>

            <p className="remainingHealth">{opponentHP}</p>
            <img src={oppPokemonObject.sprite} alt="sprite" />
        </div>
    );
}
