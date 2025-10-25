"use client";

import { useState } from "react";
import clsx from "clsx";

export interface ContentItem {
  section: string;
  item: string;
  description: string;
  note: string;
  page: string;
  bold: boolean;
  highlighted: boolean;
  indented: boolean;
}

interface ContentsInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function ContentsInput({ value, onChange, className, placeholder }: ContentsInputProps) {
  // Parse the JSON value or use empty array as fallback
  const parseValue = (): ContentItem[] => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [items, setItems] = useState<ContentItem[]>(parseValue());

  // Update parent when items change
  const updateItems = (newItems: ContentItem[]) => {
    setItems(newItems);
    onChange(JSON.stringify(newItems));
  };

  const addItem = () => {
    const newItems = [...items, { 
      section: "", 
      item: "", 
      description: "", 
      note: "", 
      page: "", 
      bold: false, 
      highlighted: false, 
      indented: false 
    }];
    updateItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  const updateItem = (index: number, field: keyof ContentItem, newValue: string | boolean) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, [field]: newValue } : item
    );
    updateItems(newItems);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      updateItems(newItems);
    }
  };

  return (
    <div className={clsx("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Table of Contents</span>
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
          <p className="text-sm">No entries yet</p>
          <p className="text-xs mt-1">Click "+ Add" to start</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Entry {index + 1}</span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="px-1 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="px-1 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    title="Remove entry"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={item.section}
                    onChange={(e) => updateItem(index, "section", e.target.value)}
                    placeholder="Section (e.g., 1, 2.1)"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={item.item}
                    onChange={(e) => updateItem(index, "item", e.target.value)}
                    placeholder="Item Name *"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={item.page}
                    onChange={(e) => updateItem(index, "page", e.target.value)}
                    placeholder="Page (e.g., 8, -)"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    placeholder="Description"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={item.note}
                    onChange={(e) => updateItem(index, "note", e.target.value)}
                    placeholder="Note"
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex items-center space-x-4 text-xs">
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={item.bold}
                      onChange={(e) => updateItem(index, "bold", e.target.checked)}
                      className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-600">Bold</span>
                  </label>
                  
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={item.highlighted}
                      onChange={(e) => updateItem(index, "highlighted", e.target.checked)}
                      className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-600">Highlight</span>
                  </label>
                  
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={item.indented}
                      onChange={(e) => updateItem(index, "indented", e.target.checked)}
                      className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-600">Indent</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>✓ Use ↑↓ to reorder • Bold/Highlight for main sections • Indent for sub-items</p>
      </div>
    </div>
  );
}
