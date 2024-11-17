import React, { useEffect, useState } from 'react';
import ExportTable from '../ExportTable/index.js';
import './index.css';
import LeftHeader from "../LeftHeader/index.js";
import Header from "../Header/index.js";
import { Link } from "react-router-dom";

const CustomerSearch = () => {

    const [filter, setFilter] = useState({ name: '', gender: 'All' });
    const [customers, setUpCustomerList] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isSearchBtn, setSearchBtn] = useState(false);


    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/customers');
        const customerList = await response.json();
        setUpCustomerList(customerList);

    };

    useEffect(() => {
        fetchData();
    }, []);
const clearedFilteredData=()=> {
    if (filteredCustomers.length === 0) {
        setSearchBtn(false);
    } else {
        setSearchBtn(true);
    }
}
    const onSearch=()=> {
        clearedFilteredData();

        if (customers.length > 0) {
            setSearchBtn(true)
            setFilteredCustomers(
                customers.filter((customer) => {

                    const nameMatch = customer.customerName && customer.customerName.toLowerCase().includes(filter.name.toLowerCase());

                    const genderMatch =
                        filter.gender === 'All' || customer.gender.toLowerCase() === filter.gender.toLowerCase();
                    return nameMatch && genderMatch;
                })
            );
        }
    }




    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));

    };
    console.log(filteredCustomers);

    return (
        <div className="searchContainer">
            <table className="searchTable">
                <thead>
                <tr>
                    <th colSpan="2"><Header /></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '300px' }}>
                        <LeftHeader />
                    </td>
                    <td style={{ height: '300px' }} className="customerSearchData">
                        <div className="searchInputContainer">
                            <h1 className="searchCustomerTab"><Link to="/">Home</Link> >> Search Customer</h1>
                            <div className="searchElContainer">
                                <div className="searchInput">
                                    <label>Customer Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={filter.name}
                                        onChange={handleFilterChange}
                                        className="InputEl"
                                    />
                                </div>
                                <div>
                                    <label>Gender:</label>
                                    <select
                                        name="gender"
                                        value={filter.gender}
                                        onChange={handleFilterChange}
                                        className="InputEl"
                                    >
                                        <option value="All">All</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="searchBtnContainer">
                                <button className="searchBtn" onClick={onSearch}>Search</button>
                                <ExportTable />
                            </div>
                        </div>
                        {filteredCustomers.length>0 &&
                        <table className="customerfilteredList">
                            <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Customer Name</th>
                                <th>Gender</th>
                                <th>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.customerName}</td>
                                    <td>{customer.gender}</td>
                                    <td>{customer.address}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        }
                        {filteredCustomers.length===0  &&
                            <div className="noDataFound">
                                <h1>No Data Found</h1>
                            </div>
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CustomerSearch;
