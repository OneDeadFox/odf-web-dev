import {React, useState, useEffect, createElement} from "react";
import "./GreetingPage.css"
import SphereElement from "../Animations/SphereElement/SphereElement"

//Need to restructure the implosion element into its own component

export default function GreetingPage() {
//various variables
    //set number to move elements by
    let number = 0;
    const isAtMaxWidth = Screen.availWidth - window.innerWidth === 0;
    
//Imploding Scroll Effect
    //it is important that this string ends with a space or the while loop will crash!!!
    const str1 = "Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. Here is some filler text so I will move on to other things. "


    
//Move Elements Based on Scroll Wheel
    //capture and handle wheel movement to change element location
    const handleWheele = (e) => {
        const scrollDirection = (e) ? e.deltaY : 1;
        const scrollTotal = 20;
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

        if (scrollDirection < 0 && number > 0){
            number--;
            rot += number/scrollTotal*6
            position -= number/scrollTotal;
            lFont += scrollTotal/number-1;


            updatePoints(rot, position, size, lFont, sFont, opacity, animationPairedPoints);
        } else if (scrollDirection > 0) {
            number++;
            if(number > scrollTotal) {
                number = scrollTotal;
            }
            rot += number/scrollTotal*6
            position -= number/scrollTotal;
            lFont += scrollTotal/number-1;
            sFont += number/scrollTotal * 2;
            opacity += number/scrollTotal;

            updatePoints(rot, position, size, lFont, sFont, opacity, animationPairedPoints);
        }
    }

    //move elements based on wheel event direction
    const moveElements = () => {
        const body = document.querySelector(".greetingBody");
        body.style.top = -2+(number*3)+'em';
    }

//Change the Greeting Heading
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

//Implosion functions
    

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

    useEffect(() => {
        //Init greeting header change
        setTimeout(function(){
            fadeHeading();
        }, 1000);
    }, []);

    return (
        <div
            id="greetingPage"
            className="greetingPage"
            onWheel={(e) => handleWheele(e)}
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
                Here is some filler text so I will move on to other things.
            </p>
            
            <p
                className="greetingFooter"
            >

            </p>
        </div>
    )
}