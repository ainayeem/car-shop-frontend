import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { TResponse } from "../../types/global";

const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const [createProduct] = useCreateProductMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log("🚀 ~ onSubmit ~ data:", data.imgUrl[0]);
    const file = data.imgUrl[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "CarShop");
    formData.append("cloud_name", "dm1dblouo");

    const clImg = await fetch(
      "https://api.cloudinary.com/v1_1/dm1dblouo/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadImageUrl = await clImg.json();
    // console.log("🚀 ~ onSubmit ~ uploadImageUrl:", uploadImageUrl.secure_url);

    const toastId = toast.loading("Creating...");
    const productInfo = {
      ...data,
      year: Number(data.year),
      price: Number(data.price),
      quantity: Number(data.quantity),
      inStock: Boolean(data.inStock),
      imgUrl: uploadImageUrl.secure_url,
    };
    try {
      const res = (await createProduct(productInfo)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Not found!", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Product
        </h1>
        <span className="w-16 h-1 bg-customYellow block mx-auto mb-6"></span>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter product name"
                className="input input-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
              />
            </div>

            {/* Brand */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                {...register("brand", { required: "Brand is required" })}
                placeholder="Enter brand name"
                className="input input-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
              />
            </div>

            {/* Model */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                {...register("model", { required: "Model is required" })}
                placeholder="Enter model name"
                className="input input-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
              />
            </div>

            {/* Year */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                type="text"
                {...register("year", { required: "Year is required" })}
                placeholder="Enter year"
                className="input input-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="text"
                {...register("price", { required: "Price is required" })}
                placeholder="Enter price"
                className="input input-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="select select-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter product description"
                className="textarea textarea-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
                rows={4}
              ></textarea>
            </div>

            {/* Quantity */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="text"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: 1,
                })}
                placeholder="Enter quantity"
                className="input input-bordered w-full p-3 rounded-lg focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300"
              />
            </div>
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                {...register("imgUrl", {
                  required: "Image is required",
                })}
                className="file-input file-input-bordered file-input-warning w-full"
              />
            </div>

            {/* In Stock */}
            <div className="form-control">
              <label className="label font-medium text-gray-700 mb-2">
                In Stock
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="true"
                    {...register("inStock", {
                      required: "Stock status is required",
                    })}
                    className="radio checked:bg-green-600"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="false"
                    {...register("inStock", {
                      required: "Stock status is required",
                    })}
                    className="radio checked:bg-red-600"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-customYellow text-white py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300 focus:ring-2 focus:ring-customYellow focus:ring-offset-2"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
