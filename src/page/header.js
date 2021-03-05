import React, { Component } from 'react';
import Main from '../page/Main';
import './header.css';
import soundfile from '../audio/fonmusic.mp3';
import MyContext from '../components/MyContext';

class Header extends React.Component {
    constructor(props) {
    super(props);
    this.audio = new Audio(soundfile);
    this.state = {
        isSound: false,
        choosePlayers: false,
    }
    this.play_sound = this.play_sound.bind(this);
    this.onReset = this.onReset.bind(this);
    this.playHumans = this.playHumans.bind(this);
    this.playComputer = this.playComputer.bind(this);
  }

    play_sound() {
        this.setState({isSound: !this.state.isSound}, ()=>{
            if(this.state.isSound) this.audio.play()
            else {
                this.audio.pause();
                this.audio.currentTime = 0;   
            }
        });
    }

    playHumans(){
        if(MyContext._currentValue.rival == 'Computer'){
            this.props.change();
            MyContext._currentValue.rival = 'Hunan';
         }
         let btn_player = document.querySelector('.btn_player');
                btn_player.style.background = '#000';  
                btn_player.style.color = '#fff';
         let btn_computer = document.querySelector('.btn_computer');
            btn_computer.style.background = ' #A68700';  
            btn_computer.style.color = '#000';   
    }

    playComputer(){
        if(MyContext._currentValue.rival == 'Hunan'){
            this.props.change();
            MyContext._currentValue.rival = 'Computer';   
        }
        let btn_computer = document.querySelector('.btn_computer');
            btn_computer.style.background = '#000';  
            btn_computer.style.color = '#fff';
        let btn_player = document.querySelector('.btn_player');
                btn_player.style.background = '#A68700';  
                btn_player.style.color = '#000';  
    }

    onReset(){
        this.setState({choosePlayers: false});
        this.props.change();
    } 
  
	render(){
		return(
			<div className = "header">
                <div className="sound">
                    <button className = "sound-btn" onClick={this.play_sound}>{this.state.isSound ? 'Stop' : 'Play'}</button>
                </div>
                <div className = "text">Tic Tac Toe</div>
                <div className="buttons">
        			<button className="btn_player"  onClick={this.playHumans}>2 players</button>
        			<button className="btn_computer" onClick={this.playComputer}>computer</button>
        		</div>
        		<div className="btn_start">
          			<button className="btn" onClick={this.onReset}>Start game</button>
        		</div>
			</div>
		);
	}
}

export default Header;