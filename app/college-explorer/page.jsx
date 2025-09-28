"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import CollegeCard from "../components/CollegeCard";

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function CollegeExplorerPage() {
  const [location, setLocation] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(10); // km
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [favoriteColleges, setFavoriteColleges] = useState([]);
  const [panToCollege, setPanToCollege] = useState(null);
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const searchInputRef = useRef(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Fetch colleges from API
  useEffect(() => {
    if (!location) return;
    const [lat, lon] = location;

    const fetchColleges = async () => {
      try {
        const res = await fetch(`/api/Colleges?lat=${lat}&lon=${lon}&radius=10000`);
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    };

    fetchColleges();
  }, [location]);

  // Haversine distance
  const computeDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filter colleges based on distance
  let filteredColleges = colleges
    .map((c) => ({
      ...c,
      distance: location ? computeDistance(location[0], location[1], c.lat, c.lon) : null,
    }))
    .filter((c) => !c.distance || c.distance <= distanceFilter);

  // Ensure searched college is included
  if (searchQuery && panToCollege) {
    const searchCollege = colleges.find((c) => c.name === searchQuery);
    if (searchCollege && !filteredColleges.some((c) => c.id === searchCollege.id)) {
      filteredColleges.push(searchCollege);
    }
  }

  // Autocomplete suggestions
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setAutocompleteResults([]);
      return;
    }
    const results = colleges.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAutocompleteResults(results.slice(0, 5));
  }, [searchQuery, colleges]);

  // Select / Deselect college
  const toggleSelectCollege = (college) => {
    setSelectedColleges((prev) =>
      prev.find((c) => c.id === college.id)
        ? prev.filter((c) => c.id !== college.id)
        : [...prev, college]
    );
  };

  // Add / Remove favorite
  const toggleFavorite = (college) => {
    if (favoriteColleges.some((c) => c.id === college.id)) {
      setFavoriteColleges((prev) => prev.filter((c) => c.id !== college.id));
    } else {
      setFavoriteColleges((prev) => [...prev, college]);
    }
    // Update the main colleges array to reflect favorite status
    setColleges((prev) =>
      prev.map((c) => (c.id === college.id ? { ...c, favorite: !c.favorite } : c))
    );
  };

  // Remove from selection
  const removeCollege = (collegeId) => {
    setSelectedColleges((prev) => prev.filter((c) => c.id !== collegeId));
  };

  // Pan map to selected college
  const handleSelectSuggestion = (college) => {
    setSearchQuery(college.name);
    setPanToCollege([college.lat, college.lon]);
    setAutocompleteResults([]);
    searchInputRef.current.blur();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-blue-700">College Explorer</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search government colleges..."
            className="w-full p-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && autocompleteResults[0]) {
                handleSelectSuggestion(autocompleteResults[0]);
              }
            }}
          />
          {autocompleteResults.length > 0 && (
            <div className="absolute z-50 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg w-full max-h-60 overflow-y-auto">
              {autocompleteResults.map((c) => (
                <div
                  key={c.id}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(c)}
                >
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter: Distance */}
        <div className="flex items-center gap-2">
          <label htmlFor="distance" className="text-sm font-medium">Nearby (km):</label>
          <input
            id="distance"
            type="number"
            min={1}
            max={50}
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(Number(e.target.value))}
            className="w-20 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Map */}
      <div className="p-4 flex-1">
        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden h-[60vh] md:h-[70vh]">
          {location ? (
            <MapView
              key={JSON.stringify(panToCollege)}
              userLocation={location}
              colleges={filteredColleges}
              onSelectCollege={toggleSelectCollege}
              selectedColleges={selectedColleges}
              panTo={panToCollege}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading your location...
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel: Selected & Favorite Colleges */}
      <div className="bg-white shadow-inner p-4 flex flex-col gap-4 border-t border-gray-200">
        {favoriteColleges.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Favorites</h2>
            <div className="flex overflow-x-auto gap-4">
              {favoriteColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        )}

        {selectedColleges.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Selected for Comparison</h2>
            <div className="flex overflow-x-auto gap-4">
              {selectedColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}