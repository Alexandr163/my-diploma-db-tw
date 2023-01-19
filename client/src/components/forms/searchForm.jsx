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
                className="w-96 bg-[#e7ceb4f3] rounded-xl text-[#b4856e] px-5 focus:outline-none focus:ring-2 focus:ring-[#b4856e]"
                placeholder="Найти товар..."
                onChange={handleChangeValue}
                value={value}
            />
            <button
                className="rounded mx-1"
                type="button"
                onClick={() => onSearch(value)}
            >
                <ImSearch className="text-[#51382a] hover:text-[#e4bcbc] duration-500 " size="25" />
            </button>
        </div>
    );
};

SearchForm.propTypes = {
    onSearch: PropTypes.func
};

export default SearchForm;
