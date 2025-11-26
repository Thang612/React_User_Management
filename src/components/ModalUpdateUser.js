import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { toast } from 'react-toastify';
import { putEditUser } from "../services/UserService";

const ModalEditUser = (props) => {
    const { show, handleClose, dataEditUser, updateTableWhenUpdateUser } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = async(user) =>{
        const res = await putEditUser(name, job);
        if (res && res.createdAt){
            updateTableWhenUpdateUser({first_name: name})
            toast.success("Update User Sucess");
            handleClose();
            setName('');
            setJob('')
        }else{
            toast.error("Error Update User");
        }
    }

    useEffect(() =>{
        if(show){
            setName(dataEditUser.first_name)
        }
    },[dataEditUser, show])
    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextJob">
                        <Form.Label column sm="2">
                            Job
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Job" value={job} onChange={(e) => { setJob(e.target.value) }} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default ModalEditUser;