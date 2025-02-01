import { useState } from "react";
import ProductCard from "../components/productCard/ProductCard";
import { useGetProductsQuery } from "../redux/features/product/productApi";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const [filterCategory, setFilterCategory] = useState(undefined);
  const [sortOption, setSortOption] = useState(undefined);
  const [availability, setAvailability] = useState(undefined);

  const handleFilterChange = (value) => {
    if (value === "all") {
      setFilterCategory(undefined);
    } else {
      setFilterCategory(value);
    }
  };
  const handleSortChange = (value) => setSortOption(value);
  const handleAvailabilityChange = (value) => setAvailability(value);
  const handleSearch = () => {
    setSearch(searchTerm);
  };

  const { isLoading, data } = useGetProductsQuery(
    {
      searchTerm: search,
      category: filterCategory,
      inStock: availability,
      sort: sortOption,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const products = data?.data || [];
  // console.log("🚀 ~ Shop ~ products:", products);
  return (
    <div>
      <div className="flex gap-4 justify-end">
        {/* search */}
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <button onClick={handleSearch}>Search</button>
          </label>
        </div>
        {/* Filter Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1"
          >
            <option className="hover:text-red-700" value="all">
              All Categories
            </option>
            <option value="Truck">Truck</option>
            <option value="Sedan">Sedan</option>
          </select>
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => handleAvailabilityChange(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1"
          >
            <option className="hover:text-red-700" value="all">
              Availability
            </option>
            <option value="true">InStock</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1"
          >
            <option value="asc">Sort by Price</option>
            <option value="price">Low to High</option>
            <option value="-price">High to Low</option>
          </select>
        </div>
      </div>
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
