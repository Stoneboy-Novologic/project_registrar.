"use client";

import clsx from "clsx";

export interface TableHeader {
  key: string;
  label: string;
  className?: string;
}

export interface TableRow {
  [key: string]: React.ReactNode;
}

export interface TableProps {
  headers: TableHeader[];
  rows: TableRow[];
  variant?: "default" | "attachments" | "authors" | "contents";
  className?: string;
}

export default function Table({ headers, rows, variant = "default", className }: TableProps) {
  // Console log for debugging table rendering
  console.log("Table rendering:", { headers, rows: rows.length, variant });

  const getRowClassName = (index: number) => {
    const base = "border-b border-gray-200";
    
    switch (variant) {
      case "attachments":
      case "authors":
        // Alternating white and light yellow
        return clsx(base, index % 2 === 0 ? "bg-white" : "bg-yellow-50");
      
      case "contents":
        // Alternating white and light blue/green, with special highlighting for main sections
        const isMainSection = rows[index]?.highlighted;
        return clsx(
          base,
          isMainSection 
            ? "bg-blue-100 font-semibold" 
            : index % 2 === 0 
              ? "bg-white" 
              : "bg-blue-50"
        );
      
      default:
        return clsx(base, index % 2 === 0 ? "bg-white" : "bg-gray-50");
    }
  };

  const getHeaderClassName = () => {
    switch (variant) {
      case "attachments":
      case "authors":
      case "contents":
        return "bg-yellow-100 font-semibold text-gray-800";
      default:
        return "bg-gray-100 font-semibold text-gray-800";
    }
  };

  return (
    <div className={clsx("overflow-hidden rounded-lg border border-gray-200", className)}>
      <table className="w-full">
        {/* Table Header */}
        <thead>
          <tr className={getHeaderClassName()}>
            {headers.map((header) => (
              <th
                key={header.key}
                className={clsx(
                  "px-4 py-3 text-left text-sm font-medium",
                  header.className
                )}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={getRowClassName(index)}>
              {headers.map((header) => (
                <td
                  key={header.key}
                  className={clsx(
                    "px-4 py-3 text-sm",
                    header.className,
                    // Add indentation for contents table items
                    variant === "contents" && row.indented && "pl-8"
                  )}
                >
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
