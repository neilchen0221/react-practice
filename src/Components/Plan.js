import React from "react";

const Plan = prop => {
  const { title, subtitle, discription, style } = prop;
  const listItems = discription.map(x => <li key={x.toString()}>{x}</li>);
  return (
    <div className="plan">
      <div style={style} className="heading">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="disc">{listItems}</div>

      <a href="#">Select Plan</a>
    </div>
  );
};

export default Plan;
