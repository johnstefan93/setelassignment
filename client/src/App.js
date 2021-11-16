import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [userList, setUserList] = useState([])

    const [newStatus, setNewStatus] = useState('')

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setUserList(response.data)
        })
    }, [])

    const submitReview = () => {
        Axios.post("http://localhost:3001/api/insert", {
            name: name,
            price: price,
            status: status,
        });
        setUserList([...userList, {
            name: name,
            price: price,
            status: status,
        },
        ]);
        window.location.reload(false);
    };

    const deleteUser = (name) => {
        Axios.delete(`http://localhost:3001/api/delete/${name}`)
    };

    const cancelUser = (name) => {
        Axios.put("http://localhost:3001/api/cancel", {
            name: name,
            status: newStatus,
        });
        setNewStatus("")
        window.location.reload(false);
    }

    const updateStatus = (name) => {
        Axios.put("http://localhost:3001/api/update", {
            name: name,
            status: newStatus,
        });
        setNewStatus("");
        window.location.reload(false);
    };

    return (
        <div className="App container p-5">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#createUserModal">
                    Create
                </button>
            </div>

            <div className="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModal"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="createUserModal">Create User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                                    <input type="text" className="form-control" name="name" aria-label="name"
                                           aria-describedby="basic-addon1" onChange={(e) => {
                                        setName(e.target.value)
                                    }} required/>
                                </div>

                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Price</span>
                                    <input type="text" className="form-control" name="price" aria-label="price"
                                           aria-describedby="basic-addon1" onChange={(e) => {
                                        setPrice(e.target.value)
                                    }} required/>
                                </div>

                                <div className="input-group input-group-sm mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                                    <select className="custom-select form-control" id="inputGroupSelect01"
                                            onChange={(e) => {
                                                setStatus(e.target.value)
                                            }}>
                                        <option value="No Status">Select Status Option</option>
                                        <option value="Created">Created</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={submitReview}>Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <table className="table mt-3 table-striped">
                <thead className="table-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col">Edit</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((val) => {
                    return <tr>
                        <td className="align-middle">{val.name}</td>
                        <td className="align-middle">{val.price}</td>
                        <td className="align-middle">{val.status}</td>
                        <td className="align-middle">{val.formatcreated}</td>
                        <td className="align-middle">{val.formatupdated}</td>
                        <td>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                <select className="custom-select form-control text-center" id="inputGroupSelect01"
                                        onChange={(e) => {
                                            setNewStatus(e.target.value)
                                        }}>
                                    <option value="No Status">Select Status Option</option>
                                    <option value="Created">Created</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <button className="btn btn-primary" onClick={() => {
                                    updateStatus(val.name)
                                }}>Update
                                </button>
                                <button className="btn btn-danger" onClick={() => {
                                    cancelUser(val.name)
                                }}>Cancel User
                                </button>
                            </div>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
