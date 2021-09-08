import React, {useState} from "react"
import { Button } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify"
import { useHistory } from "react-router"

import RepayUpload from './components/RepayUpload'
import SummaryTable from "./components/Table"
import apiCall from "../../api/request";

export default function Summary(){
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [csvArray, setCsvArray] = useState([]);
    const [seasonAmounts, setSeasonAmounts] = useState([]);
    const [summaries, setSummaries] = useState([])

    const sendPaymentRequest = () => {
        // send api call
        makeToast("loading...", "info")
        apiCall("POST","api/customers/pay", seasonAmounts, () => {
            apiCall("GET","api/customers/all", {}, (res) => {
                setSummaries(JSON.parse(res).data)
                setSeasonAmounts([])
                setCsvArray([])
                makeToast("repayments complete")
            })
        })
    }

    const makeToast = (message, type) => {
        type === 'error' ?
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }) :
        type === 'info' ?
            toast.info(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
            : toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
    }

    return(<>
        <ToastContainer />
        <div className="head-row">
            <h1>Customers Summary</h1>
            <div className="d-flex flex-row space-between head-buttons">
                {
                    csvArray.length === 0 ? 
                    <Button
                        className="mb-2"
                        onClick={(e) => {
                            e.preventDefault()
                            setShow(!show)
                        }}
                    >+ Upload Payment Sheet</Button>
                    :
                    <Button
                        className="mb-2 btn-success"
                        onClick={(e) => {
                            e.preventDefault()
                            sendPaymentRequest()
                        }}
                    > + Confirm Request</Button>
                }
                <Button
                    className="mb-2 ml-2 btn-danger"
                    onClick={(e) => {
                        e.preventDefault()
                        localStorage.clear()
                        history.push("/")
                    }}>Sign Out</Button>
            </div>
        </div>
        <SummaryTable 
            csvArray={csvArray}
            summaries={summaries}
            setSummaries={setSummaries}
            seasonAmounts={seasonAmounts}
        />
        <RepayUpload 
            show={show}
            setShow={setShow}
            csvArray={csvArray}
            setCsvArray={setCsvArray}
            seasonAmounts={seasonAmounts}
            summaries={summaries}
            setSeasonAmounts={setSeasonAmounts}
        />
    </>)
}