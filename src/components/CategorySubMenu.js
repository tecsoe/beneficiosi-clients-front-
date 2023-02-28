
import { useEffect, useState } from 'react';
import '../styles/subCategoryMenu.css';
import ChevronDoubleRightIcon from './ChevronDoubleRightIcon'

const CategorySubMenu = (props) => {

  const { Categories, className } = props;

  const [categorySelected, setCategorySelected] = useState(null);

  useEffect(() => {
    console.log('Hello');
    console.log(Categories);
  });



  return (
    <div className={className}>
      <div className="category-sub-menu">
        <div className="flex">
          <div style={{ width: '30%', padding: '10px' }}>
            {Categories.map((category, i) =>
              <div className="sub-menu-item" onMouseEnter={() => { setCategorySelected(category) }}>
                <a href="/#">
                  {category.name}
                </a>
                <ChevronDoubleRightIcon className="w-4 h-4" />
              </div>
            )}
          </div>

          <div style={{ width: '70%', background: 'white', padding: '10px', alignItems: 'start' }}>
            {
              categorySelected ?
                categorySelected.children ?
                  categorySelected.children.map((subcategory, i) =>
                    <div style={{ margin: '10px 10px', height: 'fit-content', display: 'inline-block', verticalAlign: 'top' }}>
                      <a href="/#">
                        <h1 className="subcategory1">{subcategory.name}</h1>
                      </a>
                      {
                        subcategory.children ?
                          <ul style={{ marginTop: '10px' }}>
                            {
                              subcategory.children.map((subcategory2, i) =>
                                <li className="subcategory-link">
                                  <a href="/#">
                                    {subcategory2.name}
                                  </a>
                                </li>
                              )
                            }
                          </ul>
                          :
                          null
                      }
                    </div>
                  )
                  :
                  null
                :
                null
            }
          </div>
        </div>
      </div>
    </div>
  )

}


export default CategorySubMenu;