import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../components/loader/Loader";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useScrollToTop } from "../utils/scrollToTop";
import { FaShoppingCart, FaTruck, FaCheckCircle, FaTimesCircle, FaStar, FaTag } from "react-icons/fa";

const SingleProduct = () => {
  const user = useAppSelector(selectCurrentUser);
  const { productId } = useParams();
  const { isLoading, data } = useGetSingleProductQuery(productId);
  const dispatch = useAppDispatch();
  const product = data?.data;

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please log in to add items to the cart.");
      return;
    }
    if (product.quantity < 1) {
      toast.warning("Insufficient Stock!");
      return;
    }
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.quantity,
        imgUrl: product.imgUrl as string,
      })
    );
    toast.success(`${product.name} added to your cart!`);
  };

  useScrollToTop();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : product ? (
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Image Section */}
                <div className="relative group">
                  <img
                    src={product?.imgUrl?.replace(/(upload\/)/, "$1w_800/f_webp/")}
                    alt={product.name}
                    className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.inStock && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <FaCheckCircle />
                      In Stock
                    </div>
                  )}
                </div>

                {/* Product Info Section */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="text-gray-600">4.5</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-customYellow">${product.price}</span>
                    <span className="text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">20% OFF</span>
                  </div>

                  <p className="text-gray-600 text-lg mb-8">{product.description}</p>

                  {/* Stock Status */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaTruck className="text-xl text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Stock Information</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Available Quantity:</span>{" "}
                        <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                          {product.quantity} units
                        </span>
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Status:</span>{" "}
                        <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Brand:</span> {product.brand}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Model:</span> {product.model}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Category:</span> {product.category}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Year:</span> {product.year}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">SKU:</span> {product._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      product.inStock
                        ? "bg-customYellow hover:bg-customYellowHover"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FaShoppingCart className="text-xl" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  This {product.brand} {product.model} is a high-quality vehicle that offers exceptional performance and reliability.
                  With its {product.year} model year, it features the latest technology and safety features.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Premium quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Advanced safety features
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Excellent fuel efficiency
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <FaTimesCircle className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
