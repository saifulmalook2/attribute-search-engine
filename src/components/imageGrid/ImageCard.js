import {React, useState} from "react"
import CloseIcon from '@material-ui/icons/Close';
import "./imageGrid.css"
import TextField from '@material-ui/core/TextField';
import { Style } from "@material-ui/icons";

export default function ImageCard(props) {
    let results= []
    let r= []

    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempimgSrc] = useState('');
    const [TextValue, setTextValue] = useState(results);
    const [ClickedImagesList, setClickedImages] = useState([]);

    const submitValue = () => {
        const fromdetails = {
            'Return_Text' : TextValue,  
        }
        var myArray = fromdetails.Return_Text.split(",")
        //console.log(myArray)
        //query here post 
        if(myArray.length !== 0)
      { 
        const option = {
          method: "PUT",
          body: JSON.stringify(myArray),
          headers: {
              "Content-Type": "application/json"
          }
      }
      console.log(option.body)
  
    fetch(`http://localhost:3001/faces/api/v1/search/${props.image_id}`, option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if( data === 'OK')
            {
                console.log("Updated")
            }
            else{
                console.log(data)
            }
        
          
        })
    }
    }

    function closeImageEdit()
    {
        setModel(false)
        //redirect the query back
        //props.attribute 

    }

    
    
  
    return (
        <>
        <div className={model? "model open":"model"}>
                <div className="container">
                    <div className="row justify-content-md-center">
                        
                        <div className="col-md-auto">
                            
                            <img src={`../images/${tempimgSrc}`} style={{width: "250px", borderRadius:"5px"}}/>
                            <CloseIcon onClick={closeImageEdit}/>
                        </div>
                        
                    </div>

                    <div className="row justify-content-md-center">
                        
                        <div className="col-md-auto">
                            
                            <TextField
                            label = "Attribute List" 
                            variant="filled"
                            helperText = "Kindly Follow the Format stated above!"
                            inputProps={{style: {fontSize: 20, color:'white'}}}
                            defaultValue={results}
                            onChange={e => setTextValue(e.target.value)}
                            style={{ width: '500px', boxSizing:"border-box"}}
                            
                            />
                
                        </div>
                        
                    </div>
                    <div className="row justify-content-md-center">
                        
                        <div className="col-md-auto">
                        <button type="button" id="submit" 
                             className="btn btn-dark" 
                             style={{ width:"100px", fontSize: "15px"}}
                             onClick={submitValue}>Submit!
                        </button>
                            
                        </div>
                        
                    </div>
                    </div>

        </div>

        {/* for (let index = 0; index < selectionlist.length; index++) {
          if (selectionlist[index].id === props.image_id) {
            //make the div with highlighted border
          }
          else{
            //make the normal div
          }
        } */}
        

        <div className="card"
         className="pics" 
         key={props.image_id}
          
          onClick={() => props.onClick(props.image_id)} 
          >
            <img src={`../images/${props.image_id}`} className="card--image" />
        </div>
        </>
        
    )
}