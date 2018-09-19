import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, hashHistory,Link,Switch } from 'react-router-dom';
import './index.css';
import firebase from 'firebase';
import {Button} from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {NavBar,NavBarItem} from './components/common/NavBar';
import {Footer} from './components/common/Footer';
import {CarouselArray,Carousel} from './components/home_page/Carousel';
import {Home} from './components/home_page/Home';
import {Photos} from './components/photos_page/Photos';
import {Repos} from './components/repos_page/Repos';
import {Projects} from './components/projects_page/Projects';
import {Resume} from './components/resume_page/Resume';
import {About} from './components/about_page/About';
import {NotFound} from './components/notfound_page/NotFound';

let configuration=require('./config');

console.log(configuration.config);
var config=configuration.config;
firebase.initializeApp(config);


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
      
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Home" component={Home}/>
          <Route path="/Projects" component={Projects}/>
          <Route path="/Photos" component={Photos}/>
          <Route path="/Resume" component={Resume}/>
          <Route path="/Repos" component={Repos}/>
          <Route path="/About" component={About}/>
          <Route component={NotFound}/>
    
        </Switch>
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

