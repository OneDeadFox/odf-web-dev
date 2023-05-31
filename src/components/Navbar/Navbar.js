import React from "react";
import FoxHeadLogo from "../../assets/fox-head-logo.png";
import github from "../../assets/github-logo.png"
import facebook from "../../assets/facebook.png"
import linkedIn from "../../assets/linked-in-logo.png"
import NavbarButton from "./NavbarButton/NavbarButton";
import "./Navbar.css";


const navCategories = ["About", "Portfolio", "Skills", "Contact"]

export default function Navbar() {
    return (
        
        <div
            id="navbar"
            className="navbarDark"
        >
            <div>
                <a
                    href="/"
                    id="logoBox"
                    className="logoBox"
                > 
                {/* change h1 and h3 to p tags to help page readers */}
                    <h1
                        id="navbarTitle"
                        className="navbarTitle"
                    >
                        ODF
                    </h1>
                    <img
                        id="foxHead"
                        className="foxHeadLogo"
                        src={FoxHeadLogo}
                        alt=""
                    >
                    </img>
                </a>
                <h3
                    className="description"
                >
                    Web Development
                </h3>
            </div>
            <nav
                id="navLinks"
                className="navLinks"
            >
                {
                    navCategories.map((catigory, i) => {
                            return <NavbarButton 
                                key={i}
                                title={catigory}
                                orientation={i%2 === 0 ? "left" : "right"}
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