import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../services/UserService';
import Spinner from 'react-bootstrap/Spinner';
import ReactPaginate from 'react-paginate';
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
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getUsers(1)
    }, [])

    const getUsers = async (page) => {
        setIsLoading(true);
        const res = await fetchAllUsers(page);
        if (res && res.data) {
            console.log(res)
            setUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            setIsLoading(false);
        }
    }

    const handlePageClick = (event) => {
        // console.log(event)
        getUsers(+event.selected +1)
    }
    return (<>
        <Table striped bordered hover className="mt-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
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
    </>)
}

export default TableUsers;