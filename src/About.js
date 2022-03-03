import { useEffect, useState } from "react";
import "./styles.css"

export function About(props) {

    const [sprite, setSprite] = useState(null)

    const loadJSON = () => {
        fetch(props.url)
            .then(res => res.json())
            .then(data => setSprite(data.sprites.front_default))
            .catch(error => console.log("NOooooooooOOO"))
    }

    useEffect(loadJSON, [])

    return <div className="About">
    <h2> {props.name} </h2>
    { sprite && <img src={sprite} alt="pokemon image" /> }
    </div>;
  }