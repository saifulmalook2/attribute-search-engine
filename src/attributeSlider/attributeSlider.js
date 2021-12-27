import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckboxComponent from "./attributeSliderComponent.js";
import ImageCard from '../components/imageGrid/ImageCard';

class AttributeSelection extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      checkboxList: props.attributeList,
      finalAttributeList: null,
      selectionList: []


     
    };
    this.click = this.click.bind(this)
    console.log(this.state.checkboxList)
  }


  onChange = (event) => {
    console.log(event);
    this.setState({ selectedValue: event.target.value });
  };

  handleOnChange(event,option) {
    let checkboxList = this.state.checkboxList;
    checkboxList.forEach(chkItem=>{
      if(chkItem === option){
        chkItem.value = event.target.value;
      }
    })

    
    let names = []

    for (let i = 0; i < checkboxList.length; i++) {
      if (checkboxList[i].value !== ''){
        names.push(checkboxList[i].name + "=" + checkboxList[i].value)
      }
    }
    //console.log(names);
    this.setState({
      finalAttributeList: names
    });
    
  }

  click (id){
    console.log(id)
    let newElement ={ img_id : id ,selected : true}
    this.setState(prevState => ({selectionList:[...prevState.selectionList,newElement]}
        ),function(){ console.log(this.state.selectionList) });

        //[{img_id: '000003.jpg', selected: true}]
  }

  clickNone (id){
    console.log(id)
    console.log("SMARRRRTTT BITCHESSS U GOO ")

    
  }

  handleOnSubmit(){
    console.log(this.state.finalAttributeList);
    
    if(this.state.finalAttributeList !== null)
    { 
        const options = {
          method: "POST",
          body: JSON.stringify(this.state.finalAttributeList),
          headers: {
              "Content-Type": "application/json"
          }
      }
      console.log(options.body)
  
    fetch("http://localhost:3001/faces/api/v1/search", options)
        .then(res => res.json())
        .then(data => {
          let results = data.map((img) =>{
            let check = (this.state.finalAttributeList.length === 1)
            console.log(check)
            return (
               check?
                <ImageCard key={img.image_id} image_id = {img.image_id} onClick={this.click}/>
                :
                <ImageCard key={img.image_id} image_id = {img.image_id} onClick ={this.clickNone}/>
            )
          })
          this.props.parentCallback(results);
          
        })
    }
    else{
        //Display a UI such that the user knows no selecion is made
    }

  }

  
  render() {
    return (            
              <div className = "table-container">
              <div>
              <div className = "checkbox">
      
              <table className="table table-style" >

                <thead className="thead-dark">

                  <tr>
                    
                    <th scope="col">Attribute</th>
                    <th scope="col">Values</th>
                  </tr>

                </thead>
                </table >
                  <CheckboxComponent 
                  checkboxList={this.state.checkboxList}  
                  onChange={this.handleOnChange}
                  />
                </div>
              </div>
              <button type="button" class="btn btn-primary btn-lg" style={{width:'100%', marginTop:'0', fontSize:'20px'}} onClick={()=>this.handleOnSubmit()}>Submit</button>
            </div>
          
       
      
      
    );
  }
}
export default AttributeSelection;