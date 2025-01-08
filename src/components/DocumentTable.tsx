"use client";

import React from 'react';
import { FileIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { formatFileSize } from "../lib/utils";

export interface Document {
  id: string;
  name: string;
  classification?: string;
  size: number;
  url: string;
  createdAt: Date;
}

interface DocumentTableProps {
  documents: Document[];
  onDelete?: (id: string) => void;
}

export function DocumentTable({ documents, onDelete }: DocumentTableProps) {
  return (
    <div className="relative overflow-x-auto rounded-md border">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Document Name
            </th>
            <th scope="col" className="px-6 py-3">
              Classification
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                <FileIcon className="h-4 w-4 text-blue-500" />
                {doc.name}
              </td>
              <td className="px-6 py-4">
                {doc.classification}
              </td>
              <td className="px-6 py-4">
                {formatFileSize(doc.size)}
              </td>
              <td className="px-6 py-4">
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
