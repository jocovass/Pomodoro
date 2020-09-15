import React from "react";

const ControllInput = ({ value, changeHandler, label, name, min, max }) => {
  const percentage = ((value - min) * 100) / (max - min);
  return (
    <>
      <label className="control__label" htmlFor={name}>
        {label}: {value}
      </label>
      <input
        className="control__input"
        onChange={changeHandler}
        style={{
          background: `linear-gradient(
                    to right,
                    var(--accent) 0%,
                    var(--accent) ${percentage}%,
                    var(--text) ${percentage}%,
                    var(--text) 100%
                  )`,
        }}
        id={name}
        name={name}
        type="range"
        value={value}
        max={max}
        min={min}
      />
    </>
  );
};

export default ControllInput;
