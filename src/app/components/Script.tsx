import React from "react";
import { useStore } from "../../store/useStore";
import { isArabic } from "../../utils/isArabic"

const Script: React.FC = () => {
  const { scriptFile, setScriptFile, scriptContent, setScriptContent } = useStore();

  const handleScriptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setScriptContent(event.target?.result as string);
      };
      reader.readAsText(file);
      setScriptFile(file);
    }
  };

  return (
    <div>
      {!scriptFile && (
        <div>
          <h1>Upload Script File</h1>
          <input type="file" accept=".txt" onChange={handleScriptUpload} />
        </div>
      )}
      {scriptFile && (
        <div className={`font-cairo text-lg ${isArabic(scriptContent || "") ? "text-right" : "text-left"}`}>
          <pre>{scriptContent}</pre>
        </div>
      )}
    </div>
  );
};

export default Script;
