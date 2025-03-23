// Define the custom bus icon
const busIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// Create the bus marker
const busMarker = L.marker(routeCoordinates[0], { icon: busIcon }).addTo(map);

// Interpolate between two coordinates
function interpolatePosition(start, end, t) {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t
  ];
}

// Animate between two points smoothly
function animateSegment(start, end, duration, callback) {
  const startTime = performance.now();

  function animateFrame(currentTime) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1); // from 0 to 1

    const pos = interpolatePosition(start, end, t);
    busMarker.setLatLng(pos);

    if (t < 1) {
      requestAnimationFrame(animateFrame);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(animateFrame);
}

// Animate the full route one segment at a time
function animateBusRoute(route, segmentDuration = 3000) {
  let index = 0;

  function nextSegment() {
    if (index < route.length - 1) {
      animateSegment(route[index], route[index + 1], segmentDuration, () => {
        index++;
        nextSegment();
      });
    } else {
      // Loop back to start
      index = 0;
      setTimeout(() => {
        animateSegment(route[route.length - 1], route[0], segmentDuration, nextSegment);
      }, 500);
    }
  }

  nextSegment();
}

// Start animating
animateBusRoute(routeCoordinates, 3000); // 3s per segment
