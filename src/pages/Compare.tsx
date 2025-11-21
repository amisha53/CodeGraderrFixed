import React, { useState } from "react";
import Button from "../components/Button";

const Compare: React.FC = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    setError(null);
    setResult(null);

    if (!file1 || !file2) {
      setError("Please upload both files.");
      return;
    }

    const form = new FormData();
    form.append("file1", file1);
    form.append("file2", file2);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/check", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      setResult(data.similarity);
    } catch (err) {
      setError("Server error. Check backend console.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Compare Two Files</h1>
      <p className="text-gray-600">
        Upload two files to check their similarity using the plagiarism engine.
      </p>

      {/* Upload boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">File 1</label>
          <input
            type="file"
            onChange={(e) => setFile1(e.target.files?.[0] || null)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">File 2</label>
          <input
            type="file"
            onChange={(e) => setFile2(e.target.files?.[0] || null)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>

      {/* Button */}
      <Button
        variant="primary"
        onClick={handleCompare}
        className="px-6 py-3 text-lg"
      >
        Compare Files
      </Button>

      {/* Loading */}
      {loading && (
        <p className="text-blue-600 text-lg font-medium">Checking...</p>
      )}

      {/* Error */}
      {error && <p className="text-red-600 text-lg">{error}</p>}

      {/* Result */}
      {result !== null && (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg mt-4">
          <p className="text-xl font-semibold text-gray-800">
            Similarity:{" "}
            <span
              className={`${
                result >= 85
                  ? "text-red-600"
                  : result >= 70
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {result}%
            </span>
          </p>

          {result >= 85 && (
            <p className="mt-2 text-red-700">
              High similarity detected. Review recommended.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Compare;
