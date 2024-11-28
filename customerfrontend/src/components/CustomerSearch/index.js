import { useEffect, useState } from 'react';
import ExportTable from '../ExportTable/index.js';
import './index.css';
import LeftHeader from "../LeftHeader/index.js";
import Header from "../Header/index.js";
import { Link } from "react-router-dom";

const CustomerSearch = () => {

    const [filter, setFilter] = useState({ name: '', gender: '' });
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isSearchBtn, setSearchBtn] = useState(false);
    const [errors, setErrors] = useState("");


    const fetchData = async () => {
     const {name, gender}=filter;
        let url = 'http://localhost:8080/api/filter';

        const params = new URLSearchParams();

        if (name) {
            params.append('customerName', name);
        }
        if (gender) {
            params.append('gender', gender);
        }
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        try {

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const customerList = await response.json();
                setFilteredCustomers(customerList);
            }
        }catch {
            setErrors('Error fetching data');
        }

    };


    const onSearch=()=> {
        const {name, gender}=filter;
            fetchData();
            setSearchBtn(true);
    }


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));

    };


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
                                        <option selected ></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="searchBtnContainer">
                                <button className="searchBtn" onClick={onSearch}>Search</button>
                                <ExportTable filter={filter}/>
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
                        {(isSearchBtn && filteredCustomers.length===0)  &&
                            <div className="noDataFound">
                                <h1>No Data Found</h1>
                            </div>
                        }

                        {errors &&
                            <div className="noDataFound">
                                <h1>{errors}</h1>
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
