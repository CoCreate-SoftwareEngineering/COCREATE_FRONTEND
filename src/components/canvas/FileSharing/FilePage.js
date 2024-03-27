import React, { useState, useEffect, useRef } from 'react';
import ContentView from './ContentView';
import FileUpload from './FileUpload';
import './FilePage.css'
import '../Modal.css'
import { useLocation } from 'react-router';
import { ref, deleteObject, listAll, uploadBytes } from 'firebase/storage';
import { storage, auth } from '../../auth/FireBase-config'

const FilesList = ({ onClose, show, clickedFiles, onUploadSuccess, roomId, roomName }) => {
  const [currentPath, setCurrentPath] = useState(roomId);  
  const [pathStack, setPathStack] = useState([]);  
  const [refresh, setRefresh] = useState(false) // state to trigger refresh
  const [markedFiles, setMarkedFiles] = useState(false)
  const [folderExists, setFolderExists] = useState(false);
  const [folderName, setFolderName] = useState(''); // For storing the folder name
  
  // get url "gives /project"
  let location = useLocation();
  // sets initial path to group url
  const [initialPath] = useState(roomId)
  console.log(initialPath)

  const checkForGroupFolder = async (path) => {
    const folderRef = ref(storage, path)
    try {
      const result = await listAll(folderRef);
      // Check if there are any items or subdirectories
      if (result.items.length > 0 || result.prefixes.length > 0){
        setFolderExists(true);
        console.log("Folder exists: ", path)
      } else{
        setFolderExists(false)
        console.log("Folder does not exist: ", path)        
      } 
    }catch (error) {
      console.error("Error checking folder existence: ", error)
      setFolderExists(false);
    }
  }
  const setGroupFolderName = (e) => {
    setFolderName(initialPath);
};
      
const createGroupFolder = async () => {
  if (!auth.currentUser) {
      console.log('No user logged in');
      return;
  }    

  const placeholder = new Blob(["This is a placeholder for folder creation"], {type: 'text/plain'});
  // Use initialPath directly, assuming it's the full path to the folder to ensure/create
  const folderPath = `${initialPath}/.placeholder`; // Adjust if initialPath handling changes

  try {
      const folderRef = ref(storage, folderPath);
      await uploadBytes(folderRef, placeholder);        
      console.log('Folder placeholder created successfully');
  } catch (error) {
      console.error('Error creating folder placeholder:', error);
  }
}


  useEffect(() => {

    if (initialPath && !folderExists) {      
      checkForGroupFolder(initialPath)
      createGroupFolder(initialPath)      
    }        

  }, [show, initialPath, folderExists]);

  

  // to delete folders that contain folders 
  const deleteFilesAndFoldersRecursively = async (folderPath) => {
    try {
      const folderRef = ref(storage, folderPath);
      const listResult = await listAll(folderRef);
  
      // Recursively delete files and folders
      for (const item of listResult.items) {
        const itemPath = `${folderPath}/${item.name}`;
        await deleteObject(ref(storage, itemPath));
      }
  
      // Recursively delete nested folders
      for (const prefix of listResult.prefixes) {
        const nestedFolderPath = `${folderPath}/${prefix.name}`;
        await deleteFilesAndFoldersRecursively(nestedFolderPath);
      }
  
      // Check if the current folder path still exists after deleting its contents
      const updatedListResult = await listAll(folderRef);
      if (updatedListResult.items.length === 0 && updatedListResult.prefixes.length === 0) {
        // The folder path is empty, so we don't need to delete it explicitly
        console.log(`Folder ${folderPath} is empty after deleting its contents.`);
      } else {
        // There are still items or prefixes in the folder path, so we delete it
        await deleteObject(folderRef);
      }
    } catch (error) {
      console.error(`Error deleting folder ${folderPath} and its contents:`, error);
    }
  };
  

  // NOTE: don't include files with a '.' in the file name
  const deleteFiles = async () => {
    for (const filePath of markedFiles) {
      if (filePath === undefined) {
        console.error('Encountered undefined filePath, skipping...');
        continue; // Skip this iteration of the loop
      }

      const isFolder = !filePath.includes('.');
      if (isFolder) {
        // Get the folder name from the filePath
        const folderName = filePath.split('/').pop();
        await deleteFilesAndFoldersRecursively(`${currentPath}/${folderName}`);
      } else {
        const fileRef = ref(storage, filePath);
        try {
          await deleteObject(fileRef);
          console.log(`File deleted: ${filePath}`);
        } catch (error) {
          console.error(`Error deleting file ${filePath}:`, error);
        }
      }
    }
    refreshContent();
    setMarkedFiles([]);
  };

  // give all files marked for deletion
  const handleClickedFilesChange = (updatedClickedFiles) => {
    setMarkedFiles(updatedClickedFiles);
  };


  
  const refreshContent = () => {
    setRefresh(prev => !prev); // Toggle the state to trigger a refresh
  };  
  
  const navigateIntoFolder = (folderName) => {
    setPathStack(prevStack => [...prevStack, currentPath]);
    setCurrentPath(`${currentPath}/${folderName}`);
    refreshContent()
  };

  const navigateBack = () => {
    const prevPath = pathStack.pop();
    setPathStack([...pathStack]);
    setCurrentPath(prevPath || initialPath);
    refreshContent()
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content-file" onClick={e => e.stopPropagation()}>
      <div className="modal-header-file">
      <div className="header-content-file"> {/* New wrapper using Flexbox */}
        <h4 className="modal-title-file">
          {/* Ignore This */}
          {/* {!folderExists && (
              <div>Folder Does Not Exist</div>              
            )} */}
          {roomName}
        </h4>
        <button className='refresh-button' onClick={refreshContent} style={{ marginLeft: '10px', padding: '0 5px', width: '30px', height: '30px', backgroundColor: 'none'}}>
          
        </button>
        <FileUpload onUploadSuccess={refreshContent} currentPath={currentPath} />
      </div>
      
    </div>

        <div className="modal-body-file">
        <ContentView
          currentPath={currentPath}
          navigateIntoFolder={navigateIntoFolder}
          navigateBack={navigateBack}
          refreshTrigger={refresh} // Pass the refreshTrigger as a prop
          onClickedFilesChange ={handleClickedFilesChange}
        />
        </div>
        <div className="modal-footer-file">          
          {currentPath !== initialPath && (
            <button onClick={navigateBack} style={{ marginRight: 'auto', height: '30px', width: '85px', fontSize: '18px' }}>Back</button>
          )}
          
          {/* If a file is marked for deletion */}
          {markedFiles.length > 0 ? (
            <button
              style={{ height: '30px', width: '85px', fontSize: '18px', marginRight: '10px' }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the modal from closing if necessary
                deleteFiles();
              }}
            >
              Delete
            </button>
          ) : null}
          <button style={{height: '30px', width: '85px', fontSize: '18px'}} onClick={onClose}>Close</button>
          
        </div>
      </div>
    </div>
  );
};


export default FilesList;
