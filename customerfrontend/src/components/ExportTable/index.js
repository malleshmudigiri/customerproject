import React from "react";
import "./index.css";

const ExportTable = ({ filter }) => {
    const handleExport = async () => {
        try {
            const { name, gender } = filter;
            let exportUrl = "http://localhost:8080/api/export/excel";
            const params = new URLSearchParams();

            if (name) {
                params.append('customerName', name);
            }
            if (gender) {
                params.append('gender', gender);
            }
            if (params.toString()) {
                exportUrl += `?${params.toString()}`;
            }
            const response = await fetch(exportUrl);

            if (!response.ok) {
                throw new Error("Failed to fetch the Excel file");
            }
            const blob = await response.blob();
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
