import React, { useState } from 'react'
import "./join.css"
import { Link } from "react-router-dom";

let user;
const Join = () => {

    const [name, setName] = useState("");

    const sendUser = () => {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    }
    
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <h1>I.Chat!</h1>
                <h2>Instant Chat</h2>
                <input type="text" id='joinInput' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
                <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat"><button onClick={sendUser} id='joinBtn'>Login</button></Link>
            </div>
        </div>
    )
}

export default Join;
export { user };