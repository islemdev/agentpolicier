import React, { Component } from 'react'
class IntData extends Component {
  constructor(props){
    super(props)
      
    // Set initial state
    this.state = {msg : 'Hi, There!'}
      
    // Binding this keyword
  }
render() {
    
  return (
    <div class="col-xl-3 col-md-6 col-lg-6">
    <div class="single_prising">
        <div class="prising_icon blue">
            <i class="flaticon-servers"></i>
        </div>
        <h3>{this.state.msg}</h3>
        <p class="prising_text">Easy drag and drop fully customizable mobile friendly</p>
        <p class="prise">Start from <span>helll</span></p>
        <a href="#" class="boxed_btn_green2">Start Now</a>
    </div>
    </div>
  );
}
}

export default IntData;