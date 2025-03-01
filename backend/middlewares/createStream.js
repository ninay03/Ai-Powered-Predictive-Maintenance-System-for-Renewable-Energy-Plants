import fs from "fs";
import csv from "csv-parser";

const filePath = "data.csv"; // Path to your CSV file

export const streamCSV = (req, res) => {
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", () => sendRows(res, rows))
    .on("error", (err) => res.status(500).json({ error: err.message }));
};

const sendRows = (res, rows) => {
  let rowIndex = 0;

  const interval = setInterval(() => {
    if (rowIndex >= rows.length) {
      clearInterval(interval);
      return;
    }

    res.write(JSON.stringify({ data: rows[rowIndex] }) + "\n");
    console.log({ data: rows[rowIndex] });
    
    rowIndex++;
  }, 1000 / 12); // 12 times per second
};
