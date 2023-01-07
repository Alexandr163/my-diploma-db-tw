import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, signIn } from "../../store/authSlice";
import { validator } from "../../utils/validator";
import TextField from "../forms/textField";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const isAuth = useSelector(getIsAuth());
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        dispatch(signIn(data.email, data.password));
    };
    return (
        <div className="container w-5/12 mx-auto rounded-b-xl shadow-md shadow-[#e4bcbcb7] p-5 bg-[#e7ceb4b7] text-[#51382a] italic">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            className="btn-style w-full rounded-lg"
                            type="submit"
                            disabled={!isValid}
                        >
                            Войти
                        </button>

                        <div className="btn-style w-48 text-center mt-5 rounded-lg">
                            <Link
                                to="/register"
                            >
                                Зарегистрироваться
                            </Link>
                        </div>
                    </form>
                </div>
    );
};

export default LoginForm;
