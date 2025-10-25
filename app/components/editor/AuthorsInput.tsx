"use client";

import { useState } from "react";
import clsx from "clsx";

export interface AuthorItem {
  name: string;
  title: string;
  email: string;
  phone: string;
  role: string;
}

interface AuthorsInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function AuthorsInput({ value, onChange, className, placeholder }: AuthorsInputProps) {
  // Parse the JSON value or use empty array as fallback
  const parseValue = (): AuthorItem[] => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [items, setItems] = useState<AuthorItem[]>(parseValue());

  // Update parent when items change
  const updateItems = (newItems: AuthorItem[]) => {
    setItems(newItems);
    onChange(JSON.stringify(newItems));
  };

  const addItem = () => {
    const newItems = [...items, { name: "", title: "", email: "", phone: "", role: "" }];
    updateItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  const updateItem = (index: number, field: keyof AuthorItem, newValue: string) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: newValue } : item
    );
    updateItems(newItems);
  };

  return (
    <div className={clsx("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Authors</span>
        <button
          type="button"
          onClick={addItem}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          + Add
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded bg-gray-50">
          <p className="text-sm">No authors yet</p>
          <p className="text-xs mt-1">Click "+ Add" to start</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Author {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  title="Remove author"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, "name", e.target.value)}
                    placeholder="Name *"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(index, "title", e.target.value)}
                    placeholder="Job Title"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    value={item.email}
                    onChange={(e) => updateItem(index, "email", e.target.value)}
                    placeholder="Email"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="tel"
                    value={item.phone}
                    onChange={(e) => updateItem(index, "phone", e.target.value)}
                    placeholder="Phone"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <textarea
                  value={item.role}
                  onChange={(e) => updateItem(index, "role", e.target.value)}
                  placeholder="Role & Responsibilities..."
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>✓ Add all contributors to this report</p>
      </div>
    </div>
  );
}
