import React from "react";
import "./attributeSlider.css"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

class CheckboxComponent extends React.Component {

  render() {
    const checkboxList = this.props.checkboxList;
    return (
      <>
        
        {checkboxList.map((option) => (
        <div key={option.id}>
      
        <table className="table" >

          <tbody className="attributes">

            <tr >

              <td htmlFor={option.id} style={{marginLeft:'0px'}}>
                <text className="attributes-list">{option.name}</text>
                
              </td>

              <td >
                
                        <RangeSlider
                        style={{maxWidth:'100%', marginRight:'0px', color:"black"}}
                        color="black"
                        backgroundcolor="black"
                        className="slider" 
                        min={option.min}
                        max={option.max}
                        step= {option.step}
                        tooltipPlacement = "bottom"
                        value={option.value}
                        onChange={(e) => this.props.onChange(e,option)}
                        />
                
              </td>
              <td>
              
              {option.value !== '' ? 
                option.value
                :
                <text> null</text>
              }  
               </td>
              </tr>

      </tbody>

      </table>

</div>
          
        ))}
      </>
    );
  }
}
export default CheckboxComponent;