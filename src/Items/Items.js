import React from "react";
import "./Items.css";

export default function Items() {
    return (
        <div>
            <ul className="itemList">
                <li>
                    Potion <p>x3</p>
                </li>
                <li>
                    Pokeball <p>x6</p>
                </li>
                <li>
                    Berry <p>x3</p>
                </li>
                <li>
                    Silk Scarf <p>x1</p>
                </li>
                <li>
                    Revive <p>x1</p>
                </li>
                <li>
                    Super Potion <p>x3</p>
                </li>
            </ul>
        </div>
    );
}
