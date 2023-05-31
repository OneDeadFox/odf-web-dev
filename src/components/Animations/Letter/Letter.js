import React from "react";
import "./Letter.css";

export default function Letter(props){
    return(
        <div
            className={`implosion piece${props.index}`}
        >
            {props.alpha}
        </div>
    )
}