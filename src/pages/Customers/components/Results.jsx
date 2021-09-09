import React from "react";
import { Modal, Table } from "react-bootstrap";

export default function ResultTable({ repayments, reset, show, setShow }){
    const handleClose = () => {
        setShow(false)
        reset([])
    }

    return(
        <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Repayments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Repayment ID</th>
                        <th>Customer ID</th>
                        <th>Season ID</th>
                        <th>Amount</th>
                        <th>Total Repaid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        repayments && repayments.map((item, index) => (
                            <tr className={`${item.Owe === 0 ? 'green' : ''}`}key={index}>
                                <td>{item.RepaymentID}</td>
                                <td>{item.CustomerID}</td>
                                <td>{item.SeasonID}</td>
                                <td>{item.Amount}</td>
                                <td>{item.Repaid}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Modal.Body>
        </Modal>
    </>)
}