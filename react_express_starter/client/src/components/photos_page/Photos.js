import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {NavBar,NavBarItem} from '../common/NavBar';
import {Footer} from '../common/Footer';
import {AddAlbum,Album,AlbumCover} from './Album';



class Photos extends React.Component{
    constructor(props){
          super(props);
          this.state={
              isAuth: false,
              currentPage: "Photos",
              albums:[],
              editMode:false,
  
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
    componentDidMount(){
      fetch('/Albums').
      then(res=>res.json()).
      then(albums=>this.setState({albums}));
    }
    render(){
     
      return(<div>
        <NavBar pages={this.state.pages} currentPage={this.state.currentPage} rerender></NavBar>
        <Router>
          <div>
            <Route exact path="/Photos" component={PhotoHomePage}/>
            <Route exact path="/Photos/Admin/AddAlbum"    component={AddAlbum}/>
            <Route exact path="/Photos/:key" component={Album}/>
           
           
     
          </div>
  
  
        </Router>
        
         
         
        <Footer onClick={()=>this.signIn()} switchEditMode={()=>this.switchEditMode()} isAuth={this.state.isAuth}/>
       </div>);
    }
  }
  
class PhotoHomePage extends React.Component{
    constructor(props){
          super(props);
          this.state={
              isAuth: false,
              currentPage: "Photos",
              albums:[],
  
          }
    }
    componentDidMount(){
      fetch('/Albums').
      then(res=>res.json()).
      then(albums=>this.setState({albums}));
    }
      render(){
        var albums=this.state.albums.sort(function(a,b){
          if(a.timestamp<b.timestamp){
            return 1;
          }
          else if(a.timestamp>b.timestamp){
            return -1;
          }
          else{
            return 0;
          }
      });
        return(
        <div className="album-collection">
        <div className="container-fluid" >
          <div className="row">
        {albums.map((album, i) => {
          
          return(
           <AlbumCover name={album.name} description={album.description} coverPhotos={album.coverPhotos} timeStamp={album.timestamp} key={album.key} akey={album.key}/>
  
           
          );
        })}
        </div>
        </div>
        </div>);
      }
  }
  export {Photos};