import clsx from "clsx";
import GridIcon from "./GridIcon";
import ListIcon from "./ListIcon";
import LocationMarker from "./LocationMarker";

const SelectGridMode = ({ onChange, viewType }) => {
    return (
        <div className="flex space-x-4">
            <span
                className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'grid' && 'opacity-75'])}
                onClick={() => onChange('grid')}
            >
                <GridIcon className="w-4 h-4" />
                <span>Vista de grilla</span>
            </span>
            <span
                className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'list' && 'opacity-75'])}
                onClick={() => onChange('list')}
            >
                <ListIcon className="w-4 h-4" />
                <span>Vista de lista</span>
            </span>
            <span
                className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'map' && 'opacity-75'])}
                onClick={() => onChange('map')}
            >
                <LocationMarker className="w-4 h-4" />
                <span>Ver en mapa</span>
            </span>
        </div>
    )
}

export default SelectGridMode;