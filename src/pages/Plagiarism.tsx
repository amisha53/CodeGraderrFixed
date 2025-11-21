import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { Filter } from "lucide-react";

const Plagiarism: React.FC = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedAssignment, setSelectedAssignment] = useState("all");
  const [minSimilarity, setMinSimilarity] = useState(50);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/reports");
        const data = await res.json();
        setReports(data);
      } catch (e) {
        console.log("Failed to fetch reports", e);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading)
    return (
      <div className="text-center text-xl text-gray-600 py-10">
        Loading reports...
      </div>
    );

  const assignments = ["all", ...new Set(reports.map((r) => r.assignment))];

  const filtered = reports
    .filter((r) =>
      selectedAssignment === "all" ? true : r.assignment === selectedAssignment
    )
    .filter((r) => r.similarity >= minSimilarity);

  const stats = {
    total: reports.length,
    flagged: reports.filter((r) => r.status === "flagged").length,
    reviewed: reports.filter((r) => r.status === "reviewed").length,
    cleared: reports.filter((r) => r.status === "cleared").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Plagiarism Detection</h1>
        <button
          onClick={() => navigate("/compare")}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Compare Files
        </button>
      </div>

      <p className="text-gray-600">
        Monitor code similarity across student submissions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500">Flagged</p>
            <p className="text-3xl font-bold text-red-600">{stats.flagged}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500">Under Review</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.reviewed}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500">Cleared</p>
            <p className="text-3xl font-bold text-green-600">{stats.cleared}</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm">Filter by Assignment</label>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
              >
                {assignments.map((a) => (
                  <option key={a} value={a}>
                    {a === "all" ? "All Assignments" : a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Minimum Similarity: {minSimilarity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={minSimilarity}
              onChange={(e) => setMinSimilarity(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No plagiarism reports found.
          </div>
        )}

        {filtered.map((r) => (
          <div key={r.id} className="p-4 bg-gray-50 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{r.assignment}</h3>
                <p className="mt-1 text-sm">
                  Similarity: <b>{r.similarity}%</b>
                </p>
                <p className="text-sm">
                  Students: <b>{r.studentA}</b> & <b>{r.studentB}</b>
                </p>
              </div>

              <button
                onClick={() => navigate(`/compare/${r.id}`)}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Compare
              </button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Plagiarism;
