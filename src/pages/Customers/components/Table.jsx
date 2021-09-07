import React, {useState, useEffect} from "react";
import { Button, Table } from "react-bootstrap";

import apiCall from "../../../api/request";

export default function SummaryTable(){
    const [summaries, setSummaries] = useState([])
    useEffect(() => {
        apiCall("GET","api/customers/all", (res) => {
            setSummaries(JSON.parse(res).data)
        })
    }, [])

    return(<Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Season ID</th>
                <th>Total Repaid</th>
                <th>Total Credit</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                summaries.map((item, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{item.CustomerID}</td>
                        <td>{item.CustomerName}</td>
                        <td>{item.SeasonID}</td>
                        <td>{item.TotalRepaid}</td>
                        <td>{item.TotalCredit}</td>
                        <Button primary className="m-1 btn-primary-">Repay</Button>
                    </tr>
                ))
            }
        </tbody>
    </Table>)
}