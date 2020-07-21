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

ReactDOM.render(
  <div>
    <Box color={B} />
    <Box color={R} />
  </div>,
  document.getElementById("app")
);
