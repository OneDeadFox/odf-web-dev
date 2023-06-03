import {React, useState, useEffect} from "react";
import FoxHeadLogo from "../../assets/fox-head-logo.png";
import FoxHeadButton from "../../assets/fox-head-logo-button.png";
import FoxHeadButtonBackground from "../../assets/fox-head-logo-button-transparent.png";
import github from "../../assets/github-logo.png"
import facebook from "../../assets/facebook.png"
import linkedIn from "../../assets/linked-in-logo.png"
import NavbarButton from "./NavbarButton/NavbarButton";
import "./Navbar.css";


const navCategories = ["About", "Portfolio", "Skills", "Contact"]

export default function Navbar(props) {
    const screenType = props.screenType;
    const [dropActive, setDropActive] = useState("");
    
    const showBackground = () => {
        const background = document.querySelector("#foxHeadButtonBackground");
        let opacity = 10;

        const tinter = setInterval(function(){
            opacity += 10;
            background.style.opacity = opacity + "%";

            if(opacity >= 100) {
                clearInterval(tinter);
            }
        }, 20)
    }

    const hideBackground = () => {
        const background = document.querySelector("#foxHeadButtonBackground");
        let opacity = 100;

        const fader = setInterval(function(){
            opacity -= 10;
            background.style.opacity = opacity + "%";

            if(opacity <= 10) {
                clearInterval(fader);
            }
        }, 20);
    }

    const dropDownAnimation = (active) => {

        if(props.screenType === "isMobile"){
            for (let i = 0; i < navCategories.length; i++) {
                const dropdownButton = document.querySelector(`.nav${i}`)

                if(active === true) {
                    let increment = 0;
                    const initialY = dropdownButton.offsetTop;
                    const drop = setInterval(() => {
                        console.log(increment);
                        increment += 40;

                        //set drop amount based on distance from initial location
                        if(increment > (initialY + dropdownButton.offsetHeight * (i+1))) {
                            dropdownButton.style.top = initialY + dropdownButton.offsetHeight * (i+1) + "px";
                        } else {
                            dropdownButton.style.top = initialY + increment + "px";
                        }
                        
                        //clear interval if increment is larger than the max drop of the last dropdown button
                        if(increment > (initialY + dropdownButton.offsetHeight * navCategories.length)){
                            clearInterval(drop)
                        }
                    }, 20);
                } else if(active === false) {
                    let increment = 0;
                    const initialY = dropdownButton.offsetTop;
                    const rise = setInterval(() => {
                        console.log(increment);
                        increment -= 40;
                        console.log(increment);
                        //set drop amount based on distance from initial location
                        if(increment < (initialY - dropdownButton.offsetHeight * (i+1))) {
                            dropdownButton.style.top = initialY - dropdownButton.offsetHeight * (i+1) + "px";
                        } else {
                            dropdownButton.style.top = initialY + increment + "px";
                        }
                        
                        //clear interval if increment is larger than the max drop of the last dropdown button
                        if(increment < (initialY - dropdownButton.offsetHeight * navCategories.length)){
                            clearInterval(rise)
                        }
                    }, 20);
                }
            }
        }
    }

    const handleClick = (e) => {
        if(dropActive === true){
            hideBackground();
            setDropActive(false);
        } else {
            showBackground();
            setDropActive(true);
        }
    }

    useEffect(() => {
        dropDownAnimation(dropActive);
    }, [props.screenType, dropActive]);

    return (
        
        <div
            id="navbar"
            className="navbarDark"
        >
            <div>
                <a
                    href="/"
                    id="logoBoxLink"
                    className="logoBox"
                > 
                    <h3
                        id="navbarTitle"
                        className="navbarTitle"
                    >
                        ODF
                    </h3>
                    <img
                        id="foxHead"
                        className="foxHeadLogo"
                        src={FoxHeadLogo}
                        alt=""
                    >
                    </img>
                </a>
                <div
                    id="logoBoxButton"
                    className="logoBox"
                > 
                    <h3
                        id="navbarTitle"
                        className="navbarTitle"
                    >
                        ODF
                    </h3>
                    <img
                        id="foxHeadButton"
                        className="foxHeadLogo"
                        src={FoxHeadButton}
                        alt=""
                        onClick={handleClick}
                    >
                    </img>
                    <img
                        id="foxHeadButtonBackground"
                        className="foxHeadLogo"
                        src={FoxHeadButtonBackground}
                        alt=""
                    >
                    </img>
                </div>
                <h3
                    className="description"
                >
                    Web Development
                </h3>
            </div>
                {/* Navigation Links */}
            <nav
                id="navLinks"
                className="navLinks"
            >
                {
                    navCategories.map((catigory, i) => {
                            return <NavbarButton 
                                key={`nav${i}`}
                                title={catigory}
                                orientation={i%2 === 0 ? "left" : "right"}
                                screenType={screenType}
                                listLength={navCategories.length}
                            />
                        }
                    )
                }
            </nav>
                {/* Navigation dropdown (small screens) */}
            <nav
                id="dropdown"
                className="dropdown"
            >
                {
                    navCategories.map((catigory, i) => {
                            return <NavbarButton 
                                key={`dropdownNav${i}`}
                                index={i}
                                title={catigory}
                                orientation="left"
                                active={dropActive}
                                screenType={screenType}
                                listLength={navCategories.length}
                            />
                        }
                    )
                }
            </nav>
            <div
                id="contactLogos"
                className="contactLogos"
            >
                <a
                    href="https://github.com/OneDeadFox"
                    target="blank"
                >
                    <img
                    src={github}
                    className="cLogo github"
                    alt="Github link"
                    ></img>
                </a>
                <a
                    href="./#"
                    target="blank"
                >
                    <img
                    src={linkedIn}
                    className="cLogo linkedIn"
                    alt="Linked-in link"
                    ></img>
                </a>
                <a
                    href="./#"
                    target="blank"
                >
                    <img
                    src={facebook}
                    className="cLogo facebook"
                    alt="Facebook link"
                    ></img>
                </a>
            </div>
        </div>
    )
}