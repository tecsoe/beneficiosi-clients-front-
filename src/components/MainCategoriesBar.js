import ChevronDownIcon from "./ChevronDownIcon";
import { categories } from "../util/categories";
import { useState } from "react";
import CategorySubMenu from './CategorySubMenu';
const MainCategoriesBar = () => {

  const [subCategories, setSubCategories] = useState([]);

  const [categoryIndex, setCategoryIndex] = useState(null);
  const handleClick = (category, index) => {

    if (index === categoryIndex) {
      setSubCategories([]);
      setCategoryIndex(null);
      return;
    }

    setSubCategories(category);
    setCategoryIndex(index);
  }

  return <div className="flex items-center py-2" style={{ position: 'relative', padding: '10px 10px' }}>
    {categories.map((category, i) =>
      <div key={i} style={{ position: 'relative' }}>
        <a href="#" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded">
          <span>{category.name}</span>
          <span onClick={() => { handleClick(category.children, i) }}>
            {
              subCategories.length > 0 && i === categoryIndex ?
                <span style={{ color: 'red' }}>-</span>
                :
                <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
            }
          </span>
        </a>
      </div>
    )}
    {
      subCategories.length > 0 ?
        <CategorySubMenu className="category-sub-menu-container" Categories={subCategories}>

        </CategorySubMenu>
        :
        null
    }
  </div >
};

export default MainCategoriesBar;