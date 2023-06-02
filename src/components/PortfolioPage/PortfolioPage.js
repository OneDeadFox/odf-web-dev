import {React} from "react";
import ElementDropIn from "../Animations/ElementDropIn/ElementDropIn"

export default function PortfolioPage(props) {
    return(
        <div
            className="portfolioPage"
        >
            {props.fromGreeting ? <ElementDropIn/> : <h1>Portfolio</h1>}
        </div>
    )
}