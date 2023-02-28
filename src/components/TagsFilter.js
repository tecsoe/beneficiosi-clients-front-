import Checkbox from "./Checkbox";

const TagsFilter = (props) => {

    const { values, loading, tags, onChange, name, ...rest } = props;

    return (
        <div {...rest}>
            <h4 className="text-xl font-semibold mb-2">Etiquetas</h4>
            {
                loading ?
                    <div className="text-center">
                        Cargando etiquetas...
                    </div>
                    :
                    tags?.length > 0 ?
                        <ul className="max-h-40 overflow-y-auto text-gray-800 space-y-2">
                            {
                                tags.map((tag, i) => {
                                    return (
                                        <li key={i}>
                                            <Checkbox
                                                label={tag.name}
                                                name={name}
                                                value={tag.id}
                                                onChange={onChange}
                                                checked={values.includes(tag.id)}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        :
                        <div className="text-red-500">
                            No se encontraron etiquetas.
                        </div>
            }
        </div>
    )
}

export default TagsFilter;