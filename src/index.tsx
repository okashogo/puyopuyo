import React from "react";
import ReactDOM from "react-dom";
import './index.css';
// import R from './img/R.jpg'
// import G from './img/G.jpg'
const B = require('./img/B.jpg').default;
const R = require('./img/R.jpg').default;
// const G = require('./img/G.jpg').default;
const W = require('./img/W.jpg').default;

// console.log(B);
// import Y from './img/Y.jpg'
// import P from './img/P.jpg'

// const Box : React.FC<{color:string}> = (props) => {
//     return <img src={props.color}/>;
// }

class Box extends React.Component<{color:string}> {
  render() {
    return (
      <img src={this.props.color}/>
    );
  }
}

// class Wall extends React.Component {
//   render() {
//     return (
//       <div className="wall"></div>
//     );
//   }
// }

console.log("start");

const fieldIds : Number[] = [];
for (let i = 1; i <= 13; i++) {
  for (let j = 1; j <= 8; j++) {
     fieldIds.push(i*10 + j);
  }
}

// Fieldを描画
interface IState {
  squares : String[];
  nowpuyo : Number;
}

class Field extends React.Component<{}, IState> {
  constructor(props : string[]) {
    super(props);
    this.state = {
      squares: Array(8*13).fill(B),
      nowpuyo: 10,
    };
    for (let i = 0; i < 12; i++) {
      this.state.squares[0 + i*8] = W
      this.state.squares[7 + i*8] = W
    }
    for (let i = 0; i < 8; i++) {
      this.state.squares[8*12 + i] = W
    }

  }

  // renderSquare(i: Number) {
  //   return (
  //     <Box
  //       color={this.state.squares[i]}
  //     />
  //   );
  // }

  render(){
    const fieldList = this.state.squares.map((output: string, key) => {
      return(
        <div key = {key.toString()} id = {key.toString()} onClick={() => alert("aaa")}><Box color={output}/></div>
      )
    });
    // const fieldList = fieldIds.map((fieldId: Number) => {
    //   // 左右に壁
    //   if(parseInt(fieldId.toString()) % 10 == 1 || parseInt(fieldId.toString()) % 10 == 8){
    //     return(<div key = {fieldId.toString()} id = {fieldId.toString()}><Wall /></div>);
    //   }
    //   // 下に壁
    //   else if(Math.floor(parseInt(fieldId.toString()) / 10) == 13){
    //     return(<div key = {fieldId.toString()} id = {fieldId.toString()}><Wall /></div>);
    //   }
    //   // それ以外は空
    //   else{
    //     return(<div key = {fieldId.toString()} id = {fieldId.toString()}><Box color={B}/></div>);
    //   }
    // });
    return (
      <div className="field">
        {fieldList}
      </div>
    );
  }
}
// const Field : React.FC = () => {
//   const fieldList = fieldIds.map((fieldId: Number) => {
//     // 左右に壁
//     if(parseInt(fieldId.toString()) % 10 == 1 || parseInt(fieldId.toString()) % 10 == 8){
//       return(<div key = {fieldId.toString()} id = {fieldId.toString()}><Wall /></div>);
//     }
//     // 下に壁
//     else if(Math.floor(parseInt(fieldId.toString()) / 10) == 13){
//       return(<div key = {fieldId.toString()} id = {fieldId.toString()}><Wall /></div>);
//     }
//     // それ以外は空
//     else{
//       return(<div key = {fieldId.toString()} id = {fieldId.toString()}></div>);
//     }
//   });
//   return <div className="field">{fieldList}</div>;
// }

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
            <Box color={B} />
            <Box color={R} />
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

window.addEventListener("keydown",keydown);

function keydown(event:any){
  if(event.keyCode==40){alert("下")}
  if(event.keyCode==39){alert("右")}
  if(event.keyCode==37){alert("左")}
}
