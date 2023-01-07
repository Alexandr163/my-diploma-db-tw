import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import productsService from "../../../services/products.service";
import { getIsAuth, getisAuthAdmin } from "../../../store/authSlice";
import { addProductInCart, getCart } from "../../../store/cart";
import ButtonGoBack from "../../forms/buttonGoBack";
import Loader from "../../loader";
import { FiEdit3 } from "react-icons/fi";

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        productsService
            .getProductById(productId)
            .then((data) => setProduct(data));
    }, []);

    const dispatch = useDispatch();
    const cart = useSelector(getCart());
    const isProductInCart = product
        ? cart.some((p) => p._id === product._id)
        : false;
    const isAuth = useSelector(getIsAuth());
    const isAuthAdmin = useSelector(getisAuthAdmin());
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addProductInCart(product));
    };

    const handleEdit = () => {
        navigate(`/admin/${product._id}`);
    };
    return (
        <>
            {product ? (
                <div className="container w-5/12 mx-auto rounded-b-xl shadow-md shadow-[#e4bcbcb7] p-10 bg-[#e7ceb4b7] text-[#51382a] italic">
                        <ButtonGoBack />
                        {isAuthAdmin ? (
                            <button
                                className="btn-style rounded-r-md"
                                onClick={handleEdit}
                            >
                                <FiEdit3 size="25" />
                            </button>
                        ) : null}
                    <div className="flex justify-beetwen">
                        <img
                            className="rounded-md shadow-md shadow-[#e4bcbc]"
                            src={`/img/${product.image}`}
                            width="200px"
                            height="200px"
                        />
                        <div className="mx-5 w-50">
                            <h2 className="text-center text-lg font-bold  shadow-md shadow-[#e4bcbc] rounded-md">
                                {product.title}
                            </h2>
                            <div className="mt-3 shadow-md shadow-[#e4bcbc] rounded-md text-center">
                                <p className="font-semibold">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 mx-2 flex justify-beetwen items-center">
                        {isAuthAdmin ? (
                            <div className="mx-10">
                                <h5 className="text-center border-2 border-[#e4bcbc] font-bold  rounded-md w-24">
                                    {product.price} руб.
                                </h5>
                            </div>
                        ) : (
                            <h5 className="text-center border-2 border-[#e4bcbc] font-bold  rounded-l-md w-24">
                                {product.price} руб.
                            </h5>
                        )}

                        {!isAuth || isAuthAdmin ? null : !isProductInCart ? (
                            <button
                                className="btn-style rounded-r-md px-1"
                                onClick={handleAddToCart}
                            >
                                Купить
                            </button>
                        ) : (
                            <Link to="/cart">
                                <button className="btn-style rounded-r-md shadow-md px-1 ">
                                    В корзину
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ProductPage;
