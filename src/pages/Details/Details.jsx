import { Button } from "flowbite-react";
import phone1 from "../../assets/test.jpg";
import phone2 from "../../assets/test2.jpg";
import amazonLogo from "../../assets/amazon.png";
import noonLogo from "../../assets/noon.png";
import jumiaLogo from "../../assets/jumia.png";
import { useState } from "react";

export default function Details() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const images = [phone1, phone2];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen ">
      {/* المحتوى الرئيسي */}
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* قسم الصورة - مع ارتفاع ثابت */}
        <div className="relative flex-1 flex justify-center items-center h-96 md:h-[500px]">
          <Button
            onClick={handlePrevImage}
            className="absolute left-0 bg-gray-200 text-gray-700 hover:bg-gray-300"
            aria-label="Previous image"
          >
            &lt;
          </Button>
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt="Phone"
              className="w-3/4 md:w-1/2 rounded-lg shadow-md object-contain"
              loading="lazy"
              onError={(e) => (e.target.src = "../../assets/fallback-image.png")}
            />
          ) : (
            <p>No images available</p>
          )}
          <Button
            onClick={handleNextImage}
            className="absolute right-0 bg-gray-200 text-gray-700 hover:bg-gray-300"
            aria-label="Next image"
          >
            &gt;
          </Button>
        </div>

        {/* قسم التفاصيل */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Huawei Nova 12 Pro - 12GB RAM - 512GB - Green
          </h1>
          <ul className="text-gray-700 dark:text-gray-400 space-y-2 mb-4">
            <li>
              <strong>SIM Card:</strong> Nano-SIM + Nano-SIM
            </li>
            <li>
              <strong>Screen:</strong> 6.76 inches, 1224 x 2776 pixels
            </li>
            <li>
              <strong>RAM:</strong> 12GB
            </li>
            <li>
              <strong>Internal Memory:</strong> 512GB
            </li>
            <li>
              <strong>Rear Camera:</strong> Triple, 50 MP + 12 MP + 8 MP
            </li>
            <li>
              <strong>Selfie Camera:</strong> Dual, 60 MP + 8 MP
            </li>
            <li>
              <strong>Color:</strong> Green
            </li>

            {showMore && (
              <>
                <li>
                  <strong>Operating System:</strong> Android 14
                </li>
                <li>
                  <strong>Resolution:</strong> 1640 x 720
                </li>
                <li>
                  <strong>Refresh Rate:</strong> 90 Hz
                </li>
              </>
            )}

            <li>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-cyan-500 hover:underline focus:outline-none"
              >
                {showMore ? "Show Less ↑" : "See More ↓"}
              </button>
            </li>
          </ul>

          {/* زر المقارنة */}
          <Button
            onClick={() => console.log("Compare clicked")}
            className="mb-4 px-2rounded-0 bg-cyan-600 text-white hover:bg-gray-300"
          >
            Compare
          </Button>

          {/* أسعار المتاجر */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img src={amazonLogo} alt="Amazon" className="h-10 w-25 " />
                <span className="text-lg font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EGP",
                  }).format(16500)}
                </span>
              </div>
              <Button color="success" as="a" href="https://amazon.com/product-link">
                Go to shop
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img src={noonLogo} alt="Noon" className="h-8 w-25" />
                <span className="text-lg font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EGP",
                  }).format(17500)}
                </span>
              </div>
              <Button color="success" as="a" href="https://noon.com/product-link">
                Go to shop
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img src={jumiaLogo} alt="Jumia" className="h-6 w-25" />
                <span className="text-lg font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EGP",
                  }).format(17000)}
                </span>
              </div>
              <Button color="success" as="a" href="https://jumia.com/product-link">
                Go to shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}