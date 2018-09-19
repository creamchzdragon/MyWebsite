import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

class NavBarItem extends React.Component{
    constructor(props){
		super(props);
		this.state={
            currentPage: props.currentPage,
            name: props.name,
		}
	}
    render(){

        return(
           
        <li className={this.state.currentPage===this.state.name?"nav-item active":"nav-item"}>
            <Link className="nav-link" to={"/"+this.state.name}>{this.state.name} {this.state.currentPage===this.state.name? <span className="sr-only">(current)</span>:null}</Link>
        </li>
    );
    }
}
class NavBar extends React.Component {
    
    constructor(props){
		super(props);
		this.state={
            currentPage: props.currentPage,
            pages: ["Home","Projects","Photos","Resume","Repos","Apps","About"],
    }
    
  }
  
  render() {
	  
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
          {this.props.isAuth&&this.props.editMode?<text fontSize="22">ADMIN</text>:null}
          <a className="navbar-brand" href="/">JTW</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                
              {this.state.pages.map((page, num) => {
               
                return (
                  <NavBarItem name={page} currentPage={this.state.currentPage} key={num} />
                );
              })}
              
            
            </ul>
          </div>
        </nav>
    );
  }
}
export{NavBarItem};
export{NavBar}
