import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { TResponse } from "../../types/global";
import { useState } from "react";
import { FaCar, FaTag, FaCalendarAlt, FaDollarSign, FaBox, FaImage, FaCheck, FaTimes } from "react-icons/fa";

const CreateProduct = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [createProduct] = useCreateProductMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FieldValues) => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Car Dealership"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Create New Product
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
              Fill in the details to add a new vehicle to your inventory
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaCar className="text-customYellow" /> Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter product name"
                  className={`input input-bordered w-full ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.name.message as string}</span>
                  </label>
                )}
              </div>

              {/* Brand */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaTag className="text-customYellow" /> Brand
                  </span>
                </label>
                <input
                  type="text"
                  {...register("brand", { required: "Brand is required" })}
                  placeholder="Enter brand name"
                  className={`input input-bordered w-full ${errors.brand ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                />
                {errors.brand && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.brand.message as string}</span>
                  </label>
                )}
              </div>

              {/* Model */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaCar className="text-customYellow" /> Model
                  </span>
                </label>
                <input
                  type="text"
                  {...register("model", { required: "Model is required" })}
                  placeholder="Enter model name"
                  className={`input input-bordered w-full ${errors.model ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                />
                {errors.model && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.model.message as string}</span>
                  </label>
                )}
              </div>

              {/* Year */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt className="text-customYellow" /> Year
                  </span>
                </label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  {...register("year", { required: "Year is required" })}
                  placeholder="Enter year"
                  className={`input input-bordered w-full ${errors.year ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                />
                {errors.year && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.year.message as string}</span>
                  </label>
                )}
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaDollarSign className="text-customYellow" /> Price
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    {...register("price", { required: "Price is required" })}
                    placeholder="0.00"
                    className={`input input-bordered w-full pl-8 ${errors.price ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                  />
                </div>
                {errors.price && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.price.message as string}</span>
                  </label>
                )}
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaTag className="text-customYellow" /> Category
                  </span>
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className={`select select-bordered w-full ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                >
                  <option value="" disabled selected>Select a category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                </select>
                {errors.category && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.category.message as string}</span>
                  </label>
                )}
              </div>

              {/* Description */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Description</span>
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  placeholder="Enter product description"
                  className={`textarea textarea-bordered w-full ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                  rows={4}
                ></textarea>
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.description.message as string}</span>
                  </label>
                )}
              </div>

              {/* Quantity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaBox className="text-customYellow" /> Quantity
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  {...register("quantity", { required: "Quantity is required", min: 1 })}
                  placeholder="Enter quantity"
                  className={`input input-bordered w-full ${errors.quantity ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-customYellow focus:border-transparent transition duration-300`}
                />
                {errors.quantity && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.quantity.message as string}</span>
                  </label>
                )}
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center gap-2">
                    <FaImage className="text-customYellow" /> Image
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("imgUrl", { required: "Image is required" })}
                  onChange={handleImageChange}
                  className={`file-input file-input-bordered w-full ${errors.imgUrl ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.imgUrl && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.imgUrl.message as string}</span>
                  </label>
                )}
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              {/* In Stock */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Stock Status</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="true"
                      {...register("inStock", { required: "Stock status is required" })}
                      className="radio checked:bg-green-500"
                    />
                    <span className="flex items-center gap-1">
                      <FaCheck className="text-green-500" />
                      In Stock
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="false"
                      {...register("inStock", { required: "Stock status is required" })}
                      className="radio checked:bg-red-500"
                    />
                    <span className="flex items-center gap-1">
                      <FaTimes className="text-red-500" />
                      Out of Stock
                    </span>
                  </label>
                </div>
                {errors.inStock && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">{errors.inStock.message as string}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-customYellow text-white py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300 focus:ring-2 focus:ring-customYellow focus:ring-offset-2 shadow-md hover:shadow-lg"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
