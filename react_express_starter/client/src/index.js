import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link } from 'react-router-dom';
import './index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
let configuration=require('./config');

console.log(configuration.config);
var config=configuration.config;
firebase.initializeApp(config);
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
class AlbumCover extends React.Component{
    constructor(props){
      super(props);
      this.state={
        name:this.props.name,
        description:this.props.description,
        coverPhotos: this.props.coverPhotos,
        timeStamp:this.props.timeStamp,
        akey:this.props.akey,
      }
      
      
      
    }
    render(){
      
      return(
        <div class="card">
        <Carousel pics={this.state.coverPhotos} interval={Math.random()*2000+3000}/>
        <div className="card-body">
          <h5 className="card-title">{this.state.name}</h5>
          <p className="card-text">{new Date(this.state.timeStamp*1).toLocaleDateString()}</p>
          <p className="card-text">{this.state.description}</p>
          <Link to={"/Photos/"+this.props.akey.toString()} className="nav-link btn btn-primary">View</Link>
        </div>
      </div>
      );
    }
}
class Album extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props.match.params.key);
    this.state={
      key:this.props.match.params.key,
      name:"",
      descrion:"",
      timeStamp:"",
      photos:[],
      coverPhotos:[],

    }
  }
  componentDidMount(){
    fetch("/getAlbum/"+this.state.key)
    .then(res=>res.json())
    .then(album=>this.setState({name:album.name,description:album.description,timeStamp:new Date(album.timestamp*1).toLocaleDateString(),photos:album.photos,coverPhotos:album.coverPhotos}));
  }
  //the file sctructure must mimic the path
  render(){
    var style={
      backgroundImage: "url("+this.state.coverPhotos[0]+")",
      width:"1080px",
      margin:"auto"
    };
    return(

      <div className="album">
        <a href="../Photos">Go Back To Albums</a>
        <div className="row mb-5">
          <div className="col-md-12">
              <div className="card card-image" style={style}>
                  <div className="text-white text-center rgba-stylish-strong py-5 px-4">
                      <div className="py-5">

                         
                              <h2 className="card-title pt-3 mb-5 font-bold">{this.state.name}</h2>
                             
                              <p className="px-5 pb-4">{this.state.timeStamp}</p>
                              <p className="px-5 pb-4">{this.state.description}</p>
                          

                      </div>
                  </div>
              </div>
          </div>
      </div>

        <div className="container">
         
          <div className="row">
            {this.state.photos.map((photo,i)=>{
              return(
                <div class="card">
                
                <img className="card-img-top" src={photo} alt={photo} width="1080" height="200"/>
                
              </div>
              );
            })

            }
          </div>
        </div>

      </div>
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
class Carousel extends React.Component{
  render(){
    return(
      <div>
        <div className="carousel slide carousel-fade" data-ride="carousel" data-interval={this.props.interval}>
            <div className="carousel-inner">
            { this.props.pics.map((pic, j) => {
                  var isEq=(j===0);
                  if(isEq){
                  return(
                   
                      <div className="carousel-item active">
                        <img className="d-block w-100" src={pic} alt={pic} width="1080" height="200"/>
                      </div>
                      
                      
                      
                  );
                  }
                  else{
                    return(
                      <div className="carousel-item">
                      <img className="d-block w-100" src={pic} alt={pic} width="1080" height="200"/>
                      </div>
                    );
                  }
                  
                })}
              

              
              

            </div>
          </div>
      </div>
    );
  }
}
class CarouselArray extends React.Component{

  constructor(props){
    super(props);
    this.state={
      pics: [],
    }

  }
  //possible error here where this may not be called again
  componentDidMount(){
    fetch('/carPhotos').
    then(res=>res.json()).
    then(pics=>this.setState({pics}));
  }
  addPhoto(text){
      alert("adding "+text);
      //changes / to %47 so it can be entered into the url

      text=text.replace(/\//g,"&47");
      console.log(text);
      fetch("/addPhotos/"+text+"/"+firebase.auth().currentUser.uid).then(console.log("url: "+"/addPhotos/"+text+"/"+firebase.auth().currentUser.uid));

  }
  render(){
    const rows=3;
    const cols=4;
    const picsPerCar=3;
    //stored in groups of the number of columns as an array and then the number of arrays with excess looped around
    //i.e. [["pic1","pic2","pic3"],...]
    var pictures=[];
    var picsInd=0;
    for(var i=0;i<rows;i++){
      var row=[];
      for(var j=0;j<cols;j++){
        var car=[];
        for(var k=0;k<picsPerCar;k++){
          car.push(this.state.pics[picsInd]);
          picsInd++;
          if(picsInd>=this.state.pics.length){
            picsInd=0;
          }
        }
        row.push(car);
      }
      pictures.push(row);
    }
    console.log(pictures);
    const isAuth=this.props.isAuth;
    return(
      //photos should be 1080*720
      
     

      <div className="carousel-array">
         { isAuth&&this.props.editMode?<InputWithSubmit onClick={this.addPhoto} butText="Add Photo"/> : null}
         
          <div className="container">

          { pictures.map((row, i) => {
              return (
                <div className="row" key={i}>
                { row.map((col, j) => {
                  
                  return(
                    <div className="col-sm" key={j}>
                      <Carousel pics={col} interval={Math.random()*2000+3000} key={j}/>
                    </div>
                  );
                })}
                </div>
                );
              })}
           </div>
      </div>
    );
  }
}
class InputWithSubmit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:'',
    }
  }
  clicked(){
      this.setState({
        text:"",
      });
      this.props.onClick(this.state.text);
  }
  render(){
    return(
       <div className="container input-with-submit">
        <div className="row">
        <form type="text">
          <input type="text" value={this.state.text} onChange={(e)=>{this.setState({text:e.target.value})}}/>
        </form>
        <button onClick={()=>this.clicked()}>{this.props.butText}</button>
        </div>
      </div> 
    );
  }
}
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

class Projects extends React.Component{
  constructor(props){
		super(props);
		this.state={
            isAuth: false,
        
            currentPage: "Projects",
		}
	}
  render(){
    return(<div>
      <NavBar pages={this.state.pages} currentPage={this.state.currentPage}></NavBar>
       
       
       
      <Footer/>
     </div>);
  }
}
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
class AddAlbum extends React.Component{
  render(){
    
    
  
    return( 
      <div className="AddAlbum">
        <form class="text-center border border-light p-5" method="post" enctype="multipart/form-data" action="http://localhost:5000/upload">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Title</span>
              </div>
              <input type="text" name="name" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Description</span>
              </div>
              <input type="text" name="desc" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Date</span>
              </div>
              <input name="date" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="MM/DD/YYYY"/>
            </div>
            
              
            <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Album Photos(first 5 are album cover)</span>
            </div>
              <input type="file" name="files" multiple/>
              <input type="submit" value="Submit"/>
              </div>
              
            </form>
            
        </div>
    );
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
class Repos extends React.Component{
  constructor(props){
		super(props);
		this.state={
            isAuth: false,
          
            currentPage: "Repos",
		}
	}
  render(){
    return(<div>
      <NavBar pages={this.state.pages} currentPage={this.state.currentPage}></NavBar>
       
       
       
      <Footer/>
     </div>);
  }
}
class Resume extends React.Component{
  constructor(props){
		super(props);
		this.state={
            isAuth: false,
           
            currentPage: "Resume",
		}
	}
  render(){
    return(<div>
      <NavBar pages={this.state.pages} currentPage={this.state.currentPage}></NavBar>
       <text>I do things</text>
       
       
      <Footer/>
     </div>);
  }
}
class NotFound extends React.Component{
  render(){
    return(
      <h1>404 Fucking Panic!!!!</h1>
    );
  }
}
class Page extends React.Component{
  constructor(props){
      super(props);
      this.state={
        currentPage:"",
        isAuth:firebase.auth().currentUser?true:false,
        editMode:false,
      }
  }
  changePage(newpage){
    this.setState({
      currentPage: newpage,
      
    });
  }
  render(){
    return(
      <div>
      
      <Router>
      
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/Home" component={Home}/>
          <Route path="/Projects" component={Projects}/>
          <Route path="/Photos" component={Photos}/>
          <Route path="/Resume" component={Resume}/>
          <Route path="/Repos" component={Repos}/>
          <Route path="/About" component={About}/>
          <Route component={NotFound}/>
    
        </div>
      </Router>
      </div>
    );
  }
}


// ========================================
//add apps section
ReactDOM.render(
  <Page/>
 ,

  document.getElementById('root')
);

