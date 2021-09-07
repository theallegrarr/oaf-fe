import React from "react"
import { Button } from "react-bootstrap"
import SummaryTable from "./components/Table"

export default function Summary(){

    return(<>
        <div className="head-row">
            <h1>Customers Summary</h1>
            <div className="d-flex flex-row space-between head-buttons">
                <Button className="mb-2">+ Upload</Button>
                <Button className="mb-2 ml-2 btn-danger">Sign Out</Button>
            </div>
        </div>
        <SummaryTable />
    </>)
}