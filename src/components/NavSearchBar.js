import { IoSearchSharp } from "react-icons/io5";
import useCategories from "../hooks/useCategories";

const NavSearchBar = ({ onChange, onSubmit, data }) => {

    const [{ categories, error: errorCategories, loading: categoriesLoading }] = useCategories();

    return (
        <form className="hidden relative md:flex items-center flex-grow" onSubmit={onSubmit}>
            <select
                name="storeCategoryId"
                style={{width: 150}}
                value={data.storeCategoryId}
                onChange={onChange}
                disabled={errorCategories || categoriesLoading ? true : false}
                className="bg-main h-full text-white border-none capitalize absolute rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm leading-4"
            >
                <option value="">Todo</option>
                {categories.map((category, i) => {
                    return (
                        <option className="text-white capitalize" value={category.id} key={i}>{category.name}</option>
                    )
                })}
            </select>
            <input
                name="search"
                style={{paddingLeft: 155, paddingRight: 50}}
                value={data.search}
                onChange={onChange}
                placeholder="Nombre de tienda, producto..."
                className="w-full text-black rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm leading-4"
                type="text"
            />
            <button className="absolute rounded bg-main text-white h-full text-center" style={{right: 0, width: 40}}>
                <IoSearchSharp className="m-auto"/>
            </button>
        </form>
    )
}

export default NavSearchBar;