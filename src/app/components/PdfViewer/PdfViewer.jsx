import { Document, Page, pdfjs } from 'react-pdf';
import React, { useEffect, useRef, useState } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PdfViewer = ({ uri }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pdfViewer = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  const getPageWidth = () => {
    const el = pdfViewer.current.querySelector('.react-pdf__Page__canvas');
    
    let width = el.style.width;
    width = width.replace('px', '');

    let height = el.style.height;
    height = height.replace('px', '');

    el.style.aspectRatio = `${width} / ${height}`;
    pdfViewer.current.style.width = `${width}px`;
  }

  return (
    <div 
      className="pdfViewer"
      ref={pdfViewer}
    >
        <Document
          file={uri}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page 
            pageNumber={currentPage} 
            height={430}
            onLoadSuccess={getPageWidth}
            renderAnnotationLayer={false}
            renderInteractiveForms={false}
            renderTextLayer={false}
          />
        </Document>

        <div className='controls'>
          <p>
            Page {currentPage} of {numPages}
          </p>

          <div className="btns">

            <button
              type='button'
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              >
              Previous
            </button>
            <button
              type='button'
              disabled={currentPage >= numPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              >
              Next
            </button>
            
          </div>
        </div>
        
      </div>
  );
};

export default PdfViewer;