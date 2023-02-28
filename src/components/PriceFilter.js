import Button from "./Button";
import TextField from "./TextField";

const PriceFilter = (props) => {

    const { min, max, onChange, onSubmit, ...rest } = props;

    return (
        <div {...rest}>
            <h4 className="text-xl font-semibold mb-2">Precio</h4>
            <form onSubmit={onSubmit}>
                <div className="flex space-x-2">
                    <TextField
                        type="number"
                        className="w-20"
                        placeHolder="Min $"
                        value={min.value}
                        name={min.name}
                        onChange={onChange}
                    />

                    <TextField
                        type="number"
                        className="w-20"
                        placeHolder="Max $"
                        value={max.value}
                        name={max.name}
                        onChange={onChange}
                    />

                    <Button color="main" onClick={onSubmit}>Ir</Button>
                </div>
            </form>
        </div>
    )
}

export default PriceFilter