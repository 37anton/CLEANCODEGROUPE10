import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="card w-full bg-base-100 shadow-md p-6 flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;