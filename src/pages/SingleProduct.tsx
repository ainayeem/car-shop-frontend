import { useParams } from "react-router-dom";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { useAppDispatch } from "../redux/hooks";

const SingleProduct = () => {
  const { productId } = useParams();
  const { isLoading, data } = useGetProductsQuery(undefined);
  const dispatch = useAppDispatch();

  const products = data?.data || [];
  const product = products.find((item) => item._id === productId);
  //   console.log("🚀 ~ SingleProduct ~ product:", product);
  if (!product) {
    return (
      <div className="text-center text-lg font-semibold py-10 text-customYellow">
        Product not found!
      </div>
    );
  }

  const handleAddToCart = () => {
    // console.log("in cart functon");
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.quantity,
        // imageUrl: product.imageUrl as string,
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/800x400?text=Product+Image"
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-600 text-lg">{product.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-gray-800">
              <p className="font-semibold">Brand:</p>
              <p>{product.brand}</p>
            </div>
            <div className="text-gray-800">
              <p className="font-semibold">Model:</p>
              <p>{product.model}</p>
            </div>
            <div className="text-gray-800">
              <p className="font-semibold">Category:</p>
              <p>{product.category}</p>
            </div>
            <div className="text-gray-800">
              <p className="font-semibold">Year:</p>
              <p>{product.year}</p>
            </div>
            <div className="text-gray-800">
              <p className="font-semibold">Stock Status:</p>
              <p
                className={`font-semibold ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <div className="text-gray-800">
              <p className="font-semibold">Quantity Available:</p>
              <p>{product.quantity}</p>
            </div>
            <div className="text-gray-800">
              <p className="font-semibold">Price:</p>
              <p className="text-lg font-bold text-customYellow">
                ${product.price}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => handleAddToCart()}
              className="bg-customYellow hover:bg-customYellowHover text-white font-bold py-2 px-4 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
