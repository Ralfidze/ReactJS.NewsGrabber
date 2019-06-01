import React, { Component } from 'react';

class ExplainBindingsComponent extends Component{
    constructor(){
        super();

        this.onCLickMe = this.onCLickMe.bind(this);
        /*
           Also methods can be autobound automatically
           without binding them explicitly 
           by using JavaScript ES6 arrow functions 
           
           Example 1:
           class ExplainBindingsComponent extends Component {
                onClickMe = () => {
                    console.log(this);
                }
           Example 2:
            render(){
                return (
                    <div><button 
                        onClick={ () => this.onCLickMe()}
                        type="button"
                    >
                    Click onCLickMe
                    </button>    
                    </div>
        );
    }
    */
    }
    onCLickMe(){
        console.log(this);
    }
    render(){
        return (
            <div><button 
                onClick={this.onCLickMe}
                type="button"
            >
            Click onCLickMe
            </button>    
            </div>
        );
    }
}

export default ExplainBindingsComponent;