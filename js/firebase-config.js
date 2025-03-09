// Firebase Configuration

// Your web app's Firebase configuration
// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
// This is a placeholder implementation - in a real app, you would use the Firebase SDK
console.log("Firebase configuration loaded");

// Simulated Firebase functionality for demo purposes
const db = {
  // Collection of quiz questions
  questions: [],
  
  // Add a document to a collection
  addDocument: function(collection, data) {
    if (collection === 'questions') {
      this.questions.push(data);
      console.log(`Added document to ${collection}:`, data);
      return Promise.resolve({ id: data.id });
    }
    return Promise.reject(new Error(`Collection ${collection} not found`));
  },
  
  // Get all documents from a collection
  getDocuments: function(collection) {
    if (collection === 'questions') {
      console.log(`Retrieved ${this.questions.length} documents from ${collection}`);
      return Promise.resolve(this.questions);
    }
    return Promise.reject(new Error(`Collection ${collection} not found`));
  },
  
  // Delete a document from a collection
  deleteDocument: function(collection, id) {
    if (collection === 'questions') {
      const initialLength = this.questions.length;
      this.questions = this.questions.filter(doc => doc.id !== id);
      const deleted = initialLength > this.questions.length;
      console.log(`Deleted document ${id} from ${collection}: ${deleted}`);
      return Promise.resolve(deleted);
    }
    return Promise.reject(new Error(`Collection ${collection} not found`));
  },
  
  // Update a document in a collection
  updateDocument: function(collection, id, data) {
    if (collection === 'questions') {
      const index = this.questions.findIndex(doc => doc.id === id);
      if (index !== -1) {
        this.questions[index] = { ...this.questions[index], ...data };
        console.log(`Updated document ${id} in ${collection}:`, this.questions[index]);
        return Promise.resolve(true);
      }
      return Promise.reject(new Error(`Document ${id} not found in ${collection}`));
    }
    return Promise.reject(new Error(`Collection ${collection} not found`));
  }
};

// Firebase Authentication simulation
const auth = {
  currentUser: null,
  
  // Sign in with email and password
  signInWithEmailAndPassword: function(email, password) {
    // In a real app, this would validate credentials with Firebase
    if (email && password) {
      this.currentUser = {
        uid: 'simulated-user-id',
        email: email,
        displayName: 'Simulated User'
      };
      console.log('User signed in:', this.currentUser);
      return Promise.resolve(this.currentUser);
    }
    return Promise.reject(new Error('Invalid email or password'));
  },
  
  // Sign out
  signOut: function() {
    this.currentUser = null;
    console.log('User signed out');
    return Promise.resolve();
  },
  
  // Get the current user
  getCurrentUser: function() {
    return this.currentUser;
  }
};

// Export the simulated Firebase functionality
window.db = db;
window.auth = auth;

// Helper functions for working with Firebase
function saveQuestion(question) {
  return db.addDocument('questions', question);
}

function getQuestions() {
  return db.getDocuments('questions');
}

function deleteQuestion(id) {
  return db.deleteDocument('questions', id);
}

function updateQuestion(id, data) {
  return db.updateDocument('questions', id, data);
}

// Export helper functions
window.saveQuestion = saveQuestion;
window.getQuestions = getQuestions;
window.deleteQuestion = deleteQuestion;
window.updateQuestion = updateQuestion;