// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quizForm = document.getElementById('quizForm');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const uploadStatus = document.getElementById('uploadStatus');
    const questionsContainer = document.getElementById('questionsContainer');
    
    // Variables to store data
    let imageUrl = null;
    let questions = [];
    
    // Initialize Firebase (assuming firebase-config.js is loaded)
    // This would be implemented in firebase-config.js
    
    // Load existing questions
    loadQuestions();
    
    // Event Listeners
    imageInput.addEventListener('change', handleImageSelection);
    quizForm.addEventListener('submit', handleFormSubmit);
    
    /**
     * Handle image selection and preview
     */
    function handleImageSelection(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Show preview container
        imagePreviewContainer.style.display = 'block';
        
        // Create a local preview
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            uploadStatus.textContent = 'Preparing to upload...';
            
            // Upload to Cloudinary
            uploadImageToCloudinary(e.target.result)
                .then(url => {
                    imageUrl = url;
                    uploadStatus.textContent = 'Image uploaded successfully!';
                    showToast('Image uploaded successfully!', 'success');
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    uploadStatus.textContent = 'Error uploading image. Using local image.';
                    imageUrl = e.target.result; // Use data URL as fallback
                    showToast('Error uploading image. Using local image.', 'warning');
                });
        };
        reader.readAsDataURL(file);
    }
    
    /**
     * Handle form submission
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        // Get form values
        const questionText = document.getElementById('questionText').value;
        const option1 = document.getElementById('option1').value;
        const option2 = document.getElementById('option2').value;
        const option3 = document.getElementById('option3').value;
        const option4 = document.getElementById('option4').value;
        const correctOption = parseInt(document.getElementById('correctOption').value);
        
        // Create question object
        const question = {
            id: Date.now().toString(),
            text: questionText,
            imageUrl: imageUrl,
            options: [option1, option2, option3, option4],
            correctOption: correctOption - 1, // Convert to 0-based index
            timestamp: new Date().toISOString()
        };
        
        // Save to Firebase
        saveQuestion(question)
            .then(() => {
                showToast('Question added successfully!', 'success');
                resetForm();
                loadQuestions(); // Refresh the questions list
            })
            .catch(error => {
                console.error('Error saving question:', error);
                showToast('Error saving question. Please try again.', 'error');
            });
    }
    
    /**
     * Save question to Firebase
     */
    function saveQuestion(question) {
        // This would be implemented with Firebase
        // For now, we'll just add it to our local array
        questions.push(question);
        return Promise.resolve();
    }
    
    /**
     * Load questions from Firebase
     */
    function loadQuestions() {
        // This would be implemented with Firebase
        // For now, we'll just use our local array
        renderQuestions(questions);
        return Promise.resolve();
    }
    
    /**
     * Render questions in the UI
     */
    function renderQuestions(questions) {
        questionsContainer.innerHTML = '';
        
        if (questions.length === 0) {
            questionsContainer.innerHTML = '<p>No questions added yet.</p>';
            return;
        }
        
        questions.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-item';
            
            let imageHtml = '';
            if (question.imageUrl) {
                imageHtml = `<img src="${question.imageUrl}" alt="Question Image" class="question-image">`;
            }
            
            questionElement.innerHTML = `
                <h4>${question.text}</h4>
                ${imageHtml}
                <p><strong>Options:</strong></p>
                <ol>
                    ${question.options.map(option => `<li>${option}</li>`).join('')}
                </ol>
                <p><strong>Correct Answer:</strong> Option ${question.correctOption + 1}</p>
                <button class="btn delete-btn" data-id="${question.id}">Delete</button>
            `;
            
            questionsContainer.appendChild(questionElement);
            
            // Add delete event listener
            const deleteBtn = questionElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteQuestion(question.id));
        });
    }
    
    /**
     * Delete a question
     */
    function deleteQuestion(id) {
        // This would be implemented with Firebase
        // For now, we'll just remove it from our local array
        questions = questions.filter(q => q.id !== id);
        renderQuestions(questions);
        showToast('Question deleted successfully!', 'success');
        return Promise.resolve();
    }
    
    /**
     * Reset the form after submission
     */
    function resetForm() {
        quizForm.reset();
        imageUrl = null;
        imagePreviewContainer.style.display = 'none';
        imagePreview.src = '';
        uploadStatus.textContent = '';
    }
    
    /**
     * Show toast notification
     */
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast toast-${type} show`;
        
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
});