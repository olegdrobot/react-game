import React, { Component } from "react";
import Header from '../page/Header';
import Main from '../page/Main';
import Footer from '../page/Footer';
import MyContext from './MyContext';
import '../styles/App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {reloadApp: function(){}}; 
    this.newGame = this.newGame.bind(this);
  }

  newGame(evt) {
    console.log('Parent ', evt);
    this.setState({reloadApp: evt});
  }

  render() {
    return (
    	   <MyContext.Provider >
        	<div className="App">
          		<Header change = {this.state.reloadApp}/>
          		<Main func = {this.newGame}/>
          		<Footer/>
        	</div>
         </MyContext.Provider > 
    );
  	}
}

export default App;
