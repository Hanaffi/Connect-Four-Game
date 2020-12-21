/* eslint-disable eqeqeq */
import './App.css';
import React, { Component } from 'react'
import Board from './Components/Board';
var go = false;
export default class App extends Component {
  
  state={
    columns:5,
    rows:5,
    chipPosition:{},
    playerTurn:'Red',
    gameStatus:"Its Red's turn",
    gameOver:false
  }

  gameWon = (id)=>{
    const row = parseInt(id.split(':')[0]);
    const column = parseInt(id.split(':')[1]);
    //check if count above and below >= 4
    let cnt=1;
    for(let r=row-1;r>=0;r--)
    {
      if(this.state.chipPosition[`${r}:${column}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }
    for(let r=row+1;r<this.state.rows;r++)
    {
      if(this.state.chipPosition[`${r}:${column}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }
    if(cnt>=4)
    {
      go=true;
      this.setState({gameStatus:`Game over!   ${this.state.playerTurn} has won!!!` , gameOver:true});
      return;
    } 

    cnt=1;
    for(let c=column-1;c>=0;c--)
    {
      if(this.state.chipPosition[`${row}:${c}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }
    for(let c=column+1;c<this.state.columns;c++)
    {
      if(this.state.chipPosition[`${row}:${c}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }
    if(cnt>=4)
    {
      go=true;
      this.setState({gameStatus:`Game over!   ${this.state.playerTurn} has won!!!` , gameOver:true});
      return;
    }


    cnt=1;
    //upper main diagonal
    for(let k=1; ; k++)
    {
      if(column + k >= this.state.columns ||  row-k<0) break;
      if(this.state.chipPosition[`${row-k}:${column+k}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }
    //lower main diagonal
    for(let k=1; ; k++)
    {
      if(row + k >= this.state.rows || column-k<0) break;
      if(this.state.chipPosition[`${row+k}:${column-k}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }

    if(cnt>=4)
    {
      go=true;
      this.setState({gameStatus:`Game over!   ${this.state.playerTurn} has won!!!` , gameOver:true});
      return;
    } 
    //upper secondary diagonal
    cnt=1
    for(let k=1; ; k++)
    {
      if(row - k <0 || column-k<0) break;
      if(this.state.chipPosition[`${row-k}:${column-k}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }
    //lower secondary diagonal
    for(let k=1; ; k++)
    {
      if(row + k >= this.state.rows || column+k>= this.state.columns) break;
      if(this.state.chipPosition[`${row+k}:${column+k}`] == this.state.playerTurn)
      {
        cnt++;
      }
      else{
        break;
      }
    }

    if(cnt>=4)
    {
      go=true;
      this.setState({gameStatus:`Game over!   ${this.state.playerTurn} has won!!!` , gameOver:true});
      return;
    } 


  }



  handleTileClick=(id)=>{
    if(go) return;
    const column = parseInt(id.split(':')[1]);
    let lastEmptyTile=-1;
    for(let row=this.state.rows-1 ; row>-1;row--){
      const temp = `${row}:${column}`;
      if(!this.state.chipPosition[temp])
      {
        lastEmptyTile=temp;
        break;
      }
    }
      if(lastEmptyTile===-1) return;

      this.gameWon(lastEmptyTile);




      const newChipPosition ={...this.state.chipPosition , [lastEmptyTile]:this.state.playerTurn }
      let newPlayer,newMessage;
      if(this.state.playerTurn=="Red")
      {
        newPlayer="Yellow";
        newMessage="Its Yellow's turn"; 
      }
      else
      {
          newPlayer="Red";
          newMessage="Its Red's turn";
      }
      if(this.state.gameOver ||  go) {
        this.setState({chipPosition:newChipPosition , playerTurn:newPlayer});

        return;}

      this.setState({chipPosition:newChipPosition , playerTurn:newPlayer , gameStatus:newMessage});
}


  renderStatusMessage() {
    const { gameStatus } = this.state;
    return <div className="statusMessage">{gameStatus}</div>;
  }

  handleReset=(e)=>{
    e.preventDefault();
    go=false;
    this.setState({chipPosition:{},
      playerTurn:'Red',
      gameStatus:"Its Red's turn",
      gameOver:false});
  }
  render() {
   
    return (
      <div className="app">
            <Board className="board" columns={this.state.columns} rows={this.state.rows} 
            chipPosition={this.state.chipPosition} onTileClick={this.handleTileClick} />
            
            {this.renderStatusMessage()}


            <button onClick={this.handleReset} style={{
            width:"200px",
            height:"30px",
            display:"inline-block",
             padding:"0.35em 1.2em",
             border:"0.1em solid #FFFFFF",
             margin:"25px 0.3em 0.3em 0",
             borderRadius:"1.12em",
             boxSizing: "border-box",
            cursor:"pointer",
            backgroundColor:"red",
            textDecoration:"none",
            fontFamily:"'Roboto',sans-serif",
            fontWeight:"300",
            color:"#FFFFFF",
            textAlign:"center",
            transition: "all 0.2s",
            }}>Click to restart the game</button>
      </div>
    )
  }
}

