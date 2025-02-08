import Loader from "../components/loader/Loader";
import { useGetMyOrdersQuery } from "../redux/features/order/orderApi";

const statusSteps = ["Pending", "Paid", "Shipped", "Completed"];

const getStatusIndex = (status: string) => {
  return statusSteps.indexOf(status);
};

const MyOrder = () => {
  const { isLoading, data } = useGetMyOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data;

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Orders</h1>

        {isLoading ? (
          <Loader />
        ) : orderData?.length === 0 ? (
          <h1 className="text-center text-2xl font-semibold my-60">
            No Orders Yet
          </h1>
        ) : (
          <div className="space-y-6">
            {orderData?.map((order, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                {/* Status Progress Bar */}
                {order?.status !== "Cancelled" && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Order Status</h3>
                    <div className="flex justify-between items-center mb-2">
                      {statusSteps.map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 mx-1 rounded-full ${
                            i <= getStatusIndex(order?.status)
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-700">
                      {statusSteps.map((step, i) => (
                        <span
                          key={i}
                          className={`text-xs font-medium ${
                            i === getStatusIndex(order?.status)
                              ? "text-green-600 font-bold"
                              : "text-gray-500"
                          }`}
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Text */}
                <p className="text-gray-600 flex items-center">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
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
                </p>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Customer Information
                    </h3>
                    <p className="text-gray-600">User ID: {order?.user?._id}</p>
                    <p className="text-gray-600">
                      User Name: {order?.user?.name}
                    </p>
                    <p className="text-gray-600">
                      Order Date: {new Date(order?.createdAt).toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      Last Updated:{" "}
                      {new Date(order?.updatedAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="justify-self-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Order Summary
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-medium">Total Price:</span> $
                      {order?.totalPrice?.toFixed(2)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Delivery Date: </span>
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

                {/* Products Section */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Products</h3>
                  <ul className="space-y-1 text-gray-600">
                    {order?.products?.map((product: any, i: any) => (
                      <li key={i}>
                        <span className="font-medium">Product ID:</span>{" "}
                        {product?.product?.name},{" "}
                        <span className="font-medium">Quantity:</span>{" "}
                        {product?.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Transaction Details */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Transaction Details
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Transaction ID:</span>{" "}
                    {order?.transaction?.id}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Payment Method:</span>{" "}
                    {order?.transaction?.method}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Transaction Date:</span>{" "}
                    {order?.transaction?.date_time}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Transaction Status:</span>{" "}
                    {order?.transaction?.bank_status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
