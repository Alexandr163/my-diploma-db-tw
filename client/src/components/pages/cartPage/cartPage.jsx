import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProductInCart,
    deleteProductFromCart,
    getCart,
    removePositionFromCart
} from "../../../store/cart";
import { IoMdRemove, IoMdAdd, IoMdTrash } from "react-icons/io";

const CartPage = () => {
    const cart = useSelector(getCart());
    const dispatch = useDispatch();
    const turnCart = [];

    for (const item of cart) {
        const turnItem = turnCart.find((el) => el._id === item._id);

        if (turnItem) {
            turnItem.count += 1;
            turnItem.totalPrice += Number(item.price);
        } else {
            turnCart.push({
                ...item,
                count: 1,
                price: Number(item.price),
                totalPrice: Number(item.price)
            });
        }
    }

    const total = { Count: 0, Price: 0 };
    for (const item of turnCart) {
        total.Count += item.count;
        total.Price += item.totalPrice;
    }

    const handleAddToCart = (product) => {
        dispatch(addProductInCart(product));
    };

    const handleDeleteFromCart = (product) => {
        dispatch(deleteProductFromCart(product));
    };

    const handleTotalRemoveFromCart = (id) => {
        dispatch(removePositionFromCart(id));
    };

    return (<>

        <div className="container w-6/12 mx-auto mt-10 rounded-lg shadow-md shadow-[#e4bcbc] p-3 bg-[#e7ceb4] text-[#51382a] italic">
        <h4 className="text-center text-[#51382a] font-bold mt-5 mb-5">Корзина</h4>
                {turnCart.map((item, idx) => {
                    return (
                        <div className="flex mb-3 p-2 rounded-xl justify-between items-center shadow-md shadow-[#e4bcbc]" key={Date.now() + idx}>
                            <div className="text-[#51382a] italic font-semibold">{`${item.title} - ${item.price} руб.`}</div>
                            <div className="flex">
                                <button
                                    className="bg-[#e7ceb4] border-2 border-[#e4bcbc] hover:bg-[#e4bcbc] duration-500 text-[#51382a] font-semibold rounded-l-md"
                                    onClick={() =>
                                        handleTotalRemoveFromCart(item._id)
                                    }
                                >
                                    <IoMdTrash size="25"/>
                                </button>
                                <button
                                    className="bg-[#e7ceb4] border-2 border-[#e4bcbc] hover:bg-[#e4bcbc] duration-500 text-[#51382a] font-semibold"
                                    onClick={() => handleDeleteFromCart(item)}
                                >
                                    <IoMdRemove size="25" />
                                </button>
                                <button
                                    className="bg-[#e7ceb4] border-2 border-[#e4bcbc] hover:bg-[#e4bcbc] duration-500 text-[#51382a] font-semibold rounded-r-md"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <IoMdAdd size="25" />
                                </button>
                                <span className="bg-[#e7ceb4] text-[#51382a] font-semibold mx-2 w-6 text-center rounded-md">{item.count}</span>
                            </div>
                        </div>
                    );
                })}
                <div className="flex-col text-start mt-7 mx-72 mb-3 p-3 text-[#51382a] font-semibold shadow-md shadow-[#e4bcbc] w-64 rounded-xl">
                    <div className="">
                        {`Всего товаров: ${total.Count} шт.`}
                    </div>
                    <div className="">
                        {`Сумма к оплате: ${total.Price} руб.`}
                    </div>
                </div>
            </div>
            </>
    );
};

export default CartPage;
