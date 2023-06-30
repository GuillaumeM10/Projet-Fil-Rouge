import React, { useEffect, useState } from 'react';
import PdfViewer from '../PdfViewer/PdfViewer';
// SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PreviewFiles = ({ files, location, isSwiper=false }) => {
  const [previewData, setPreviewData] = useState([]); // State to store the preview data
  const width = location || isSwiper ? '' : '500';

  useEffect(() => {
    const generatePreviewData = async () => {
      const dataArray = [];
      for (const file of files) {
        let data;
        console.log({file});
        if (file.Location) { // Fetch file from AWS S3
          const fileType = file.Location.split('.').pop();
          console.log({fileType});
          if(fileType === "pdf"){

            const response = await fetch(file.Location);
            const blob = await response.blob();
            data = await readFile(blob);

          }else{
            data = file;
          }
        } else {
          data = await readFile(file); // Read file asynchronously
          console.log({data});
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

  return (
    <div className={"previewFiles" + (location || isSwiper ? ' swiper' : '')}>
      
      {location || isSwiper ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
        >
          {previewData.map((data, index) => {
            if(data === undefined) return null;
            const file = files[index];

            // From AWS S3
            if(file?.Location){
              file.type = file.Location.split('.').pop();
            }
            if (!file.type) {
              file.type = data && data.split(';')[0].split(':')[1];
            }
            if (file.type === 'application/octet-stream') {
              file.type = file.Location.split('.').pop();
            }

            return (
              <SwiperSlide key={index}>
                <div className={"previewFile swiper-card" + ' ' + file.type}>
                  {file?.name && (<p>{file?.name}</p>)} 

                  {file.type === 'application/pdf' || file.type === 'pdf' ? (
                    
                    <PdfViewer uri={data} /> 
                  
                    ) : file.type === 'image/png' || file.type === 'png' ||
                        file.type === 'image/jpeg' || file.type === 'jpeg' ? (

                    <img width={width} src={file.Location ? file.Location : data} alt={file.name} />

                  ) : file.type === 'video/mp4' || file.type === 'mp4' ||
                      file.type === 'video/mov' || file.type === 'mov' ||
                      file.type === 'video/avi' || file.type === 'avi' ||
                      file.type === 'video/mkv' || file.type === 'mkv' ||
                      file.type === 'video/wmv' || file.type === 'wmv' ||
                      file.type === 'video/flv' || file.type === 'flv' ||
                      file.type === 'video/webm' || file.type === 'webm' ||
                      file.type === 'video/mpeg' || file.type === 'mpeg' ? (
                    
                    <video width={width} controls>
                      <source src={file.Location ? file.Location : data} type={file.type.includes('video/') ? file.type : "video/" + file.type} /> 
                    </video>
                  
                  ) : file.type === 'audio/mpeg' || file.type === 'mpeg' ||
                      file.type === 'audio/ogg' || file.type === 'ogg' ||
                      file.type === 'audio/wav' || file.type === 'wav' ||
                      file.type === 'audio/wma' || file.type === 'wma' ||
                      file.type === 'audio/aac' || file.type === 'aac' ||
                      file.type === 'audio/flac' || file.type === 'flac' ||
                      file.type === 'audio/mp3' || file.type === 'mp3' ? (
                    
                    <audio controls>
                      <source src={file.Location ? file.Location : data} type={file.type.includes('audio/') ? file.type : "audio/" + file.type} /> 
                    </audio>
                  
                  ) : null}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        previewData.map((data, index) => {
          if(data === undefined) return null;
          const file = files[index];

          // From AWS S3
          if(file?.Location){
            file.type = file.Location.split('.').pop();
          }
          if (!file.type) {
            file.type = data && data.split(';')[0].split(':')[1];
          }
          if (file.type === 'application/octet-stream') {
            file.type = file.Location.split('.').pop();
          }

          console.log(file.type);
          return (
            <div key={index} className={"previewFile swiper-card"}>
              {file?.name && (<p>{file?.name}</p>)} 
              
              { file.type === 'application/pdf' || file.type === 'pdf' ? (
                
                <PdfViewer uri={data} /> 
              
                ) : file.type === 'image/png' || file.type === 'png' ||
                    file.type === 'image/jpeg' || file.type === 'jpeg' ? (

                <img width={width} src={file.Location ? file.Location : data} alt={file.name} />

              ) : file.type === 'video/mp4' || file.type === 'mp4' ||
                  file.type === 'video/mov' || file.type === 'mov' ||
                  file.type === 'video/avi' || file.type === 'avi' ||
                  file.type === 'video/mkv' || file.type === 'mkv' ||
                  file.type === 'video/wmv' || file.type === 'wmv' ||
                  file.type === 'video/flv' || file.type === 'flv' ||
                  file.type === 'video/webm' || file.type === 'webm' ||
                  file.type === 'video/mpeg' || file.type === 'mpeg' ? (
                
                <video width={width} controls>
                  <source src={file.Location ? file.Location : data} type={file.type.includes('video/') ? file.type : "video/" + file.type} /> 
                </video>
              
              ) : file.type === 'audio/mpeg' || file.type === 'mpeg' ||
                  file.type === 'audio/ogg' || file.type === 'ogg' ||
                  file.type === 'audio/wav' || file.type === 'wav' ||
                  file.type === 'audio/wma' || file.type === 'wma' ||
                  file.type === 'audio/aac' || file.type === 'aac' ||
                  file.type === 'audio/flac' || file.type === 'flac' ||
                  file.type === 'audio/mp4' || file.type === 'mp4' ? (
                
                <audio controls>
                  <source src={file.Location ? file.Location : data} type={file.type.includes('audio/') ? file.type : "audio/" + file.type} /> 
                </audio>
              
              ) : null}
            </div>
          );
        })
      )}

      {location || isSwiper && (
        <div className="swiper-pagination"></div>
      )}
    </div>
  );
};

export default PreviewFiles;