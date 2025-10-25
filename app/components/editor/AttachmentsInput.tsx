"use client";

import { useState } from "react";
import clsx from "clsx";

export interface AttachmentItem {
  checked: boolean;
  description: string;
}

interface AttachmentsInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function AttachmentsInput({ value, onChange, className, placeholder }: AttachmentsInputProps) {
  // Parse the JSON value or use empty array as fallback
  const parseValue = (): AttachmentItem[] => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [items, setItems] = useState<AttachmentItem[]>(parseValue());

  // Update parent when items change
  const updateItems = (newItems: AttachmentItem[]) => {
    setItems(newItems);
    onChange(JSON.stringify(newItems));
  };

  const addItem = () => {
    const newItems = [...items, { checked: true, description: "" }];
    updateItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  const updateItem = (index: number, field: keyof AttachmentItem, newValue: boolean | string) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: newValue } : item
    );
    updateItems(newItems);
  };

  return (
    <div className={clsx("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Attachments</span>
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
          <p className="text-sm">No attachments yet</p>
          <p className="text-xs mt-1">Click "+ Add" to start</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded bg-white">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => updateItem(index, "checked", e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                title="Include in report"
              />
              
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                placeholder="Enter attachment description..."
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                title="Remove attachment"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>✓ Check box to include in report</p>
      </div>
    </div>
  );
}
