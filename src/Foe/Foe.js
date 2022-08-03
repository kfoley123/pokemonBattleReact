import React from "react";
import cs from "classnames";
import "./Foe.css";

export default function Foe(props) {
    const { oppPokemonObject, opponentHP } = props;
    return (
        <div className="foeContainer">
            <div className="framed">
                <div className="foeNameLevel">
                    <h2>{oppPokemonObject.name}</h2>
                    <h3>Lv 20</h3>
                </div>

                <div className="foeHealthBox">
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

                    <p className="oppRemainingHealth">
                        {opponentHP}/{oppPokemonObject.hp}
                    </p>
                </div>
            </div>

            <img
                className="foeSprite"
                src={oppPokemonObject.sprite}
                alt="sprite"
            />
        </div>
    );
}
