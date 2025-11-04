"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/lib/store";

export default function EditorTest() {
  const [testResults, setTestResults] = useState<any>({});
  const activeTemplate = useEditorStore((s) => s.activeTemplate);
  const values = useEditorStore((s) => s.values);
  const isLoading = useEditorStore((s) => s.isLoading);

  useEffect(() => {
    const runTests = async () => {
      const results: any = {
        timestamp: new Date().toISOString(),
        storeState: {
          activeTemplate: activeTemplate ? {
            pageId: activeTemplate.pageId,
            title: activeTemplate.title,
            fieldsCount: activeTemplate.fieldsJson ? (activeTemplate.fieldsJson as any[]).length : 0
          } : null,
          valuesCount: Object.keys(values).length,
          isLoading
        },
        apiTest: null,
        templateTest: null
      };

      // Test API
      try {
        const response = await fetch('/api/templates?limit=100');
        if (response.ok) {
          const data = await response.json();
          results.apiTest = {
            success: true,
            templatesCount: data.templates?.length || 0,
            firstTemplate: data.templates?.[0] ? {
              pageId: data.templates[0].pageId,
              title: data.templates[0].title,
              fieldsCount: (data.templates[0].fieldsJson as any[]).length,
              hasPlaceholders: (data.templates[0].fieldsJson as any[]).filter(f => f.placeholder).length
            } : null
          };
        } else {
          results.apiTest = { success: false, error: `HTTP ${response.status}` };
        }
      } catch (error) {
        results.apiTest = { success: false, error: error.message };
      }

      // Test template loading
      if (activeTemplate && activeTemplate.fieldsJson) {
        const fields = activeTemplate.fieldsJson as any[];
        results.templateTest = {
          success: true,
          fieldsCount: fields.length,
          placeholderCount: fields.filter(f => f.placeholder).length,
          valuesCount: Object.keys(values).length,
          sampleField: fields[0] ? {
            id: fields[0].id,
            label: fields[0].label,
            placeholder: fields[0].placeholder,
            hasValue: values[fields[0].id] !== undefined
          } : null
        };
      } else {
        results.templateTest = { success: false, reason: 'No active template or fields' };
      }

      setTestResults(results);
    };

    runTests();
  }, [activeTemplate, values, isLoading]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editor Test Results</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Store State</h2>
          <pre className="text-sm">{JSON.stringify(testResults.storeState, null, 2)}</pre>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">API Test</h2>
          <pre className="text-sm">{JSON.stringify(testResults.apiTest, null, 2)}</pre>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Template Test</h2>
          <pre className="text-sm">{JSON.stringify(testResults.templateTest, null, 2)}</pre>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Raw Test Results</h2>
          <pre className="text-sm">{JSON.stringify(testResults, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}