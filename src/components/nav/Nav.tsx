import React from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "../navDropdown/NavDropdown";

const Nav = () => {
 
    const items = [
        "Apps", 
        "Security", 
        "tools"
    ];

    return (
        <div className="navigation-container">
            <div className="category-container">
                <NavDropdown items={ items }  />

                <nav className="nav-items-container">
                    <ul>
                        <li>
                            <NavLink to="/" className={ ({ isActive }) => (isActive ? "active" : "") }>Home</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/patches" 
                                className={ ({ isActive }) => (isActive ? "active" : "") }>
                                Patches
                            </NavLink>
                        </li>
                    </ul>
                </nav>
             
             
            </div>
        </div>
    );
};

export default Nav;
