import {React, useState, useEffect, useRef, createElement} from "react";
import "./GreetingPage.css"
//import Letter from "../Letter/Letter"
import SideScrollingElement from "../Animations/SideScrollingElement/SideScrollingElement"
import SphereElement from "../Animations/SphereElement/SphereElement"

export default function GreetingPage() {
    const greetingStr = "Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. "

    

//Change the Greeting Heading--------------------------------------
    const fadeHeading = () => {
        const heading = document.querySelector(".greetingHeader")
        let opacity = 100

        const fader = setInterval(function(){
            opacity -= 2
            heading.style.opacity = opacity + "%";
            if(opacity <= 0) {
                clearInterval(fader);
                newHeading(heading);
            }
        }, 20)
    }

    const newHeading = (e) => {

        const heading = e;
        let opacity = 0
        heading.innerText = "Welcome to ODF,";

        const welcome = setInterval(function(){
            opacity += 2
            heading.style.opacity = opacity + "%";
            if(opacity >= 100) {
                clearInterval(welcome);

            }
        }, 20)
    }

    useEffect(() => {
        //Init greeting header change
        setTimeout(function(){
            fadeHeading();
        }, 1000);

        // setAnimationEndX();        
        // //handleWheel();

        // //adjust animated desination on screen resize
        // const onResize = () => {
        //     setAnimationEndX();
        // }
        // window.addEventListener('resize', onResize);
        
        // //cleanup event listener
        // return () => {
        // window.removeEventListener("resize", onResize);
        // }

    }, []);

    return (
        <div
            id="greetingPage"
            className="greetingPage"
            //onWheel={(e) => handleWheel(e)}
        >
                <div className="main tagEmbellishment"> {`return (`} </div>
                <div className="main tagEmbellishment"> {`<div>`} </div>
                <div className="main tagEmbellishment"> {`<main>`} </div>
                <div className="h1 tagEmbellishment"> {`<h1>`} </div>

            <h1
                className="greetingHeader"
            >
                Hi and hello, 
            </h1>
                <div className="h1 tagEmbellishment"> {`</h1>`} </div>
                <div className="p tagEmbellishment"> {`<p>`} </div>
            <p
                className="greetingBody"
            >
            </p>
            <SideScrollingElement para={greetingStr}/>
            <p
                className="greetingFooter"
            >

            </p>
        </div>
    )
}