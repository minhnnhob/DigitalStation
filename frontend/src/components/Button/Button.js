import React from "react";
import { ArrowUp } from "lucide-react";

const ButtonUpload = ({ children, onChange }) => {
  return (
    <label className="flex  border-2 border-gray-600  gap-2 px-3 py-2 bg-bg-df text-white rounded-sm cursor-pointer hover:bg-gray-700 transition-colors mb-2">
      <ArrowUp size={16} />
      <span className="text-sm font-medium">{children}</span>
      <input
        type="file"
        className="hidden"
        onChange={onChange}
        accept="image/*"
      />
    </label>
  );
};

export default ButtonUpload;
