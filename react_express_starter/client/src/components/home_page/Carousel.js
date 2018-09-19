import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
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
  export{CarouselArray};
  export{Carousel};
  