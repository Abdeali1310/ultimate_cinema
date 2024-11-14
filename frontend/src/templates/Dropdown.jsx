/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function Dropdown({ title, options,func }) {
    // console.log(options);
  return (
    
    <div className="select ml-9">
      <select onChange={func} defaultValue="0" name="format" id="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => {
          return (<option key={i} value={o}>
            {o.toUpperCase()}
          </option>)
        })}
      </select>
    </div>
  );
}

export default Dropdown;
