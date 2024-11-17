import React from "react";
import "./index.css";

const ExportTable = () => {
    const handleExport = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/export/excel", {
                responseType: "blob",
            });


            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });


            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "table-data.xlsx";
            document.body.appendChild(a);
            a.click();


            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error exporting table to Excel:", error);
        }
    };

    return (
        <div>
            <button onClick={handleExport} className="exportBtn">Export Table to Excel</button>
        </div>
    );
};

export default ExportTable;
