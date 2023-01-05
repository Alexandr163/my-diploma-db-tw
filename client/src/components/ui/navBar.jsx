import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsAuth, getisAuthAdmin } from "../../store/authSlice";
import { ImHome, ImMenu, ImEnter, ImExit } from "react-icons/im";
import { BsGear, BsCart4 } from "react-icons/bs";

const NavBar = () => {
    const isAuth = useSelector(getIsAuth());
    const isAuthAdmin = useSelector(getisAuthAdmin());

    return (
        <header className="bg-[#b4856e] px-2 shadow-[#e4bcbc] shadow-md border-[#e4bcbc] flex items-center justify-between">
            <p className="font-bold text-[#e7ceb4] italic">Белка Пряник</p>
            <nav className="flex justify-between">
                <ul className="flex items-center">
                    <li className="m-2">
                        <Link
                            className="navBar-link"
                            to="/"
                        >
                            <ImHome size="25" />
                        </Link>
                    </li>
                    <li className="m-2">
                        <Link
                            className="navBar-link"
                            to="/categories"
                        >
                            <ImMenu size="25" />
                        </Link>
                    </li>
                    <li className="m-2">
                        {!isAuth ? null : isAuthAdmin ? (
                            <Link
                                className="navBar-link"
                                to="/admin"
                            >
                                <BsGear size="25" />
                            </Link>
                        ) : (
                            <Link
                                className="navBar-link"
                                to="/cart"
                            >
                                <BsCart4 size="25" />
                            </Link>
                        )}
                    </li>
                    <li className="m-2">
                        {!isAuth ? (
                            <Link
                                className="navBar-link"
                                aria-current="page"
                                to="/login"
                            >
                                <ImEnter size="25" />
                            </Link>
                        ) : (
                            <Link
                                className="navBar-link"
                                aria-current="page"
                                to="/logout"
                            >
                                <ImExit size="25" />
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
