import { toast } from "sonner";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../redux/features/order/orderApi";
import { TResponse } from "../../types/global";
import Loader from "../loader/Loader";
import { FaBox, FaUser, FaShoppingCart, FaCreditCard, FaTrash, FaTruck, FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { useState } from "react";

const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [updateOrderStatus] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const { isLoading, data } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data;
  // console.log("🚀 ~ Order ~ orderData:", orderData);

  // Filter orders based on search term
  const filteredOrders = orderData?.filter((order: any) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      order.transaction?.id?.toLowerCase().includes(searchLower)
    );
  });

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
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders by ID, customer name, status, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Showing {filteredOrders?.length || 0} of {orderData?.length || 0} orders
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : filteredOrders?.length === 0 ? (
        <div className="text-center py-20">
          <FaBox className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {searchTerm ? "No Matching Orders Found" : "No Orders Found"}
          </h2>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search terms to find what you're looking for."
              : "There are no orders to display at the moment."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredOrders?.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Order #{order._id.slice(-6)}</h2>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order?.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : order?.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order?.status === "Pending" && <FaBox className="inline-block mr-2" />}
                      {order?.status === "Shipped" && <FaTruck className="inline-block mr-2" />}
                      {order?.status === "Completed" && <FaCheckCircle className="inline-block mr-2" />}
                      {order?.status === "Cancelled" && <FaTimesCircle className="inline-block mr-2" />}
                      {order?.status}
                    </span>
                    <button
                      onClick={() => handleRemoveOrder(order._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Customer Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <FaUser className="text-xl text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span> {order?.user?.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">ID:</span> {order?.user?._id.slice(-6)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Last Updated:</span>{" "}
                        {new Date(order?.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <FaShoppingCart className="text-xl text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                    </div>
                    <div className="space-y-4">
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
                      <div className="space-y-2">
                        <select
                          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        >
                          <option value="" disabled selected>
                            Update Status
                          </option>
                          <option value="Shipped">Mark as Shipped</option>
                          <option value="Completed">Mark as Completed</option>
                          <option value="Cancelled">Cancel Order</option>
                        </select>
                        <input
                          type="date"
                          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleEtaChange(order._id, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCreditCard className="text-xl text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Transaction ID:</span>{" "}
                        {order?.transaction?.id.slice(-6)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Payment Method:</span>{" "}
                        {order?.transaction?.method}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Date:</span>{" "}
                        {order?.transaction?.date_time}
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
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ordered Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order?.products?.map((product: any, i: any) => (
                      <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{product?.product?.name}</h4>
                        <p className="text-gray-600">
                          <span className="font-medium">Quantity:</span> {product?.quantity}
                        </p>
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
  );
};

export default Order;
