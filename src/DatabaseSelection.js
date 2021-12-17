import React, { Component } from "react";
import './App.css'

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

      <div class="container" style={{backgroundColor:'#ffcccc', fontSize:'20px', maxWidth:'50%', borderRadius:'20px'}}>
        <div class="row">
          <div class="col" style={{marginLeft:'150px'}}>
          <label >
            <input
              type="radio"
              value= "CelebA"
              checked={this.state.selectedOption === "CelebA"}
              onChange={this.onValueChange}
            />
            CelebA
          </label>
          </div>
          <div class="col">
          <label>
            <input 
              type="radio"
              value= 'LFWA'
              checked={this.state.selectedOption === 'LFWA'}
              onChange={this.onValueChange}
            />
            LFWA
          </label>
          </div>
        </div>
        <div class="row">
          <div class="col" style={{marginLeft:'45%', fontSize:'30px'}}>
          <button className="btn btn-primary btn-lg" type="submit">
          Submit
        </button>
        </div>
          
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