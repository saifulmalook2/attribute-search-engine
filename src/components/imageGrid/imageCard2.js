import {React, useState} from "react"
import CloseIcon from '@material-ui/icons/Close';
import "./imageGrid.css"
import TextField from '@material-ui/core/TextField';
// import { Style } from "@material-ui/icons";

export default function ImageCard2(props) {
  
    
  
    return (
        <>
        
        
        <span className="card2"  key={props.image_id} >

                <img src={`../images/${props.image_id}`} className="card--himage" />
    
        </span>
     
        
        </>
        
    )
}