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
        <div className = "checkbox"  key={option.id}>
      
        <table className="table table-style" >

          <tbody>

            <tr >

              <td htmlFor={option.id} style={{marginLeft:'0px'}}>
                <h1>{option.name}</h1>
                
              </td>

              <td >
                
                        <RangeSlider
                        style={{alignItems:'end'}}
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