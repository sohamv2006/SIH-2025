import { defaultColleges } from "../../college-explorer/CollegeDataset";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const radius = searchParams.get("radius") || 10000; // default: 10km

    let nearbyColleges = [];

    // Fetch from Overpass API only if location is provided
    if (lat && lon) {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="college"](around:${radius},${lat},${lon});
          way["amenity"="college"](around:${radius},${lat},${lon});
          relation["amenity"="college"](around:${radius},${lat},${lon});
        );
        out center;
      `;

      try {
        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: overpassQuery,
        });

        const data = await res.json();

        nearbyColleges = data.elements.map((el) => ({
          id: `osm-${el.id}`,
          name: el.tags?.name || "Unknown College",
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
          address: el.tags?.["addr:full"] || el.tags?.["addr:street"] || "Address not available",
          programs: el.tags?.programs || "Not specified",
          eligibility: el.tags?.eligibility || "Not specified",
          cut_off: el.tags?.cut_off || "Not specified",
          medium: el.tags?.medium || "Not specified",
          facilities: el.tags?.facilities || "Not specified",
          isDefault: false,
          isDynamic: true,
        }));
      } catch (err) {
        console.error("Error fetching nearby colleges:", err);
      }
    }

    // Always include default dataset colleges
    const datasetColleges = defaultColleges.map((c) => ({
      ...c,
      isDefault: true,
      isDynamic: false,
    }));

    // Merge both (avoid duplicates by name)
    const combinedColleges = [
      ...datasetColleges,
      ...nearbyColleges.filter(
        (c) => !datasetColleges.some((d) => d.name.toLowerCase() === c.name.toLowerCase())
      ),
    ];

    return new Response(JSON.stringify(combinedColleges), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}