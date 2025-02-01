import { Link } from "react-router-dom";
import { toast } from "sonner";
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
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    const toastId = toast.loading("Placing order...");
    // console.log("🚀 ~ Cart ~ cartData:", cartData.items);
    try {
      const res = await createOrder({ products: cartData.items });
      console.log("🚀 ~ handlePlaceOrder ~ res:", res);
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
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
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <div>
        {user ? (
          <>
            {cartData?.items.length > 0 ? (
              <>
                <div className="mt-14 border rounded">
                  <div className="grid grid-cols-7 gap-3 uppercase font-semibold text-center border-b p-3">
                    <h3>image</h3>
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
                        className="grid grid-cols-7 gap-3 p-3 items-center"
                      >
                        <div className="p-2 border rounded">
                          <img
                            className="max-h-28 mx-auto"
                            src=""
                            alt={cart_item?.name}
                          />
                        </div>
                        <div className="col-span-2 font-semibold">
                          {cart_item?.name}
                        </div>
                        <div className="font-semibold text-center">
                          ${cart_item?.price}
                        </div>
                        {/* <div className="font-semibold">
                          <div className="flex items-center border w-1/2 mx-auto pl-3 rounded">
                            <p className="flex-grow">{cart_item?.quantity}</p>
                            <div className="flex flex-col items-center justify-center">
                              <button className="pr-2 hover:text-lime-500 duration-300">
                                +
                              </button>
                              <button className="pr-2 hover:text-lime-500 duration-300">
                                -
                              </button>
                            </div>
                          </div>
                        </div> */}
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
                        <div className="font-semibold text-center">
                          ${(cart_item.quantity * cart_item.price).toFixed(2)}
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(cart_item.product))
                            }
                            className="btn text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 mb-28 flex flex-col items-end">
                  <div className="w-1/4 border rounded">
                    <div className="grid grid-cols-2 gap-3 px-4 py-3 font-semibold border-b">
                      <p>Total Quantity</p>
                      <p>{cartData.totalQuantity}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 px-4 py-3 font-semibold">
                      <p>Total Price</p>
                      <p>${cartData.totalPrice}</p>
                    </div>
                  </div>
                  <div className="mt-5 w-1/4">
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
              <div className="p-10">
                <img
                  className="w-16 mx-auto"
                  src="/assets/images/food.png"
                  alt="no foods"
                />
                <p className="text-center mt-2">No product in the cart</p>
              </div>
            )}
          </>
        ) : (
          <h3 className="text-2xl font-medium text-center">
            Please{" "}
            <Link
              className="text-lime-500 hover:text-lime-600 duration-300"
              to="/login"
            >
              login
            </Link>{" "}
            to add product to cart.
          </h3>
        )}
      </div>
    </div>
  );
};

export default Cart;
