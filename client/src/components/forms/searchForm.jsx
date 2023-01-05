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
                className="w-96 bg-[#b4856e2b] rounded-xl text-[#51382a] px-5 shadow-md shadow-[#e4bcbc]"
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
