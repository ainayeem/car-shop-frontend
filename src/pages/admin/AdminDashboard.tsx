import { useState } from "react";
import Order from "../../components/order/Order";
import User from "../../components/user/User";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("order");

  return (
    <div className="">
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => setActiveComponent("order")}
          className="bg-customYellow hover:bg-customYellowHover text-white font-bold py-2 px-4 rounded-lg"
        >
          Orders
        </button>
        <button
          onClick={() => setActiveComponent("user")}
          className="bg-customYellow hover:bg-customYellowHover text-white font-bold py-2 px-4 rounded-lg"
        >
          Users
        </button>
      </div>

      {activeComponent === "order" && <Order />}
      {activeComponent === "user" && <User />}
    </div>
  );
};

export default AdminDashboard;
