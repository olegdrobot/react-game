import React, { Component } from 'react';
import Header from '../page/Header';
import './main.css';
import MyContext from '../components/MyContext';
import sound from '../audio/mel.mp3';



class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sque: Array(9).fill(null),
      count: 0,
      lineColor: '',
      message: "It's player (X) turn!",
      statO: 0,
      statX: 0,
      statD: 0

    }
    this.win = false;
    this.clickHeandler = this.clickHeandler.bind(this);
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    this.boardRef = React.createRef();
    this.reload = this.reload.bind(this);
    this.props.func(this.reload);
    this.audio = new Audio(sound);
    this.sound = true;
    this.computerTurn = this.computerTurn.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.clickHistoryModel = this.clickHistoryModel.bind(this);
    this.rand = this.rand.bind(this);
    this.statistic = [];
    this.clickHistory = this.clickHistory.bind(this);
    this.clickSound = this.clickSound.bind(this);
    this.keypress = this.keypress.bind(this);
  }

  rand(){
    let player;
    let i = 0;
    let ID = setInterval(()=>{
        i++;
        player = (this.state.count %2===0) ? 'Х': 'O';
    let step;
    let flag = true;
    let selector = document.querySelectorAll(".ttt-grid");
    const currentSquares =this.state.sque.slice();
    let rnd;
        do {
           rnd = Math.floor(Math.random() * 9);
           if(selector[rnd].innerText != 'Х' && selector[rnd].innerText != 'O') {
             step = rnd;
              flag = false;
            }
        } while(flag);
          currentSquares[step] = player;
          this.setState({count: this.state.count + 1, sque: currentSquares}, ()=>{
          this.isWinner(player); 
          });
      if(this.win) clearInterval(ID);
      }, 500);
  }

  clickHeandler (e, k) {
    if(this.win === false){
      let data;
      if (k) data =e.getAttribute('data'); 
        else data = e.target.getAttribute('data');

      const currentSquares =this.state.sque.slice();
      if(currentSquares[data] === null) {
          currentSquares[data] = (this.state.count %2===0) ? 'Х': 'O';
          if (this.sound) this.audio.play();
      if(MyContext._currentValue.rival == 'Computer') 
        this.setState({count: this.state.count + 1, sque: currentSquares}, 
            ()=>{ 
              this.isWinner('Х');
              if(!this.win){
                this.computerTurn();  
              }  
          })
      else this.setState({count: this.state.count + 1, sque: currentSquares}, ()=>{
          this.isWinner(currentSquares[data]);
        });
        } else {
           alert('Так нельзя!!!!!')
       } 
    }
  };

  computerTurn(){
    let step;
    let flag = true;
    let selector = document.querySelectorAll(".ttt-grid");
    const currentSquares =this.state.sque.slice();
    let emptySque = currentSquares.filter(s => s != 'O' && s != 'Х');
    
    let priority = 0;
    for(let i = 0; i<currentSquares.length; i++) {
      if(currentSquares[i]!= 'Х' && currentSquares[i]!='O'){
        currentSquares[i] = 'O';
        if(this.checkWin('O', currentSquares)){
          step = i;
          priority = 2;
          break;
        }
        currentSquares[i] = 'Х';
        if(this.checkWin('Х', currentSquares)){
          step = i;
          priority = 1;
        }
        currentSquares[i] = null;
      }
      if (priority === 2) break;
    }
    if (priority === 0) {
      let flag = true;
      let rnd;
      do {
        rnd = Math.floor(Math.random() * 9);
        if(selector[rnd].innerText != 'Х' && selector[rnd].innerText != 'O') {
          step = rnd;
          flag = false;
        }
      } while(flag);
    } 
    currentSquares[step] = 'O';
    this.setState({count: this.state.count + 1, sque: currentSquares}, ()=>{
      if (this.sound) this.audio.play();
      this.isWinner('O'); 
    }); 
  }

  checkWin(player, board){
    let s = player;
    let str = '';
    let flage = true;
      if (board[0] === s && board[1] === s && board[2] === s){
          flage = false;
        }
        if (board[3] === s && board[4] === s && board[5] === s){
          flage = false;
        }
        if (board[6] === s && board[7] === s && board[8] === s){
          flage = false;
        }
        if (board[0] === s && board[3] === s && board[6] === s){
          flage = false;
        }
        if (board[1] === s && board[4] === s && board[7] === s){
          flage = false;
        }
        if (board[2] === s && board[5] === s && board[8] === s){
          flage = false;
        }
        if (board[0] === s && board[4] === s && board[8] === s){
          flage = false;
        }
        if (board[2] === s && board[4] === s && board[6] === s){
          flage = false;
        }
    
      if (flage == true) {
        return false;
      } else {
        return true; 
      }
  }

  isWinner(player) {
    let s = player;
    let str = '';
    let flage = true;   
        if (this.state.sque[0] === s && this.state.sque[1] === s && this.state.sque[2] === s){
          flage = false;
          str = "Player (" + s + ") wins!";
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('h');
          this.boardRef.current.classList.add('h0');
          this.boardRef.current.classList.add('full');
        }
        if (this.state.sque[3] === s && this.state.sque[4] === s && this.state.sque[5] === s){
          flage = false;
          str = "Player (" + s + ") wins!";
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('h');
          this.boardRef.current.classList.add('h1');
          this.boardRef.current.classList.add('full');
        }
        if (this.state.sque[6] === s && this.state.sque[7] === s && this.state.sque[8] === s){
          flage = false;
          str = "Player (" + s + ") wins!"
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('h');
          this.boardRef.current.classList.add('h2');
          this.boardRef.current.classList.add('full');
        }
        if (this.state.sque[0] === s && this.state.sque[3] === s && this.state.sque[6] === s){
          flage = false;
          str = "Player (" + s + ") wins!"
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('v');
          this.boardRef.current.classList.add('v0');
          this.boardRef.current.classList.add('full');
        }
        if (this.state.sque[1] === s && this.state.sque[4] === s && this.state.sque[7] === s){
          flage = false;
          str = "Player (" + s + ") wins!"
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('v');
          this.boardRef.current.classList.add('v1');
          this.boardRef.current.classList.add('full');
        }
        if (this.state.sque[2] === s && this.state.sque[5] === s && this.state.sque[8] === s){
          flage = false;
          str = "Player (" + s + ") wins!"
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('v');
          this.boardRef.current.classList.add('v2');
          this.boardRef.current.classList.add('full');
        }
        if (this.state.sque[0] === s && this.state.sque[4] === s && this.state.sque[8] === s){
          flage = false;
          str = "Player (" + s + ") wins!"
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('d0');
          this.boardRef.current.classList.add('full');
        }
        if (this.state.sque[2] === s && this.state.sque[4] === s && this.state.sque[6] === s){
          flage = false;
          str = "Player (" + s + ") wins!";
          this.boardRef.current.classList.add('board');
          this.boardRef.current.classList.add('d1');
          this.boardRef.current.classList.add('full');
        }
    
      if (flage == true) {
        s = (s === 'O') ? 'Х' : 'O';
        let msg = "It's player (" + s + ") turn!";
        this.setState({message: msg});
        let emptySque = this.state.sque.filter(s => s != 'O' && s != 'Х');
        if(emptySque.length == 0) {
          let msg = "Draw!";
          this.win = true;
          this.setState({message: msg, statD: this.state.statD+1});
          this.statistic.push(this.state.sque);
        }        
      } else {
        this.setState({message: str});
        this.win = true;
        if(player === 'Х') {
          this.setState({statX: this.state.statX+1})
        };
        if(player === 'O'){
         this.setState({statO: this.state.statO+1})
        }
        this.statistic.push(this.state.sque);
        if(this.statistic.length == 11) this.statistic.splice(0,1);
      }
  }

  reload() {
    let arr = Array(9).fill(null);
    this.setState({sque: arr, count: 0, message: "It's player (X) turn!"});
    this.win = false;   
    let arrClass = this.boardRef.current.classList;
    for(let i = arrClass.length; i>0; i--) {
      this.boardRef.current.classList.remove(arrClass[i]);
    }
  }

  clickHistoryModel(e) {
    let onBtn = document.querySelector ('.main_model');
      onBtn.style.display = 'none';
  }

  clickHistory (e) {
    this.reload();
    let btn = document.querySelector('.main_model');
      btn.style.display = 'block';
  }

  clickSound(e) {
    //console.log('hello');
    this.sound = !this.sound;
    let i = document.querySelector('.icon');
  }

   keypress(e){
   
    console.log(e.key);
    let elem = document.querySelectorAll('.ttt-grid');
    console.log(elem);
    for(let i=0; i<elem.length;i++){
        if(e.key == '7' && elem[i].getAttribute('data') == '0') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '8' && elem[i].getAttribute('data') == '1') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '9' && elem[i].getAttribute('data') == '2') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '4' && elem[i].getAttribute('data') == '3') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '5' && elem[i].getAttribute('data') == '4') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '6' && elem[i].getAttribute('data') == '5') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '1' && elem[i].getAttribute('data') == '6') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '2' && elem[i].getAttribute('data') == '7') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
        if(e.key == '3' && elem[i].getAttribute('data') == '8') {
          console.log('Hello');
          this.clickHeandler(elem[i], true);
          break;
        }
    }
   
   // console.log(elem[0].getAttribute('data'));
  }
 
   componentDidMount(){
    document.addEventListener("keydown", this.keypress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keypress, false);
  }


  render(){
    return (
      <section className = "main">
        <div className = "main_model">
          <div className ="cl-btn-2" onClick={this.clickHistoryModel}>
            <div className = "closeBtn">&times;</div>
          </div>
          <div className = "window-static">
            {this.statistic.map((item, key)=>{
              return (<div className ="main_static">
                        <div className = "ttt-grid-static">{item[0]}</div>  
                        <div className = "ttt-grid-static">{item[1]}</div>
                        <div className = "ttt-grid-static">{item[2]}</div>
                        <div className = "ttt-grid-static">{item[3]}</div>
                        <div className = "ttt-grid-static">{item[4]}</div>
                        <div className = "ttt-grid-static">{item[5]}</div>
                        <div className = "ttt-grid-static">{item[6]}</div>
                        <div className = "ttt-grid-static">{item[7]}</div>
                        <div className = "ttt-grid-static">{item[8]}</div>
                      </div>)
            })}
          </div>
        </div>
        <div className = "message-icon">
          <div className = "icon-message">
            <div className = "message">{this.state.message}</div>
            <div className = "icons" onClick={this.clickSound}>{this.sound ? 'NoSound' : 'Sound'}</div>
          </div>
        </div>
        <div className = "tic-tac-toe" ref={this.boardRef}>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="0">{this.state.sque[0]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="1">{this.state.sque[1]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="2">{this.state.sque[2]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="3">{this.state.sque[3]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="4">{this.state.sque[4]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="5">{this.state.sque[5]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="6">{this.state.sque[6]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="7">{this.state.sque[7]}</div>
          <div className = "ttt-grid" onClick={this.clickHeandler} data="8">{this.state.sque[8]}</div>
        </div>
       
        <div className = "current_stat">
          <div className = "current-button-table">
            <div className = "btn_autoplay">
            < div className = "static">
              <button onClick={this.clickHistory}>Party history</button>
            </div>
            <div className = "autoplay" onClick = {this.rand}>Autoplay</div>
          </div>
          <table>
            <thead>
              <tr>
                <th colspan = "2">Statistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Х</td>
                <td><span id = "sX">{this.state.statX}</span></td>
              </tr>
              <tr>
                <td>O</td>
                <td><span id = "sO">{this.state.statO}</span></td>
              </tr>
              <tr>
                <td>Draw</td>
                <td><span id = "sD">{this.state.statD}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </section> 
    )
  }
}


export default Main;