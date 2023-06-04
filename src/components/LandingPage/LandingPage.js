import React from "react";
import GreetingPage from "../GreetingPage/GreetingPage"

export default function LandingPage(props) {

    return (
        <div>
            <GreetingPage
                screenType={props.screenType}
            />
        </div>
    )
}