import {React} from "react";

import "./ElementDropIn.css"

export default function ElementDropIn(props) {
    return(
        <div
            className="dropInContainer"
        >
            <div
                className={`elementDropIn dropIn${props.index}`}
            >
            </div>
        </div>
    )
}