import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckboxComponent from "./attributeSliderComponent.js";
import ImageCard from '../components/imageGrid/ImageCard';
import ImageCard2 from '../components/imageGrid/imageCard2';

import  '../components/imageGrid/imageGrid.css';


class AttributeSelection extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      possible: props.possibleVal,
      checkboxList: props.attributeList,
      finalAttributeList: null,
      selectionList: [],
      allImages:[],
      
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
    if(this.state.selectionList.includes(id))
    {
    
      let newA = this.state.selectionList
      let index = newA.indexOf(id)
      newA.splice(index,1)

      this.setState({ 
        selectionList: newA,
      },function(){
        console.log(this.state.selectionList)
        let res = this.state.selectionList.map((img) =>{
     
          return (
             
              <ImageCard2 key={img} image_id={img}/>
          )
        })
    
        this.props.parentCallback2(res)

      })
      
    }
    else if ((!(this.state.selectionList.includes(id))))
    {
      this.setState(prevState => ({
        selectionList: [...prevState.selectionList,id],
      }),
      function(){ 
        console.log(this.state.selectionList)
        let res = this.state.selectionList.map((img) =>{
     
          console.log("id of sel img", img)
          return (
             
              <ImageCard2 key={img} image_id={img}/>
          )
        })
    
        this.props.parentCallback2(res)

       });
    }

    
  }

  clickNone (id){
    console.log(id)
  }

  submitSelect(){
    let possibleInts = this.state.possible
    let min = possibleInts[0]
    let max = possibleInts[1]
    let minString = min.toString()
    let maxString = max.toString()
    let finalList = []


    if(this.state.selectionList.length !== 0){
      for (let index = 0; index < this.state.selectionList.length; index++) {

        const option = {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      }
        fetch(`http://localhost:3001/faces/api/v1/search/${this.state.selectionList[index]}`, option)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            finalList = data
            //data we have to look for 1 searched att and flip its value
            let changeIndex = data.indexOf(this.state.finalAttributeList[0])
            //console.log(data[changeIndex])
            let equalIndex = data[changeIndex].indexOf("=")
            let remain = data[changeIndex].substring(0,equalIndex+1)
            //console.log(remain)
            let currentVal = data[changeIndex].substring(equalIndex+1)
            let IntCurr = parseInt(currentVal)
            let final = ""

            
            if(possibleInts.length === 2)
            {
              if(IntCurr === min)
              {
                final = remain+maxString
              }
              else if (IntCurr === max)
              {
                final = remain+minString
              }
            }

            finalList[changeIndex]=final
            //console.log(finalList)
             
              const opt = {
                method: "PUT",
                body: JSON.stringify(finalList),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            console.log(opt.body)
        
          fetch(`http://localhost:3001/faces/api/v1/search/${this.state.selectionList[index]}`, opt)
              .then(res => res.json())
              .then(data1 => {
                  console.log(data1)
                  if( data1 === 'OK')
                  {
                      console.log("Updated")
                  }
                  else{
                      console.log(data1)
                  }
              })

        })
  
      }
   
        
      }



      
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
          let allImagedata = data.map((imag) =>{
            return (
              imag.image_id
            )
          })
          this.setState({
            allImagedata: allImagedata
          })
          
          let results = data.map((img) =>{
            let check = (this.state.finalAttributeList.length === 1)
            let check1 = this.state.selectionList.includes(img.image_id)
            console.log("id of all",img.image_id)
            
            return (
               check?
                <ImageCard key={img.image_id} image_id = {img.image_id} onClick={this.click} list= {this.state.selectionList}/>
                :
                <ImageCard key={img.image_id} image_id = {img.image_id} onClick ={this.clickNone}  list= {[]}  />
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
              <button style={{marginLeft:"88vw", fontSize:"100%", width:"50%"}} class="btn btn-danger" onClick={this.submitSelect.bind(this)}>Submit Selections!</button>

      
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