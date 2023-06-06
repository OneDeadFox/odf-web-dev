import {React, useEffect} from "react";
import ElementDropIn from "../Animations/ElementDropIn/ElementDropIn"
import constructionEx from "../../assets/construction.png"
import gameDevEx from "../../assets/game-dev.jpg"
import potteryEx from "../../assets/pottery.jpg"

import "./PortfolioPage.css"

export default function PortfolioPage(props) {
    const exampleImages = [constructionEx, gameDevEx, potteryEx];

    const setDropIns = () => {
        const dropInContainers = Array.from(document.querySelectorAll(".dropInContainer"));
        const page = document.querySelector(".portfolioPage");
        const pageBounding = page.getBoundingClientRect();
        const navWidth = document.querySelector("#navbar").offsetWidth;

        for (let i = 0; i < exampleImages.length; i++) {
            const dropInDiagonal = document.querySelector(`.dropIn${i}`);
            //set base Variables
                //toFixed sets the number of decimal places
            const containerWidth = pageBounding.width.toFixed(1);
            const containerHeight = pageBounding.height.toFixed(1);
            const angle = Math.atan2(containerHeight, (containerWidth));
            const rightAngleMod = 1.5708;
            const opAngle = (rightAngleMod - angle);
            
            const dropInWidth = Math.round(Math.sqrt((Math.pow(containerWidth, 2) + Math.pow(containerHeight, 2))));
            const crossAngle = Math.abs(opAngle - angle);
            const dropInHeightLandscape = containerWidth * Math.cos(crossAngle) / (exampleImages.length);
            // const dropInHeightLandscape = containerWidth / Math.sin(opAngle) / (exampleImages.length);
            const dropInHeightPortrait = containerHeight / 5.5 /Math.sin(opAngle) / 2;
            // const dropInHeight = opHypotenuse / exampleImages.length;

            //set test background colors
            dropInDiagonal.style.backgroundColor = `rgb(${(i+1)*42}, ${(i+1)*63}, ${(i+1)*80})`;
            
            //set drop in height and width
            dropInDiagonal.style.width = dropInWidth * 2 + "px";
            if(containerWidth > containerHeight){
                dropInDiagonal.style.height = dropInHeightLandscape + "px";
            } else {
                dropInDiagonal.style.height = dropInHeightPortrait + "px";
            }

            //set drop in angle
            dropInDiagonal.style.transform = `
                translate(${containerWidth/2 - dropInDiagonal.offsetWidth/2}px, ${containerHeight/2 - dropInDiagonal.offsetHeight/2}px)
                rotate(-${angle}rad)
            `;
            
            //set drop in coordinates
            const rect = dropInDiagonal.getBoundingClientRect();
            //set Placement based on drop in height
            if(containerWidth > containerHeight) {
                const placementRise = Math.sin(opAngle) * (dropInHeightLandscape);
                const placementRun = Math.cos(opAngle) * (dropInHeightLandscape);
                dropInDiagonal.style.left =  Math.round((-rect.right/2 - rect.left/2) +  (placementRun/2) + (placementRun * i) + navWidth) + "px";
                dropInDiagonal.style.top = Math.round((-rect.bottom/2 - rect.top/2) + (placementRise/2) + (placementRise * i)) + "px";
            } else {
                const placementRise = Math.sin(opAngle) * (dropInHeightPortrait);
                const placementRun = Math.cos(opAngle) * (dropInHeightPortrait);

                dropInDiagonal.style.left =  Math.round((-rect.right/2 - rect.left/2) +  (placementRun/2) + (placementRun * i) + navWidth) + "px";
                dropInDiagonal.style.top = Math.round((-rect.bottom/2 - rect.top/2) + (placementRise/2) + (placementRise * i)) + "px";
            }
            
            //set container boundaries
            dropInContainers[i].style.width = containerWidth + "px"
            dropInContainers[i].style.height = containerHeight + "px"


        }
    }

    const getDropInDimensions = (ang, w, h) => {
        const angle = ang * 180 * Math.PI,
            sin = Math.sin(angle),
            cos = Math.cos(angle);

        const navWidth = cos* w,
            y1 = sin * w;

        const containerWidth = -sin * h,
            containerHeight = cos * h;

        const x3 = cos * w - sin * h,
            y3 = sin * w + cos * h;

        const minX = Math.min(0, navWidth, containerWidth, x3),
            maxX = Math.max(0, navWidth, containerWidth, x3),
            minY = Math.min(0, y1, containerHeight, y3),
            maxY = Math.max(0, y1, containerHeight, y3);

        return({
            rotatedWidth: maxX-minX,
            rotatedHeight: maxY-minY
        });
    }

    useEffect(() => {
        setDropIns()
    },[])

    return(
        <div
            className="portfolioPage"
        >
            {props.fromGreeting ? 
                exampleImages.map((image, i) => 
                    <ElementDropIn
                        key={`dropIn${i}`}
                        index={i}
                        image={image}
                    />
                ) :
                <h1>Portfolio</h1>
            }
        </div>
    )
}