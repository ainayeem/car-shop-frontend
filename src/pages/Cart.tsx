import { Link } from "react-router-dom";
import { toast } from "sonner";
import noCarImg from "../assets/images/no-car.png";
// import noCar from "../../assets/images/no-car.png";
// import noCar from "../../assets/images/no-car.png";

import { selectCurrentUser } from "../redux/features/auth/authSlice";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Cart = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const cartData = useAppSelector((state) => state.cart);
  const [createOrder] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    const toastId = toast.loading("Placing order...");
    try {
      const res = await createOrder({ products: cartData.items });
      if (res.error) {
        toast.error("An error occurred", { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        dispatch(clearCart());
        if (res?.data?.data) {
          setTimeout(() => {
            window.location.href = res.data.data;
          }, 1000);
        }
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user ? (
        <>
          {cartData?.items.length > 0 ? (
            <>
              {/* Cart Items Table */}
              <div className="mt-14 border rounded overflow-x-auto">
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-3 uppercase font-semibold text-center border-b p-3">
                  <h3 className="hidden sm:block">Image</h3>
                  <h3 className="col-span-2 text-start">Product Name</h3>
                  <h3>Price</h3>
                  <h3>Quantity</h3>
                  <h3>Total</h3>
                  <h3>Action</h3>
                </div>
                <div>
                  {cartData?.items?.map((cart_item, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 sm:grid-cols-7 gap-3 p-3 items-center text-sm sm:text-base"
                    >
                      {/* Product Image */}
                      <div className="hidden sm:block p-2 border rounded">
                        <img
                          className="max-h-28 mx-auto"
                          src={cart_item?.imgUrl}
                          alt={cart_item?.name}
                        />
                      </div>
                      {/* Product Name */}
                      <div className="col-span-2 font-semibold">
                        {cart_item?.name}
                      </div>
                      {/* Price */}
                      <div className="font-semibold text-center">
                        ${cart_item?.price}
                      </div>
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: cart_item.product,
                                quantity: Math.max(cart_item.quantity - 1, 1),
                              })
                            )
                          }
                          className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">
                          {cart_item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: cart_item.product,
                                quantity: Math.min(
                                  cart_item.quantity + 1,
                                  cart_item.stock
                                ),
                              })
                            )
                          }
                          className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      {/* Total Price */}
                      <div className="font-semibold text-center">
                        ${(cart_item.quantity * cart_item.price).toFixed(2)}
                      </div>
                      {/* Remove Button */}
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            dispatch(removeFromCart(cart_item.product))
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-5 mb-28 flex flex-col items-end">
                <div className="w-full sm:w-1/2 lg:w-1/4 border rounded">
                  <div className="grid grid-cols-2 gap-3 px-4 py-3 font-semibold border-b">
                    <p>Total Quantity</p>
                    <p>{cartData.totalQuantity}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 px-4 py-3 font-semibold">
                    <p>Total Price</p>
                    <p>${cartData.totalPrice}</p>
                  </div>
                </div>
                <div className="mt-5 w-full sm:w-1/2 lg:w-1/4">
                  <button
                    onClick={handlePlaceOrder}
                    className="btn bg-customYellow hover:bg-customYellowHover w-full uppercase text-white tracking-wide"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-10 my-52">
              <img className="w-20 mx-auto" src={noCarImg} alt="No cars" />
              <p className="text-center mt-2">No car in the cart</p>
            </div>
          )}
        </>
      ) : (
        <h3 className="text-2xl font-medium text-center my-72">
          Please{" "}
          <Link
            className="text-customYellow hover:text-customYellowHover duration-300"
            to="/login"
          >
            login
          </Link>{" "}
          to add product to cart.
        </h3>
      )}
    </div>
  );
};

export default Cart;
