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
           
           
           
          <Footer/>
         </div>);
      }
    }
    export{About};