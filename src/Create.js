import { useEffect, useState } from "react";

export function Create() {

    //create a character
    const [name, setName] = useState("")
    const [race, setRace] = useState("")
    const [weapon, setWeapon] = useState("")

    //POST request
    const myHeadersPOST = new Headers();
    myHeadersPOST.append('Accept', 'application/json');
    myHeadersPOST.append('Content-Type', 'application/json');

    const sendJSON = () => {
        const myInitPOST = {
            method: 'POST',
            headers: myHeadersPOST,
            body: JSON.stringify({name: name, race: race, weapon: weapon})
        }

    fetch("http://145.24.222.66:8000/characters", myInitPOST)
        .then(res => console.log(res))
        .then(data => console.log("POST OK"))
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
        <div className="Create">
            <div className="Field">
                Name: <input type="text" onChange={onNameChangeHandler} value={name} /><br/>
                Race: <input type="text" onChange={onRaceChangeHandler} value={race} /><br/>
                Weapon: <input type="text" onChange={onWeaponChangeHandler} value={weapon} /><br/>
            </div>
            <button onClick={sendJSON}>Create</button>
        </div>
    )
    
}