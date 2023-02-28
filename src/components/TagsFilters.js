import useTags from "../hooks/useTags";
import Checkbox from "./Checkbox";

const TagsFilter = ({ onChange, filters, values, name }) => {

    const [{ tags, loading: loadingTags, error: errorTags }, getTags] = useTags({ params: { storeCategoryIds: filters?.storeCategoryIds?.join(","), } });

    return (
        <div>
            {
                loadingTags ?
                    <div className="text-center text-gray-500">
                        Obteniendo etiquetas
                    </div>
                    :
                    errorTags ?
                        <div className="text-red-500 text-center">
                            <p>Ha ocurrido un error.</p>
                            <button className="bg-main text-white" onClick={() => { getTags() }}>
                                Reintentar
                            </button>
                        </div>
                        :
                        <>
                            <h4 className="text-xl font-semibold mb-2">Etiquetas</h4>
                            <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
                                {tags?.map((tag) => <li key={tag.id}>
                                    <Checkbox
                                        onChange={onChange}
                                        name={name}
                                        value={tag.id}
                                        checked={values?.includes(tag.id)}
                                        id={`${tag.name}-${tag.id}`}
                                        label={tag.name}
                                    />
                                </li>)}
                            </ul>
                        </>
            }
        </div>
    )
}

export default TagsFilter;