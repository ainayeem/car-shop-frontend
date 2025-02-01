import ProductCard from "../components/productCard/ProductCard";
import { useGetProductsQuery } from "../redux/features/product/productApi";

const Shop = () => {
  const { isLoading, data } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const products = data?.data || [];
  // console.log("🚀 ~ Shop ~ products:", products);
  return (
    <div>
      <div>
        {isLoading ? (
          "loading"
        ) : (
          <div className="mt-10 grid grid-cols-4 gap-7">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
