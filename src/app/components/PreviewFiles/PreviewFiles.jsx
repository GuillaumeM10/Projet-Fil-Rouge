import React, { useEffect, useState } from 'react';
import PdfViewer from '../PdfViewer/PdfViewer';

const PreviewFiles = ({ files, location }) => {
  const [previewData, setPreviewData] = useState([]); // State to store the preview data
  const width = location ? '' : '500';

  useEffect(() => {
    const generatePreviewData = async () => {
      const dataArray = [];
      for (const file of files) {
        let data
        if(file.Location){ // from AWS S3

          const response = await fetch(file.Location);
          const blob = await response.blob();
          data = await readFile(blob);

        }else{
          data = await readFile(file); // Read file asynchronously
        }
        dataArray.push(data); // Store the data in the array
      }
      setPreviewData(dataArray); // Update the preview data state with the array of data
    };

    generatePreviewData(); // Generate preview data when the "files" prop changes
  }, [files]);

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result); // Resolve the promise with the file data (result of FileReader)
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  };

  useEffect(() => {
    console.log(previewData);
  }, [previewData]);

  return (
    <div className={"previewFiles" + (location ? ' swiper' : '')}>
      {previewData.map((data, index) => {
        const file = files[index];

        // from AWS S3
        if(!file.type){
          file.type = data && data.split(';')[0].split(':')[1];
        }
        if(file.type === 'application/octet-stream'){
          file.type = file.Location.split('.').pop();
        }

        if (file.type === 'application/pdf' || file.type === 'pdf') {
          return (
            <div key={index} className="previewFile">
              {file?.name && (<p>{file?.name}</p>)} // Render file name if available
              <PdfViewer uri={data} /> // Render PdfViewer component with the PDF data URI
            </div>
          );
        } else if (
          file.type === 'image/png' || file.type === 'png' ||
          file.type === 'image/jpeg' || file.type === 'jpeg'
        ) {
          return (
            <div key={index} className="previewFile">
              {file?.name && (<p>{file?.name}</p>)} // Render file name if available
              <img width={width} src={data} alt={file.name} /> // Render image tag with the image data URI
            </div>
          );
        } else if (
          file.type === 'video/mp4' || file.type === 'mp4' ||
          file.type === 'video/mov' || file.type === 'mov' ||
          file.type === 'video/avi' || file.type === 'avi' ||
          file.type === 'video/mkv' || file.type === 'mkv' ||
          file.type === 'video/wmv' || file.type === 'wmv' ||
          file.type === 'video/flv' || file.type === 'flv' ||
          file.type === 'video/webm' || file.type === 'webm' ||
          file.type === 'video/mpeg' || file.type === 'mpeg'
        ) {
          return (
            <div key={index} className="previewFile">
              {file?.name && (<p>{file?.name}</p>)} // Render file name if available
              <video width={width} controls>
                <source src={data} type={file.type} /> // Render video tag with the video source and type
                Your browser does not support HTML video.
              </video>
            </div>
          );
        } else if (
          file.type === 'audio/mpeg' || file.type === 'mpeg' ||
          file.type === 'audio/ogg' || file.type === 'ogg' ||
          file.type === 'audio/wav' || file.type === 'wav' ||
          file.type === 'audio/wma' || file.type === 'wma' ||
          file.type === 'audio/aac' || file.type === 'aac' ||
          file.type === 'audio/flac' || file.type === 'flac' ||
          file.type === 'audio/mp4' || file.type === 'mp4'
        ) {
          return (
            <div key={index} className="previewFile">
              {file?.name && (<p>{file?.name}</p>)} // Render file name if available
              <audio controls>
                <source src={data} type={file.type} /> // Render audio tag with the audio source and type
                Your browser does not support the audio element.
              </audio>
            </div>
          );
        }
        return null; // Return null for unsupported file types
      })}
    </div>
  );
};

export default PreviewFiles;