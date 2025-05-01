import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAmazonLaptops } from "../../../Redux/Services/Products/getLaptopsProducts";
import { getPhoneProducts } from "../../../Redux/Services/Products/getPhoneProducts";
import HomeCard from "./Home-Components/HomeCard";
import Loading from "../../Components/Loader/Loading";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export const Home = () => {
  const dispatch = useDispatch();
  const {
    AmazonLaptopsProducts,
    phoneProducts,
    ProductsLoading,
    ProductError,
  } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedSource, setSelectedSource] = useState("amazonLaptops");

  useEffect(() => {
    if (selectedSource === "amazonLaptops") {
      dispatch(getAmazonLaptops({ page, limit }));
    } else if (selectedSource === "phones") {
      dispatch(getPhoneProducts({ page, limit }));
    }
    // Add future APIs here if needed
  }, [dispatch, page, selectedSource]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => page > 1 && setPage((prev) => prev - 1);

  // Choose which products to render
  const productsToRender =
    selectedSource === "amazonLaptops"
      ? AmazonLaptopsProducts
      : selectedSource === "phones"
      ? phoneProducts
      : [];

  return (
    <div className="pt-14 bg-gray-100 min-h-screen">
      <div className="flex justify-center gap-4 flex-wrap mt-4">
        <button
          onClick={() => {
            setSelectedSource("amazonLaptops");
            setPage(1);
          }}
          className="bg-main text-white px-4 py-2 rounded cursor-pointer"
        >
          Laptops
        </button>
        <button
          onClick={() => {
            setSelectedSource("phones");
            setPage(1);
          }}
          className="bg-main text-white px-4 py-2 rounded cursor-pointer"
        >
          Phones
        </button>
        <button
          onClick={() => console.log("Call third API")}
          className="bg-main text-white px-4 py-2 rounded cursor-pointer"
        >
          Third Source
        </button>
        <button
          onClick={() => console.log("Call fourth API")}
          className="bg-main text-white px-4 py-2 rounded cursor-pointer"
        >
          Fourth Source
        </button>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-3">
        {ProductsLoading ? (
          <div className="flex justify-center items-center my-4">
            <Loading />
          </div>
        ) : (
          productsToRender.map((product) => (
            <HomeCard
              key={product._id}
              id={product._id}
              name={product.title}
              image={product.thumbnailImage}
              priceAmazon={product.priceAmazon}
              priceJumia={product.priceJumia}
              currency={product.currency}
              category={product.category}
            />
          ))
        )}
      </div>

      {ProductError && (
        <p className="text-center text-red-500">{ProductError}</p>
      )}

      {/* Pagination */}
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
