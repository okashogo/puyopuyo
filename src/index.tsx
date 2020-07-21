import React from "react";
import ReactDOM from "react-dom";
import './index.css';
// import R from './img/R.jpg'
// import G from './img/G.jpg'
const B = require('./img/B.jpg').default;
const R = require('./img/R.jpg').default;

// console.log(B);
// import Y from './img/Y.jpg'
// import P from './img/P.jpg'
const Box : React.FC<{color:string}> = (props) => {
  return <img src={props.color}/>;
}

// const Wall : React.FC = () => {
//   return <div className="wall"></div>
// }

console.log("start");
// const rows : Number[] = [1,2,3,4,5,6,7,8];
const fieldIds : Number[] = [];
for (let i = 1; i <= 12; i++) {
  for (let j = 1; j <= 8; j++) {
     fieldIds.push(i*10 + j);
  }
}

const Field : React.FC = () => {
  // const list = columns.map((i) =>{
  //   rows.map((j) => {
  //     return(<div key = {i.toString() + j.toString()} id = {i.toString() + j.toString()}></div>);
  //   });
  // });
  const fieldList = fieldIds.map((fieldId) => {
      return(<div key = {fieldId.toString()} id = {fieldId.toString()}></div>);
  });
  // const list : Element[] = [];
  // for (let i = 0; i < 8; i++) {
  //     list.push(<div key = {i.toString()} id = {i.toString()}></div>);
  // };
  return <div className="field">{fieldList}</div>;
}

// const Walls : React.FC = () => {
//   const rows = [1,2,3,4,5,6].map((key) =>
//     <div id={key.toString()} className="wall"></div>
//   );
//   return <div>{rows}</div>
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
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <div className="nextField">
//           <div className="nextField1">
//             <h3>next1</h3>
//             <Box color={B} />
//             <Box color={R} />
//           </div>
//           <div className="nextField2">
//             <h3>next2</h3>
//             <Box color={B} />
//             <Box color={R} />
//           </div>
//         </div>
//         <div className="field">
//           <div id = "11">
//             <Wall />
//           </div>
//           <div id = "12">
//             <Box color={R} />
//           </div>
//           <div id = "13">
//             <Box color={B} />
//           </div>
//           <div id = "14">
//             <Box color={R} />
//           </div>
//           <div id = "15">
//             <Box color={B} />
//           </div>
//           <div id = "16">
//             <Box color={R} />
//           </div>
//           <div id = "17">
//             <Box color={B} />
//           </div>
//           <div id = "18">
//             <Wall />
//           </div>
//           <div id = "21">
//           </div>
//           <div id = "22">
//           </div>
//           <div id = "23">
//           </div>
//           <div id = "24">
//           </div>
//           <div id = "25">
//           </div>
//           <div id = "26">
//           </div>
//           <div id = "27">
//           </div>
//           <div id = "28">
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
