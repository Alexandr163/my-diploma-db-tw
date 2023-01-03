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
                <div className="container mx-auto mt-10 rounded-lg shadow-xl p-10 bg-[#DABEB6] text-[#7A8D9B]">
                    <div className="">
                        <ButtonGoBack />
                        {isAuthAdmin ? (
                            <button
                                className="bg-[#7A8D9B] rounded hover:bg-[#596872] duration-500 mx-1"
                                onClick={handleEdit}
                            >
                                <FiEdit3 className="text-[#DABEB6]" size="25" />
                            </button>
                        ) : null}
                    </div>
                    <div className="flex justify-beetwen">
                        <img
                            className="rounded-md shadow-xl"
                            src={`/img/${product.image}`}
                            width="200px"
                            height="200px"
                        />
                        <div className="mx-5 w-50">
                            <h2 className="text-center">{product.title}</h2>
                                <span className="text-center">
                                    {product.description}
                                </span>
                        </div>
                    </div>
                    <h5 className="text-end">{product.price} руб.</h5>

                    {!isAuth || isAuthAdmin ? null : !isProductInCart ? (
                        <button
                            className="bg-[#7A8D9B] rounded text-[#DABEB6] px-1 hover:bg-[#596872] duration-500"
                            onClick={handleAddToCart}
                        >
                            Купить
                        </button>
                    ) : (
                        <Link to="/cart">
                            <button className="bg-[#7A8D9B] rounded text-[#DABEB6] px-1 hover:bg-[#596872] duration-500">
                                В корзину
                            </button>
                        </Link>
                    )}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ProductPage;
