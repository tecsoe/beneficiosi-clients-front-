const DiscountCardIssuerRow = ({ cardIssuer }) => {

    console.log(cardIssuer);

    return (
        <div className="md:flex md:items-center md:space-y-0 space-y-2 md:justify-between shadow-xl p-4 rounded text-gray-500">
            <div className="text-center">
                <p>
                    <b>Imagen</b>
                </p>
                {
                    cardIssuer?.imgPath &&
                    <img className="m-auto md:m-0 w-20 h-14 rounded" src={`${process.env.REACT_APP_API_URL}/${cardIssuer?.imgPath}`} alt={cardIssuer?.name} />
                }
            </div>
            <div className="text-center">
                <p>
                    <b>Nombre</b>
                </p>
                <p>
                    {
                        cardIssuer?.name
                    }
                </p>
            </div>
            <div className="text-center">
                <p>
                    <b>Tipo</b>
                </p>
                <p>
                    {
                        cardIssuer?.cardIssuerType?.name
                    }
                </p>
            </div>
        </div>
    )
}

export default DiscountCardIssuerRow;