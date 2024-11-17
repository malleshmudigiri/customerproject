import React, { useEffect, useState } from 'react';
import LeftHeader from "../LeftHeader/index.js";
import "./index.css";
import { Link } from "react-router-dom";
import Header from "../Header/index.js";

const CustomerUpload = () => {
    const [jsonData, setJsonData] = useState('');
    const [uploadedData, setUploadedData] = useState([]);
    const [isClickedLoad, setClickedLoad] = useState(false);
    const [error, setError] = useState("");

    const validateJSON = (data) => {
        try {
            JSON.parse(data);
            return true;
        } catch (e) {
            return false;
        }
    };


    const handleFileChange = (e) => {
        const data = e.target.value;
        setJsonData(data);


    };
    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/customers');
        const customerList = await response.json();
        setUploadedData(customerList);

    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpload = async () => {
        setClickedLoad(true);

        if (jsonData && validateJSON(jsonData)) {
            const formObj = JSON.parse(jsonData);
            setUploadedData([...uploadedData, formObj]);


        }else {
            console.log("error");
        }

    };
    const handleClear=()=> {
        setClickedLoad(false);
        setError("");
        setJsonData("");
    }

    // Save data to the server
    const handleSave = () => {

            fetch('http://localhost:8080/api/savecustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uploadedData)
            })
                .then(response => response.json())
                .then(data => console.log('Success:', data))
                .catch(error => console.error('Error:', error));



    };

    return (
        <div className="uploadContainer">

            <table className="uploadTable">
                <thead>
                <tr>
                    <th colSpan="2"><Header/></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{textAlign: 'center', verticalAlign: 'middle', height: '400px'}}>
                        <LeftHeader/>
                    </td>
                    <td style={{height: '400px', verticalAlign: 'start'}} className="uploadForm" >

                            <div className="uploaTopSection">
                            <h1 className="uploadCustomerTab"><Link to="/">Home</Link> >> Upload Customer</h1>
                            <div className="teaxtAreaBtnsContainer">
                                <div className="teaxtAreaContainer">
                                    <h1 className="uploadCustomerHead">Upload Customer Data: </h1>
                                    <textarea
                                        value={jsonData}
                                        onChange={handleFileChange}
                                        placeholder="Enter customer JSON"
                                        rows="5"
                                        className="textarea"
                                    />
                                </div>
                                <div className="btnContainer">
                                    <button onClick={handleUpload} className="button">Load</button>
                                    <button onClick={handleSave} className="button">Save to DB</button>
                                    <button onClick={handleClear} className="button">Clear</button>
                                </div>
                            </div>
                            </div>
                            {(isClickedLoad) &&

                            <table className="customeListTable">
                                <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Customer Name</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                </tr>
                                </thead>
                                <tbody>
                                {uploadedData.map((customer) => (
                                    <tr key={customer.id}>
                                        <td >{customer.id}</td>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.gender}</td>
                                        <td>{customer.address}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            }




                    </td>

                </tr>

                </tbody>
            </table>


        </div>
    );
};

export default CustomerUpload;
