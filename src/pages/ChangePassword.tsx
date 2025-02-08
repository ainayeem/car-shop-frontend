import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging...");
    try {
      const res = await changePassword(data);
      //   console.log("🚀 ~ onSubmit ~ res:", res);

      toast.success(res?.data.message, { id: toastId, duration: 3000 });
      navigate("/login");
    } catch (err) {
      toast.error("Not found!", { id: toastId });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Change Password
          </h1>
          <span className="w-20 h-1 bg-customYellow block mx-auto mt-2"></span>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                {...register("oldPassword", {
                  required: "Password is required",
                })}
                placeholder="Enter your old password"
                className="input input-bordered w-full p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "Password is required",
                })}
                placeholder="Enter your new password"
                className="input input-bordered w-full p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-customYellow text-white py-3 rounded-lg text-lg font-semibold hover:bg-customYellowHover transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
