// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // DOM elements
  const signupForm = document.getElementById('signupForm');
  const productForm = document.getElementById('productForm');
  const contentPage = document.getElementById('content');
  
  // Sign up form submit
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
  
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User signed up:', userCredential.user.uid);
      // Show content page
      contentPage.classList.remove('hidden');
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert(error.message);
    }
  });
  
  // Product form submit
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = productForm['category'].value;
    const productName = productForm['productName'].value;
    const productPrice = parseFloat(productForm['productPrice'].value);
  
    try {
      // Add product to Firestore
      await db.collection('products').add({
        category: category,
        productName: productName,
        productPrice: productPrice,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log('Product added successfully!');
      // Clear form
      productForm.reset();
      // Optionally show success message or update UI
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  });