import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {NavBar,NavBarItem} from '../common/NavBar';
import {CarouselArray,Carousel} from './Carousel';
import {Footer} from '../common/Footer';
class Home extends React.Component{
    constructor(props){
          super(props);
          this.state={
              user:firebase.auth().currentUser,
              isAuth: false,
              editMode: false,
              currentPage: "Home",
      }
    }
    componentDidMount(){
      if(firebase.auth().currentUser){
        fetch('/isAdmin/'+firebase.auth().currentUser.uid).
        then(res=>res.json()).
        then(json=>this.setState({isAuth:json.isAuth}));
    }
    
    }
    switchEditMode(){
      this.setState({
        editMode:(!this.state.editMode)
      });
    }
    
    signIn(event){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(()=>{
        fetch('/isAdmin/'+firebase.auth().currentUser.uid).
        then(res=>res.json()).
        then(json=>this.setState({isAuth:json.isAuth}));
        
        
      }).then(this.setState({})).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        
        
      });
      
    }
    render(){
      
      return(<div>
        
        <NavBar pages={this.state.pages} currentPage={this.state.currentPage} isAuth={this.state.isAuth} editMode={this.state.editMode}></NavBar>
         <CarouselArray isAuth={this.state.isAuth} editMode={this.state.editMode}/>
         <hr className="my-4"/>
         <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">An appropriate greeting given my profession, I am Jamie 'Tyler' Walder and I am a programmer. 
              This site was developed by me to showcase my skills, abilities, and to bolster my ever growing ego. 
              It is a bit empty right now however I am still working on it... </p>
            <hr className="my-4"/>
            <p>If you want to find out exactly what I can do an am qualified for check out my virtual Resume.</p>
            <a className="btn btn-primary btn-lg" href="Resume" role="button">Resume</a>
          </div>
         
        <Footer onClick={()=>this.signIn()} switchEditMode={()=>this.switchEditMode()} isAuth={this.state.isAuth}/>
       </div>);
    }
  }
  export{Home};