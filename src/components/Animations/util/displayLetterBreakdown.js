import {React, useEffect, createElement} from "react";
import "../SideScrollingElement/SideScrollingElement.css";

export default function displayLetterBreakdown(props){
    //Format props string
    const str = props.para;
    const letters = str.split("");
    //Set global variables for determining animation end points
    let paraMaxX = 0;
    let paraMidX = 0;
    let paraMaxY = 0;
    let paraMidY = 0;
//Set animation end points------------------------------
    const setAnimationEndY = (element, line) => {
        const headerTop = document.querySelector(".greetingHeader").offsetTop;
        element.top = headerTop + 45 + (35 * line);

        //increase the maxium width of str1 placement
        if(element.top > paraMaxY) { 
            paraMaxY = element.top + element.offsetHeight;
            paraMidY = (headerTop + 45 + paraMaxY)/2;
        }
        element.style.top = element.top + "px"
    }

    const setAnimationEndX = () => {
        let line = 0;
        let word = 1;
        
        //get page width
        const pageWidth = document.querySelector(".greetingPage").offsetWidth;

        //get navbar width
        const navWidth = document.querySelector("#navbar").offsetWidth;

        //assigns X coordinate to each element in the array
        for (let i = 0; i < letters.length; i++) {
            //get current letter as element
            const element = document.querySelector(`.sideScrollingLetter${i}`);
            //get greeting header attributes to base implosion positioning on.
            const headerLeft = document.querySelector(".greetingHeader").offsetLeft

            //give letter elemment an index key value for the coordinate system
            element.index = i;

            //establish previous letter as element, if it's not the first letter
            let previousEl = null;
            if(i !== 0){
                //get previous element attributes
                previousEl = document.querySelector(`.sideScrollingLetter${i-1}`);
                let previousElWidth = previousEl.offsetWidth;
                let previousElLine = previousEl.line
                
                //add the previous elements width to the previous elements position
                element.left = previousEl.left + previousElWidth;
                
                //add spacing for white space
                if(previousElWidth === 0) {
                    element.left += 6;
                    element.wordStart = true;
                    word++;
                    element.word = word
                }

                //increase the maxium width of str1 placement
                if(element.left > paraMaxX) { 
                    paraMaxX = element.left + element.offsetWidth;
                    paraMidX = (headerLeft + paraMaxX)/2;
                }

                //check if word will extend past the the edge of screen and create a new line
                if(element.wordStart){
                    let increment = 1
                    let nextEl = document.querySelector(`.sideScrollingLetter${i+increment}`);
                    
                    //establish the x coordinate of the words end point
                    let endpoint = element.left + element.offsetWidth + nextEl.offsetWidth;
                    //find last charachter in word element
                    while (nextEl.offsetWidth !== 0) {
                        nextEl.word = word;
                        increment++;
                        nextEl = document.querySelector(`.sideScrollingLetter${i+increment}`)
                        endpoint += nextEl.offsetWidth;
                    }

                    //set new line if word is beyond screen
                    if(endpoint > window.innerWidth - 20) {
                        line++
                        element.line = line;
                        element.left = headerLeft;
                    }
                    
                }
            //set the left value of the first element
            } else {
                element.left = headerLeft;
            }
            console.log(element.left);
            element.style.left = element.left + "px"
            setAnimationEndY(element, line);
        }
    }

    useEffect(() => {
        setAnimationEndX();
    }, [])

    return(
        <div
            className="sideScollingElement"
        >
            {letters.map((letter, i) => {
                return createElement(
                    'div',
                    { key: `sideScrollingLetter${i}`, className: `letter sideScrollingLetter${i}` },
                    letter
                )
                })}
        </div>
    )
}