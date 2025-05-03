import axios from "axios";
import { useEffect, useState } from "react";

export const Compare = () => {
  const data = JSON.parse(sessionStorage.getItem("compareData"));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(data);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("compareData"));
    if (!data?.productIds?.length) return;
  
    const fetchComparison = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BASEURL}api/v1/compare`,
          {
            productIds: data.productIds,
            category: data.category || "laptop",
          },
          {
            headers: {
              Authorization: `abdelrahman ${localStorage.getItem("token")}`,
            },
          }
        );
        setResult(response.data);
      } catch (err) {
        console.error("Comparison error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchComparison();
  }, []);
  

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!result) return <div className="text-center py-10">No comparison data available.</div>;

  const products = result.data || [];
  const aiResponse = result.aiResponse || {};
  const comparisonTable = aiResponse?.comparisonTable || {};
  const rating = aiResponse?.rating || [];
  


  // Helper to get score for a product
  const getScore = (id) => rating.find((r) => r.id === id)?.score || 0;

  const featureKeys = Object.values(comparisonTable)[0]
    ? Object.keys(Object.values(comparisonTable)[0])
    : [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Comparison Results</h1>

      {/* Product Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow p-4 rounded text-center">
            <img
              src={product.thumbnailImage}
              alt={product.title}
              className="h-32 mx-auto object-contain mb-2"
            />
            <h2 className="font-semibold text-sm">{product.title}</h2>
            <p className="text-green-600 mt-2 font-bold">Amazon: {product.priceAmazon} EGP</p>
            <p className="text-orange-500 font-bold">Jumia: {product.priceJumia} EGP</p>
            <p className="text-blue-700 mt-1">Score: {getScore(product.id)}</p>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 border font-bold text-left">Feature</th>
              {products.map((product) => (
                <th key={product.id} className="p-2 border font-bold text-center">
                  {product.brandname}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map((feature) => (
              <tr key={feature} className="hover:bg-gray-50">
                <td className="p-2 border font-medium">{feature}</td>
                {products.map((product) => {
                  const value = product[feature.toLowerCase().replace(/\s+/g, "")] || "-";
                  const highlight = comparisonTable[product.id]?.[feature] === 1;
                  return (
                    <td
                      key={product.id}
                      className={`p-2 border text-center ${highlight ? "bg-green-100 font-semibold" : ""}`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
