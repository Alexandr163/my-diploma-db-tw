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
            "w-full p-3 text-sm bg-[#e7ceb4f3] ring-2 ring-[#e7ceb4] hover:ring-[#e4bcbc] focus:outline-none focus:ring-2 focus:ring-[#b4856e] shadow-sm rounded-lg text-[#b4856e] pr-2" +
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
                        <button className="mx-2" onClick={toggleShowPassword}>
                            {showPassword ? (
                                <IoIosEye className="relative w-6 h-6" />
                            ) : (
                                <IoIosEyeOff className="relative w-6 h-6" />
                            )}
                        </button>
                    )}
                </div>
                {error && <div className={error + "text-end"}>{error}</div>}
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
