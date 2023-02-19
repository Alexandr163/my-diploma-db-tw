import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
    createCategory,
    getCategories,
    getCategoryById,
    removeCategory,
    updateCategory
} from "../../../store/categories";
import {
    createdProduct,
    getPoducts,
    removeProduct,
    updateProduct
} from "../../../store/product";
import ButtonGoBack from "../../forms/buttonGoBack";
import TextField from "../../forms/textField";
import productsService from "../../../services/products.service";
import TextAreaField from "../../forms/textAreaField";
import { FiEdit } from "react-icons/fi";

const AdminPage = () => {
    const init = {
        newCategoryName: "",
        productName: "",
        selectCategory: "",
        description: "",
        image: "",
        price: 0
    };

    const { productId } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        if (productId) {
            productsService.getProductById(productId).then((product) => {
                const newData = {
                    productName: product.title,
                    selectCategory: product.categoryId,
                    description: product.description,
                    image: product.image,
                    price: product.price
                };

                setData(newData);
                setProduct(product);
            });
        } else {
            setData(init);
        }
    }, [productId]);

    const location = useLocation();
    const isAdminForm = location.state?.adminForm;
    const isFullForm = productId && !isAdminForm;
    const navigate = useNavigate();
    const [data, setData] = useState(init);
    const productsList = useSelector(getPoducts());
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const categoriesList = useSelector(getCategories());
    const category = useSelector(getCategoryById(data.selectCategory));
    // const [fileName, setFileName] = useState("");

    // const onChangeFile = (e) => {
    //     setFileName(e.target.files[0]);
    // };

    const handleChange = (el) => {
        setData((prev) => ({ ...prev, [el.name]: el.value }));
    };

    const handleSelect = (e) => {
        const { name, value } = e.target;
        const { children } = e.target;
        let newCategoryName;

        for (const item of children) {
            if (item.value === value) {
                newCategoryName = item.text;
            }
        }

        setData((prev) => ({
            ...prev,
            [name]: value,
            newCategoryName
        }));
    };

    const handleAddCategory = () => {
        setToggle((prev) => !prev);
    };

    const handleSaveCategory = () => {
        if (!data.selectCategory) {
            dispatch(createCategory(data.newCategoryName));
            setToggle((prev) => !prev);
            setData({ ...data, newCategoryName: "" });
        } else {
            dispatch(
                updateCategory({
                    _id: data.selectCategory,
                    title: data.newCategoryName
                })
            );
            setToggle((prev) => !prev);
            setData({ ...data, newCategoryName: "" });
        }
    };

    const handleEditCategory = () => {
        setToggle((prev) => !prev);
        setData({ ...data, newCategoryName: category?.title || "" });
    };

    const handleDeleteCategory = () => {
        dispatch(removeCategory(category));
        if (!productId) {
            setData(init);
            navigate("/admin");
        }
    };

    const handleSaveProduct = () => {
        const dataProduct = {
            categoryId: data.selectCategory,
            title: data.productName,
            description: data.description,
            image: data.image,
            price: Number(data.price)
        };
        if (productId) {
            dataProduct._id = productId;
            dataProduct.image = product.image;
            dispatch(updateProduct(dataProduct));
        } else {
            dispatch(createdProduct(dataProduct));
        }

        setData(init);
        if (!isFullForm) {
            navigate("/admin");
        } else {
            navigate(-1);
        }
    };

    const handleDeleteProduct = () => {
        dispatch(removeProduct(product));
        setData(init);
        navigate("/admin");
    };

    return (
        <>
            <div className="container w-5/12 mx-auto rounded-b-xl shadow-md shadow-[#e4bcbcb7] p-5 bg-[#e7ceb4b7] text-[#51382a] italic">
                <div>
                    <ButtonGoBack />
                    <div className="text-center font-bold text-xl">
                        <h3>
                            {productId
                                ? "Редактирование товара"
                                : "Добавление товара"}
                        </h3>
                    </div>
                    <div>
                        <TextField
                            type="text"
                            name="productName"
                            label="Название"
                            value={data.productName}
                            onChange={handleChange}
                        />
                        <TextAreaField
                            type="text"
                            value={data.description}
                            onChange={handleChange}
                            name="description"
                            label="Описание"
                        />
                        <TextField
                            type="number"
                            name="price"
                            label="Стоимость"
                            value={data.price}
                            onChange={handleChange}
                        />
                        <div>
                            <select
                                className="w-full mt-3 p-3 rounded-lg text-sm bg-[#e7ceb4f3] ring-2 ring-[#e7ceb4] hover:ring-[#e4bcbc] focus:outline-none focus:ring-2 focus:ring-[#b4856e] shadow-sm text-[#b4856e] pr-2"
                                aria-label=".form-select-lg example"
                                name="selectCategory"
                                value={data.selectCategory}
                                onChange={handleSelect}
                            >
                                <option value="">Новая категория</option>
                                {categoriesList.map((item) => {
                                    return (
                                        <option value={item._id} key={item._id}>
                                            {item.title}
                                        </option>
                                    );
                                })}
                            </select>
                            <input
                                type="file"
                                className="file:rounded-lg file:bg-[#f2dec8] file:border-none file:cursor-pointer file:text-[#b4856e] w-full mt-7 p-3 rounded-lg text-sm bg-[#e7ceb4f3] ring-2 ring-[#e7ceb4] hover:ring-[#e4bcbc] focus:outline-none focus:ring-2 focus:ring-[#b4856e] shadow-sm text-[#b4856e] pr-2"
                                // onChange={onChangeFile}
                            ></input>
                            <div className="mt-3">
                                <button
                                    className="px-1 btn-style rounded-l-lg"
                                    onClick={handleAddCategory}
                                    disabled={data.selectCategory}
                                >
                                    Добавить
                                </button>
                                <button
                                    className="px-1 btn-style"
                                    onClick={handleEditCategory}
                                    disabled={!data.selectCategory}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="px-1 btn-style rounded-r-lg"
                                    onClick={handleDeleteCategory}
                                    disabled={!data.selectCategory}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                        {toggle ? (
                            <div className="mb-3">
                                <TextField
                                    type="text"
                                    name="newCategoryName"
                                    label="Категория"
                                    value={data.newCategoryName}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="px-1 btn-style rounded-lg"
                                    onClick={handleSaveCategory}
                                >
                                    Сохранить
                                </button>
                            </div>
                        ) : null}
                        <div className="flex justify-center mt-5 mx-auto">
                            <button
                                type="button"
                                className="px-1 btn-style rounded-l-lg"
                                onClick={handleSaveProduct}
                            >
                                Сохранить товар
                            </button>
                            <button
                                type="button"
                                className="px-1 btn-style rounded-r-lg"
                                onClick={handleDeleteProduct}
                            >
                                Удалить товар
                            </button>
                        </div>
                    </div>
                </div>

                {isFullForm ? null : (
                    <div>
                        <h2 className="mt-5 mb-5 text-center font-bold">
                            Список Товаров
                        </h2>
                        <div className="h-40 overflow-auto scrollbar-thumb-[#b4856e] scrollbar-thumb-rounded-lg scrollbar-track-[#e7ceb4] scrollbar-track-rounded-lg scrollbar-thin">
                            {productsList.map((item) => {
                                return (
                                    <div key={item._id} className="px-5">
                                        <div className="flex justify-between px-2 items-center text-center font-semibold mb-3 rounded-xl shadow-md shadow-[#e4bcbcb7] hover:bg-[#e4bcbca2] duration-500">
                                            <Link
                                                to={`/admin/${item._id}`}
                                                state={{
                                                    adminForm: true
                                                }}
                                            >
                                                <FiEdit />
                                            </Link>
                                            <Link
                                                className="nav-link mt-2 px-2"
                                                to={`/product/${item._id}`}
                                            >
                                                {item.title}
                                            </Link>
                                            <div className="d-flex align-items-center">
                                                {item.price} руб.
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminPage;
