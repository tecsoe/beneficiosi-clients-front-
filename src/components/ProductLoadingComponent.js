const ProductLoadingComponent = () => {
    return (
        <div>
            <div className="flex space-x-6">
                <div className="w-1/2">
                    <div className="h-[60vh] custom-skeleton mb-4 rounded-xl">

                    </div>
                    <div className="text-center custom-skeleton h-16 w-16 m-auto rounded-xl">

                    </div>
                </div>
                <div className="w-1/2">
                    <div className="h-12 custom-skeleton rounded" />
                    <div className="h-8 mt-2 w-1/3 custom-skeleton rounded" />
                    <div className="h-4 mt-2 w-1/3 custom-skeleton rounded" />

                    <div className="h-28 mt-4 custom-skeleton rounded" />

                    <div className="h-20 mt-4 custom-skeleton rounded" />
                </div>
            </div>

            <div className="h-12 custom-skeleton rounded mt-4" />

            <div className="h-56 custom-skeleton rounded mt-4" />
        </div>
    )
}

export default ProductLoadingComponent;