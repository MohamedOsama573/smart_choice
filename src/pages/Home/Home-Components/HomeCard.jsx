/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Toast for success and error

function HomeCard({ image, name, price, id, currency , category }) {
  const truncatedName = name.length > 40 ? name.slice(0, 40) + "..." : name;

  const addToWishList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add to wishlist!");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}api/v1/wishlist`,
        {
          productId: id,
          modelType: category, 
        },
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
        }
      );

      toast.success("Added to wishlist!");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4 m-2">
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
      <div className="flex gap-2 justify-between items-center w-full">
        <button className="bg-main w-full cursor-pointer text-white rounded-lg px-4 py-2 mt-4 hover:bg-blue-400 transition duration-200">
          Compare
        </button>

        {/* ✅ Make Like clickable */}
        <button
          onClick={addToWishList}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <SlLike size={20} />
        </button>
      </div>
    </div>
  );
}

export default HomeCard;
