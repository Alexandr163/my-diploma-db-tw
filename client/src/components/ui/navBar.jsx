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
        <header className=" bg-[#7A8D9B]">
        <nav className="flex justify-between items-center">
            <div className="">
                <ul className="flex items-center">
                    <li className="m-2">
                        <Link className="text-[#DABEB6] hover:text-[#B2B9BF] duration-500" aria-current="page" to="/">
                            <ImHome size="25" />
                        </Link>
                    </li>
                    <li className="m-2">
                        <Link className="text-[#DABEB6] hover:text-[#B2B9BF] duration-500" aria-current="page" to="/categories">
                            <ImMenu size="25" />
                        </Link>
                    </li>
                    <li className="m-2">
                        {!isAuth ? null : isAuthAdmin ? (
                            <Link className="text-[#DABEB6] hover:text-[#B2B9BF] duration-500" aria-current="page" to="/admin">
                                <BsGear size="25" />
                            </Link>
                        ) : (
                            <Link className="text-[#DABEB6] hover:text-[#B2B9BF] duration-500" aria-current="page" to="/cart">
                                <BsCart4 size="25" />
                            </Link>
                        )}
                    </li>
                    <li className="m-2">
                        {!isAuth ? (
                            <Link className="text-[#DABEB6] hover:text-[#B2B9BF] duration-500" aria-current="page" to="/login">
                                <ImEnter size="25" />
                            </Link>
                        ) : (
                            <Link className="text-[#DABEB6] hover:text-[#B2B9BF] duration-500" aria-current="page" to="/logout">
                                <ImExit size="25" />
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
        </header>
    );
};

export default NavBar;
