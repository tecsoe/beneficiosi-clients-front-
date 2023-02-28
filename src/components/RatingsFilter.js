import Checkbox from "./Checkbox";
import StarIcon from "./StarIcon";

const RatingsFilter = (props) => {

    const { onChange, name, values, ...rest } = props;

    return (
        <div {...rest}>
            <h4 className="text-xl font-semibold mb-2">Rating</h4>

            <ul className="text-gray-800 space-y-3">
                {Array.from(Array(5).keys()).map(i => <li
                    key={i}
                    className="flex items-center space-x-2"
                >
                    <Checkbox
                        value={i + 1}
                        checked={values?.includes(i + 1)}
                        onChange={onChange}
                        name={name}
                        label={
                            <div className="flex space-x-1">
                                {Array.from(Array(i + 1).keys()).map(n => <StarIcon
                                    key={n}
                                    className="w-4 h-4 text-yellow-400"
                                />)}
                            </div>
                        }
                    />
                </li>)}
            </ul>
        </div>
    )
}

export default RatingsFilter;