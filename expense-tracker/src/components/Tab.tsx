import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
};

function Tab({ children, className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`p-10 bg-blue-300 text-center text-2xl font-bold border border-2 border-black border-opacity-20
         hover:opacity-90 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

export default Tab;
