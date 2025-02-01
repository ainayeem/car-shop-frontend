import { Link } from "react-router-dom";
import { toast } from "sonner";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const user = useAppSelector(selectCurrentUser);
  //   console.log("🚀 ~ ProductCard ~ product:", product);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please log in to add items to the cart.");
      return;
    }
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
    toast.success(`${product.name} added to your cart!`);
  };

  return (
    <div>
      <div className="border border-gray-100 py-8 rounded hover:border-gray-50 hover:shadow-xl transition duration-300 relative">
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
            <Link to={product._id}>
              <button className="bg-slate-200 hover:bg-slate-300 p-2 rounded-full">
                view
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
