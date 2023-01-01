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
                className="w-96 border-[#7A8D9B] rounded"
                placeholder="  Найти..."
                // aria-label="Recipient's username"
                // aria-describedby="button-addon2"
                onChange={handleChangeValue}
                value={value}
            />
            <button
                className="rounded mx-1"
                type="button"
                // id="button-addon2"
                onClick={() => onSearch(value)}
            >
                <ImSearch className="text-[#7A8D9B]" size="25" />
            </button>
        </div>
    );
};

SearchForm.propTypes = {
    onSearch: PropTypes.func
};

export default SearchForm;
