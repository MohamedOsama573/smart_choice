/* eslint-disable react/prop-types */
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Toast for success and error
import amazonLogo from "../../../assets/amazon.png";
import jumiaLogo from "../../../assets/jumia.png";
import noonLogo from "../../../assets/noon.png";
function HomeCard({
  image,
  name,
  priceJumia,
  priceAmazon,
  priceNoon,
  id,
  currency,
  category,
  onSelect,
  selected,
}) {
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
      toast.success(response.data.message || "Added to wishlist!");
      // console.log(response.data);
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md py-6 px-4 m-2">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <Link
        to={`/${category}/product/${id}`}
        className="text-lg font-semibold mt-2 text-center w-full truncate"
        title={name}
      >
        {truncatedName}
      </Link>
      <div className="flex justify-between items-center gap-2">
        <img src={amazonLogo} className="w-16" />
        <p className="text-gray-600">
          {priceAmazon} {currency}
        </p>
      </div>
      <div className="flex justify-between items-center gap-2">
      <img src={jumiaLogo} className="w-16" />
        <p className="text-gray-600 mt-1">
           {priceJumia} {currency}
        </p>
      </div>
    <div className="flex justify-between items-center gap-2">
    <img src={noonLogo} className="w-16 " />

    <p className="text-gray-600 mt-1">
        {priceNoon} {currency}
      </p>
    </div>
      <div className="flex gap-2 justify-between items-center w-full">
        <label className="bg-[#333] mt-2 py-2 px-6 cursor-pointer rounded  text-white font-bold text-lg">
          <input
            type="checkbox"
            checked={selected}
            className="cursor-pointer rounded-xl p-4"
            onChange={() => onSelect(id)}
          />{" "}
          Compare
        </label>

        {/* ✅ Make Like clickable */}
        <button
          onClick={addToWishList}
          className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          <FaRegHeart size={20} cursor="pointer" />
        </button>
      </div>
    </div>
  );
}

export default HomeCard;
