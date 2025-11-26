import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { toast } from 'react-toastify';
import { postCreateUser } from "../services/UserService";

const AddNewModal = (props) => {
    const { show, handleClose, handleAddUser } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async() => {
        let res = await postCreateUser(name, job);
        console.log(res)
        if (res && res.id){
            handleClose();
            setName('');
            setJob('');
            handleAddUser({id : res.id, first_name : name, email : `${name}@gmail.com`})
            toast.success('A user is created');
        }else{
            toast.error('Error create user');
        }
    }
    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
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
                <Button variant="primary" onClick={handleSaveUser}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default AddNewModal;