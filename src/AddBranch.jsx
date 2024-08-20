

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { TextField, Snackbar, Alert } from '@mui/material';



const AddBranch = ({ branch, onClose, fetchBranches }) => {
    const [name, setName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');
    const [organizationId, setOrganizationId] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [notification] = useState(null);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (branch) {
            setName(branch.name);
            setPhoneNumber(branch.phone_number || '');
            setAddress(branch.address || '');
            setStatus(branch.status);
            setOrganizationId(branch.organizationId || '');
        }
    }, [branch]);

    useEffect(() => {
        axios.get('http://localhost:9999/allorganizations')
            .then(response => {
                setOrganizations(response.data);
            })
            .catch(error => console.error('Error fetching organizations:', error));
    }, []);

    const validateField = (field, value) => {
        let error;
        const nameRegex = /^[A-Za-z\s]{3,50}$/;
        const phoneRegex = /^\d{10}$/;

        switch (field) {
            case 'name':
                if (!value || !nameRegex.test(value)) {
                    error = 'Branch name should be 3 to 50 characters long and contain only alphabets and spaces.';
                }
                break;
            case 'phone_number':
                if (!value || !phoneRegex.test(value)) {
                    error = 'Phone number should be exactly 10 digits.';
                }
                break;
            case 'address':
                if (!value) {
                    error = 'Address must be entered.';
                }
                break;
            case 'status':
                if (!value) {
                    error = 'Status must be selected.';
                }
                break;
            case 'organizationId':
                if (!branch && !value) {
                    error = 'Organization must be selected.';
                }
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        const branchData = {
            name,
            phone_number,
            address,
            status
        };

        const config = branch
            ? {
                method: 'put',
                url: `http://localhost:9999/branchupdate/${branch.branch_Id}`
            }
            : {
                method: 'post',
                url: `http://localhost:9999/save/${organizationId}`
            };

        try {
            const response = await axios({
                ...config,
                data: branchData
            });

            if (response.status === 200) {
                setSnackbarMessage(branch ? 'Branch updated successfully!' : 'Branch added successfully!');
                setSnackbarOpen(true);
                resetForm();
                onClose();
                fetchBranches();
            } else {
                console.error('Error saving branch:', response.data);
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error saving branch:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setPhoneNumber('');
        setAddress('');
        setStatus('');
        setOrganizationId('');
        setErrors({});
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    const handleBlur = (field, value) => {
        validateField(field, value);
    };

    const handleChange = (field, value) => {
        setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'phone_number':
                setPhoneNumber(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'status':
                setStatus(value);
                break;
            case 'organizationId':
                setOrganizationId(value);
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z\s]{3,50}$/;
        const phoneRegex = /^\d{10}$/;

        if (!name || !nameRegex.test(name)) {
            newErrors.name = 'Branch name should be 3 to 50 characters long and contain only alphabets and spaces.';
        }

        if (!phone_number || !phoneRegex.test(phone_number)) {
            newErrors.phone_number = 'Phone number should be exactly 10 digits.';
        }

        if (!address) {
            newErrors.address = 'Address must be entered.';
        }

        if (!status) {
            newErrors.status = 'Status must be selected.';
        }

        if (!branch && !organizationId) {
            newErrors.organizationId = 'Organization must be selected.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isSaveDisabled = !name || !phone_number || !address || !status || (!branch && !organizationId);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="p-4" style={{ width: '100%', marginTop: '38px' }}>
            {notification && (
                <div className="alert alert-success" role="alert">
                    {notification}
                </div>
            )}
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0" style={{ marginLeft: '1rem' }}>{branch ? 'Edit Branch' : 'Add Attendence'}</h5>
                <select className="form-select" style={{ width: '30%' }} value={status} onChange={(e) => handleChange('status', e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <hr />
            {!branch && (
                <div className="mb-3 form-floating">
                    <select
                        className={`form-select ${errors.organizationId ? 'is-invalid' : ''}`}
                        id="organizationId"
                        value={organizationId}
                        onChange={(e) => handleChange('organizationId', e.target.value)}
                        onBlur={(e) => handleBlur('organizationId', e.target.value)}
                    >
                        <option value="">Select Organization</option>
                        {organizations.map(org => (
                            <option key={org.organizationId} value={org.organizationId}>{org.name}</option>
                        ))}
                    </select>
                    {errors.organizationId && <div className="invalid-feedback">{errors.organizationId}</div>}
                </div>
            )}
            <TextField
                label="Branch Name"
                variant="outlined"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={(e) => handleBlur('name', e.target.value)}
                fullWidth
                className="mb-3"
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                label="Phone Number"
                variant="outlined"
                value={phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
                onBlur={(e) => handleBlur('phone_number', e.target.value)}
                fullWidth
                className="mb-3"
                error={!!errors.phone_number}
                helperText={errors.phone_number}
            />
            <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => handleChange('address', e.target.value)}
                onBlur={(e) => handleBlur('address', e.target.value)}
                fullWidth
                multiline
                rows={4}
                className="mb-3"
                error={!!errors.address}
                helperText={errors.address}
            />
            <div className="d-flex justify-content-start mt-3">
                <button
                    style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
                    className="btn me-2"
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                >
                    <span
                        className="circle"
                        style={{
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '1px solid green',
                            marginRight: '8px',
                            backgroundColor: 'green'
                        }}
                    >
                        <FaCheck style={{ color: 'white', fontSize: '12px' }} />
                    </span>
                    {branch ? 'Update' : 'Save'}
                </button>
                <button
                    style={{ backgroundColor: 'lightgrey', display: 'flex', alignItems: 'center' }}
                    className="btn"
                    onClick={handleCancel}
                >
                    <span
                        className="circle"
                        style={{
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '1px solid red',
                            marginRight: '8px',
                            backgroundColor: 'red'
                        }}
                    >
                        <FaTimes style={{ color: 'white', fontSize: '12px' }} />
                    </span>
                    Cancel
                </button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AddBranch;
