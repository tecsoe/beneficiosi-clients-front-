import { useEffect, useState } from "react";
import usePayMethods from "../hooks/usePayMethods";
import Button from "./Button";
import CustomInput from "./CustomInput";
import { IoClose } from "react-icons/io5";
import { isRequired, validate } from "../helpers/formsValidations";
import useBankAccounts from "../hooks/useBankAccounts";
import ImgUploadInput from "./ImgUploadInput";


const PayMethodSection = ({ onChange, values, ...rest }) => {

    const [{ payMethods, error, loading }, getPayMethods] = usePayMethods({ options: { useCache: false } });

    const [banksAccounts, setBanksAccounts] = useState([]);

    const [bankTransfers, setBankTransfers] = useState([]);

    const [selectedBankAccountId, setSelectedBankAccountId] = useState("");

    const [paymentInfoForm, setPaymentInfoForm] = useState({ reference: "", amount: 0, image: null });

    const [errorsForm, setErrorsForm] = useState({
        reference: null,
        amount: null,
        image: null
    });

    const [{ bankAccounts: newBanksAccounts, numberOfPages, error: bankAccountsError, loading: bankAccountsLoading }, getBankAccounts] = useBankAccounts({ options: { manual: true, useCache: false } })

    useEffect(() => {
        if (selectedBankAccountId) {
            setBanksAccounts((oldBanksAccounts) => {
                return oldBanksAccounts.filter((account) => account.id === selectedBankAccountId);
            })
        }
        setBankTransfers([]);
    }, [selectedBankAccountId]);

    useEffect(() => {
        onChange({ target: { name: "bankTransfers", value: bankTransfers, type: "custom" } })
    }, [bankTransfers]);

    useEffect(() => {
        onChange({ target: { value: "", name: "bankAccountId", type: "checkbox" } });
        setSelectedBankAccountId("");
        getBankAccounts({
            params: {
                paymentMethodCode: values.paymentMethodCode
            }
        })
    }, [values.paymentMethodCode]);

    useEffect(() => {
        console.log(values.discountType);
        if (values?.discountType === "dit-001") {
            getPayMethods({
                params: {
                    codes: "pym-002"
                }
            })
        }

        if (values?.discountType === "dit-002") {
            getPayMethods({
                params: {
                    codes: "pym-004"
                }
            })
        }
    }, [values.discountType])

    useEffect(() => {
        setErrorsForm({
            reference: validate(paymentInfoForm.reference, [
                { validator: isRequired, errorMessage: "La referencia es obligatoria." },
            ]),
            amount: validate(paymentInfoForm.amount, [
                { validator: isRequired, errorMessage: "El monto es obligatorio." },
            ]),
            image: validate(paymentInfoForm.image, [
                { validator: isRequired, errorMessage: "El comprobante es obligatorio" },
            ]),
        });
    }, [paymentInfoForm])

    const handleChange = (e, banksAccounts) => {
        onChange(e);
        setBanksAccounts(banksAccounts);
    }

    const handleBankAccount = (e) => {
        setSelectedBankAccountId(Number(e.target.value));
    }

    const handlePaymentChange = (e) => {
        setPaymentInfoForm((oldPaymentInfoForm) => {
            return {
                ...oldPaymentInfoForm,
                [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let errors in errorsForm) {
            if (errorsForm[errors] != null) {
                alert(errorsForm[errors]);
                return;
            }
        }

        setBankTransfers((oldBankTransfers) => {
            return [...oldBankTransfers, { ...paymentInfoForm, bankAccountId: selectedBankAccountId }]
        })
    }

    const handleRemove = (bankTransfer) => {
        setBankTransfers((oldBankTransfers) => {
            return [...oldBankTransfers.filter(oldBankTransfers => oldBankTransfers !== bankTransfer)];
        });
    }

    return (
        <div {...rest} className="my-6 border-b p-4 animate__animated animate__fadeInUp">
            <h2 className="text-2xl mb-4">
                Seleccione el metodo de pago:
            </h2>
            {
                loading ?
                    <div className="text-main text-xl">
                        Cargando...
                    </div>
                    :
                    <div>
                        <div className="md:flex md:space-y-0 space-y-6 items-center justify-between mb-4">
                            {
                                error &&
                                <div className="text-center w-full text-red-500">
                                    Ha ocurrido un error.
                                    <p className="border-b border-red-500 cursor-pointer" onClick={() => { getPayMethods() }}>Reintentar</p>
                                </div>
                            }

                            {
                                payMethods?.map((payMethod, i) => {
                                    return (
                                        <div key={i} className="md:w-4/12">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    name="paymentMethodCode"
                                                    id={`payment-${payMethod.code}`}
                                                    checked={values.paymentMethodCode === payMethod.code}
                                                    value={payMethod.code}
                                                    onChange={(e) => { handleChange(e, payMethod.bankAccounts) }} />
                                                <label className="capitalize text-center space-x-4" htmlFor={`payment-${payMethod.code}`}>
                                                    {
                                                        payMethod.imgPath &&
                                                        <img className="h-12 w-16 rounded md:m-auto" src={`${process.env.REACT_APP_API_URL}${payMethod.imgPath}`} alt={payMethod.name} />
                                                    }
                                                    <p>{payMethod.name}</p>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {
                                values.paymentMethodCode ?
                                    values.paymentMethodCode !== "pym-002" ?
                                        <div className="space-y-4 animate__animated animate__fadeInUp mt-8">
                                            <p className="text-center text-gray-500 text-xl">Ya puede proceder a realizar el pedido.</p>
                                            <p>
                                                <b>Nota: </b>
                                                Recuerde que al momento de pagar debera tener el numero de pedido a la mano. Este se le entregará al crear el pedido. De esta manera la tienda sabra el monto que se le cobrará al momento de pagar.
                                            </p>
                                        </div>
                                        :
                                        <div className="mt-8 animate__animated animate__fadeInUp">
                                            {
                                                !selectedBankAccountId &&
                                                <h3 className="mb-2 text-gray-500 font-bold">Por favor seleccione la cuenta a la cual va a pagar:</h3>
                                            }
                                            {
                                                bankAccountsError ?
                                                    <div className="text-red-500 text-center">
                                                        <p>Ha ocurrido un error.</p>
                                                        <Button>
                                                            Reintentar
                                                        </Button>
                                                    </div>
                                                    :
                                                    bankAccountsLoading ?
                                                        <div className="text-center text-gray-500 text-xl">
                                                            Obteniendo cuentas...
                                                        </div>
                                                        :
                                                        newBanksAccounts?.length > 0 ?
                                                            newBanksAccounts?.map((bankAccount, i) => {
                                                                return (
                                                                    <div key={i} className="m-auto md:m-0 flex justify-center md:justify-none shadow-xl space-y-8 md:p-0 p-8 items-center md:space-x-8">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="bankAccountId"
                                                                            id={`bank-account-${bankAccount.id}`}
                                                                            checked={selectedBankAccountId === bankAccount.id}
                                                                            value={bankAccount.id}
                                                                            onChange={handleBankAccount} />
                                                                        <label className="md:flex items-center justify-between md:space-x-8" htmlFor={`bank-account-${bankAccount.id}`}>
                                                                            <div className="text-center">
                                                                                {
                                                                                    bankAccount?.cardIssuer?.imgPath &&
                                                                                    <img className="md:m-0 m-auto h-12 w-16 rounded" src={`${process.env.REACT_APP_API_URL}/${bankAccount?.cardIssuer?.imgPath}`} alt="" />
                                                                                }
                                                                                {bankAccount?.cardIssuer?.name}
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <b>Alias</b>
                                                                                <p>{bankAccount.alias}</p>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <b>Nro. de cuenta</b>
                                                                                <p>{bankAccount?.accountNumber}</p>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <b>Oficina</b>
                                                                                <p>{bankAccount?.branchOffice}</p>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <b>CBU</b>
                                                                                <p>{bankAccount?.cbu}</p>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                            :
                                                            <div className="text-red-500 text-xl">
                                                                No hay cuentas disponibles para este metodo de pago.
                                                            </div>
                                            }
                                        </div>
                                    :
                                    <div>
                                        Seleccione un metodo de pago.
                                    </div>
                            }
                        </div>
                        {
                            selectedBankAccountId &&
                            <div className="mt-8">
                                <h3 className="text-lg">Agregue la información del pago</h3>
                                {
                                    bankTransfers.map((bankTransfer, i) => {
                                        return (
                                            <div key={i} className="animate__animated animate__fadeInLeft flex items-center mt-4 space-x-8">
                                                <div>
                                                    {bankTransfer?.reference}
                                                </div>
                                                <div>
                                                    {bankTransfer?.amount}
                                                </div>
                                                <div>
                                                    {bankTransfer?.image?.name}
                                                </div>
                                                <div>
                                                    <Button type="button" onClick={(e) => { handleRemove(bankTransfer) }} className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                        <IoClose></IoClose>
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <form onSubmit={handleSubmit}>
                                    <h1 className="text-xl mt-4 md:hidden text-main font-bold">
                                        Monto a transferir: $ {values?.total}
                                    </h1>
                                    <div className="md:flex space-y-4 md:space-y-0 md:items-center mt-4 md:space-x-8">
                                        <div>
                                            <label htmlFor="reference">Referencia</label>
                                            <CustomInput
                                                id="reference"
                                                onChange={handlePaymentChange}
                                                value={paymentInfoForm.reference}
                                                placeholder="Referencia..."
                                                name="reference" />
                                            {
                                                errorsForm.reference &&
                                                <p className="text-red-500 truncate">{errorsForm.reference}</p>
                                            }
                                        </div>
                                        <div>
                                            <label htmlFor="amount">Monto</label>
                                            <CustomInput
                                                id="amount"
                                                step="0.01"
                                                type="number"
                                                onChange={handlePaymentChange}
                                                value={paymentInfoForm.amount}
                                                placeholder="Monto..."
                                                name="amount" />
                                            {
                                                errorsForm.amount &&
                                                <p className="text-red-500">{errorsForm.amount}</p>
                                            }
                                        </div>
                                        <div className="md:w-1/3">
                                            <p className="text-sm text-gray-500">Tamaño maximo: <b>3MB</b></p>
                                            <ImgUploadInput name="image" change={handlePaymentChange} className="h-16" description="Comprobante" />
                                            {
                                                errorsForm.image &&
                                                <p className="text-red-500 truncate">{errorsForm.image}</p>
                                            }
                                        </div>
                                        <div>
                                            <Button className="bg-main transition duration-500 hover:bg-white hover:text-main">
                                                Aceptar
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
            }
        </div >
    )
}

export default PayMethodSection;