import React, { useEffect, useState } from "react";


function TopBar(props){
    return(
        <div className="top_bar_container">
            <div className="title">Welcome to MapNotifs!</div>
            <div>{props.uname}</div>
            <button className="sign_out" onClick={props.signout}>
                   Sign out
            </button>
        </div>
    )
}

export default TopBar;