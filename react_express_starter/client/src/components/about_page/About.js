import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {NavBar,NavBarItem} from '../common/NavBar';
import {Footer} from '../common/Footer';
class About extends React.Component{
    
      constructor(props){
            super(props);
            this.state={
    
                isAuth: false,
                
                currentPage: "About",
            }
      }
      
      render(){
        return(<div>
          <NavBar pages={this.state.pages} currentPage={this.state.currentPage}></NavBar>
          <div className="container">
            <div className="row">  
                <img height="200px" width="200px" src="https://avatars2.githubusercontent.com/u/14225316?v=4" alt="A picture of Jamie Walder"/>
                <div style={{width:"20px"}}/>
                <h1>Jamie 'Tyler' Walder</h1>
            </div>
          </div>
           
          <Footer/>
         </div>);
      }
    }
    export{About};