import { useEffect, useState } from "react";
import { Character } from "./Character"
import { Edit } from "./Edit";
import { Create } from "./Create";
import "./styles.css"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    
  } from "react-router-dom";

export function App() {

    const [characters, setCharacters] = useState([])
    const [fetchURL, setFetchURL] = useState("http://145.24.222.66:8000/characters?start=1&limit=5");
    const [pagination, setPagination] = useState();
  
    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('Accept', 'application/json')

    const loadJSON = (link) => {
        fetch(link, {
            headers: {
                "Accept": "application/json"
            }
        }) 
            .then(res => res.json())
            .then(data => {updateCharacters(data.items); setPagination(data.pagination._links)})
            .catch(error => console.log(error))
    }

    //DELETE request
    const myHeadersDELETE = new Headers();
    myHeadersDELETE.append('Accept', 'application/json');

    const myInitDELETE = {
        method: 'DELETE',
        headers: myHeadersDELETE
    }

    const deleteCharacter = (uri) => fetch(uri, myInitDELETE)
        .then(res => { loadJSON(fetchURL) })
        .catch(err => console.log(err))

    function updateCharacters(characters){
        setCharacters(characters)
    }

    const charactersList = characters.map((character, index) => {
        return <li key={index}>Title: <Link to={`/detail/${character._id}`}>{character.name}</Link> <Link to={`/edit/${character._id}`}>Edit</Link> <button onClick={() => deleteCharacter(character._links.self.href)}>delete</button></li>
    })

    useEffect(() => loadJSON(fetchURL), [fetchURL]);

    useState(() => { loadJSON() })

    return (
    <BrowserRouter>
    <div className="App">
        <a href="/create">
        <button className="Create">Create</button>
        </a>
    <div className="pagination-buttons">
        <button className="standard-button" onClick={() => setFetchURL(pagination.first.href)}>First page</button>
        <button className="standard-button" onClick={() => setFetchURL(pagination.previous.href)}>Previous page</button>
        <button className="standard-button" onClick={() => setFetchURL(pagination.next.href)}>Next page</button>
        <button className="standard-button" onClick={() => setFetchURL(pagination.last.href)}>Last page</button>
    </div>
    <Routes>
        <Route exact path="/" element={<ul>{ charactersList }</ul>}></Route>
        <Route path="/detail/:characterId" element={<Character />}></Route>
        <Route path="/edit/:characterId" element={<Edit />}></Route>
        <Route path="/create" element={<Create />}></Route>
    </Routes>
    
    </div>
    </BrowserRouter>
    );
  }