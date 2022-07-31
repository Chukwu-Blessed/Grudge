import React from "react";

const Input = ({ label, placeholder, type, text, updateText }) => {
  return (
    <div className="relative mb-4">
      <label htmlFor="email" className="leading-7 text-sm text-gray-600">
        {label}
      </label>
      <input
        type={type}
        value={text}
        autoComplete="off"
        placeholder={placeholder}
        onChange={(e) => updateText(e.target.value)}
        className="w-full rounded bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  );
};

export default Input;
