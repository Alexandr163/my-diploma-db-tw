import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategories } from "../../../store/categories";
import ProductsListPage from "../productsPages/productsListPage";

const CategoriesListPage = () => {
    const { categoryId } = useParams();
    const categories = useSelector(getCategories());
    let renderData = null;

    if (categoryId) {
        renderData = <ProductsListPage categoryId={categoryId} />;
    } else {
        if (categories) {
            renderData = (
                <>
                    {categories.map((item) => (
                        <div key={item._id} className="text-center font-semibold mb-3 rounded-xl shadow-md shadow-[#e4bcbcb7] hover:bg-[#e4bcbca2] duration-500">
                            <Link
                                to={`/categories/${item._id}`}
                            >
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </>
            );
        } else {
            renderData = (
                <>
                    <h1>Loading...</h1>
                </>
            );
        }
    }

    return (<>
        <div className="container w-5/12 mx-auto rounded-b-xl shadow-md shadow-[#e4bcbcb7] p-3 bg-[#e7ceb4b7] text-[#51382a] italic">
                <div className="col-md-6 offset-md-3 p-4">
                    <>{renderData}</>
                </div>
            </div>
            </>
    );
};

export default CategoriesListPage;
