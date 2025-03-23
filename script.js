// Firebase Login and Signup
function handleAuth(email, password) {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Show loader

  if (isSignup) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "index.html"; // Redirect on success
      })
      .catch((error) => {
        loader.style.display = "none"; // Hide loader on error
        alert(error.message); // Show error alert if signup fails
      });
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "index.html"; // Redirect on success
      })
      .catch((error) => {
        loader.style.display = "none"; // Hide loader on error
        alert(error.message); // Show error alert if login fails
      });
  }
}

// ✅ Auth form submit handler
document.getElementById("auth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleAuth(email, password);
});
