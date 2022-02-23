import React from "react";
//import { jsPDF } from "jspdf";
//import html2canvas from "html2canvas";

class Doc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.canvas = React.createRef();
  }
  /*componentDidMount = () => {
    //this.finishMount();
    window.addEventListener("resize", this.handleResize);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize);
  };
  handleResize = (event, mount) => {
    const width = window.innerWidth - 11;
    const height = width * 0.77;
    this.setState(
      {
        width,
        height
      },
      () => {
        clearTimeout(this.newMount);
        this.newMount = setTimeout(() => this.finishMount(), mount ? 20 : 300);
      }
    );
  };
  pdfTobase64 = (canvas) => {
    var base64String = canvas.toDataURL("application/pdf");
    base64String = base64String.replace(/^data:application\/(pdf);base64,/, ""); //http://mrrio.github.io/jsPDF/
    /*var BASE64_MARKER = ";base64,";
    var base64Index =
      base64String.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = base64String.substring(base64Index);*
    return base64String;
  };
  finishMount = async (pdf) => {
    //console.log(this.canvas.current.contentDocument);
    const canvas = await html2canvas(pdf ? pdf.target : this.canvas.current);
    if (canvas) {
      //console.log(canvas);
      var base64String = this.pdfTobase64(canvas);
      var ctx = canvas.getContext("2d");
      let base64Array = [];
      for (var i = 0; i < base64String.length; i++) {
        base64Array[i] = base64String.charCodeAt(i);
      }
      if (base64Array.length === base64String.length) {
        //https://stackoverflow.com/a/30106551/11711280
        //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#unicode_strings
        const base64Binary = String.fromCharCode(
          ...new Uint8Array(base64Array.buffer)
        ); //atob(base64Array);
        if (base64Binary) {
          ctx.drawImage(base64Binary, "pdf", 0, 0);
          const pdf = new jsPDF("p", "pt", "letter", "landscape");
          pdf.addHTML(canvas, function () {
            //pdf.addPage("letter", "landscape");
            var file = pdf.output("blob");
            this.setState({ file: window.URL.createObjectURL(file) });
          });
        }
      }
    }
    //pdf.save("download.pdf");
  };*/
  render() {
    //const { width, height } = this.state;
    const file =
      "https://www.dropbox.com/s/p8nvv35z5k2kxrf/NickCarducci2022.com%20brochure%20%281%29.pdf?dl=0";
    /*let response = await fetch( url );
    let blob = response.blob();*/
    return (
      <div>
        {/*width && (
          <object
            ref={this.canvas}
            data={file}
            aria-label="brochure"
            //type="application/pdf"
            width={width}
            height={height}
          >
            <embed
              src={file}
              type="application/pdf"
              width={width}
              height={height}
              title="Brochure"
              //onLoad={this.finishMount}
            />
          </object>
        )}
        {this.state.file ? (
          <iframe src={this.state.file} title="brochure" />
        ) : null*/}
        <img
          src={file}
          alt="brochure"
          style={{ width: "100%", maxWidth: "600px" }}
        />
        &nbsp;
        <a href="https://www.dropbox.com/s/p8nvv35z5k2kxrf/NickCarducci2022.com%20brochure%20%281%29.pdf">
          here
        </a>
      </div>
    );
  }
}
export default Doc;
