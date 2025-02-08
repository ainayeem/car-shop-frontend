import { toast } from "sonner";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { TResponse } from "../../types/global";
import Loader from "../loader/Loader";

const User = () => {
  const [updateUserStatus] = useUpdateUserMutation();

  const { isLoading, data } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const userData = data?.data;

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    const updateData = {
      id: userId,
      data: {
        status: newStatus,
      },
    };
    const res = (await updateUserStatus(updateData)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-6 mx-auto">
          <h1 className="text-2xl font-bold mb-4">Users</h1>
          <div className="bg-white rounded-lg overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left hidden sm:table-cell">
                    Email
                  </th>
                  <th className="border p-3 text-left hidden sm:table-cell">
                    Phone
                  </th>
                  <th className="border p-3 text-left hidden sm:table-cell">
                    Address
                  </th>
                  <th className="border p-3 text-left">Role</th>
                  <th className="border p-3 text-left">Status</th>
                  <th className="border p-3 text-left">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {userData?.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="border p-3 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="border p-3 whitespace-nowrap hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="border p-3 whitespace-nowrap hidden sm:table-cell">
                      {user.phone}
                    </td>
                    <td className="border p-3 whitespace-nowrap hidden sm:table-cell">
                      {user.address}
                    </td>
                    <td className="border p-3 capitalize whitespace-nowrap">
                      {user.role}
                    </td>
                    <td
                      className={`border p-3 font-semibold capitalize whitespace-nowrap ${
                        user.status === "active"
                          ? " text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="border p-3 whitespace-nowrap">
                      {/* change status */}
                      <select
                        className="border p-2 rounded mt-2 select select-bordered w-full"
                        onChange={(e) =>
                          handleStatusUpdate(user._id, e.target.value)
                        }
                      >
                        <option value="" disabled selected>
                          Change Status
                        </option>
                        <option value="active">Activate</option>
                        <option value="block">Deactivate</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
