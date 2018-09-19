import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {Carousel} from '../home_page/Carousel';
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
export{Album,AlbumCover,AddAlbum};
