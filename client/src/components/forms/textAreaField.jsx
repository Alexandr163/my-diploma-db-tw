import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return (
            "overflow-auto scrollbar-thumb-[#b4856e] scrollbar-thumb-rounded-lg scrollbar-track-[#e7ceb4] scrollbar-track-rounded-lg scrollbar-thin w-full p-3 text-sm bg-[#e7ceb4f3] ring-2 ring-[#e7ceb4] hover:ring-[#e4bcbc] focus:outline-none focus:ring-2 focus:ring-[#b4856e] shadow-sm rounded-lg text-[#b4856e] pr-2" +
            (error ? "pl-3 xs:pl-12" : "pl-3")
        );
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />

                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
    );
};
TextAreaField.defaultProps = {
    type: "text"
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
