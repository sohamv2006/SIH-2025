"use client";
import { useState } from "react";
import courses from "@/app/data/courses.json";
import CourseFlowchart from "../components/CourseFlowchart";

export default function CareerOutcomesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || null);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  return (
    <main className="flex justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2 text-center">Course to Career Mapping</h1>
        <p className="mb-6 text-gray-600 text-center">
          Choose a course from the dropdown menu to view its structured academic and career pathway.
        </p>

        {/* Dropdown */}
        <div className="flex justify-center mb-6">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
            className="p-2 border rounded w-full max-w-lg shadow-sm"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Flowchart */}
        <div className="bg-white border rounded-lg shadow-lg p-4">
          <CourseFlowchart course={selectedCourse} />
        </div>
      </div>
    </main>
  );
}