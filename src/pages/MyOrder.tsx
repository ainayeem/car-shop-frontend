import Loader from "../components/loader/Loader";
import { useGetMyOrdersQuery } from "../redux/features/order/orderApi";
import { FaBox, FaCheckCircle, FaClock, FaCreditCard, FaTruck, FaUser } from "react-icons/fa";

const statusSteps = [
  { name: "Pending", icon: FaClock },
  { name: "Paid", icon: FaCreditCard },
  { name: "Shipped", icon: FaTruck },
  { name: "Completed", icon: FaCheckCircle },
];

const getStatusIndex = (status: string) => {
  return statusSteps.findIndex(step => step.name === status);
};

const MyOrder = () => {
  const { isLoading, data } = useGetMyOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader />
            </div>
          ) : orderData?.length === 0 ? (
            <div className="text-center py-20">
              <FaBox className="mx-auto text-6xl text-gray-400 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orderData?.map((order, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Order #{order._id.slice(-6)}</h2>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order?.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order?.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : order?.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order?.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Progress Bar */}
                  {order?.status !== "Cancelled" && (
                    <div className="px-6 py-4 bg-gray-50">
                      <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200"></div>
                        
                        {/* Status Steps */}
                        <div className="relative flex justify-between">
                          {statusSteps.map((step, i) => {
                            const isActive = i <= getStatusIndex(order?.status);
                            const Icon = step.icon;
                            return (
                              <div key={i} className="flex flex-col items-center">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                    isActive
                                      ? "bg-customYellow text-white"
                                      : "bg-white border-2 border-gray-200 text-gray-400"
                                  }`}
                                >
                                  <Icon className="text-lg" />
                                </div>
                                <span
                                  className={`text-sm font-medium ${
                                    isActive ? "text-gray-900" : "text-gray-500"
                                  }`}
                                >
                                  {step.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Customer Info */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <FaUser className="text-gray-500" />
                          <h3 className="font-semibold text-gray-900">Customer Information</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">Name:</span> {order?.user?.name}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Order Date:</span>{" "}
                            {new Date(order?.createdAt).toLocaleString()}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Last Updated:</span>{" "}
                            {new Date(order?.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <FaBox className="text-gray-500" />
                          <h3 className="font-semibold text-gray-900">Order Summary</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">Total Price:</span>{" "}
                            <span className="text-lg font-semibold text-gray-900">
                              ${order?.totalPrice?.toFixed(2)}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Delivery Date:</span>{" "}
                            {order?.eta
                              ? new Date(order.eta).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <FaCreditCard className="text-gray-500" />
                          <h3 className="font-semibold text-gray-900">Transaction Details</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">Transaction ID:</span>{" "}
                            {order?.transaction?.id}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Payment Method:</span>{" "}
                            {order?.transaction?.method}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Status:</span>{" "}
                            <span className="text-green-600 font-medium">
                              {order?.transaction?.bank_status}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Products Section */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Ordered Products</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order?.products?.map((product: any, i: any) => (
                          <div
                            key={i}
                            className="bg-gray-50 p-4 rounded-lg flex items-center gap-4"
                          >
                            <div className="w-16 h-16 flex-shrink-0">
                              <img
                                src={product?.product?.imgUrl}
                                alt={product?.product?.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{product?.product?.name}</h4>
                              <p className="text-sm text-gray-600">
                                Quantity: {product?.quantity}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                ${(product?.product?.price * product?.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
