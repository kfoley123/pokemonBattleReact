import React from "react";
import "./BattleMenu.css";

export default function BattleMenu(props) {
    const { moves, doMove } = props;
    return moves.map((move) => {
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
}
