import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";

const ButtonGoBack = ({ count = -1 }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(count);
    };

    return (
        <button className="bg-[#7A8D9B] rounded" onClick={handleBack}>
            <ImArrowLeft className="text-[#DABEB6]" size="25" />
        </button>
    );
};

ButtonGoBack.propTypes = {
    count: PropTypes.number
};

export default ButtonGoBack;
