import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";

const ProductCard = ({ product }) => {
  //   console.log("🚀 ~ ProductCard ~ product:", product);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    console.log("in cart functon");
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        // imageUrl: product.imageUrl as string,
      })
    );
  };

  return (
    <div>
      <div className="border border-gray-100 py-8 rounded hover:border-gray-50 hover:shadow-xl transition duration-300 relative">
        {/* <p className="font-semibold text-xs px-2 py-1 text-lime-700 bg-lime-200 rounded-l-full absolute top-3 right-0">
          % Off
        </p> */}

        <img
          className="h-40 mx-auto"
          src={"/placeholder.svg"}
          alt={product.name}
        />
        <p className={`uppercase mt-6 text-sm font-medium text-center`}>
          {product.category}
        </p>
        <p className="mt-2 font-semibold text-center text-lg text-customYellow">
          {product.name}
        </p>
        <p className="mt-2 font-semibold text-center text-lg">
          {product.brand} {product.model}
        </p>
        <p className="mt-2 font-semibold text-center">$ {product.price}</p>

        <div className="mt-8 flex items-center justify-center">
          {/* <div className="tooltip" data-tip="Add to Wishlist">
            <button className="bg-slate-200 hover:bg-slate-300 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div> */}
          <div className="tooltip ml-4" data-tip="Add to Cart">
            <button
              onClick={() => handleAddToCart()}
              className="bg-slate-200 hover:bg-slate-300 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="tooltip ml-4" data-tip="Quick View">
            <button className="bg-slate-200 hover:bg-slate-300 p-2 rounded-full">
              view
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
