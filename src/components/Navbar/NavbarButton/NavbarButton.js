import React from "react";

import "./NavbarButton.css";

export default function NavbarButton(props) {
    return (
        <a
            href={`./${props.title}`}
            className={`linkButton ${props.orientation}`}
        >
            {props.title}
        </a>
    )
}