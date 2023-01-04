import React, { useState } from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";

const SearchForm = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleChangeValue = ({ target }) => {
        setValue(target.value);
    };

    return (
        <div className="flex">
            <input
                type="text"
                className="w-96 bg-[#f0e3e0] rounded-xl text-[#7A8D9B]"
                placeholder="  Найти товар..."
                onChange={handleChangeValue}
                value={value}
            />
            <button
                className="rounded mx-1"
                type="button"
                onClick={() => onSearch(value)}
            >
                <ImSearch className="text-[#7A8D9B] hover:text-[#f0e3e0] duration-500 " size="25" />
            </button>
        </div>
    );
};

SearchForm.propTypes = {
    onSearch: PropTypes.func
};

export default SearchForm;
