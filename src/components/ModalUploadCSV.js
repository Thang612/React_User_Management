import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

import {
    useCSVReader,
    lightenDarkenColor,
    formatFileSize,
} from 'react-papaparse';
import { toast } from 'react-toastify';
import { postCreateUser } from '../services/UserService';

const GREY = '#CCC';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
);
const GREY_DIM = '#686868';

const styles = {
    zone: {
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: GREY,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
    },
    file: {
        background: 'linear-gradient(to bottom, #EEE, #DDD)',
        borderRadius: 20,
        display: 'flex',
        height: 120,
        width: 120,
        position: 'relative',
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    info: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    size: {
        borderRadius: 3,
        marginBottom: '0.5em',
        justifyContent: 'center',
        display: 'flex',
    },
    name: {
        fontSize: 12,
        marginBottom: '0.5em',
    },
    progressBar: {
        bottom: 14,
        position: 'absolute',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    zoneHover: {
        borderColor: GREY_DIM,
    },
    default: {
        borderColor: GREY,
    },
    remove: {
        color: 'red',
        height: 23,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 23,
    },
};

const ModalUpload = (props) => {
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR
    );
    const { show, handleClose, handleAddUser } = props;
    const [dataFromCSV, setDataFromCSV] = useState();

    const handleAddUserFromCSV = () => {
        dataFromCSV.forEach((item)=>{
            setTimeout(()=>{
                handleSaveUser(item[1])
            }, 3000)
        })
    }

    const handleImportCSV = (results) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        let term = results.data.filter(item => emailRegex.test(item[0]))
        setDataFromCSV(term)
    }

    const handleDeleteData=(index) =>{
        const clone = _.cloneDeep(dataFromCSV);
        clone.splice(index + 1, 1); // +1 để skip header
        setDataFromCSV(clone);
    }

    const handleSaveUser = async(name) => {
        let res = await postCreateUser(name);
        console.log(res)
        if (res && res.id){
            handleAddUser({id : res.id, first_name : name, email : `${name}@gmail.com`})
            toast.success('A user is created');
        }else{
            toast.error('Error create user');
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Import User From CSV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CSVReader
                    config={{
                        skipEmptyLines: true
                    }}
                    onUploadAccepted={(results) => {
                        handleImportCSV(results);
                        setZoneHover(false);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setZoneHover(true);
                    }}
                    onDragLeave={(event) => {
                        event.preventDefault();
                        setZoneHover(false);
                    }}
                >
                    {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                        Remove,
                    }) => (
                        <>
                            <div
                                {...getRootProps()}
                                style={Object.assign(
                                    {},
                                    styles.zone,
                                    zoneHover && styles.zoneHover
                                )}
                            >
                                {acceptedFile ? (
                                    <>
                                        <div style={styles.file}>
                                            <div style={styles.info}>
                                                <span style={styles.size}>
                                                    {formatFileSize(acceptedFile.size)}
                                                </span>
                                                <span style={styles.name}>{acceptedFile.name}</span>
                                            </div>
                                            <div style={styles.progressBar}>
                                                <ProgressBar />
                                            </div>
                                            <div
                                                {...getRemoveFileProps()}
                                                style={styles.remove}
                                                onMouseOver={(event) => {
                                                    event.preventDefault();
                                                    setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                                                }}
                                                onMouseOut={(event) => {
                                                    event.preventDefault();
                                                    setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                                                }}
                                            >
                                                <Remove color={removeHoverColor} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    'Drop CSV file here or click to upload'
                                )}
                            </div>
                        </>
                    )}
                </CSVReader>
                {dataFromCSV &&
                    <div className="table__check w-full overflow-auto" Style="height:200px">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>
                                        <div >
                                            ID
                                        </div>
                                    </th>
                                    <th>Email</th>
                                    <th>
                                        <div >
                                            First Name
                                        </div>
                                    </th>
                                    <th>Last Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {dataFromCSV && dataFromCSV.length > 0 && dataFromCSV.slice(1).map((item, index) => {
                                    return (
                                        <tr key={`usersCSV-${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{item[0]}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={()=>handleDeleteData(index)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </Table>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddUserFromCSV}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUpload;