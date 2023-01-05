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
        <button className="bg-[#e7ceb4] shadow-lg shadow-[#e4bcbc] hover:bg-[#e4bcbc] duration-500 rounded-l-md text-[#51382a]" onClick={handleBack}>
            <FiArrowLeft size="25" />
        </button>
    );
};

ButtonGoBack.propTypes = {
    count: PropTypes.number
};

export default ButtonGoBack;
