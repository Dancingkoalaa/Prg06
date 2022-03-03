import { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom"

export function Character() {

    const [character, setCharacter] = useState([])

    let params = useParams();

    console.log(params.characterId)

    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('Accept', 'application/json')

    const myInitGET = {
        method: 'GET',
        headers: myHeadersGET
    };

    const loadJSON = () => {
        fetch(`http://145.24.222.66:8000/characters/${params.characterId}`, myInitGET, {
            headers: {
                "Accept": "application/json"
            }
        }) 
            .then(res => res.json())
            .then(data => updateCharacter(data))
            .catch(error => console.log(error))
    }

    function updateCharacter(character){
        setCharacter(character)
    }


    useEffect(loadJSON, [])

    useState(() => { loadJSON() })

    return (
    <div><h1>{character.name}</h1>
    <h2>{character.race}</h2>
    <h2>{character.weapon}</h2>
    </div>
    );
  }