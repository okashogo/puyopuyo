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
  nextpuyo : string[];
  lock: Boolean;
  check: boolean[];
  combonum: number;
  combonumTmp: Boolean;
  specialAngel: number;
}

class Field extends React.Component<{}, IState> {
  constructor(props : string[]) {
    super(props);
    this.state = {
      squares: Array(8*13).fill(""),
      nextpuyo: Array(2*2).fill(""),
      nowpuyo: 3+8,
      subpuyo: 3,
      lock: false,
      check: Array(8*13).fill(false),
      combonum: 0,
      combonumTmp: false,
      specialAngel: 0,
    };

    for (let i = 0; i < 12; i++) {
      this.state.squares[0 + i*8] = W
      this.state.squares[7 + i*8] = W
    }
    for (let i = 0; i < 8; i++) {
      this.state.squares[8*12 + i] = W
    }

    for (let i = 0; i < 4; i++) {
      this.state.nextpuyo[i] = this.getRandomPuyo();
    }

    this.state.squares[this.state.nowpuyo] = this.getRandomPuyo();
    this.state.squares[this.state.subpuyo] = this.getRandomPuyo();

  }

  componentDidMount() {
      window.addEventListener('keydown', this.shiftPuyo.bind(this));
      setInterval(() => {
        this.fallDown();
      }, 600);
  }

  getRandomPuyo() {
    var randomNum:Number = Math.floor(Math.random() * 5);
    switch(randomNum){
      case 0:
        return B;
      case 1:
        return R;
      case 2:
        return G;
      case 3:
        return P;
      case 4:
        return Y;
    }
  }

  fallDown(){
      if(this.state.nowpuyo + 8 != this.state.subpuyo){
        if(this.state.squares[this.state.nowpuyo + 8] != ""){
          this.setState({lock: true});
          this.lockFallDown();
          this.nextPuyoChange();
          return;
        }
      }
      if(this.state.subpuyo + 8 != this.state.nowpuyo){
        if(this.state.squares[this.state.subpuyo + 8] != ""){
          this.setState({lock: true});
          this.lockFallDown();
          this.nextPuyoChange();
          return;
        }
      }

      const tmpSquares = this.state.squares;
      const tmpNowPuyo = this.state.nowpuyo;
      const tmpSubPuyo = this.state.subpuyo;
      const tmpNowPuyoColor = this.state.squares[tmpNowPuyo];
      const tmpSubPuyoColor = this.state.squares[tmpSubPuyo];
      this.setState({nowpuyo: this.state.nowpuyo + 8});
      this.setState({subpuyo: this.state.subpuyo + 8});
      tmpSquares[tmpNowPuyo] =  "";
      tmpSquares[tmpSubPuyo] =  "";
      tmpSquares[this.state.nowpuyo] =  tmpNowPuyoColor;
      tmpSquares[this.state.subpuyo] =  tmpSubPuyoColor;
      this.setState({squares: tmpSquares});
  }

  lockFallDown(){
    if (this.state.lock) {
        this.setState({lock: false});
        //宙にあるぷよをすべて落とす
        for (let i = 8*11 - 1; i >= 0; i--) {
          const tmpSquares = this.state.squares;
          const tmpPuyoColor = this.state.squares[i];
          if(this.state.squares[i] != "" && this.state.squares[i + 8] == ""){
            tmpSquares[i] = "";
            tmpSquares[i + 8] = tmpPuyoColor;
            this.setState({squares: tmpSquares});
            this.setState({lock: true});
          }
        }

        // ぷよを消す
        if(!this.state.lock){
          this.setState({check: Array(8*13).fill(false)});
          var vanishFlag!: boolean;
          vanishFlag = false;
          for (let i = 0; i < 8*12; i++) {
            var count:number = 0;
            if(this.state.squares[i] != W && this.state.squares[i] != ""){
              if(this.getConnectedCount(i, this.state.squares[i], count) >= 4){
                vanishFlag = true;
                this.vanishConnect(i, this.state.squares[i]);
                this.setState({lock: false});
                for (let i = 8*11 - 1; i >= 0; i--) {
                  const tmpSquares = this.state.squares;
                  const tmpPuyoColor = this.state.squares[i];
                  if(this.state.squares[i] != "" && this.state.squares[i + 8] == ""){
                    tmpSquares[i] = "";
                    tmpSquares[i + 8] = tmpPuyoColor;
                    this.setState({squares: tmpSquares});
                    this.setState({lock: true});
                  }
                }
              }
            }
          }
          if(vanishFlag){
            this.setState({combonum: this.state.combonum+1});
          }
        }

        if(this.state.squares[3] != ""){
          alert("ゲームオーバー！！");
          var squaresRestart = [];
          squaresRestart = Array(8*13).fill("");
          for (let i = 0; i < 12; i++) {
            squaresRestart[0 + i*8] = W
            squaresRestart[7 + i*8] = W
          }
          for (let i = 0; i < 8; i++) {
            squaresRestart[8*12 + i] = W
          }
          this.setState({squares: squaresRestart});
        }
    }
  }

  getConnectedCount(i: number, puyoColor: string, count: number): number{
    if(this.state.squares[i] != puyoColor){
      return count;
    }
    if(this.state.check[i]){
      return count;
    }

    count++;
    this.state.check[i] = true;

    count = this.getConnectedCount(i - 1, puyoColor, count);
    count = this.getConnectedCount(i - 8, puyoColor, count);
    count = this.getConnectedCount(i + 1, puyoColor, count);
    count = this.getConnectedCount(i + 8, puyoColor, count);

    return count;
  }

  vanishConnect(i: number, puyoColor: string): void{
    if(this.state.squares[i] != puyoColor){
      return;
    }

    const tmpSquares = this.state.squares;
    tmpSquares[i] = "";
    this.setState({squares: tmpSquares});

    this.vanishConnect(i - 1, puyoColor);
    this.vanishConnect(i - 8, puyoColor);
    this.vanishConnect(i + 1, puyoColor);
    this.vanishConnect(i + 8, puyoColor);

  }

  nextPuyoChange(){
    if(!(this.state.lock)){
      if(this.state.combonum != 0){
        if(this.state.combonumTmp){
          this.setState({combonum: 0});
          this.setState({combonumTmp: false});
        }
        else{
          this.setState({combonumTmp: true});
        }
      }
      const tmpSquares = this.state.squares;
      const nextSquares = this.state.nextpuyo;
      this.setState({nowpuyo: 3 + 8});
      this.setState({subpuyo: 3});
      tmpSquares[3] = nextSquares[1];
      tmpSquares[3 + 8] = nextSquares[0];
      nextSquares[0] = nextSquares[2];
      nextSquares[1] = nextSquares[3];
      nextSquares[2] = this.getRandomPuyo();
      nextSquares[3] = this.getRandomPuyo();
      this.setState({squares: tmpSquares});
      this.setState({specialAngel: 0});
    }
  }

  shiftPuyo(e: any) {
    var shiftNum: number = 0;
    var angle: number = 0;
    var diffNowSub : number;
    // aは-1 , sは1
    var angleKey: number = 0;

    if(!(this.state.lock)){
      // a
      if(e.keyCode == 65){
        angleKey = -1;
        diffNowSub = this.state.nowpuyo - this.state.subpuyo;
        if(diffNowSub == 1 || diffNowSub == -1){
          angle = 8 * diffNowSub;
        }
        if(diffNowSub == 8 || diffNowSub == -8){
          angle = -1/8 * diffNowSub;
        }
      }
      // s
      if(e.keyCode == 83){
        angleKey = 1;
        diffNowSub = this.state.nowpuyo - this.state.subpuyo;
        if(diffNowSub == 1 || diffNowSub == -1){
          angle = -8 * diffNowSub;
        }
        if(diffNowSub == 8 || diffNowSub == -8){
          angle = 1/8 * diffNowSub;
        }
      }

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
        if(this.state.nowpuyo + shiftNum != this.state.subpuyo){
          if(this.state.squares[this.state.nowpuyo + shiftNum] != ""){
            return;
          }
        }
        if(this.state.subpuyo + shiftNum != this.state.nowpuyo){
          if(this.state.squares[this.state.subpuyo + shiftNum] != ""){
            return;
          }
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
      if(angle != 0){
        if(this.state.squares[this.state.nowpuyo + angle] != ""){
          if(this.state.squares[this.state.nowpuyo - angle] == ""){
            const tmpSquares = this.state.squares;
            const tmpSubPuyo = this.state.subpuyo;
            const tmpNowPuyo = this.state.nowpuyo;
            const tmpSubPuyoColor = this.state.squares[tmpSubPuyo];
            const tmpNowPuyoColor = this.state.squares[tmpNowPuyo];
            this.setState({nowpuyo: this.state.nowpuyo -  angle});
            this.setState({subpuyo: tmpNowPuyo});

            tmpSquares[tmpSubPuyo] =  "";
            tmpSquares[this.state.subpuyo] =  tmpSubPuyoColor;
            tmpSquares[this.state.nowpuyo] =  tmpNowPuyoColor;
            this.setState({squares: tmpSquares});
          }
          else{
            if(Math.abs(this.state.specialAngel + angleKey) == 0 || Math.abs(this.state.specialAngel + angleKey) == 2){
              //180度回転させる
              this.setState({specialAngel: 0});
              const tmpSquares = this.state.squares;
              const tmpSubPuyo = this.state.subpuyo;
              const tmpSubPuyoColor = this.state.squares[tmpSubPuyo];
              if(this.state.squares[this.state.nowpuyo + this.state.nowpuyo - this.state.subpuyo] == ""){
                this.setState({subpuyo: this.state.nowpuyo + this.state.nowpuyo - this.state.subpuyo });
                tmpSquares[tmpSubPuyo] =  "";
                tmpSquares[this.state.subpuyo] =  tmpSubPuyoColor;
                this.setState({squares: tmpSquares});
              }
            }else{
              // specialAngelをtrueにする。
              this.setState({specialAngel: this.state.specialAngel + angleKey});
            }
          }
            return;
        }
        const tmpSquares = this.state.squares;
        const tmpSubPuyo = this.state.subpuyo;
        const tmpSubPuyoColor = this.state.squares[tmpSubPuyo];
        this.setState({subpuyo: this.state.nowpuyo + angle});
        tmpSquares[tmpSubPuyo] =  "";
        tmpSquares[this.state.subpuyo] =  tmpSubPuyoColor;
        this.setState({squares: tmpSquares});
      }
    }
  }

  render(){
    const fieldList = this.state.squares.map((output: string, key) => {
      return(
        <div key = {key.toString()} id = {key.toString()}><Box color={output}/></div>
      )
    });
    return (
      <div>
        <h1>ぷよぷよ</h1>
        <div style={{display: "flex"}}>
          <div className="nextField">
            <div className="nextField1">
              <h3>next1</h3>
              <Box color={this.state.nextpuyo[1]} />
              <br />
              <Box color={this.state.nextpuyo[0]} />
            </div>
            <div className="nextField2">
              <h3>next2</h3>
              <Box color={this.state.nextpuyo[3]} />
              <br />
              <Box color={this.state.nextpuyo[2]} />
            </div>
          </div>
          <div className="field">
            {fieldList}
          </div>
          {this.state.combonum != 0 &&
            <div>
              <h1>{this.state.combonum}コンボ</h1>
            </div>
          }
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Field />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
