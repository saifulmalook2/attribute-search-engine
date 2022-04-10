import React, { Component } from "react"
import { MenuItems } from "./MenuItems"
import "./NavBar.css"

class Navbar extends Component {

    state = {clicked: false}

    handleClick = () =>{
      this.setState({ clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className= "navbar navbar-expand-lg navbar-light bg-light">
                <h1 className="navbar-logo">
                     Attribute 
                     <span className="navbar-logo2"> Search Engine</span>
                     
                </h1>
                
                <ul className= {this.state.clicked ? 'nav-menu active' : 'nav-menu' }>

                
                {MenuItems.map( (item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url} >
                                        {item.title}
                                    </a>
                                </li>
                            )

                        })}
                   
                </ul>
                
            </nav>

        )
    }
}

export default Navbar