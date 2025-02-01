import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const toastId = toast.loading("Logging...");
    // try {
    // const userInfo = {
    //   email: data.email,
    //   password: data.password,
    // };
    // console.log("🚀 ~ onSubmit ~ userInfo:", userInfo);
    // const res = await login(userInfo).unwrap();
    // console.log("🚀 ~ onSubmit ~ res:", res);
    // toast.success(res.message, { id: toastId, duration: 3000 });
    // navigate("/");
    // } catch (err) {
    // toast.error("Not found!", { id: toastId });
    // }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Register
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
            </div>
            <button
              type="submit"
              className="w-full bg-customYellow text-white py-3 rounded-lg text-lg font-semibold hover:bg-customYellowHover transition duration-300"
            >
              Register
            </button>
            <p>
              Already have an account?
              <Link
                className="text-customYellow hover:text-customYellowHover duration-300 font-medium"
                to="/login"
              >
                Login here.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
