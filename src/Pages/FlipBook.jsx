import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "./styles.css";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import pdf from './testlannua.pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref} >
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

function FlipBook() {


  // const [loading, setLoading] = useState(true);

  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    //   setTimeout(()=>{

    //       setLoading(false);
    //   },1000)
  };
  return (
    <>

      {/* {loading && <Loading loading = {loading} />} */}
      <div className="bg-white h-screen flex flex-col justify-end items-center md:justify-center scroll-mx-2 overflow-hidden">

        <HTMLFlipBook width={350} height={495} showCover={true} className="shadow-[0px_0px_12px_rgba(0,0,0,0.4)]">
          {[...Array(numPages).keys()].map((n) => (
            <Pages number={`${n + 1}`}>
              <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}

              >
                <Page pageNumber={n + 1} renderAnnotationLayer={false} renderTextLayer={false} width={350} className='border-3 border-black' />
              </Document>

            </Pages>
          ))}
        </HTMLFlipBook>

        {/* <div className="m-4 text-xl md:font-extrabold text-orange-600">YẾN SÀO KHÁNH LINH</div> */}

      </div>
    </>
  );
}

export default FlipBook;
