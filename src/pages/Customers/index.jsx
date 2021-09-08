import React, {useState} from "react"
import { Button } from "react-bootstrap"

import RepayUpload from './components/RepayUpload'
import SummaryTable from "./components/Table"

export default function Summary(){
    const [show, setShow] = useState(false);
    const [csvArray, setCsvArray] = useState([]);
    const [seasonAmounts, setSeasonAmounts] = useState([]);
    const [summaries, setSummaries] = useState([])
    const sendRequest = () => {
        // send api call
    }

    return(<>
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
                            sendRequest()
                        }}
                    > + Confirm Request</Button>
                }
                <Button className="mb-2 ml-2 btn-danger">Sign Out</Button>
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