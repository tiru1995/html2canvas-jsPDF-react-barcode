import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Barcode from 'react-barcode';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.printDocument = this.printDocument.bind(this)
  }

  printDocument() {
    const pdf = new jsPDF();
    //document.getElementById('divToPrint');
    pdf.text('Header Of the page', 10, 9);
    //pdf.text(50, 40, "Header");


    const input = this.myRef.current
    html2canvas(input)
      .then((canvas) => {
       const imgData = canvas.toDataURL('image/png');
       pdf.addImage(imgData, 'JPEG', 17, 17);
        const pageCount = pdf.internal.getNumberOfPages();
        for (var i = 1; i <= pageCount; i++) {
          pdf.text(String(i), 196, 285);
        }
        pdf.save("download.pdf");
      })
      ;
  }

  render() {
    return (
      <div>
        <div className="mb5">
          <button onClick={this.printDocument}>Print</button>
        </div>
        <div id="divToPrint" ref={this.myRef}>


          <h3>10 Great and Easy English Books You Must Read</h3>
          <h5>Reading is rewarding. </h5>

          First name:<br />
          <input type="text" name="firstname" />
          <br />
          Last name:<br />
          <input type="text" name="lastname" />

          <p>Being able to read a novel in another language and understand it is a huge achievement.
                   <br /> You’ll feel accomplished the moment you read that final page,</p>


          <Barcode value='https://www.google.com/'
            displayValue='true'
            format="CODE128"
            margin='30'
            width='1'
          />

          <br />
          <Barcode value='https://www.ibaset.com/'
            displayValue='false'
            format="CODE128"
            margin='30'
            width='2'
          />

        </div>

      </div>
    )
  }
}

export default App;


