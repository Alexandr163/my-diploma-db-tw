import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProductsListByCategoryId } from "../../../store/product";
import ButtonGoBack from "../../forms/buttonGoBack";
import { useSelector } from "react-redux";

const ProductsListPage = ({ categoryId }) => {
    const productsList = useSelector(getProductsListByCategoryId(categoryId));
    const [toggle, setToggle] = useState(true);

    function compare(a, b) {
        if (Number(a.price) > Number(b.price)) {
            return -1;
        }
        if (Number(a.price) < Number(b.price)) {
            return 1;
        }

        return 0;
    }

    function sortProductsList() {
        productsList.sort(compare);
    }

    if (toggle) {
        sortProductsList();
    }

    const handleSort = () => {
        setToggle((prev) => !prev);
        sortProductsList();
    };

    return (
        <>
            <div className="flex justify-between">
                <ButtonGoBack />
                <button
                    className={`bi bi-sort-down${
                        toggle ? "" : "-alt"
                    } btn btn-outline-primary mb-3 btn-sm`}
                    onClick={handleSort}
                ></button>
            </div>
                <h4 className="text-center my-5 shadow-md shadow-[#e4bcbc] rounded-xl font-bold italic">Продукция</h4>
            {productsList.map((item) => (
                <div key={item._id}>
                    <div className="flex justify-between mb-5 shadow-md shadow-[#e4bcbc] font-semibold italic px-2 rounded-xl hover:bg-[#e4bcbc] duration-500">
                        <Link to={`/product/${item._id}`}>{item.title}</Link>
                        <div className="flex items-center">
                            {item.price} руб.
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

ProductsListPage.propTypes = {
    categoryId: PropTypes.string
};

export default ProductsListPage;
