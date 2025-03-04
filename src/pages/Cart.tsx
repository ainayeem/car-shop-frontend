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
import { FaTrash, FaShoppingCart, FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {user ? (
          <>
            {cartData?.items.length > 0 ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <Link
                    to="/shop"
                    className="flex items-center gap-2 text-gray-600 hover:text-customYellow transition-colors"
                  >
                    <FaArrowLeft className="text-sm" />
                   
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-900 text-center">Shopping Cart</h1>
                </div>

                {/* Cart Items */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Table Header */}
                  <div className="hidden md:grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b">
                    <div className="col-span-2">
                      <h3 className="font-semibold text-gray-700">Product</h3>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-700">Price</h3>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-700">Quantity</h3>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-700">Total</h3>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-700">Action</h3>
                    </div>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-gray-100">
                    {cartData?.items?.map((cart_item, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                      >
                        {/* Product Info */}
                        <div className="col-span-2 flex items-center gap-4">
                          <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                            <img
                              className="w-full h-full object-cover rounded-lg"
                              src={cart_item?.imgUrl}
                              alt={cart_item?.name}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{cart_item?.name}</h3>
                            <p className="text-sm text-gray-500">SKU: {cart_item.product.slice(-6)}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="hidden md:block text-center">
                          <span className="font-medium text-gray-900">${cart_item?.price}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="hidden md:flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: cart_item.product,
                                  quantity: Math.max(cart_item.quantity - 1, 1),
                                })
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <FaMinus className="text-sm" />
                          </button>
                          <span className="w-8 text-center font-medium">{cart_item.quantity}</span>
                          <button
                            onClick={() => {
                              if (cart_item.quantity + 1 > cart_item.stock) {
                                toast.warning("Stock limit exceeded!");
                              } else {
                                dispatch(
                                  updateQuantity({
                                    id: cart_item.product,
                                    quantity: Math.min(
                                      cart_item.quantity + 1,
                                      cart_item.stock
                                    ),
                                  })
                                );
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <FaPlus className="text-sm" />
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="hidden md:block text-center">
                          <span className="font-medium text-gray-900">
                            ${(cart_item.quantity * cart_item.price).toFixed(2)}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <div className="hidden md:flex items-center justify-center">
                          <button
                            onClick={() => dispatch(removeFromCart(cart_item.product))}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden space-y-4">
                          {/* Price and Total */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-medium text-gray-900">${cart_item?.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Total:</span>
                              <span className="font-medium text-gray-900">
                                ${(cart_item.quantity * cart_item.price).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Quantity</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: cart_item.product,
                                      quantity: Math.max(cart_item.quantity - 1, 1),
                                    })
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                              >
                                <FaMinus className="text-sm" />
                              </button>
                              <span className="w-8 text-center font-medium">{cart_item.quantity}</span>
                              <button
                                onClick={() => {
                                  if (cart_item.quantity + 1 > cart_item.stock) {
                                    toast.warning("Stock limit exceeded!");
                                  } else {
                                    dispatch(
                                      updateQuantity({
                                        id: cart_item.product,
                                        quantity: Math.min(
                                          cart_item.quantity + 1,
                                          cart_item.stock
                                        ),
                                      })
                                    );
                                  }
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                              >
                                <FaPlus className="text-sm" />
                              </button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="flex justify-end">
                            <button
                              onClick={() => dispatch(removeFromCart(cart_item.product))}
                              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <FaTrash className="text-base" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                  <div className="max-w-md ml-auto">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cartData.totalQuantity} items)</span>
                        <span>${cartData.totalPrice.toFixed(2)}</span>
                      </div>
                     
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-semibold text-gray-900">
                          <span>Total</span>
                          <span>${cartData.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full mt-6 py-3 px-6 bg-customYellow hover:bg-customYellowHover text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart className="text-lg" />
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <img className="w-32 mx-auto mb-6" src={noCarImg} alt="No cars" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-customYellow hover:bg-customYellowHover text-white font-semibold rounded-lg transition-colors"
                >
                  <FaShoppingCart className="text-lg" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
              <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please Log In</h2>
              <p className="text-gray-600 mb-8">
                You need to be logged in to view your cart and make purchases.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-customYellow hover:bg-customYellowHover text-white font-semibold rounded-lg transition-colors"
              >
                Log In to Continue
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
