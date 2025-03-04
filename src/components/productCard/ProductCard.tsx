import { Link } from "react-router-dom";
import { toast } from "sonner";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDeleteProductMutation } from "../../redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TResponse } from "../../types/global";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  imgUrl: string;
  category: string;
  brand: string;
  model: string;
}
export interface IUser {
  email?: string;
  exp?: number;
  iat?: number;
  role?: string;
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const user: IUser | null = useAppSelector(selectCurrentUser);
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please log in to add items to the cart.");
      return;
    }
    if (product.quantity < 1) {
      toast.warning("Insufficient Stock!");
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
        imgUrl: product.imgUrl as string,
      })
    );
    toast.success(`${product.name} added to your cart!`);
  };

  const handleDeleteProduct = async (productId: string) => {
    const res = (await deleteProduct(productId)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  return (
    <div className="group">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 relative">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            src={product.imgUrl?.replace(/(upload\/)/, "$1w_500/f_webp/")}
            alt={product.name}
          />
          {product.quantity < 1 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-customYellow/10 rounded-full mb-3">
            <p className="text-xs font-medium text-customYellow uppercase tracking-wider">
              {product?.category}
            </p>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Brand and Model */}
          <div className="space-y-1 mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Brand:</span> {product.brand}
            </p>
            {/* <p className="text-sm text-gray-600">
              <span className="font-medium">Model:</span> {product.model}
            </p> */}
          </div>

          {/* Price */}
          <p className="text-xl font-bold text-customYellow mb-4">
            ${product.price.toLocaleString()}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="tooltip tooltip-right" data-tip="Add to Cart">
              <button
                onClick={() => handleAddToCart()}
                disabled={product.quantity < 1}
                className={`p-2 rounded-lg transition-colors ${
                  product.quantity < 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-customYellow/10 text-customYellow hover:bg-customYellow/20"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
            </div>

            <div className="tooltip tooltip-left" data-tip="View Details">
              <Link to={`product/${product._id}`}>
                <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Delete Button (Admin Only) */}
            {user?.role === "admin" && (
              <div className="tooltip tooltip-top" data-tip="Delete Product">
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
