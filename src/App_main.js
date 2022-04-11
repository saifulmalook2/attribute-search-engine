import React from 'react';
import NavBar from './components/navBar/navBar.js';
import './App.css';
import DatabaseSelection from './DatabaseSelection';
import AttributeSelection from './attributeSlider/attributeSlider.js';
import Noselection from './noselection'
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App_main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        data: null,
        databaseAttributes: null,
        possibleAttributeValues: [],
        isAttributeListPassed: false,
        uploaded: false,
        selectedImages: []
    }

  }
  onChangeHandler=event=>{
    var files = event.target.files
    //if(this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)){ 
    // if return true allow to setState
       this.setState({
       selectedFile: files
    })
// }
}

  onClickHandler = () => {
    let data1 =[]
    data1 = new FormData()
    for(var x = 0; x<this.state.selectedFile.length; x++) {
        data1.append('file', this.state.selectedFile[x])
    }
    console.log("data111===")
    console.log(data1)
    
   axios.post("http://localhost:3001/faces/api/v1/upload", data1, {
         onUploadProgress: ProgressEvent => {
           this.setState({
             loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
         })
     },
  })
  .then(res => { // then print response status
    toast.success('upload success')
    this.setState({
      uploaded: true,
    })
  })
  .catch(err => { 
      toast.error('upload fail')
  })
  }
    
    //grid
    handleCallback = (childData) =>{
    this.setState({data: childData})}

    handleCallback2 = (cData) =>{
      this.setState({selectedImages: cData})}

    //attributeslider 
    handleDatabaseSelection = (databaseSelect) =>{

      console.log(databaseSelect)

      if( databaseSelect !== null)
      {
        console.log("Initial value of bool")
        console.log(this.state.isAttributeListPassed)
        let attributesD = databaseSelect[0];
        attributesD = attributesD.slice(1,attributesD.length);
        let min = databaseSelect[1][0];
        let max = databaseSelect[1][(databaseSelect[1].length)-1];
        let step = 0;
        let len = databaseSelect[1].length;
        if((max - min)=== len ){
          step = 2
        }
        else{
          step = 1
        }

        let attributes  = attributesD.map((item,index)=>
          {
            return {
                  id: index,
                  name: item,
                  val: max + 1 ,
                  min: min,
                  max: max,
                  step: step,
                  value: ''
                };
        })
        

       
        this.setState({
          databaseAttributes: attributes,
          possibleAttributeValues: databaseSelect[1],
        })
        this.setState({
          isAttributeListPassed: true
        })

      }
     
    }

  render(){

    const {data} = this.state;
    const {selectedImages} = this.state;

    return (
      
      <div className='app-main' >

         <NavBar/>
         
         <DatabaseSelection 
              pCallback = {this.handleDatabaseSelection}
        />

      <input type="file" class="form-control" multiple onChange={this.onChangeHandler}/>
         <div class="form-group">
         <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
         </div>
         <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
         <div class="form-group">
          <ToastContainer />
          </div>
    
        <div className='main--checkbox'>
        {this.state.isAttributeListPassed ? 
              <AttributeSelection 
                parentCallback = {this.handleCallback}
                parentCallback2 = {this.handleCallback2}
                attributeList = {this.state.databaseAttributes}
                possibleVal = {this.state.possibleAttributeValues}
                
              /> :
              <div style={{marginLeft:'220%'}}>
              
              </div>
        }
        </div>
        
        
        <div className="main--container">
           

          <div className="row" style={{width:'100%'}}>

            <div className="col-xs-12 col-sm-6" style={{marginLeft:"11%"}} >
            <div className='img-grid' >
                  {data}
                </div>
            </div>

            <div className='col-sm-4' >
            <div  >
                  {selectedImages}
            </div>
            </div>

          </div>
            
          
        </div>

      </div> 
        
     
    );

  }
  
}
export default App_main;

/*  */
