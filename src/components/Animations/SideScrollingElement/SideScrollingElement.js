import {React, useEffect, createElement} from "react";
import "./SideScrollingElement.css";

export default function SideScrollingElement(props){
    //Format props string
    const str = props.para;
    const letters = str.split("");
    
    //Set global variables for determining animation end points
    let paraMaxX = 0;
    let paraMidX = 0;
    let paraMaxY = 0;
    let paraMidY = 0;
    
    //wheel direction variables
    const scrollTotal = 30;
        //starting value for wheel direction
    let increment = 5;


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
        const navWidth = document.querySelector(".navbarDark").offsetWidth + 45;

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
                    if(endpoint > window.innerWidth - navWidth) {
                        line++
                        element.line = line;
                        element.left = headerLeft;
                    }
                    
                }
            //set the left value of the first element
            } else {
                element.left = headerLeft;
            }
            //element.style.left = element.left + "px"
            setAnimationEndY(element, line);
        }
    }

    const sideScroll = (dir) => {
        const navWidth = document.querySelector(".navbarDark").offsetWidth;
        const container = document.querySelector(".greetingPage")
        //itterate over all letters and update thier location based on passed scroll wheel value (dir)
        for (let i = 0; i < letters.length; i++) {
            const element = document.querySelector(`.sideScrollingLetter${i}`);

            //assign each letter a animation cohort
            element.cohort = Math.floor((1 - (element.left / paraMaxX)) * 10 * (scrollTotal / 10) + 2);

            //A value based on a percentage of the letters final placement where the end result will be 1
            const maxPercentage = ((element.left / paraMaxX / element.cohort / dir) + 0.25) * (scrollTotal/dir - 1) * -1 + 1; 
            

            //Determine where each letter would be place and keep letters overlapping the navbar hidden 
            const potentialX = (element.left / element.cohort * dir * maxPercentage) * (dir/scrollTotal);
            //set opacity and color values based on dir
            const opacity = 100 * dir / element.cohort * (dir/scrollTotal);

            //from gray to white
            const colorR = (255) * dir / element.cohort * (dir/scrollTotal);
            const colorG = 25 + (255 - 25) * dir / element.cohort * (dir/scrollTotal);
            const colorB = 45 + (255 - 45) * dir / element.cohort * (dir/scrollTotal);
            //Color changing attempt
            // const colorR = 50 + (1000 - 50) * dir / element.cohort * .2 * (dir/scrollTotal);
            // const colorG = 75 + (1000 - 75) * dir / element.cohort * .21 * (dir/scrollTotal);
            // const colorB = 95 + (1000 - 95) * dir / element.cohort * .25 * (dir/scrollTotal);
            // const color = 255 * dir / element.cohort * (dir/scrollTotal);

            //Determine if letter should be displayed
            //console.log(potentialX);
            if(potentialX > navWidth && element.top + element.offsetHeight < container.offsetHeight){
                //element.style.top = 0 - element.offsetHeight + "px"
                element.style.visibility = "visible"
                element.style.opacity = opacity + 
                "%";
                element.style.color = `rgb(${colorR}, ${colorG}, ${colorB})`;
            } else {
                //element.style.top = element.top + "px"
                element.style.visibility = "hidden"
            }

            //Set letters x coordinate
            if(potentialX > element.left){
                element.style.left = element.left + "px";
            } else {
                element.style.left = potentialX + "px";
            }
        }
    }

    const conscrollCompensate = () => {
        const inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
    
        const outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
    
        document.body.appendChild(outer);
        const w1 = inner.offsetWidth;
        const h1 = inner.offsetHeight;
        outer.style.overflow = 'scroll';
        let w2 = inner.offsetWidth;
        let h2 = inner.offsetHeight;
        if (w1 === w2) w2 = outer.clientWidth;
        if (h1 === h2) h2 = outer.clientHeight;
    
        document.body.removeChild(outer);
    
        return (
            {
                width: w1 - w2,
                height: h1 - h2
            }
        );
    }

    useEffect(() => {
        const page = document.querySelector(".sideScrollingElement");
        const navWidth = document.querySelector(".navbarDark").offsetWidth;

        setAnimationEndX();
        sideScroll(props.scroll + 7);
        page.style.minWidth = window.innerWidth - navWidth - conscrollCompensate().width + "px";

        //adjust animated desination on screen resize
        const onResize = () => {
            setAnimationEndX()
            sideScroll(props.scroll + 7);
            page.style.minWidth = window.innerWidth - navWidth - conscrollCompensate().width + "px";
            page.style.maxHeight = window.innerHeight = conscrollCompensate().height;
        }
        window.addEventListener('resize', onResize);
        
        //cleanup event listener
        return () => {
        window.removeEventListener("resize", onResize);
        }
    }, [props.scroll]);


    return(
        <div
            className="sideScrollingElement"
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