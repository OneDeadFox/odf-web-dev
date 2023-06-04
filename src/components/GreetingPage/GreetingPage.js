import {React, useState, useEffect, useRef, createElement} from "react";
import "./GreetingPage.css"
//import Letter from "../Letter/Letter"
//Animation Components
import SideScrollingElement from "../Animations/SideScrollingElement/SideScrollingElement"
import SphereElement from "../Animations/SphereElement/SphereElement"
//Page Components
import PortfolioPage from "../PortfolioPage/PortfolioPage";

export default function GreetingPage(props) {
    const greetingStr = "Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. "

    const [scroll, setScroll] = useState(0);

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

    const handleWheel = (e) => {
        const wheelDirection = (e) ? e.deltaY : false;
        
        if(wheelDirection < 0 && scroll >= 1){
            setScroll(scroll - 1);
            //console.log(scroll);
        } else if (wheelDirection > 0 && scroll <= 20) {
            setScroll(scroll + 1);
            //console.log(scroll);
        }
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
            onWheel={(e) => handleWheel(e)}
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
            <SideScrollingElement 
                para={greetingStr}
                scroll={scroll}
            />
            <PortfolioPage 
                fromGreeting={true}
                screenType={props.screenType}
            />
            <p
                className="greetingFooter"
            >

            </p>
        </div>
    )
}