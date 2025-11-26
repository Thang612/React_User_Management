import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../services/UserService';
import Spinner from 'react-bootstrap/Spinner';
import ReactPaginate from 'react-paginate';
import AddNewModal from './ModalAddNew';
import ModalEditUser from './ModalUpdateUser';
import ModalConfirm from './ModalConfirm';

// {
//     "id": 7,
//     "email": "michael.lawson@reqres.in",
//     "first_name": "Michael",
//     "last_name": "Lawson",
//     "avatar": "https://reqres.in/img/faces/7-image.jpg"
// }

const TableUsers = (props) => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    //Quản lý modal
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
    const [dataEditUser, setDataEditUser] = useState();
    const [dataUserDelete, setDataUserDelete] = useState();
    //End quản lý modal
    
    const handleClose = () => {
        setIsShowModalAddNew(false);
    }

    const handleAddUser = (name) => {
        setUsers([name,...users]) 
    }

    useEffect(() => {
        getUsers(1)
    }, [])

    const getUsers = async (page) => {
        setIsLoading(true);
        const res = await fetchAllUsers(page);
        if (res && res.data) {
            console.log(res)
            setUsers(res.data)
            setTotalPages(res.total_pages)
            setIsLoading(false);
        }
    }

    const handlePageClick = (event) => {
        // console.log(event)
        getUsers(+event.selected + 1)
    }

    const handleEditUser = (user)=>{
        setDataEditUser(user);
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (user)=>{
        setDataUserDelete(user);
        setIsShowModalConfirm(true);
    }

    const handleEditClose = () =>{
        setIsShowModalEdit(false);
    }

     const handleConfirmClose = () =>{
        setIsShowModalConfirm(false);
    }

    const updateTableWhenUpdateUser = (user) =>{
        let cloneUsers = [...users];
        let index = cloneUsers.findIndex(item => item.id === dataEditUser.id)
        cloneUsers[index].first_name = user.first_name;
        setUsers(cloneUsers);
        console.log(">>Check Clone: ",cloneUsers);
    }

    const updateTableWhenDeleteUser = () =>{
        let cloneUsers = [...users];
        cloneUsers = cloneUsers.filter(item => item.id !== dataUserDelete.id)
        setUsers(cloneUsers);
        console.log(">>Check Clone: ",cloneUsers);
    }

    return (<>
        <div className='d-flex justify-content-between mt-3'>
            <span><b>List Users: </b></span>
            <button className='btn btn-success' onClick={() => { setIsShowModalAddNew(true) }}>Add new user</button>
        </div>
        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {isLoading && <Spinner animation="border" />}
                {users && users.length > 0 && users.map((item, index) => {
                    return (
                        <tr key={`users-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>
                                <button className="btn btn-warning mx-3" onClick={()=>handleEditUser(item)}>Edit</button>
                                <button className='btn btn-danger' onClick={()=>handleDeleteUser(item)}>Delete</button>   
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"

            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />
        <AddNewModal handleAddUser={handleAddUser} show={isShowModalAddNew} handleClose={handleClose} />
        <ModalEditUser show={isShowModalEdit} dataEditUser={dataEditUser} handleClose={handleEditClose} updateTableWhenUpdateUser={updateTableWhenUpdateUser}/>
        <ModalConfirm show={isShowModalConfirm} dataUserDelete={dataUserDelete} handleClose={handleConfirmClose} updateTableWhenDeleteUser={updateTableWhenDeleteUser}/>
    </>)
}

export default TableUsers;