"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import InvoiceTable from "./invoice-table";
import Button from "@mui/material/Button";
// import printJS from "print-js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// const printJS = dynamic(() => import("print-js"), { ssr: false });

const Invoice = ({ invoiceData }) => {
  console.log(
    JSON.parse(invoiceData?.shipping_payment_details?.shipping_address)
  );
  const printInvoice = React.useRef(null);
  const handlePrint = async () => {
    // const printJS = dynamic(() => await import("print-js"), { ssr: false });
    import("print-js").then(async () => {
      const element = printInvoice.current;
      element.style.color = "black";
      element.style.backgroundColor = "white";

      if (!element) {
        return;
      }
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        color: "#ffffff",
        background: "#000",
      });
      const image = canvas.toDataURL("image/jpeg");

      printJS({
        printable: image,
        type: "image",
        header: "kachabazar",
        maxWidth: "100%",
      });
    });
  };
  const handleDownload = async () => {
    const element = printInvoice.current;
    element.style.color = "black";
    element.style.backgroundColor = "white";

    if (!element) {
      return;
    }
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      width: element.scrollWidth,
      height: element.scrollHeight,
      color: "#ffffff",
      background: "#000",
    });
    const image = canvas.toDataURL("image/jpeg");

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? "landscape" : "portrait",
      unit: "pt",
      format: [imgWidth, imgHeight],
    });

    const imageProperties = pdf.getImageProperties(image);
    // console.log(imageProperties);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imageProperties.height * pdfWidth) / imageProperties.width;

    pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("test.pdf");
  };
  return (
    <>
      <div id="myInvoice" ref={printInvoice}>
        <Typography>
          {`Thank You ${invoiceData?.client_details.name}, Your order have been received !`}
        </Typography>
        <Grid>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid>
              <Typography>Invoice</Typography>
              <Typography>
                Status
                <span>{` : ${invoiceData?.status}`}</span>
              </Typography>
            </Grid>
            <Grid>
              <Typography>logo</Typography>
              <Typography>
                59 Station Rd, Purls Bridge, United Kingdom
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid>
              <Typography>
                <span>Date </span>
              </Typography>

              <span>{new Date(invoiceData.issued_at).toDateString()}</span>
            </Grid>
            <Grid>
              <Typography>
                <span>Invoice no </span>
              </Typography>
              <span>#{invoiceData?.invoice_id}</span>
            </Grid>
            <Grid sx={{ textAlign: "end" }}>
              <Typography>
                <span>Invoiced to </span>
              </Typography>
              <span>{invoiceData?.client_details.name}</span>
              <Typography>
                <span>{invoiceData?.client_details.email}</span>
                <span>{invoiceData?.client_details.phone}</span>
              </Typography>
              <span>Nairobi</span>
            </Grid>
          </Grid>
        </Grid>
        <InvoiceTable invoice_items={invoiceData?.invoice_items} />
        <Grid
          container
          sx={{
            pb: 4,
          }}
        >
          <Grid size={3}>
            <span>Payment Method</span>
            <br />
            <span>{invoiceData?.shipping_payment_details?.payment_method}</span>
          </Grid>
          <Grid size={3} sx={{ textAlign: "center" }}>
            <span>Shipping Cost</span>
            <br />
            <span>
              {` $ ${
                JSON.parse(
                  invoiceData?.shipping_payment_details?.shipping_address
                )?.pickup_station?.cost
              }`}
            </span>
          </Grid>
          <Grid size={3} sx={{ textAlign: "center" }}>
            <span>Discount</span>
            <br />
            <span> 00.00</span>
          </Grid>
          <Grid size={3} sx={{ textAlign: "end" }}>
            <span>Total amount</span>
            <br />
            <span>$ {invoiceData?.total_amount}</span>
          </Grid>
        </Grid>
      </div>
      <Grid container sx={{ justifyContent: "space-between", pb: 4 }}>
        <Grid size={4}>
          <Button onClick={handlePrint}>Print</Button>
        </Grid>
        <Grid size={4}>
          <Button onClick={handleDownload}>Download</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Invoice;
