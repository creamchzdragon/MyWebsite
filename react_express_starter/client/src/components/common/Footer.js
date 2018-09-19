import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
class Footer extends React.Component{
    
    render(){
      return(<footer>
        <div className="container">
          <div className="row">
            <div className="col-sm">
            LinkedIn
            </div>
            <div className="col-sm">
            Email
            </div>
            <div className="col-sm">
            Instagram
            </div><div className="col-sm">
            <a className="admin-link" href="#" onClick={()=>this.props.onClick()}>Admin Sign-In</a>
            </div>
            <div className="col-sm"> 
            {this.props.isAuth?<button onClick={()=>this.props.switchEditMode()}>Edit Mode</button>:null}
            </div>
          </div>
          
  
          </div>
        
        
      </footer>);
    }
  }
  export {Footer};