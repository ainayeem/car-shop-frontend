import { toast } from "sonner";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../redux/features/order/orderApi";
import { TResponse } from "../../types/global";
import Loader from "../loader/Loader";

const Order = () => {
  const [updateOrderStatus] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const { isLoading, data } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data;
  // console.log("🚀 ~ Order ~ orderData:", orderData);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    // console.log("🚀 ~ handleStatusChange ~ newStatus:", newStatus);
    // console.log("🚀 ~ handleStatusChange ~ orderId:", orderId);
    const updateData = {
      id: orderId,
      data: {
        status: newStatus,
      },
    };
    const res = (await updateOrderStatus(updateData)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  const handleEtaChange = async (orderId: string, etaDate: string) => {
    console.log("🚀 ~ handleEtaChange ~ etaDate:", etaDate);
    console.log("🚀 ~ handleEtaChange ~ orderId:", orderId);
    const updateData = {
      id: orderId,
      data: {
        eta: etaDate,
      },
    };
    const res = (await updateOrderStatus(updateData)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  const handleRemoveOrder = async (orderId: string) => {
    // console.log("🚀 ~ handleRemoveOrder ~ orderId:", orderId);
    const res = (await deleteOrder(orderId)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Orders</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          {orderData?.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
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
                    Last Updated: {new Date(order?.updatedAt).toLocaleString()}
                  </p>
                </div>

                {/* Order Summary */}
                <div className="justify-self-center">
                  <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
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
                  {/*  */}
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

                  {/* Dropdown for status selection */}

                  <select
                    className="border p-2 rounded mt-2 select select-bordered w-full"
                    onChange={(e) =>
                      handleStatusUpdate(order._id, e.target.value)
                    }
                  >
                    <option value="" disabled selected>
                      Change Status
                    </option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {/* ETA Date Picker */}
                  <p className="text-gray-600 flex items-center">
                    <span className="font-medium">Arrival Time:</span>
                  </p>
                  <input
                    type="date"
                    className="input input-bordered w-full mt-2 rounded"
                    // value={eta[order._id] || ""}
                    onChange={(e) => handleEtaChange(order._id, e.target.value)}
                  />
                </div>
                <div className="flex justify-self-center">
                  <button
                    onClick={() => handleRemoveOrder(order._id)}
                    className="btn text-red-500"
                  >
                    Remove Order
                  </button>
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
  );
};

export default Order;
