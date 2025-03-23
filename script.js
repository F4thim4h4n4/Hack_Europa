const formTitle = document.getElementById("form-title");
const authBtn = document.getElementById("auth-btn");
const toggleText = document.getElementById("toggle-text");
const authContainer = document.querySelector(".auth-container");

let isSignup = false;

function toggleMode(e) {
  if (e) e.preventDefault();
  isSignup = !isSignup;

  // Add slide-out effect
  authContainer.style.transform = "translateX(-100%)";
  authContainer.style.transition = "transform 0.3s ease";

  setTimeout(() => {
    // Change content after slide out
    formTitle.innerText = isSignup ? "Create Account" : "Welcome Back";
    authBtn.innerText = isSignup ? "Sign Up" : "Login";
    toggleText.innerHTML = isSignup
      ? 'Already registered? <a href="#" id="toggle-link">Login here</a>'
      : 'Need an account? <a href="#" id="toggle-link">Sign up now</a>';

    // Display signup hint
    if (isSignup) {
      alert("Ensure to fill all fields to create your account!");
    }

    // Reattach event listener to new toggle link
    document.getElementById("toggle-link").addEventListener("click", toggleMode);

    // Slide back in
    authContainer.style.transform = "translateX(0)";
  }, 300);
}

// Initial toggle listener
document.getElementById("toggle-link").addEventListener("click", toggleMode);

// Firebase Login and Signup
function handleAuth(email, password) {
  if (isSignup) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Created Successfully!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  }
}

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Starting and ending points
const startPoint = { lat: 9.9312, lng: 76.2673 }; // CUSAT Main Gate
const endPoint = { lat: 10.0159, lng: 76.3419 }; // Metro Station

// Simulated bus path (array of coordinates)
const busPath = [
  { lat: 9.9312, lng: 76.2673 }, // Start
  { lat: 9.9350, lng: 76.2700 },
  { lat: 9.9400, lng: 76.2750 },
  { lat: 9.9450, lng: 76.2800 },
  { lat: 9.9500, lng: 76.2850 },
  { lat: 10.0159, lng: 76.3419 }, // End
];

let map;
let marker;
let currentIndex = 0;

// Initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: startPoint,
    zoom: 14,
  });

  // Add start and end markers
  new google.maps.Marker({ position: startPoint, map, title: 'Start Point' });
  new google.maps.Marker({ position: endPoint, map, title: 'End Point' });

  // Initialize bus marker
  marker = new google.maps.Marker({
    position: startPoint,
    map,
    title: 'Bus',
    icon: 'https://maps.google.com/mapfiles/ms/icons/bus.png',
  });

  // Move the bus along the path
  moveBus();
}

// Simulate bus movement
function moveBus() {
  if (currentIndex < busPath.length) {
    marker.setPosition(busPath[currentIndex]);
    currentIndex++;
    setTimeout(moveBus, 2000); // Move every 2 seconds
  } else {
    alert('Bus has reached the destination!');
  }
}

// Load the map
window.initMap = initMap;
