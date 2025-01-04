
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDP4btGjNJxxWGN9uf7oVXAUuXfgk-kbLk",
    authDomain: "crypto-wallet-7ad44.firebaseapp.com",
    projectId: "crypto-wallet-7ad44",
    storageBucket: "crypto-wallet-7ad44.firebasestorage.app",
    messagingSenderId: "112210890136",
    appId: "1:112210890136:web:c848d95fd723af3cb7afed",
    measurementId: "G-TCM4GFZY1W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  document.addEventListener("DOMContentLoaded",()=>{
    const submit=document.getElementsByClassName("submit")[0]
    submit.addEventListener("click", (e)=>{
        e.preventDefault()
        const email= document.getElementById("email").value
        const password=document.getElementById("password").value
        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            window.location.href="./login.html";
            alert("hi");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
    })
  });
