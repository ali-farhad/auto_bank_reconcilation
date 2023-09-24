const express = require("express");
const router = express.Router();
const multer = require("multer");

const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "public/uploads/" });

let totalBankRows = 0;
let totalLocalRows = 0;
let isBankFileReady = false;
let isLocalFileReady = false;
let isDownloadReady = false;
let isDonateReady = false;
//Routes
router.get("/", (req, res) => {
  res.render("index", {
    successMessage: req.flash("success"),
    localMessage: req.flash("successLocal"),
    dupMessage: req.flash("dupMessage"),
    fileSuccessMsg: req.flash("fileSuccessMessage"),
    error: null,
    totalBankRows,
    totalLocalRows,
    isBankFileReady,
    isLocalFileReady,
    isDownloadReady,
    isDonateReady,
  });
  totalBankRows = 0;
  totalLocalRows = 0;
});

//upload bank excel file
router.post("/uploadBank", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const filePath = req.file.path;
  // Check if the file has an Excel extension
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== ".xlsx" && fileExtension !== ".xls") {
    // Delete the uploaded file
    fs.unlinkSync(filePath);
    // res.render("index", { error: "only excel files are supported!" });
    res.redirect("/");
    return;
  }

  // Rename the file

  const newFileName = "bankbook" + fileExtension;
  const newFilePath = path.join(path.dirname(filePath), newFileName);

  // Delete the previous file if it exists
  if (fs.existsSync(newFilePath)) {
    fs.unlinkSync(newFilePath);
  }

  // Rename the uploaded file
  if (newFilePath) {
    fs.renameSync(filePath, newFilePath);
  }

  const workbook = XLSX.readFile(newFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const rowCount = sheetData.length; // Get the total number of rows
  totalBankRows += rowCount;
  isBankFileReady = true;

  // console.log("Total rows: ", rowCount);

  req.flash("success", "Bank File uploaded successfully");
  res.redirect("/");
  // Do something with the sheet data
});

//upload excel file
router.post("/uploadLocal", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const filePath = req.file.path;
  // Check if the file has an Excel extension
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== ".xlsx" && fileExtension !== ".xls") {
    // Delete the uploaded file
    fs.unlinkSync(filePath);
    // res.render("index", { error: "only excel files are supported!" });
    res.redirect("/");
    return;
  }

  // Rename the file

  const newFileName = "localbook" + fileExtension;
  const newFilePath = path.join(path.dirname(filePath), newFileName);

  // Delete the previous file if it exists
  if (fs.existsSync(newFilePath)) {
    fs.unlinkSync(newFilePath);
  }

  // Rename the uploaded file
  if (newFilePath) {
    fs.renameSync(filePath, newFilePath);
  }

  const workbook = XLSX.readFile(newFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const rowCount = sheetData.length; // Get the total number of rows
  totalLocalRows += rowCount;
  isLocalFileReady = true;

  // console.log(sheetData);
  req.flash("successLocal", "Local File uploaded successfully");
  res.redirect("/");
});

const removeDups = () => {
  // Read the Excel files
  const workbookA = XLSX.readFile("public/uploads/bankbook.xlsx");
  const workbookB = XLSX.readFile("public/uploads/localbook.xlsx");

  // Get the first sheet of each workbook
  const sheetA = workbookA.Sheets[workbookA.SheetNames[0]];
  const sheetB = workbookB.Sheets[workbookB.SheetNames[0]];

  // Convert sheet data to JSON format
  const dataA = XLSX.utils.sheet_to_json(sheetA);
  const dataB = XLSX.utils.sheet_to_json(sheetB);

  // Get unique Cheque No values from both datasets
  const chequeNosA = new Set(dataA.map((record) => record["Cheque No"]));
  const chequeNosB = new Set(dataB.map((record) => record["Cheque No"]));
  // console.log(chequeNosA);
  // console.log(chequeNosB);

  // Get unique Cr values from both datasets
  const CrsA = new Set(dataA.map((record) => record["Cr"]));
  const CrsB = new Set(dataB.map((record) => record["Cr"]));
  // console.log(CrsA);
  // console.log(CrsB);

  const uniqueDataA = dataA.filter((record) => {
    const chequeNoA = record["Cheque No"];
    return chequeNoA === undefined || !chequeNosB.has(chequeNoA);
  });

  const uniqueDataB = dataB.filter((record) => {
    const chequeNoB = record["Cheque No"];
    return chequeNoB === undefined || !chequeNosA.has(chequeNoB);
  });

  const uniqueCrA = dataA.filter((record) => {
    const CrNoA = record["Cr"];
    return CrsA === undefined || !CrsB.has(CrNoA);
  });

  const uniqueCrB = dataB.filter((record) => {
    const CrNoB = record["Cr"];
    return CrsB === undefined || !CrsA.has(CrNoB);
  });

  // console.log(uniqueDataA, "bank unique");
  // console.log(uniqueDataB, "local unique");
  // console.log("--------");
  // console.log(uniqueCrA);
  // console.log(uniqueCrB);
  // console.log("----------");

  const finalDataA = uniqueDataA.filter(
    (record) => !record.hasOwnProperty("Cr")
  );

  const finalDataB = uniqueDataB.filter(
    (record) => !record.hasOwnProperty("Cr")
  );

  // console.log(finalDataA);
  // console.log(finalDataB);
  // console.log("-----------");
  // console.log(uniqueCrA);
  // console.log(uniqueCrB);

  // Merge finalDataA with uniqueCrA
  const mergedDataA = finalDataA.concat(uniqueCrA);

  // Merge finalDataB with uniqueCrB
  const mergedDataB = finalDataB.concat(uniqueCrB);

  // console.log("===============");
  // console.log(mergedDataA);
  // console.log(mergedDataB);

  // Create a new workbook
  const resultWorkbook = XLSX.utils.book_new();

  // Convert uniqueDataA to worksheet and add it to the workbook
  const worksheetA = XLSX.utils.json_to_sheet(mergedDataA);
  XLSX.utils.book_append_sheet(resultWorkbook, worksheetA, "bank_sheet");

  // Convert uniqueDataB to worksheet and add it to the workbook
  const worksheetB = XLSX.utils.json_to_sheet(mergedDataB);
  XLSX.utils.book_append_sheet(resultWorkbook, worksheetB, "local_book");

  // Write the result workbook to a new Excel file
  XLSX.writeFile(resultWorkbook, "public/uploads/result.xlsx");
};

const cleanUp = () => {
  isBankFileReady = false;
  isLocalFileReady = false;
  isDownloadReady = false;

  // Optional: Remove the original files if desired
  fs.unlinkSync(path.join("public", "uploads", "bankbook.xlsx"));
  fs.unlinkSync(path.join("public", "uploads", "localbook.xlsx"));
  fs.unlinkSync(path.join("public", "uploads", "result.xlsx"));
};

router.get("/removeDups", (req, res) => {
  removeDups();
  req.flash("dupMessage", "Duplicates removed successfully!");
  isDownloadReady = true;

  isDonateReady = true;
  // Redirect to another route if needed
  res.redirect("/");
});

router.get("/download", (req, res) => {
  const file = "public/uploads/result.xlsx";

  res.download(file, "result.xlsx", (err) => {
    if (err) {
      req.flash("fileErrMessage", "Failed to download the file");
    } else {
      req.flash("fileSuccessMessage", "File downloaded successfully!");
      cleanUp(); // Perform any necessary clean-up actions after the download
    }

    // Redirect to the desired route using JavaScript
  });
});

module.exports = router;
