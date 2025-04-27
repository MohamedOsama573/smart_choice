import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAmazonLaptops } from "../../../Redux/Services/Products/getAllProducts";
import HomeCard from "./Home-Components/HomeCard";
import Loading from "../../Components/Loader/Loading";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
export const Home = () => {
  const dispatch = useDispatch();
  const { AmazonLaptopsProducts, ProductsLoading, ProductError } = useSelector(
    (state) => state.products
  );

  const [page, setPage] = useState(1); // 👈 Add page state
  const limit = 10; // You can change limit if you want

  useEffect(() => {
    dispatch(getAmazonLaptops({ page, limit }));
  }, [dispatch, page]); // 👈 Depend on page to re-fetch when page changes

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="pt-14 bg-gray-100 min-h-screen">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-3">
        {ProductsLoading ? (
          <div className="flex justify-center items-center my-4">
            <Loading />
          </div>
        ) : (
          AmazonLaptopsProducts.map((product) => (
            <HomeCard
              key={product._id}
              id={product._id}
              name={product.title}
              image={product.thumbnailImage}
              price={product.priceAmazon}
              currency={product.currency}
              category={product.category}
            />
          ))
        )}
      </div>

      {ProductError && <p className="text-center text-red-500">{ProductError}</p>}

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 my-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          <GrFormPrevious />
        </button>
        <span className="flex items-center">{`Page ${page}`}</span>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};
