import React from "react";
import SearchForm from "../components/forms/searchForm";
import { useSelector } from "react-redux";
import { getPoducts } from "../store/product";
import { Link } from "react-router-dom";
import useSearch from "../components/hooks/useSearch";

const Main = () => {
    const products = useSelector(getPoducts());
    const { handleSearch, newProducts } = useSearch(products);

    return (
        <>
            <h1 className="text-center">Пряники Самара</h1>
            <div className="mt-10 flex justify-center">
                <SearchForm onSearch={handleSearch} />
            </div>
            {newProducts.length > 0 ? (
                <div className="container w-5/12 mx-auto mt-10 rounded-lg shadow-xl p-10 bg-[#DABEB6] text-[#7A8D9B]">
                    {newProducts.map((item) => (
                        <div key={item._id}>
                            <div className="flex justify-between items-center">
                                <Link
                                    className="mt-2 px-2"
                                    to={`/product/${item._id}`}
                                >
                                    {item.title}
                                </Link>
                                {item.price} руб.
                            </div>
                            <hr className="border border-[#7A8D9B] bg-[#7A8D9B]" />
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default Main;
