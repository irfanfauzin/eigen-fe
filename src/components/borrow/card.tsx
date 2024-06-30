//@ts-nocheck

import React from 'react';

const Card = ({ image, title, author, available_to_borrow, code }) => {
  return (
    <div className=" cursor-pointer hover:bg-white/20  bg-white/5 rounded-md shadow-md border border-white border-opacity-10">
      <img src={image} alt={title} className="w-full rounded-t-lg h-[300px] hover:opacity-70" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 h-[90px]">{title}</h2>
        <p className=" h-[50px] mb-2">By {author}</p>
        <p className="text-gray-500 ">Code: {code}</p>
        <p className="text-gray-500 ">Available: {available_to_borrow}</p>
      </div>
    </div>
  );
};

export default Card;