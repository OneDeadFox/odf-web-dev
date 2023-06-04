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

        for (let i = 0; i < exampleImages.length; i++) {
            const dropInDiagonal = document.querySelector(`.dropIn${i}`);
            const x1 = document.querySelector("#navbar").offsetWidth;
            const page = document.querySelector(".portfolioPage");
            const x2 = page.offsetWidth;
            const y2 = page.offsetHeight;
            const angle = Math.atan2(y2, (x2 - x1));
            const dropInWidth = Math.round(Math.sqrt((Math.pow(x2, 2) + Math.pow(y2, 2))));

            //set test background colors
            dropInDiagonal.style.backgroundColor = `rgb(${(i+1)*42}, ${(i+1)*63}, ${(i+1)*80})`;
            
            //transform the diagonal sections
            const newDimensions = getDropInDimensions(angle, dropInWidth, y2/exampleImages.length);
                console.log(newDimensions);

            //set drop in height and width
            dropInDiagonal.style.width = dropInWidth + "px";
            dropInDiagonal.style.height = newDimensions.rotatedHeight/2 + "px";

            dropInDiagonal.style.transform = `
                translate(${x2/2 - dropInDiagonal.offsetWidth/2}px, ${y2/2 - dropInDiagonal.offsetHeight/2}px)
                rotate(-${angle}rad)
            `;
            
            //set drop in coordinates
            const rect = dropInDiagonal.getBoundingClientRect();
            dropInDiagonal.style.left =  -1 * rect.right/2 - rect.left/2 + x1 + "px";
            dropInDiagonal.style.top = -1 * rect.bottom/2 - rect.top/2 + "px";
            
            //set container boundaries
            dropInContainers[i].style.width = x2 + "px"
            dropInContainers[i].style.height = y2 + "px"


        }
    }

    const getDropInDimensions = (ang, w, h) => {
        const angle = ang * 180 * Math.PI,
            sin = Math.sin(angle),
            cos = Math.cos(angle);

        const x1 = cos* w,
            y1 = sin * w;

        const x2 = -sin * h,
            y2 = cos * h;

        const x3 = cos * w - sin * h,
            y3 = sin * w + cos * h;

        const minX = Math.min(0, x1, x2, x3),
            maxX = Math.max(0, x1, x2, x3),
            minY = Math.min(0, y1, y2, y3),
            maxY = Math.max(0, y1, y2, y3);

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