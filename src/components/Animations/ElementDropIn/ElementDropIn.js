import {React} from "react";

import "./ElementDropIn.css"

export default function ElementDropIn(props) {
    const test = () => {
        console.log(props.index)
    }
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