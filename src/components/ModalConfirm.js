import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, updateTableWhenDeleteUser } = props;
    const [email, setEmail] = useState("")

    useEffect(() =>{
        if (show){
            setEmail(dataUserDelete.email)
        }
    },[show, dataUserDelete])

    const handleDeleteUser = async()=>{
        const res = await deleteUser(dataUserDelete.id);
        if (res && res.statusCode){
            toast.success("Success delete user");
            updateTableWhenDeleteUser();
            handleClose();
        }else{
            toast.error("Error delete user")
        }
    }
    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Actions is not recovery. Do you want delet user with <b>email: {email}</b>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleDeleteUser}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default ModalConfirm;