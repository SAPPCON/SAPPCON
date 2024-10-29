import { useState, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import CategoryContext from "@/store/CategoryContext";
import Loader from "../UI/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import PopUpError from "../UI/PopUpError";
import PopUpSuccess from "../UI/PopUpSuccess";
import CategoryDetail from "./CategoryDetail";

const CategoryList = ({ filterText }) => {
  const [category, setCategory] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showBackgroundCategory, setShowBackgroundCategory] = useState(false);

  const { categoryContext: categoryCtx, dispatchCategoriesAction } =
    useContext(CategoryContext);

  const handleClick = (category) => {
    setCategory(category);
    setShowCategory(true);
    setShowBackgroundCategory(true);
  };

  const handleClickHideCategoryBoth = () => {
    setShowCategory(false);
    setShowBackgroundCategory(false);
    dispatchCategoriesAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
    dispatchCategoriesAction({ type: "SET_RESTART_ALL_UPDATE_NAME" });
  };

  const handleClickHideCategoryBackground = () => {
    setShowCategory(false);
  };

  const handleClickAccept = () => {
    setShowBackgroundCategory(false);
    dispatchCategoriesAction({ type: "SET_RESTART_ALL_DELETE_ITEM" });
  };

  const Categories = categoryCtx.items;

  const filteredCategories = Categories.filter((category) =>
    category.name.toLowerCase().includes(filterText)
  );

  if (
    Categories.length === 0 &&
    !categoryCtx.error &&
    !categoryCtx.errorDeleteItem &&
    !categoryCtx.successDeleteItem
  ) {
    return (
      <div className="font-sans text-blackText h-[420px] flex justify-center items-center font-medium">
        No tienes categorías aún.
      </div>
    );
  }

  return (
    <div>
      <ul className="h-[420px] overflow-y-auto font-sans text-blackText">
        {categoryCtx.isLoading && (
          <div className="justify-center items-center flex w-full h-full ">
            <Loader></Loader>
          </div>
        )}
        {categoryCtx.error && (
          <div className="h-full justify-center flex flex-col items-center">
            <p>{categoryCtx.error.message}</p>
            <small>{categoryCtx.error.messageinfo}</small>
          </div>
        )}

        {!categoryCtx.error &&
          !categoryCtx.isLoading &&
          (filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <li
                key={category._id}
                onClick={() => handleClick(category)}
                className={`py-2 px-2 cursor-pointer hover:bg-grayBg2 hover:bg-opacity-70 w-full h-auto break-words overflow-wrap-anywhere ${
                  index !== Categories.length - 1
                    ? "border-b border-b-grayBorder"
                    : "border-b border-b-grayBorder"
                }`}
              >
                <strong>{category.name}</strong>
              </li>
            ))
          ) : (
            <li className="font-sans text-blackText font-medium flex justify-center items-center h-full w-full">
              No hay coincidencias con el filtro.
            </li>
          ))}
      </ul>

      {showCategory && category && (
        <CategoryDetail
          categoryData={category}
          hideCategoryFunctionBoth={handleClickHideCategoryBoth}
          hideCategoryFunctionBackground={handleClickHideCategoryBackground}
        ></CategoryDetail>
      )}

      {showBackgroundCategory && (
        <div
          onClick={handleClickHideCategoryBoth}
          className=" fixed top-0 left-0 z-30  h-full  w-full  bg-black opacity-80  transition-opacity duration-1000"
        ></div>
      )}

      {categoryCtx.successDeleteItem && !categoryCtx.errorDeleteItem && (
        <PopUpSuccess
          message="Categoría Eliminada."
          onAccept={handleClickAccept}
          icon={FaCheckCircle}
        />
      )}

      {!categoryCtx.successDeleteItem && categoryCtx.errorDeleteItem && (
        <PopUpError
          message={categoryCtx.errorDeleteItem.message}
          messageinfo={categoryCtx.errorDeleteItem.messageinfo}
          onAccept={handleClickAccept}
          icon={HiOutlineExclamationTriangle}
        />
      )}
    </div>
  );
};

export default CategoryList;
