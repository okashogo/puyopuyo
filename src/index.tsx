import React from "react";
import ReactDOM from "react-dom";
import './index.css';

const B = require('./img/B.jpg').default;
const R = require('./img/R.jpg').default;
const G = require('./img/G.jpg').default;
const P = require('./img/P.jpg').default;
const Y = require('./img/Y.jpg').default;
const W = require('./img/W.jpg').default;

class Box extends React.Component<{color:string}> {
  render() {
    const emptyJudge = this.props.color;
    var dom:any;
    if(!(emptyJudge)) {
      dom = <div></div>
    }
    else{
      dom = <img src={emptyJudge}/>
    }
    return (
      dom
    );
  }
}

console.log("start");

// Fieldを描画
interface IState {
  squares : string[];
  nowpuyo : number;
  subpuyo : number;
}

class Field extends React.Component<{}, IState> {
  constructor(props : string[]) {
    super(props);
    this.state = {
      squares: Array(8*13).fill(null),
      nowpuyo: 3+8,
      subpuyo: 3,
    };
    for (let i = 0; i < 12; i++) {
      this.state.squares[0 + i*8] = W
      this.state.squares[7 + i*8] = W
    }
    for (let i = 0; i < 8; i++) {
      this.state.squares[8*12 + i] = W
    }

    this.state.squares[this.state.nowpuyo] = G
    this.state.squares[this.state.subpuyo] = R

  }

  componentDidMount() {
    window.addEventListener('keydown', this.shiftPuyo.bind(this));
  }

  shiftPuyo(e: any) {
    var shiftNum: number = 0;
    if(e.keyCode==40){
      shiftNum = 8;
    }
    if (e.keyCode==39) {
      shiftNum = 1;
    }
    if(e.keyCode==37){
      shiftNum = -1;
    }
    if(shiftNum != 0){
      if(this.state.squares[this.state.nowpuyo + shiftNum] == W || this.state.squares[this.state.nowpuyo + shiftNum] == W){
          return;
      }
      const tmpSquares = this.state.squares;
      const tmpNowPuyo = this.state.nowpuyo;
      const tmpSubPuyo = this.state.subpuyo;
      const tmpNowPuyoColor = this.state.squares[tmpNowPuyo];
      const tmpSubPuyoColor = this.state.squares[tmpSubPuyo];
      this.setState({nowpuyo: this.state.nowpuyo + shiftNum});
      this.setState({subpuyo: this.state.subpuyo + shiftNum});
      tmpSquares[tmpNowPuyo] =  "";
      tmpSquares[tmpSubPuyo] =  "";
      tmpSquares[this.state.nowpuyo] =  tmpNowPuyoColor;
      tmpSquares[this.state.subpuyo] =  tmpSubPuyoColor;
      this.setState({squares: tmpSquares});
    }
  }

  render(){
    const fieldList = this.state.squares.map((output: string, key) => {
      return(
        <div key = {key.toString()} id = {key.toString()}><Box color={output}/></div>
      )
    });
    return (
      <div className="field">
        {fieldList}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="nextField">
          <div className="nextField1">
            <h3>next1</h3>
            <Box color={B} />
            <Box color={R} />
          </div>
          <div className="nextField2">
            <h3>next2</h3>
            <Box color={Y} />
            <Box color={P} />
          </div>
        </div>
        <Field />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
