// Firebase Configurations (firebase-config.js)
const firebaseConfig = {
  apiKey: "AIzaSyCYlkegf1dB9jqos4L_0OJQAuHsvwtXLRs",
authDomain: "fir-f3118.firebaseapp.com",
projectId: "fir-f3118",
storageBucket: "fir-f3118.firebasestorage.app",
messagingSenderId: "643235197610",
appId: "1:643235197610:web:dea2c634dc8145f90796d3",
measurementId: "G-6XECBE3ESH"
  
};

firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Show and hide forms
function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function showRegister() {
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
}

// Register function with Firebase
function register() {
  const firstName = document.getElementById("registerFirstName").value;
  const lastName = document.getElementById("registerLastName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all the fields to register.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      firebase.database().ref('users/' + user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        tasks: []
      });
      alert("Registration successful!");
      window.location.href = 'dashbord.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Login function with Firebase
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    document.getElementById("error").textContent = "Please fill in both fields to log in.";
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = 'dashbord.html';
    })
    .catch((error) => {
      document.getElementById("error").textContent = "Invalid credentials. Please try again.";
    });
}
