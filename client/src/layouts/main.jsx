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
            <div className="mt-20 flex justify-center">
                <SearchForm onSearch={handleSearch} />
            </div>
            {newProducts.length > 0 ? (
                <div className="container w-5/12 mx-auto mt-5 rounded-xl shadow-md shadow-[#e4bcbcb7] p-10 bg-[#e7ceb4b7] text-[#51382a] italic">
                    {newProducts.map((item) => (
                        <div key={item._id}>
                            <div className="text-center font-semibold mb-3 rounded-xl shadow-md shadow-[#e4bcbcb7] hover:bg-[#e4bcbca2] duration-500">
                                <Link
                                    className="mt-2 px-2"
                                    to={`/product/${item._id}`}
                                >
                                    {item.title}
                                </Link>
                                {item.price} руб.
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
            <div className="p-20">
                <figure className="flex p-10 border-2 border-[#b4856e] rounded-xl bg-[#e7ceb4b2] w-8/12 mx-auto shadow-xl">
                <img
                        className="w-48 h-48 rounded-full border-2 border-[#b4856e]"
                        src={`/img/main1.jpg`}
                    />
                    <blockquote>
                    <p className="italic font-bold text-[#51382a] text-2xl">
                        Всем Привет!
                    </p>
                    <p className="ml-5 italic font-bold text-[#51382a] text-lg">
                        Я Оля, мне 36 лет, у меня двое детей, свой дом и
                        пряничное творчество.
                        <br />
                        Я бы даже сказала - пряничное наваждение!
                        <br />
                        Я делаю не просто пряники, мои пряники со вкусом
                        РАДОСТИ!
                        <br />
                        Это вкусное украшение для любого торжества.
                        <br />
                        Помогу выразить ваши чувства, внимание и заботу самому
                        близкому или далёкому, родному и любимому, уважаемому и
                        обожаемому человеку.
                        <br />
                        На ваш выбор:
                        <br />
                        - пряничные букеты
                        <br />
                        - домики-пряники
                        <br />
                        - чайные домики-пряники
                        <br />
                        - пряничные открытки
                        <br />
                        - топперы для тортов
                        <br />
                        - пряничные презенты
                        <br />
                        Провожу мастер-класс по росписи медово-имбирных пряников
                        для детей и взрослых. Ваш праздник точно запомнят! Никто
                        не уйдёт с пустыми руками! Скучно не будет никому!
                        Обещаю :) <br />
                        Состав ПОЛНОСТЬЮ экологиный. Это лакомство детям точно
                        МОЖНО!
                        <br />
                    </p>
                    <p className="mt-3 italic font-bold text-[#51382a] text-lg text-end">P. S. : я предлагаю вам в первую очередь ЭМОЦИИ, а не еду.</p>
                    </blockquote>
                </figure>
                </div>
        </>
    );
};

export default Main;
