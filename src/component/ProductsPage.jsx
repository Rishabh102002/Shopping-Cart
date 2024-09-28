import { useOutletContext } from "react-router-dom";
import Card from "./Card";
import { ListFilter, ChevronDown } from "lucide-react";
import { useState } from "react";

function Filters({ productList, setFilteredList, setFilterApplied }) {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const filterProducts = () => {
    let filteredProducts = [...productList];

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(product => {
        if ((product.price*80)<=selectedPrice){
          return true;
        }
        return false
      });
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
    }
    console.log("filtered list=>", filteredProducts);
    setFilteredList(filteredProducts);
    setFilterApplied(true);
  };

  const clearFilters = () => {
    setSelectedPrice(null);
    setSelectedCategory(null);
    setSelectedBrand(null);
    setFilteredList(productList); // Reset to all products
    setFilterApplied(false);
  };

  return (
      <div className="flex flex-col gap-10 mt-8 w-[350px]">
          <button
              onClick={clearFilters}
              className="flex gap-2 font-semibold text-base text-slate-500 hover:text-slate-800"
          >
              <ListFilter /> Clear Filters
          </button>
          <div className=" flex flex-col gap-6 p-6 py-8 shadow-lg rounded-lg">
              {/* Price Filter */}
              <div className="flex flex-col gap-4 font-semibold text-slate-500 text-xl">
                  Price
                  <ul className="flex flex-col gap-2 text-base font-normal">
                      <li className="flex items-center justify-between">
                          Less than ₹1000
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedPrice === 1000}
                              onChange={() => setSelectedPrice(1000)}
                          />
                      </li>
                      <li className="flex items-center justify-between">
                          Less than ₹5000
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedPrice === 5000}
                              onChange={() => setSelectedPrice(5000)}
                          />
                      </li>
                      <li className="flex items-center justify-between">
                          Less than ₹10,000
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedPrice === 10000}
                              onChange={() => setSelectedPrice(10000)}
                          />
                      </li>
                      <li className="flex items-center justify-between">
                          Less than ₹1,00,000
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedPrice === 100000}
                              onChange={() => setSelectedPrice(100000)}
                          />
                      </li>
                  </ul>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col gap-4 font-semibold text-slate-500 text-xl">
                  Category
                  <ul className="flex flex-col gap-2 text-base font-normal">
                      <li className="flex items-center justify-between">
                          Smartphones
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedCategory === "mobile"}
                              onChange={() => setSelectedCategory("mobile")}
                          />
                      </li>
                      <li className="flex items-center justify-between">
                          Tv
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedCategory === "tv"}
                              onChange={() => setSelectedCategory("")}
                          />
                      </li>
                      <li className="flex items-center justify-between">
                          Audio
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedCategory === "audio"}
                              onChange={() => setSelectedCategory("audio")}
                          />
                      </li>
                      <li className="flex items-center justify-between">
                          Gaming
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedCategory === "gaming"}
                              onChange={() => setSelectedCategory("gaming")}
                          />
                      </li>
                  </ul>
              </div>

              {/* Brand Filter */}
              <div className="flex flex-col gap-4 font-semibold text-slate-500 text-xl">
                  Brand
                  <ul className="flex flex-col gap-2 text-base font-normal [&>*]:flex [&>*]:justify-between">
                      <li>
                          Samsung
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedBrand === "samsung"}
                              onChange={() => setSelectedBrand("samsung")}
                          />
                      </li>
                      <li>
                          Apple
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedBrand === "apple"}
                              onChange={() => setSelectedBrand("apple")}
                          />
                      </li>
                      <li>
                          Xiaomi
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedBrand === "xiaomi"}
                              onChange={() => setSelectedBrand("xiaomi")}
                          />
                      </li>
                      <li>
                          Sony
                          <input
                              className="accent-slate-700"
                              type="radio"
                              checked={selectedBrand === "sony"}
                              onChange={() => setSelectedBrand("sony")}
                          />
                      </li>
                  </ul>
              </div>

              <button
                  onClick={filterProducts}
                  className="mt-4 bg-slate-500 text-white p-2 rounded hover:bg-slate-600"
              >
                  Apply Filters
              </button>
          </div>
      </div>
  );
}


function Products({ cartList, setCartList, productList, List }) {
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {List.map((product) => {
                return (
                    <Card
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price * 80}
                        discount={product.discount}
                        setCartList={setCartList}
                        productList={productList}
                    />
                );
            })}
        </div>
    );
}

function Sort({sortOption , setSortOption, List, setList}) {
    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);
        console.log("sorted list=>",List)

        let sortedProducts = [...List]; // Create a copy of the products array

        // Sorting logic based on the selected option
        if (value === "priceAsc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === "priceDesc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (value === "discountAsc") {
            sortedProducts.sort((a, b) => a.discount - b.discount);
        } else if (value === "discountDesc") {
            sortedProducts.sort((a, b) => b.discount - a.discount);
        }

        setList(sortedProducts); // Update the products state with the sorted array
    };
    return (
        <div className="sort-dropdown text-base text-slate-500">
            <select
                id="sort"
                className="outline-none"
                value={sortOption}
                onChange={handleSortChange}
            >
                <option value="">Sort By</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
                <option value="discountAsc">Discount (Low to High)</option>
                <option value="discountDesc">Discount (High to Low)</option>
            </select>
        </div>
    );
}




function ProductsPage() {
    const [sortOption, setSortOption] = useState("");
    const [cartList, setCartList, productList, setProductList] =
        useOutletContext();
    const [filterApplied, setFilterApplied] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    //console.log("Product List in Products Component:", productList);
    return (
        <div className="flex gap-6 mx-[189px]">
            {filterApplied && (
                <Filters
                    setFilterApplied={setFilterApplied}
                    setFilteredList={setFilteredList}
                    productList={productList}
                />
            )}
            <div className="flex-col w-full">
                <div className="flex justify-between text-2xl font-bold mx-4 my-8 text-slate-700">
                    {!filterApplied && (
                        <button
                            onClick={() => setFilterApplied(true)}
                            className="flex gap-2 font-semibold text-base text-slate-500 hover:text-slate-800"
                        >
                            <ListFilter></ListFilter>Filter
                        </button>
                    )}
                    Products List
                    {filteredList.length === 0 ? (
                        <Sort
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            List={productList}
                            setList={setProductList}
                        />
                    ) : (
                        <Sort
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            List={filteredList}
                            setList={setFilteredList}
                        />
                    )}
                </div>
                {filteredList.length === 0 ? (
                    <Products
                        cartList={cartList}
                        setCartList={setCartList}
                        productList={productList}
                        List={productList}
                    />
                ) : (
                    <Products
                        cartList={cartList}
                        setCartList={setCartList}
                        productList={productList}
                        List={filteredList}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductsPage;
