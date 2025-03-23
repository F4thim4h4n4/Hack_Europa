<script>
  // Initialize the map
  const map = L.map("map").setView([10.047, 76.324], 15);

  // Load OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

  // Now add your route and markers
  const routeCoordinates = [
    [10.058644168891453, 76.32197074447247],
    [10.044401981092289, 76.32463691855706],
    [10.042720267478686, 76.32830749008187],
    [10.04498329255777, 76.32795317926157],
    [10.048408773013792, 76.33008553542277]
  ];

  const busRoute = L.polyline(routeCoordinates, {
    color: "blue",
    weight: 5,
    opacity: 0.8
  }).addTo(map);

  const stops = [
    { name: "Kalamassery Metro", coords: [10.058644168891453, 76.32197074447247] },
    { name: "Main Gate", coords: [10.047169758249389, 76.3195680447786] },
    { name: "ADM Block", coords: [10.044401981092289, 76.32463691855706] },
    { name: "Amenity Center", coords: [10.042720267478686, 76.32830749008187] },
    { name: "C-SiS", coords: [10.04498329255777, 76.32795317926157] },
    { name: "SOE Gate", coords: [10.048408773013792, 76.33008553542277] }
  ];

  stops.forEach(stop => {
    L.marker(stop.coords)
      .addTo(map)
      .bindTooltip(stop.name, {
        permanent: true,
        direction: "top",
        offset: [0, -10],
        className: "marker-label"
      })
      .openTooltip();
  });

  map.fitBounds(busRoute.getBounds());
</script>
