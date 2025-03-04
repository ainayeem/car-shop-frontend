import { FieldValues, useForm } from "react-hook-form";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();

  // Watch the new password field for validation
  const newPassword = watch("newPassword");

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Changing password...");
    try {
      const res = await changePassword(data);
      toast.success(res?.data.message, { id: toastId, duration: 3000 });
      navigate("/login");
    } catch (err) {
      toast.error("Failed to change password!", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-customYellow transition-colors mb-8"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-customYellow/10 flex items-center justify-center">
                  <FaLock className="text-2xl text-customYellow" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Change Password
                  </h1>
                  <p className="text-gray-600">Update your account password</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Old Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    {...register("oldPassword", {
                      required: "Current password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="Enter your current password"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.oldPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-customYellow focus:ring-customYellow/20"
                    } focus:ring-2 focus:outline-none transition-colors`}
                  />
                  {errors.oldPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.oldPassword.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="Enter your new password"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.newPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-customYellow focus:ring-customYellow/20"
                    } focus:ring-2 focus:outline-none transition-colors`}
                  />
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.newPassword.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Retype New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please confirm your new password",
                      validate: (value) =>
                        value === newPassword || "Passwords do not match",
                    })}
                    placeholder="Retype your new password"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-customYellow focus:ring-customYellow/20"
                    } focus:ring-2 focus:outline-none transition-colors`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-customYellow hover:bg-customYellowHover text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FaLock className="text-lg" />
                Update Password
              </button>

              {/* Security Note */}
              <p className="text-sm text-gray-500 text-center">
                Make sure to use a strong password that you haven't used before
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
