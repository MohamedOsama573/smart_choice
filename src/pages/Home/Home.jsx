import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAmazonLaptops } from "../../../Redux/Services/Products/getAllProducts";
import HomeCard from "./Home-Components/HomeCard";
import Loading from "../../Components/Loader/Loading";

export const Home = () => {
  const dispatch = useDispatch();
  const { AmazonLaptopsProducts, ProductsLoading, ProductError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAmazonLaptops());
  }, [dispatch]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 pt-14 gap-6 mt-3 bg-gray-100">
      {ProductsLoading ? (
        <div className="flex justify-center items-center my-4">
          <Loading/>
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
          />
        ))
      )}
      {ProductError && <p>{ProductError}</p>}
    </div>
  );
};

