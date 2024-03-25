import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { storage, auth } from '../auth/FireBase-config';
import ImageButton from './DeleteButton';
import './Modal.css';
import AuthComponent from '../auth/FireBase-auth';


const ContentView = ({ currentPath, navigateIntoFolder, navigateBack, refreshTrigger, onClickedFilesChange }) => {
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null); // Track the selected file URL for viewing    
    const [clickedFiles, setClickedFiles] = useState([]) // store files for deletion
    const [authModal, showAuthModal] = useState(false)
    

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserLoggedIn(!!user);
            if (user) {
                fetchFilesAndFolders();
            } else {
                showAuthModal(true)
            }
        });

        return () => {
            unsubscribe();
        };
    }, [currentPath, refreshTrigger]);

    const handleFileClick = (filePath, name) => {
        setClickedFiles(prevFiles => {
            const index = prevFiles.indexOf(filePath);            
            let updatedFiles;
            if (index > -1) {
                updatedFiles = prevFiles.filter((_, i) => i !== index); // Remove item
            } else {
                updatedFiles = [...prevFiles, filePath]; // Add item
            }
            // Directly call onClickedFilesChange since it's already destructured from props
            onClickedFilesChange(updatedFiles);    
            console.log(typeof name === 'object' ? name.fullPath : name.name);       
            return updatedFiles;
        });
    };

    const fetchFilesAndFolders = async () => {
        setLoading(true);
        const filesRef = ref(storage, currentPath);        
        try {
            const response = await listAll(filesRef);
            const fileUrls = await Promise.all(
                response.items.map(item =>
                    getDownloadURL(item).then(url => ({ name: item.name, url }))
                )
            );
            setFiles(fileUrls);
            const folderPaths = response.prefixes.map(prefix => ({
                name: prefix.name,
                fullPath: prefix.fullPath
            }));
            setFolders(folderPaths);
        } catch (error) {
            console.error("Error fetching files and folders:", error);
        } finally {
            setLoading(false);
        }
    };   
    

    const fileIcons = {
        
        // Document extensions
        'pdf': 'pdf.png',
        'docx': 'word.png',
        'xlsx': 'excel.png',
        'pptx': 'powerpoint.png',
        
        // Image extension
        'jpg': 'image.png',
        'png': 'image.png',
        'ico': 'image.png',                
        
        // Audio extensions
        'mp3':'audio.png',
        'wma':'audio.png',
        'wav':'audio.png',        

        // Video extensions
        'mp4':'video.png',
        'avi':'video.png',
        'mov':'video.png',
        'mkv':'video.png',

        // Archive extensions
        '7z':'zip.png',
        'zip':'zip.png',
        'rar':'zip.png',

        // Code extensions
        'py':'code.png',
        'js':'code.png',
        'java':'code.png',
        'html':'code.png',
        'css':'code.png',
        'json':'code.png',

        // Misc extensions
        'exe': 'exe.png',
        'txt': 'txt.png',

    };

    const getFileExtension = (fileName) => {
        return fileName.slice(((fileName.lastIndexOf(".")-1) >>> 0) + 2);
    };    


    if (loading) {
        return <span className="loader"></span>;
    } else if (!userLoggedIn) {
        return (
            <>
                <p>Please log in to view the files.</p>
                <AuthComponent onClose={() => showAuthModal(false)} show={showAuthModal} />
            </>
        )
    }

    return (
      <>
        {folders.map((folder, index) => (            
            <div key={`folder-${index}`} className='content-folder' style={{ cursor: 'pointer' }}>                
                <div onClick={() => navigateIntoFolder(folder.name)}>
                <span>
                    <img src="folder.png" alt="Folder" />
                    {folder.name}
                </span>
                </div>                
                <ImageButton onClick={() => handleFileClick(folder.fullPath, folder)} />
                
            </div>            
            ))}

        {files.filter(file => getFileExtension(file.name).toLowerCase() !== 'placeholder')
         .map((file, index) => {
          const ext = getFileExtension(file.name).toLowerCase();

        if(!ext ){            
            return null;
        }        

          const iconPath = fileIcons[ext] || 'default.png';
          return (
              <div key={index} className='content-file'>
                  <span>
                      <img src={iconPath} alt={ext} style={{ marginRight: '10px' }} />
                      <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                  </span>
                  <ImageButton onClick={() => handleFileClick(file.url, file)} />
              </div>
          );
})}

        
      </>
    );
};

export default ContentView;
