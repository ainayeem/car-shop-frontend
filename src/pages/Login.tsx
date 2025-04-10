import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading("Logging...");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      // console.log("🚀 ~ onSubmit ~ userInfo:", userInfo);
      const res = await login(userInfo).unwrap();
      // console.log("🚀 ~ onSubmit ~ res:", res);

      const user = verifyToken(res.data) as TUser;
      dispatch(setUser({ user: user, token: res.data }));
      toast.success(res.message, { id: toastId, duration: 3000 });
      navigate("/");
    } catch (err) {
      toast.error("Not found!", { id: toastId });
    }
  };

  const handleDemoLogin = async (role: "admin" | "user") => {
    const credentials =
      role === "admin"
        ? { email: "admin@car-shop.com", password: "1234" }
        : { email: "user@car-shop.com", password: "1234" };

    setValue("email", credentials.email);
    setValue("password", credentials.password);

    await onSubmit(credentials);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Login
          </h1>
          <span className="w-20 h-1 bg-customYellow block mx-auto mt-2"></span>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="input input-bordered w-full p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="input input-bordered w-full p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"
              />

              <div className="text-right mt-1">
                <a
                  href="#"
                  className="text-sm text-customYellow hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-customYellow text-white py-3 rounded-lg text-lg font-semibold hover:bg-customYellowHover transition duration-300"
            >
              Login
            </button>
            {/* Demo Login Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleDemoLogin("user")}
                type="submit"
                className="w-full bg-customYellow text-white py-2 rounded-lg text-lg font-semibold hover:bg-customYellowHover transition duration-300"
              >
                Demo User
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                type="submit"
                className="w-full bg-customYellow text-white py-2 rounded-lg text-lg font-semibold hover:bg-customYellowHover transition duration-300"
              >
                Demo Admin
              </button>
            </div>
            <p>
              Don&apos;t have an account?{" "}
              <Link
                className="text-customYellow hover:text-customYellowHover duration-300 font-medium"
                to="/register"
              >
                Register here.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
