import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import '../../index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {NavBar,NavBarItem} from '../common/NavBar';
import {Footer} from '../common/Footer';
class Repos extends React.Component{
    constructor(props){
          super(props);
          this.state={
              isAuth: false,
              githubData:[],
              currentPage: "Repos",
          }
    }
    componentDidMount(){
      fetch('https://api.github.com/users/creamchzdragon/repos?sort=updated&type=all').
      then(res=>res.json()).
      then(githubData=>this.setState({githubData}));
    }
    render(){
      
      return(<div>
        <NavBar pages={this.state.pages} currentPage={this.state.currentPage}></NavBar>
        <h1>My Repos</h1>
         {this.state.githubData.map((repo,i)=>{
           return(
              <RepoCard repoName={repo.name} repoDesc={repo.description} repoComiterURL={repo.contributors_url} repoPicture={repo.owner.avatar_url}
              repoLink={repo.html_url} repoLastUpdated={repo.updated_at} repoCreated={repo.created_at} />
           );
         })}
         
         
        <Footer/>
       </div>);
    }
  }
  class RepoCard extends React.Component{
    constructor(props){
      super(props);
      this.state={
        repoName:this.props.repoName,
        repoPicture:this.props.repoPicture,
        repoDesc:this.props.repoDesc,
        repoLink:this.props.repoLink,
        repoLastUpdated:this.props.repoLastUpdated,
        repoCreated:this.props.repoCreated,
        repoMembers:[]
  
      }
    }
    componentDidMount(){
      fetch(this.props.repoComiterURL).
      then(res=>res.json()).
      then(repoMembers=>this.setState({repoMembers}));
    }
    render()
    {
      var members="";
      for(var i=0;i<3&&i<this.state.repoMembers.length;i++){
        members+=this.state.repoMembers[i].login+" ";
      }
      members+="...";
      var style={
        marginLeft:"50px"
      }
      var picStyle={
        width:"200px",
        height: "auto"
      }
      var cardStyle={
        marginLeft:"200px"
      }
      return(
        <div>
          
        <div class="card">
        <div class="card-body" style={cardStyle}>
          <div className="container"><div className="row">
            <div className="col">
            <div className="container">
              <div className="row">
                <h3 class="card-title">{this.state.repoName}</h3>
                <h6 class="card-title" style={style}>{members}</h6>
              </div>
              {this.state.repoDesc?<p class="card-text">{this.state.repoDesc}</p>:
              <p>There are no word to describe how awesome this project is...</p>}
              <a href={this.state.repoLink} class="btn btn-primary" style={{marginTop:"100px"}}>Check it out!</a>
            </div>
            </div>
            
            <div className="col-sm" width="20%">
            <img class="card-img"  style={picStyle} src={this.state.repoPicture} alt="Owner Profile Pictures"/>
              <p className="card-text">Created: {new Date(this.state.repoCreated).toLocaleDateString()}</p>
              <p className="card-text">Last Updated: {new Date(this.state.repoLastUpdated).toLocaleDateString()}</p>
              </div>
            
            
        </div></div>
        </div>
      </div>
      </div>
      );
    }
  }
  export{Repos};