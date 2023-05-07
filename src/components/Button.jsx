import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-emerald-900 rounded-md text-white text-sm font-bold py-2 px-6">
      {children}
    </button>
  );
};

export default Button;
