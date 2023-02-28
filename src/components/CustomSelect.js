const CustomSelect = ({ children, className, ...rest }) => {
    return (
        <select
            {...rest}
            className={`
            focus:border-none 
            focus:ring-white 
            focus:outline-none 
            focus:shadow-xl 
            focus:bg-white
            hover:cursor-pointer 
            w-full 
            rounded-xl 
            bg-gray-100 
            border-none 
            transition 
            duration-500 
            ${className}`}>
            {children}
        </select>
    )
}

export default CustomSelect