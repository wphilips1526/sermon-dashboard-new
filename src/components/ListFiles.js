import React, { useState, useEffect, useCallback } from 'react';
  import axios from 'axios';

  const ListFiles = ({ theme, onThemeUpdate }) => {
      const [files, setFiles] = useState([]);

      const fetchFiles = useCallback(async () => {
          try {
              const response = await axios.get('${process.env.REACT_APP_API_URL}/files');
              const filteredFiles = theme === 'All' 
                  ? response.data.filter(file => file.key.startsWith('transcripts/'))
                  : response.data.filter(file => file.key.startsWith('transcripts/') && file.theme === theme);
              setFiles(filteredFiles);
          } catch (error) {
              console.error('Error fetching files:', error);
          }
      }, [theme]);

      useEffect(() => {
          fetchFiles();
      }, [fetchFiles]);

      const handleThemeChange = async (fileKey, newTheme) => {
          try {
              await axios.post('${process.env.REACT_APP_API_URL}/update-theme', { fileKey, theme: newTheme });
              if (onThemeUpdate) onThemeUpdate();
          } catch (error) {
              console.error('Error updating theme:', error);
          }
      };

      return (
          <div className="space-y-4">
              {files.length > 0 ? (
                  <ul className="space-y-2">
                      {files.map(file => (
                          <li key={file.key} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md flex justify-between items-center">
                              <span className="text-gray-800 dark:text-gray-200">{file.key}</span>
                              <select
                                  className="p-1 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                                  value={file.theme || 'Uncategorized'}
                                  onChange={(e) => handleThemeChange(file.key, e.target.value)}
                              >
                                  {['Joy', 'Faith', 'Victory', 'Grace', 'Suffering', 'Uncategorized'].map(t => (
                                      <option key={t} value={t}>{t}</option>
                                  ))}
                              </select>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-gray-600 dark:text-gray-300">No files found.</p>
              )}
          </div>
      );
  };

  export default ListFiles;