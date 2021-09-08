import React, { useEffect} from "react";
import { Table } from "react-bootstrap";

import apiCall from "../../../api/request";

export default function SummaryTable({ seasonAmounts, summaries, setSummaries }){
    useEffect(() => {
        apiCall("GET","api/customers/all", (res) => {
            setSummaries(JSON.parse(res).data)
        })
    }, [setSummaries])

    const AppendChange = ({c_id, s_id}) => {
        let item=``
        for(let i=0; i<seasonAmounts.length; i++){
            if(Number(seasonAmounts[i].CustomerID) === Number(c_id) &&
               Number(seasonAmounts[i].SeasonID) === Number(s_id)){
                item=`+ ${seasonAmounts[i].Amount}`
            }
        }
        return item === `` ? null : <p>{item}</p>
    }

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
                        <td className="d-flex justify-content-center">
                            {item.TotalRepaid} 
                            <AppendChange c_id={item.CustomerID} s_id={item.SeasonID} />
                        </td>
                        <td>{item.TotalCredit}</td>
                        <td className="m-1 btn-primary-">Repay</td>
                    </tr>
                ))
            }
        </tbody>
    </Table>)
}