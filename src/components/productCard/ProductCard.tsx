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
    <div>
      <div className="border border-gray-100 py-8 rounded hover:border-gray-50 hover:shadow-xl transition duration-300 relative">
        <img
          className="h-48 mx-auto rounded"
          src={product.imgUrl}
          alt={product.name}
        />
        <p className={`uppercase mt-6 text-sm font-medium text-center`}>
          {product?.category}
        </p>
        <p className="mt-2 font-semibold text-center text-lg text-customYellow">
          {product.name}
        </p>
        <p className="mt-2 font-semibold text-center text-md">
          Brand: {product.brand}
          <br />
          Model: {product.model}
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
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="tooltip ml-4" data-tip="View Details">
            <Link to={`product/${product._id}`}>
              <button className="bg-slate-200 hover:bg-slate-300 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
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
          {/* delete product */}
          {user?.role === "admin" && (
            <div className="tooltip ml-4" data-tip="Delete Product">
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-slate-200 hover:bg-slate-300 p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-red-500"
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
  );
};

export default ProductCard;
