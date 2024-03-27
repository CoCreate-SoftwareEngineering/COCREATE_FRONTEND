import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { ref, uploadBytes } from 'firebase/storage';
import { storage, auth } from '../../auth/FireBase-config'; 
import './FileUpload.css';


const FileUpload = ({onUploadSuccess, currentPath}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('Choose file'); // Initialized with 'Choose file'
    const [folderName, setFolderName] = useState(''); // For storing the folder name
    const fileInputRef = useRef(null);
    let location = useLocation();
    const [path] = useState(location.pathname)

    const triggerFileInput = () => {
        fileInputRef.current.click(); // Programmatically clicks the hidden file input
    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setFile(files[0]);
            setFileName(files[0].name); // Update the state with the new file name            
        } else {
            setFileName('Choose file'); // Revert to default text if no file is chosen
        }
    };

    const handleFolderNameChange = (e) => {
        setFolderName(e.target.value);
    };



    const createFolder = async () => {
        if (!auth.currentUser) {
            console.error('No user logged in');
            return;
        }
        if (folderName.trim()) {
            // Construct the full path for folder creation using currentPath
            const folderPath = `${currentPath}/${folderName}/.placeholder`; 
            try {
                await uploadBytes(ref(storage, folderPath), new Blob(["Placeholder for folder creation"], { type: 'text/plain' }));
                console.log('Folder created successfully');
                setFolderName(""); // Clear the folder name input field
                onUploadSuccess && onUploadSuccess();
            } catch (error) {
                console.error('Error creating folder:', error);
            }
        } else {
            console.log('Folder name is empty');
        }
    };


    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setFile(null); // Clear the file from state
        setFileName('Choose file'); // Reset the file name to the default message
    };

    
    const handleUpload = async () => {
        if (!auth.currentUser) {
            console.log('No user logged in');
            return;
        }
    
        if (file) {
            // Always upload the file to the current path, ignoring the folderName input for file uploads
            const filePath = `${currentPath}/${folderName ? folderName + '/' : ''}${file.name}`;
            const fileRef = ref(storage, filePath);
    
            try {
                await uploadBytes(fileRef, file);
                console.log('File uploaded successfully');
                setFileName('Choose File'); // Reset the file name after successful upload
                resetFileInput(); // Reset the file input to clear the selected file
    
                 // Optionally trigger the refresh to show the newly uploaded file
                if (onUploadSuccess) {
                    onUploadSuccess();
                }
    
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log('No file selected');
        }
    };
    

    return (
        <div className='upload-div'>
            
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    style={{ display: 'none' }} // Hide the actual input
                />
                <div className="custom-file-input" onClick={triggerFileInput}>
                    {fileName} {/* Display "Choose file" or the file name */}
                </div>
            
            <button className='upload-button' onClick={handleUpload}>Upload File</button>

            <input
                type="text"
                placeholder="Folder Name"
                value={folderName}
                onChange={handleFolderNameChange}
            />            
            <button className='folder-button' onClick={createFolder}>Create Folder</button>
        </div>
    );
};

export default FileUpload;
