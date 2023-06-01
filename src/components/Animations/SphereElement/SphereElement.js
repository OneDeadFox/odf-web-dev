import {React, useEffect, createElement} from "react";
import Letter from "../Letter/Letter"
import "./SphereElement.css";

export default function SphereElement(props) {
    
//Vars
    const letters = props.para.split("");
    let paraMaxX = 0;
    let paraMaxY = 0;
    let paraMidX = 0;
    let paraMidY = 0;
    let increment = 1;
    const animationPairedPoints = [];
    const sphereDiameter = window.innerWidth*.6;
    const greetingStr = "Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. "
    const lettersArray = greetingStr.split("");    


    const handleWheel = (e) => {
        const scrollDirection = (e) ? e.deltaY : false;
        const scrollTotal = 20;
    //animation variables
        //number of complete rotations
        let rot = -6;
        //number of wheel turns to reach destination
        let position = 1;
        //maximum scale in px
        let size = sphereDiameter;
        //maximum size of font
        let lFont = 0;
        let sFont = 0;
        //maximum opacity
        let opacity = 0;

        console.log("scrolling");
        if(!scrollDirection){
            rot += increment/scrollTotal*6
            position -= increment/scrollTotal;
            lFont += scrollTotal/increment-1;
            sFont += increment/scrollTotal * 2;
            opacity += increment/scrollTotal;
            updatePoints(rot, position, size, lFont, sFont, opacity, animationPairedPoints);
        } else if (scrollDirection < 0 && increment > 1){
            increment--;

            rot += increment/scrollTotal*6
            position -= increment/scrollTotal;
            lFont += scrollTotal/increment-1;
            sFont += increment/scrollTotal * 2;
            opacity += increment/scrollTotal;
            updatePoints(rot, position, size, lFont, sFont, opacity, animationPairedPoints);
        } else if (scrollDirection > 0 && increment < scrollTotal){
            increment++;
            console.log(increment);
            rot += increment/scrollTotal*6
            position -= increment/scrollTotal;
            lFont += scrollTotal/increment-1;
            sFont += increment/scrollTotal * 2;
            opacity += increment/scrollTotal;
            updatePoints(rot, position, size, lFont, sFont, opacity, animationPairedPoints);
        }
    }

//Determine animation starting points-------------------
    const initAnimationPoints = (rot, pos, size, font, opacity) => {
        //number of points
        const cant = letters.length;
        
        const offset = 2/ cant;
        const increment = Math.PI * (3 - Math.sqrt(5));

        //required to calculate sphere center
        const navWidth = document.querySelector("#navbar").offsetWidth;
        //const header = document.querySelector(".greetingHeader");

        let xMin = 0;
        let xMax = 0;
        let yMin = 0;
        let yMax = 0;
        const coordinates=[];

        //points array-like-structure
        let points = document.querySelectorAll(`.implosion`);
        points = Array.from(points);

        for (let i = 0; i < cant; i++) {
            //wheel scroll modfier
            let endModifier = 1;
            if(typeof(pos) === "number") {
                endModifier = pos;
            }
            const angle = (rot) ? rot : 0;
            //get the end point values
            const point = document.querySelector(`.piece${i}`);
            const endpointX = point.left;
            const endpointY = point.top;

            const y = (i * offset - 1) + (offset / 2);
            const a = ((i + 1) % cant) * increment + angle;
            const r = Math.sqrt(1 - Math.pow(y, 2));
            const x = Math.cos(a) * r;

            //determine starting coordinates
            const xStart = ((((paraMaxX / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth));
            const yStart = (((45 + ((paraMaxY) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY));
            
            //find min and max coordinate
            if(xStart < xMin){
                xMin = xStart;
            } else if(xStart > xMax){
                xMax = xStart;
            }

            if(yStart < yMin){
                yMin = yStart;
            } else if(yStart > yMax){
                yMax = yStart;
            }

            //store coordinates
            const pointPair = {
                x: xStart,
                y: yStart,
                index: i,
                sine: 0,
                p: 0
            }

            coordinates.push(pointPair)
        }

        //get the sine of each coordinate
        for (let i = 0; i < coordinates.length; i++) {
            //set up values for comparision from starting values
            const pair = coordinates[i];
            const xMid = (xMax + xMin)/2
            const yMid = (yMax + yMin)/2
            const p1 = {
                x: pair.x,
                y: pair.y
            }

            const p2 = {
                x: xMid,
                y: yMid
            }
            
            //determine each pairs sine value
            //turned the sine values into precentages so that I can diffectly compare sine and distance
            pair.sine = (Math.sin(Math.atan2(p2.y - p1.y, p2.x - p1.x)) + 1)/2;
            //determine the distance from the y axis for each point in percentage
            pair.p = pair.x / (xMax - xMin);
            pair.combo = pair.p + pair.sine
        }

        //set up values for comparision for end values
        points.forEach(point => {
            const p1 = {
                //need to change the point lables to x and y for consistancy
                x: point.left,
                y: point.top
            }

            const p2 = {
                x: paraMidX,
                y: paraMidY
            }

            //Need to streamline variable locations
            const headerLeft = document.querySelector(".greetingHeader").offsetLeft

            point.sine = (Math.sin(Math.atan2(p2.y - p1.y, p2.x - p1.x)) + 1)/2;
            point.p = point.left / (paraMaxX);
            point.combo = point.sine + point.p
        });

        coordinates.forEach(point => {
            const closest = points.reduce((a, b) => {
                if(Math.abs(b.combo - point.combo) <= Math.abs(a.combo - point.combo)) {
                    return b;
                } else {
                    return a;
                }
            });

            const pairedPoint = points.splice(points.indexOf(closest), 1);
            animationPairedPoints.push(pairedPoint);
        })
        //updatePoints(-5.7, 0.95, 550, 2, 100, 0.2, animationPairedPoints);
    }

//Set animation end points------------------------------
    const setAnimationEndY = (el, line) => {
        const headerTop = document.querySelector(".greetingHeader").offsetTop;
        el.top = headerTop + 45 + (35 * line);

        //increase the maxium width of str1 placement
        if(el.top > paraMaxY) { 
            paraMaxY = el.top + el.offsetHeight;
            paraMidY = (headerTop + 45 + paraMaxY)/2;
        }
        //el.style.top = el.top + "px"
    }

    const setAnimationEndX = (mod) => {
        let line = 0;
        let word = 1;
        
        //get page width
        const pageWidth = document.querySelector(".greetingPage").offsetWidth;

        //get navbar width
        const navWidth = document.querySelector("#navbar").offsetWidth;

        //assigns X coordinate to each element in the array
        for (let i = 0; i < letters.length; i++) {
            //get current letter as element
            const element = document.querySelector(`.piece${i}`);
            //get greeting header attributes to base implosion positioning on.
            const headerLeft = document.querySelector(".greetingHeader").offsetLeft

            //give letter elemment an index key value for the coordinate system
            element.index = i;

            //establish previous letter as element, if it's not the first letter
            let previousEl = null;
            if(i !== 0){
                //get previous element attributes
                previousEl = document.querySelector(`.piece${i-1}`);
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
                    let nextEl = document.querySelector(`.piece${i+increment}`);
                    
                    //establish the x coordinate of the words end point
                    let endpoint = element.left + element.offsetWidth + nextEl.offsetWidth;
                    //find last charachter in word element
                    while (nextEl.offsetWidth !== 0) {
                        nextEl.word = word;
                        increment++;
                        nextEl = document.querySelector(`.piece${i+increment}`)
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
            setAnimationEndY(element, line);
        }
    }

//Move points to new location---------------------------
    const updatePoints = (rot, pos, size, lFont, sFont, opc, arr) => {
        //number of points
        const cant = letters.length;
        
        const offset = 2/ cant;
        const increment = Math.PI * (3 - Math.sqrt(5));

        //required to calculate sphere center
        const navWidth = document.querySelector("#navbar").offsetWidth;

        for (let i = 0; i < cant; i++) {
            //wheel scroll modfier
            let endModifier = 1;
            if(typeof(pos) === "number") {
                endModifier = pos;
            }
            const angle = (rot) ? rot : 0;
            const fontSize = (lFont) ? lFont : 0;
            //get the end point values
            const point = arr[i][0];
            const endpointX = point.left;
            const endpointY = point.top;

            const y = (i * offset - 1) + (offset / 2);
            const a = ((i + 1) % cant) * increment + angle;
            const r = Math.sqrt(1 - Math.pow(y, 2));
            const x = Math.cos(a) * r;
            const z = Math.sin(a) * r;
        
            let scale = Math.round(z * 10) / 100 * fontSize + 2;
            if(scale < 0) {
                scale = sFont;
            }

            let opacity = (1 + z) / 1.5;

            //variables to determine if div visibility should be none.
            const potentialX = ((((paraMaxX / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth)) + point.offsetWidth;
            const potentialY = (((45 + ((paraMaxY) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY)) + point.offsetHeight;

            const greetingPage = document.querySelector(".greetingPage");
            //const position = point.getBoundingClientRect();
            if((potentialX + point.offsetWidth) > greetingPage.offsetWidth - 10){
                point.style.fontSize = scale + "em";
                //point.style.color = "red";
                point.style.visibility = "hidden";
            } else if((potentialY + point.offsetHeight) > greetingPage.offsetHeight - 10){
                //*******The idea here is to adjust font size so that the offsetHeight/Width dimensions change, but it isn't working quite right *******
                point.style.fontSize = scale + "em";
                //point.style.color = "red";
                point.style.visibility = "hidden";
            } else if((potentialX - point.offsetWidth) < 0){
                //*******The idea here is to adjust font size so that the offsetHeight/Width dimensions change, but it isn't working quite right *******
                point.style.fontSize = scale + "em";
                //point.style.color = "red";
                point.style.visibility = "hidden"; 
            } else { 
                const style = "translate3d(" + ((((paraMaxX / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth)) + "px, " + (((45 + ((paraMaxY) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY)) + "px, " + scale + "px)";
                point.style.WebkitTransform = style;
                point.style.msTransform = style;
                point.style.transform = style;
                point.style.opacity = (Math.round(opacity * 100) + 100 * opc ) + "%";
                point.style.fontSize = scale + "em";
                point.style.visibility = "visible";
            }

            // const style = "translate3d(" + ((((paraMaxX / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth)) + "px, " + (((45 + ((paraMaxY) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY)) + "px, " + scale + "px)";
            //     point.style.WebkitTransform = style;
            //     point.style.msTransform = style;
            //     point.style.transform = style;
            //     point.style.opacity = opacity;
            //     point.style.fontSize = scale + "em";
            //     point.style.color = "white";
        }
        console.log("test")
    }
    useEffect(() => {
        //Determine animation destination coordinate
        setAnimationEndX();      
        initAnimationPoints(); 
        handleWheel();

        //adjust animated desination on screen resize
        const onResize = () => {
            setAnimationEndX();
            initAnimationPoints();
            handleWheel();
        }
        window.addEventListener('resize', onResize);
        
        //cleanup event listener
        return () => {
        window.removeEventListener("resize", onResize);
        }

    }, []);

    return(
        <div
            id="sphereElement"
            className="sphereElement"
            onWheel={(e) => handleWheel(e)}
            //onWheel={(e) => animationDirection(e)}
            //likely need to use useState to capture wheel event on GreetingPage level and transfer data to this level via props
        >
            {lettersArray.map((letter, i) => {
                return createElement(
                    'div',
                    { key: `piece${i}`, className: `implosion piece${i}` },
                    letter
                )
            })}
            {/* {lettersArray.map((letter, i) => 
            <Letter
                key={`letter${i}`}
                alpha={letter}
                index={i}
            />)} */}
        </div>
    )
}