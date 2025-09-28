"use client";

import React from "react";
import { FaUserGraduate, FaBook, FaMapMarkerAlt } from "react-icons/fa";

export default function CollegeCard({ college, onSelect, isSelected, onToggleFavorite }) {
  // Split fields into arrays
  const programs = college.programs ? college.programs.split(",") : [];
  const facilities = college.facilities ? college.facilities.split(",") : [];
  const medium = college.medium ? college.medium.split(",") : [];

  return (
    <div className="border rounded-lg shadow-md p-3 w-64 max-w-sm bg-white flex flex-col gap-2 hover:shadow-lg transition">
      {/* Header */}
      <h3 className="text-sm font-semibold text-blue-700 truncate">{college.name}</h3>

      {/* Address and distance */}
      {college.address && (
        <p className="text-xs text-gray-600 truncate flex items-center gap-1">
          <FaMapMarkerAlt /> {college.address}
        </p>
      )}
      {typeof college.distance === "number" && (
        <p className="text-xs text-gray-500">📍 {college.distance.toFixed(2)} km away</p>
      )}

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-x-2 text-xs text-gray-700">
        <div>🎓 {college.eligibility || "—"}</div>
        <div>📖 {college.cut_off || "—"}</div>
        <div>🗣 {medium[0]?.trim() || "—"}</div>
        <div>💡 {programs[0]?.trim() || "—"}</div>
      </div>

      {/* Facilities preview */}
      {facilities.length > 0 && (
        <p className="text-xs text-gray-500 truncate">
          🛠 {facilities.slice(0, 2).join(", ")}
          {facilities.length > 2 ? "…" : ""}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(college);
          }}
          className={`py-1 px-3 rounded-md text-xs font-semibold ${
            isSelected ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSelected ? "Deselect" : "Select"}
        </button>

        {typeof onToggleFavorite === "function" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(college);
            }}
            className="py-1 px-2 rounded-md text-xs font-semibold bg-yellow-400 text-white hover:bg-yellow-500"
          >
            {college.favorite ? "★ Fav" : "☆ Fav"}
          </button>
        )}
      </div>
    </div>
  );
}