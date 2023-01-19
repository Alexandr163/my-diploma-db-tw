import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../forms/textField";
import RadioField from "../forms/radioField";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../store/authSlice";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        phoneNumber: "",
        sex: "male",
        name: "",
        adminStatus: false
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        phoneNumber: {
            isRequired: {
                message: "Обязательно укажите номер телефона"
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

        dispatch(signUp(data));
        navigate("/");
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
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <TextField
                    label="Номер телефона"
                    type="number"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                />

                <RadioField
                    options={[
                        { name: "Мужской", value: "male" },
                        { name: "Женский", value: "female" }
                    ]}
                    value={data.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите ваш пол"
                />
                <button
                    className="btn-style w-full rounded-lg"
                    type="submit"
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </button>
                <div className="btn-style w-48 text-center mt-5 rounded-lg">
                    <Link to="/login">Войти</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
