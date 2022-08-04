import React from "react";
import "./PKMN.css";
import bulbasaurSprite from "../images/bulbasaurSprite.png";
import charmanderSprite from "../images/charmanderSprite.png";
import squirtleSprite from "../images/squirtleSprite.png";
import eeveeSprite from "../images/eeveeSprite.png";
import ghastlySprite from "../images/ghastlySprite.png";
import rhydonSprite from "../images/rhydonSprite.png";

export default function PKMN() {
    return (
        <div>
            <ul className="partyList">
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={charmanderSprite}
                        alt="charmander sprite"
                    />
                    Charmander
                </button>
                <button className="partyItem ">
                    <img
                        className="sprite"
                        src={bulbasaurSprite}
                        alt="bulbasaur sprite "
                    />
                    Bulbasaur
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={squirtleSprite}
                        alt="squirtle sprite "
                    />
                    Squirtle
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={rhydonSprite}
                        alt="rhydon sprite"
                    />
                    Rhydon
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={ghastlySprite}
                        alt="ghastly sprite"
                    />
                    Ghastly
                </button>
                <button className="partyItem">
                    <img
                        className="sprite"
                        src={eeveeSprite}
                        alt="eevee sprite"
                    />
                    Eevee
                </button>
            </ul>
        </div>
    );
}
