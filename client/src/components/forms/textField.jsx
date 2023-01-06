import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return (
            "w-full py-2 rounded text-sm  h-12 focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 pr-2 " +
            (error ? "pl-3 xs:pl-12" : "pl-3")
        );
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="mb-4 rounded">
            <label htmlFor={name}>{label}</label>
            <div>
                <div className="flex items-center">
                    <input
                        placeholder={label}
                        type={showPassword ? "text" : type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className={getInputClasses()}
                    />
                    {type === "password" && (
                        <button className="" onClick={toggleShowPassword}>
                            {showPassword ? (
                                <IoIosEye className="relative w-6 h-6" />
                            ) : (
                                <IoIosEyeOff className="relative w-6 h-6" />
                            )}
                        </button>
                    )}
                </div>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
