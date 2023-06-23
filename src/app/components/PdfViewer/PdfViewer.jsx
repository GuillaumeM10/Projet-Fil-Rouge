import { Document, Page, pdfjs } from 'react-pdf';
import React, { useEffect, useState } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PdfViewer = ({ uri }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  return (
    <div className="pdfViewer">
        <Document
          file={uri}
          onLoadSuccess={onDocumentLoadSuccess}
          // options={{
          //   cMapUrl: 'cmaps/',
          //   cMapPacked: true,
          // }}
        >
          <Page pageNumber={currentPage} />
        </Document>

        <div className='controls'>
          <p>
            Page {currentPage} of {numPages}
          </p>

          <div className="btns">

            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              >
              Previous
            </button>
            <button
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