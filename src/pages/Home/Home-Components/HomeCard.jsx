/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function HomeCard({ image, name, price, id, currency }) {
  // Limit name to a maximum of 40 characters (you can adjust this)
  const truncatedName = name.length > 40 ? name.slice(0, 40) + "..." : name;

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4  m-2">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <Link
        to={`/product/${id}`}
        className="text-lg font-semibold mt-2 text-center w-full truncate"
        title={name}
      >
        {truncatedName}
      </Link>
      <p className="text-gray-600 mt-1">
        {price} {currency}
      </p>
      <button className="bg-main w-full cursor-pointer text-white rounded-lg px-4 py-2 mt-4 hover:bg-blue-400 transition duration-200">
        Compare
      </button>
    </div>
  );
}

export default HomeCard;
