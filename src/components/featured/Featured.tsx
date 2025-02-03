import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Loader from "../loader/Loader";
import ProductCard from "../productCard/ProductCard";

const Featured = () => {
  const { isLoading, data } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const products = data?.data || [];
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Featured Cars
      </h1>
      <span className="w-20 h-1 bg-customYellow block mx-auto mt-2"></span>
      <div>
        {/* card */}

        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="my-6 flex justify-end">
        <Link to="/shop">
          <button className="bg-customYellow hover:bg-customYellowHover text-white font-bold py-2 px-4 rounded-lg">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Featured;
