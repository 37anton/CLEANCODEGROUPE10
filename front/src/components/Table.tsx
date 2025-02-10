import React from 'react';
import { FiSearch, FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface TableProps<T> {
  data: T[];
  columns: { label: string; key: keyof T; render?: (data: T) => React.ReactNode }[]; // Optional render function
  onSearch: (term: string) => void;
  searchTerm: string;
  onSort: (key: keyof T) => void;
  sortConfig: { key: keyof T; direction: 'asc' | 'desc' } | null;
  getSortIcon: (key: keyof T) => JSX.Element | null;
}

const Table = <T,>({
  data,
  columns,
  onSearch,
  searchTerm,
  onSort,
  sortConfig,
  getSortIcon,
}: TableProps<T>) => {
  const renderCellContent = (value: any, column: { render?: (data: T) => React.ReactNode }) => {
    // If a custom render function exists, use it to render the value
    if (column.render) {
      return column.render(value);
    }
    
    // If the value is an object (e.g., company), return its 'id' or another property
    if (typeof value === 'object' && value !== null) {
      if ('id' in value) {
        return value.id; // Assuming 'id' exists in the object (like company)
      }
      return JSON.stringify(value); // Fallback to stringifying the object if no 'id'
    }

    // Return the value as-is if it's a string, number, or boolean
    return value;
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mt-4 flex items-center gap-2">
        <FiSearch className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/3 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  onClick={() => onSort(column.key)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-left font-semibold text-gray-700 dark:text-white cursor-pointer"
                >
                  {column.label} {getSortIcon(column.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border border-gray-300 dark:border-gray-700 ${
                  rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                } hover:bg-gray-100 dark:hover:bg-gray-600 transition`}
              >
                {columns.map((column) => {
                  const value = row[column.key]; // Get the value from the data
                  return (
                    <td
                      key={column.key as string}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700"
                    >
                      {renderCellContent(value, column)} {/* Render the value */}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
