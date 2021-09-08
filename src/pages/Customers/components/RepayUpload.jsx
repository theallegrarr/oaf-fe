import React, {useState} from 'react'
import { Modal, Button, Badge, Alert } from 'react-bootstrap'


export default function Example({ show, setShow, setCsvArray, setSeasonAmounts, summaries }) {
    const handleClose = () => setShow(false);
    const [csvFile, setCsvFile] = useState();

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        setCsvArray(newArray)
        setShow(false)
        determineSeasonDebts(newArray)
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            processCSV(text)
        }

        reader.readAsText(file);
    }

    // calculate available debts on each user
    const getDebt = (userId) => {
      const debts = []
      let lastSeason = 0
      for(let i=0; i<summaries.length; i++){
        if(summaries[i].CustomerID === Number(userId)){
          if(Number(summaries[i].SeasonID) < lastSeason){
            debts.unshift({ 
              season: summaries[i].SeasonID,
              customer: summaries[i].CustomerID,
              debt: Number(summaries[i].TotalCredit) - Number(summaries[i].TotalRepaid)
            })
          } else {
            debts.push({ 
              season: summaries[i].SeasonID,
              customer: summaries[i].CustomerID,
              debt: Number(summaries[i].TotalCredit) - Number(summaries[i].TotalRepaid)
            })
          }
          lastSeason=Number(summaries[i].SeasonID)
        }
      }
      return debts
    }

    // gather all payable debts
    const determineSeasonDebts = (arr) => {
      const repayments = []

      for(let i=0; i<arr.length; i++){
        // determine debts owed by person ordered from earliest to latest
        let customerDebts = getDebt(arr[i].CustomerID)
        let stillHave = arr[i].Amount
        customerDebts.forEach((item) => {
          if(stillHave > 0){
            if(Number(item.debt) < Number(stillHave)){
              repayments.push({
                SeasonID: item.season,
                Amount: item.debt,
                CustomerID: item.customer,
                Owe: 0
              })
              stillHave = Number(stillHave)-Number(item.debt)
            } else {
              repayments.push({
                SeasonID: item.season,
                CustomerID: item.customer,
                Amount: Number(stillHave),
                Owe: Number(item.debt)-Number(stillHave)
              })
              stillHave=0;
            }
          }
        })
      }
      console.log(repayments)
      setSeasonAmounts(repayments)
    }

    return (
      <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload CSV</Modal.Title>
          </Modal.Header>
          <Alert variant="info">
            Upload CSV containing payment information
          </Alert>
          <Badge bg="warning">
            <a href='/files/sample_file.csv' download>
                Download file sample
            </a>
          </Badge>
          <Modal.Body>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
                variant="primary"
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}>
              Review
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }