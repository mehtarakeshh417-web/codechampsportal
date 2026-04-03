import { useEffect, useRef } from "react";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";

const salesData = [
  [
    { v: "Product", ct: { fa: "General" }, m: "Product" },
    { v: "Q1 Sales", ct: { fa: "General" }, m: "Q1 Sales" },
    { v: "Q2 Sales", ct: { fa: "General" }, m: "Q2 Sales" },
    { v: "Q3 Sales", ct: { fa: "General" }, m: "Q3 Sales" },
    { v: "Q4 Sales", ct: { fa: "General" }, m: "Q4 Sales" },
    { v: "Total", ct: { fa: "General" }, m: "Total" },
  ],
  [
    { v: "Laptops" }, { v: 12500 }, { v: 14200 }, { v: 13800 }, { v: 18500 },
    { v: "", f: "=SUM(B2:E2)" },
  ],
  [
    { v: "Phones" }, { v: 22000 }, { v: 19800 }, { v: 24500 }, { v: 28000 },
    { v: "", f: "=SUM(B3:E3)" },
  ],
  [
    { v: "Tablets" }, { v: 8500 }, { v: 9200 }, { v: 7800 }, { v: 11000 },
    { v: "", f: "=SUM(B4:E4)" },
  ],
  [
    { v: "Accessories" }, { v: 4200 }, { v: 5100 }, { v: 4800 }, { v: 6200 },
    { v: "", f: "=SUM(B5:E5)" },
  ],
  [
    { v: "Total" },
    { v: "", f: "=SUM(B2:B5)" },
    { v: "", f: "=SUM(C2:C5)" },
    { v: "", f: "=SUM(D2:D5)" },
    { v: "", f: "=SUM(E2:E5)" },
    { v: "", f: "=SUM(F2:F5)" },
  ],
];

const celldata: Array<{ r: number; c: number; v: any }> = [];
salesData.forEach((row, r) => {
  row.forEach((cell, c) => {
    celldata.push({ r, c, v: cell });
  });
});

const ExcelPro = () => {
  return (
    <div className="h-[900px] bg-[#f3f3f3] rounded-xl overflow-hidden border border-gray-300">
      <Workbook
        data={[
          {
            name: "Sales Data",
            celldata,
            row: 50,
            column: 26,
            order: 0,
            status: 1,
          },
        ]}
        onChange={(d: any) => {}}
      />
    </div>
  );
};

export default ExcelPro;
