import React, { Component } from "react";
import './App.css'
import celeba from "./0_6O-ThX64j_8P5lTY.png";
import lfwa from "./Samples-from-LFWA-dataset-21.png";


class DatabaseSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption);

    var selection= this.state.selectedOption
    var opt= []
    opt.push(selection);
    const options = {
        method: "POST",
        body: JSON.stringify(opt),
        headers: {
          "Content-Type": "application/json"
      }
    }
   console.log(JSON.stringify(opt));
    fetch("http://localhost:3001/faces/api/v1", options)
        .then(res => res.json())
        .then(data => {
            this.props.pCallback(data);
            
        })
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>


      <div class="page-section" className="db_select">
          <div class="container">
            <div class="row">
              <div class="col-lg-6" >
                <div class="card-service wow fadeInUp" >
                  <div class="header">
                  <img src={celeba} width="200px"/>
                  </div>
                  <div class="body">
                    <h3 class="text-secondary">CelebA</h3>
                    <h5>A large-scale face attributes dataset with more than 200K celebrity images, each with 40 attribute annotations.</h5>
                    <input
                  type="radio"
                  value= "CelebA"
                  checked={this.state.selectedOption === "CelebA"}
                  onChange={this.onValueChange}
                />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card-service wow fadeInUp">
                  <div class="header">
                    <img src={lfwa} alt="" width="200px" className="img"/>
                  </div>
                  <div class="body">
                    <h3 class="text-secondary" >LFWA</h3>
                    <h5>Labeled Faces in the Wild (LFWA) is a database of face photographs designed for studying the problem of unconstrained face recognition</h5>
                    <input 
                    type="radio"
                    value= 'LFWA'
                    checked={this.state.selectedOption === 'LFWA'}
                    onChange={this.onValueChange}
                  />
                  </div>
                </div>
              </div>
              
            </div>
            <button className="btn btn-primary btn-lg" className="center" type="submit">
          Submit
        </button>
          </div> 
          
        </div> 
      </form>
    );
  }
}

export default DatabaseSelection ;

// 
/* <div>
Selected option is : {this.state.selectedOption}
</div> */