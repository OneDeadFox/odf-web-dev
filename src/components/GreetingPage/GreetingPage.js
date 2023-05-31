import {React, useState, useEffect, createElement} from "react";
import "./GreetingPage.css"
//import Letter from "../Letter/Letter"
import SphereElement from "../Animations/SphereElement/SphereElement"


//Need to restructure the implosion element into its own component

export default function GreetingPage() {
// //various variables
//     //set number to move elements by
//     let once = false;
//     const isAtMaxWidth = Screen.availWidth - window.innerWidth === 0;
    
// //Imploding Scroll Effect
//     //it is important that this string ends with a space or the while loop will crash!!!
//     const str1Array = str1.split("");
//     let str1X = 0;
//     let str1Y = 0;
//     let str1Xmid = 0;
//     let str1Ymid = 0;
//     const animationPairedPoints = [];
//     const sphereDiameter = 1000;
    const greetingStr = "Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. "
    const letters = greetingStr.split("");
    let number = 0;

    const [wheelDirection, setWheelDirection] = useState(1);
    
//Determine scroll wheel direction-------------------------------
    //capture and handle wheel movement to change element location
    const handleWheel = (e) => {
        const scrollDirection = (e) ? e.deltaY : 1;
        const scrollTotal = 20;
        // //number of complete rotations
        // let rot = -6;
        // //number of wheel turns to reach destination
        // let position = 1;
        // //maximum scale in px
        // let size = sphereDiameter;
        // //maximum size of font
        // let lFont = 0;
        // let sFont = 0;
        // //maximum opacity
        // let opacity = 0;

        if (scrollDirection < 0 && wheelDirection >= 2 ){
            number = wheelDirection - 1;
            if(number < 0){
                number = 0;
            }
            setWheelDirection(number);

            // rot += number/scrollTotal*6
            // position -= number/scrollTotal;
            // lFont += scrollTotal/number-1;
            // updatePoints(rot, position, size, lFont, sFont, opacity, animationPairedPoints);
        } else if (scrollDirection > 0 && wheelDirection <= scrollTotal - 1) {
            number = wheelDirection + 1;

            setWheelDirection(number);

            // if(number > scrollTotal) {
            //     number = scrollTotal;
            // }
            // rot += number/scrollTotal*6
            // position -= number/scrollTotal;
            // lFont += scrollTotal/number-1;
            // sFont += number/scrollTotal * 2;
            // opacity += number/scrollTotal;

            // updatePoints(rot, position, size, lFont, sFont, opacity, animationPairedPoints);
        }
    }

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

// //Implosion functions
//     const setAnimationEndY = (el, line) => {
//         const headerTop = document.querySelector(".greetingHeader").offsetTop;
//         el.top = headerTop + 45 + (35 * line);

//         //increase the maxium width of str1 placement
//         if(el.top > str1Y) { 
//             str1Y = el.top + el.offsetHeight;
//             str1Ymid = (headerTop + 45 + str1Y)/2;
//         }
//         //el.style.top = el.top + "px"
//     }
//     const setAnimationEndX = (mod) => {
//         let line = 0;
//         let word = 1;
        
//         //get page width
//         const pageWidth = document.querySelector(".greetingPage").offsetWidth;

//         //get navbar width
//         const navWidth = document.querySelector("#navbar").offsetWidth;

//         //assigns X coordinate to each element in the array
//         for (let i = 0; i < str1Array.length; i++) {
//             //get current letter as element
//             const element = document.querySelector(`.piece${i}`);
//             //get greeting header attributes to base implosion positioning on.
//             const headerLeft = document.querySelector(".greetingHeader").offsetLeft

//             //give letter elemment an index key value for the coordinate system
//             element.index = i;
            
//             //establish previous letter as element, if it's not the first letter
//             let previousEl = null;
//             if(i !== 0){
//                 //get previous element attributes
//                 previousEl = document.querySelector(`.piece${i-1}`);
//                 let previousElWidth = previousEl.offsetWidth;
//                 let previousElLine = previousEl.line
                
//                 //add the previous elements width to the previous elements position
//                 element.left = previousEl.left + previousElWidth;
                
//                 //add spacing for white space
//                 if(previousElWidth === 0) {
//                     element.left += 6;
//                     element.wordStart = true;
//                     word++;
//                     element.word = word
//                 }

//                 //increase the maxium width of str1 placement
//                 if(element.left > str1X) { 
//                     str1X = element.left + element.offsetWidth;
//                     str1Xmid = (headerLeft + str1X)/2;
//                 }

//                 //check if word will extend past the the edge of screen and create a new line
//                 if(element.wordStart){
//                     let increment = 1
//                     let nextEl = document.querySelector(`.piece${i+increment}`);
                    
//                     //establish the x coordinate of the words end point
//                     let endpoint = element.left + element.offsetWidth + nextEl.offsetWidth;
//                     //find last charachter in word element
//                     while (nextEl.offsetWidth !== 0) {
//                         nextEl.word = word;
//                         increment++;
//                         nextEl = document.querySelector(`.piece${i+increment}`)
//                         endpoint += nextEl.offsetWidth;
//                     }

//                     //set new line if word is beyond screen
//                     if(endpoint > window.innerWidth - 20) {
//                         line++
//                         element.line = line;
//                         element.left = headerLeft;
//                     }
                    
//                 }
//             //set the left value of the first element
//             } else {
//                 element.left = headerLeft;
//             }
            
//             //this restablishes end points after complete render
//             //idk why this is necessary but it's the only way I've gotten things to work properly, as the offsetWidth of each letter div changes for some reason.
//             if(!once){
//                 once = true;
//                 setTimeout(function(){
//                     setAnimationEndX();
//                     //init animation is called here so that the end points are obtained while all fontsizes are the same
//                     //to fix this I need to solve the weird loading issue i'm having where this timer is even necessary.
//                     // maybe rendering the letter divs in thier own component would solve this.
//                     initAnimationPoints(-5.7, 0.95, sphereDiameter, 2, 0, 100,);
//                     handleWheel();
//                 }, 500)
//             }
//             //element.style.left = element.left + "px";
//             if(element.innerText === "H") {
//                 //console.log(element.left);
//             }
//             setAnimationEndY(element, line);
//         }
//     }

    //this was the quadrants attempt
    // const setAnimationStart = (rot, pos, size, font, opacity) => {
    //     //number of points
    //     const cant = str1Array.length;
        
    //     const offset = 2/ cant;
    //     const increment = Math.PI * (3 - Math.sqrt(5));

    //     //required to calculate sphere center
    //     const navWidth = document.querySelector("#navbar").offsetWidth;
    //     //const header = document.querySelector(".greetingHeader");

    //     const setPointsArray = () => {

    //         let xMin = 0;
    //         let xMax = 0;
    //         let yMin = 0;
    //         let yMax = 0;
    //         const coordinates=[];

    //         //point quadrants
    //         let pq1 = [];
    //         let pq2 = [];
    //         let pq3 = [];
    //         let pq4 = [];

    //         for (let i = 0; i < cant; i++) {
    //             //wheel scroll modfier
    //             let endModifier = 1;
    //             if(typeof(pos) === "number") {
    //                 endModifier = pos;
    //             }
    //             const angle = (rot) ? rot : 0;
    //             //get the end point values
    //             const point = document.querySelector(`.piece${i}`);
    //             const endpointX = point.left;
    //             const endpointY = point.top;

    //             const y = (i * offset - 1) + (offset / 2);
    //             const r = Math.sqrt(1 - Math.pow(y, 2));
    //             const a = ((i + 1) % cant) * increment + angle;
    //             const x = Math.cos(a) * r;

    //             //determine starting coordinates
    //             const xStart = ((((str1X / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth));
    //             const yStart = (((45 + ((str1Y) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY));
                
    //             //find min and max coordinate
    //             if(xStart < xMin){
    //                 xMin = xStart;
    //             } else if(xStart > xMax){
    //                 xMax = xStart;
    //             }

    //             if(yStart < yMin){
    //                 yMin = yStart;
    //             } else if(yStart > yMax){
    //                 yMax = yStart;
    //             }

    //             //store coordinates
    //             const pointPair = {
    //                 x: xStart,
    //                 y: yStart,
    //                 index: i
    //             }
    //             coordinates.push(pointPair);

    //             //set up letter element quardrants
    //             if(point.left <= str1Xmid && point.top <= str1Ymid){
    //                 pq1.push(point);
    //             } else if(point.left >= str1Xmid && point.top <= str1Ymid){
    //                 pq2.push(point);
    //             } else if(point.left >= str1Xmid && point.top >= str1Ymid){
    //                 pq3.push(point);
    //             } else if(point.left <= str1Xmid && point.top >= str1Ymid){
    //                 pq4.push(point);
    //             }
    //         }
    //         //put coordinates into quardrants
    //         const xMid = (xMax + xMin)/2;
    //         const yMid = (yMax + yMin)/2;
    //         const q1 = [];
    //         const q2 = [];
    //         const q3 = [];
    //         const q4 = [];
            
    //         coordinates.forEach(pair => {
    //             if(pair.x <= xMid && pair.y <= yMid){
    //                 q1.push(pair);
    //             } else if(pair.x >= xMid && pair.y <= yMid){
    //                 q2.push(pair);
    //             } else if(pair.x >= xMid && pair.y >= yMid){
    //                 q3.push(pair);
    //             } else if(pair.x <= xMid && pair.y >= yMid){
    //                 q4.push(pair);
    //             }
    //         });
    //             // equalize the different quadrants
    //             while(q1.length !== pq1.length || q2.length !== pq2.length || q3.length !== pq3.length || q4.length !== pq4.length){
    //                 if(q3.length > pq3.length){
    //                     //find lowest value within array
    //                     const min = q3.reduce(function(prev, curr) {
    //                         return prev.x < curr.x ? prev : curr;
    //                     });
    //                     const movingPoint = q3.splice(q3.findIndex(coors => coors.x === min.x), 1);
    //                     q4.push(movingPoint[0]);
    //                 } else if(q4.length > pq4.length){
    //                     //find lowest value within array
    //                     const min = q4.reduce(function(prev, curr) {
    //                         return prev.y < curr.y ? prev : curr;
    //                     });
    //                     const movingPoint = q4.splice(q4.findIndex(coors => coors.y === min.y), 1);
    //                     q1.push(movingPoint[0]);
    //                 } else if(q1.length > pq1.length){
    //                     //find lowest value within array
    //                     const min = q1.reduce(function(prev, curr) {
    //                         return prev.x > curr.x ? prev : curr;
    //                     });
    //                     const movingPoint = q1.splice(q1.findIndex(coors => coors.x === min.x), 1);
    //                     q2.push(movingPoint[0]);
    //                 } else if(q2.length > pq2.length){
    //                     //find lowest value within array
    //                     const min = q2.reduce(function(prev, curr) {
    //                         return prev.y > curr.y ? prev : curr;
    //                     });
    //                     const movingPoint = q2.splice(q2.findIndex(coors => coors.y === min.y), 1);
    //                     q3.push(movingPoint[0]);
    //                 }
    //             }
    //     }
    // const initAnimationPoints = (rot, pos, size, font, opacity) => {
    //     //number of points
    //     const cant = str1Array.length;
        
    //     const offset = 2/ cant;
    //     const increment = Math.PI * (3 - Math.sqrt(5));

    //     //required to calculate sphere center
    //     const navWidth = document.querySelector("#navbar").offsetWidth;
    //     //const header = document.querySelector(".greetingHeader");

    //     let xMin = 0;
    //     let xMax = 0;
    //     let yMin = 0;
    //     let yMax = 0;
    //     const coordinates=[];

    //     //points array-like-structure
    //     let points = document.querySelectorAll(`.implosion`);
    //     points = Array.from(points);

    //     for (let i = 0; i < cant; i++) {
    //         //wheel scroll modfier
    //         let endModifier = 1;
    //         if(typeof(pos) === "number") {
    //             endModifier = pos;
    //         }
    //         const angle = (rot) ? rot : 0;
    //         //get the end point values
    //         const point = document.querySelector(`.piece${i}`);
    //         const endpointX = point.left;
    //         const endpointY = point.top;

    //         const y = (i * offset - 1) + (offset / 2);
    //         const a = ((i + 1) % cant) * increment + angle;
    //         const r = Math.sqrt(1 - Math.pow(y, 2));
    //         const x = Math.cos(a) * r;

    //         //determine starting coordinates
    //         const xStart = ((((str1X / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth));
    //         const yStart = (((45 + ((str1Y) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY));
            
    //         //find min and max coordinate
    //         if(xStart < xMin){
    //             xMin = xStart;
    //         } else if(xStart > xMax){
    //             xMax = xStart;
    //         }

    //         if(yStart < yMin){
    //             yMin = yStart;
    //         } else if(yStart > yMax){
    //             yMax = yStart;
    //         }

    //         //store coordinates
    //         const pointPair = {
    //             x: xStart,
    //             y: yStart,
    //             index: i,
    //             sine: 0,
    //             p: 0
    //         }

    //         coordinates.push(pointPair)
    //     }

    //     //get the sine of each coordinate
    //     for (let i = 0; i < coordinates.length; i++) {
    //         //set up values for comparision from starting values
    //         const pair = coordinates[i];
    //         const xMid = (xMax + xMin)/2
    //         const yMid = (yMax + yMin)/2
    //         const p1 = {
    //             x: pair.x,
    //             y: pair.y
    //         }

    //         const p2 = {
    //             x: xMid,
    //             y: yMid
    //         }
            
    //         //determine each pairs sine value
    //         //turned the sine values into precentages so that I can diffectly compare sine and distance
    //         pair.sine = (Math.sin(Math.atan2(p2.y - p1.y, p2.x - p1.x)) + 1)/2;
    //         //determine the distance from the y axis for each point in percentage
    //         pair.p = pair.x / (xMax - xMin);
    //         pair.combo = pair.p + pair.sine
    //     }

    //     //set up values for comparision for end values
    //     points.forEach(point => {
    //         const p1 = {
    //             //need to change the point lables to x and y for consistancy
    //             x: point.left,
    //             y: point.top
    //         }

    //         const p2 = {
    //             x: str1Xmid,
    //             y: str1Ymid
    //         }

    //         //Need to streamline variable locations
    //         const headerLeft = document.querySelector(".greetingHeader").offsetLeft

    //         point.sine = (Math.sin(Math.atan2(p2.y - p1.y, p2.x - p1.x)) + 1)/2;
    //         point.p = point.left / (str1X);
    //         point.combo = point.sine + point.p
    //     });

    //     coordinates.forEach(point => {
    //         const closest = points.reduce((a, b) => {
    //             if(Math.abs(b.combo - point.combo) <= Math.abs(a.combo - point.combo)) {
    //                 return b;
    //             } else {
    //                 return a;
    //             }
    //         });

    //         const pairedPoint = points.splice(points.indexOf(closest), 1);
    //         animationPairedPoints.push(pairedPoint);
    //     })
    //     updatePoints(-5.7, 0.95, 550, 2, 100, 0.2, animationPairedPoints);
    // }

    // const updatePoints = (rot, pos, size, font, sFont, opc, arr) => {
    //     //number of points
    //     const cant = str1Array.length;
        
    //     const offset = 2/ cant;
    //     const increment = Math.PI * (3 - Math.sqrt(5));

    //     //required to calculate sphere center
    //     const navWidth = document.querySelector("#navbar").offsetWidth;

    //     for (let i = 0; i < cant; i++) {
    //         //wheel scroll modfier
    //         let endModifier = 1;
    //         if(typeof(pos) === "number") {
    //             endModifier = pos;
    //         }
    //         const angle = (rot) ? rot : 0;
    //         const fontSize = (font) ? font : 0;
    //         //get the end point values
    //         const point = arr[i][0];
    //         const endpointX = point.left;
    //         const endpointY = point.top;

    //         const y = (i * offset - 1) + (offset / 2);
    //         const a = ((i + 1) % cant) * increment + angle;
    //         const r = Math.sqrt(1 - Math.pow(y, 2));
    //         const x = Math.cos(a) * r;
    //         const z = Math.sin(a) * r;
        
    //         let scale = Math.round(z * 10) / 100 * fontSize + 2;
    //         if(scale < 0) {
    //             scale = sFont;
    //         }

    //         let opacity = (1 + z) / 1.5;

    //         //variables to determine if div visibility should be none.
    //         const potentialX = ((((str1X / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth)) + arr[i][0].offsetWidth;
    //         const potentialY = (((45 + ((str1Y) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY)) + arr[i][0].offsetHeight;

    //         const greetingPage = document.querySelector(".greetingPage");
    //         //const position = arr[i][0].getBoundingClientRect();
    //         if((potentialX + arr[i][0].offsetWidth) > greetingPage.offsetWidth){
    //             arr[i][0].style.fontSize = scale + "em";
    //             arr[i][0].style.visibility = "hidden";
    //         } else if((potentialY + arr[i][0].offsetHeight) > greetingPage.offsetHeight){
    //             //*******The idea here is to adjust font size so that the offsetHeight/Width dimensions change, but it isn't working quite right *******
    //             arr[i][0].style.fontSize = scale + "em";
    //             arr[i][0].style.visibility = "hidden";
    //         } else { 
    //             const style = "translate3d(" + ((((str1X / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth)) + "px, " + (((45 + ((str1Y) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY)) + "px, " + scale + "px)";
    //             arr[i][0].style.WebkitTransform = style;
    //             arr[i][0].style.msTransform = style;
    //             arr[i][0].style.transform = style;
    //             arr[i][0].style.opacity = (Math.round(opacity * 100) + 100 * opc ) + "%";
    //             arr[i][0].style.fontSize = scale + "em";
    //             arr[i][0].style.visibility = "visible";
    //         }

    //         if(arr[i][0].innerText === "H") {
    //             console.log(endpointX);
    //         }
    //         // const style = "translate3d(" + ((((str1X / 2) - (navWidth / 2) - (endpointX - navWidth) + x * size)) * endModifier + (endpointX - navWidth)) + "px, " + (((45 + ((str1Y) / 2) - (endpointY)+ y * size)) * endModifier + (endpointY)) + "px, " + scale + "px)";
    //         //     arr[i][0].style.WebkitTransform = style;
    //         //     arr[i][0].style.msTransform = style;
    //         //     arr[i][0].style.transform = style;
    //         //     arr[i][0].style.opacity = opacity;
    //         //     arr[i][0].style.fontSize = scale + "em";
    //         //     arr[i][0].style.color = "white";
    //     }
    // }

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
            <SphereElement para={greetingStr} wheelDirection={wheelDirection}/>
            {/* {str1Array.map((word, i) => {
                return createElement(
                    'div',
                    { key: `piece${i}`, className: `implosion piece${i}` },
                    word
                )
            })} */}
            <p
                className="greetingFooter"
            >

            </p>
        </div>
    )
}