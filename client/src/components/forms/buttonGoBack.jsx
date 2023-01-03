import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const ButtonGoBack = ({ count = -1 }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(count);
    };

    return (
        <button className="bg-[#7A8D9B] rounded hover:bg-[#596872] duration-500" onClick={handleBack}>
            <FiArrowLeft className="text-[#DABEB6]" size="25" />
        </button>
    );
};

ButtonGoBack.propTypes = {
    count: PropTypes.number
};

export default ButtonGoBack;
