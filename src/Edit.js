import { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom"

export function Edit() {

    //edit character
    const [name, setName] = useState("")
    const [race, setRace] = useState("")
    const [weapon, setWeapon] = useState("")
    let params = useParams()

    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('Accept', 'application/json')

    const myInitGET = {
        method: 'GET',
        headers: myHeadersGET
    };

    //PUT request
    const myHeadersPUT = new Headers();
    myHeadersPUT.append('Accept', 'application/json');
    myHeadersPUT.append('Content-Type', 'application/json');
    
    const sendJSON = () => {
        const myInitPUT = {
            method: 'PUT',
            headers: myHeadersPUT,
            body: JSON.stringify({name: name, race: race, weapon: weapon})
        }
    
    fetch(`http://145.24.222.66:8000/characters/${params.characterId}`, myInitPUT)
        .then(res => console.log(res))
        .then(data => console.log("PUT OK"))
        .catch(err => console.log(err))
    }

    //on change handlers zijn nodig om een state variabelen in een form te gebruiken
    const onNameChangeHandler = (event) => {
        setName(event.target.value);
    };
    const onRaceChangeHandler = (event) => {
        setRace(event.target.value);
    };
    const onWeaponChangeHandler = (event) => {
        setWeapon(event.target.value);
    };

    return (
        <div className="Edit">
            <div className="Field">
            Name: <input type="text" onChange={onNameChangeHandler} value={name} /><br/>
            Race: <input type="text" onChange={onRaceChangeHandler} value={race} /><br/>
            Weapon: <input type="text" onChange={onWeaponChangeHandler} value={weapon} /><br/>
            </div>
            <button onClick={sendJSON}>Edit</button>
            <a href="/">back</a>
        </div>
        
    )
    
}
    