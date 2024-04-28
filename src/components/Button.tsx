import React from "react";

const Button = ({ name }: { name: string }) => {
  return (
    <a
      href={`https://github.com/HCY71/three-shaders/blob/main/src/pages/shaders/${name}.tsx`}
      rel="noopener noreferrer"
      target="_blank"
      className="border border-white py-3 px-5 rounded-md bg-transparent  bg-opacity-50 duration-200 hover:bg-slate-300/10 z-50 fixed bottom-10 right-10"
    >
      <div className="font-mono">Source ↗</div>
    </a>
  );
};

export default Button;
