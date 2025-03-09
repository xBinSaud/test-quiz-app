// Quizzes JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quizList = document.getElementById('quiz-list');
    const quizSelection = document.getElementById('quiz-selection');
    const activeQuiz = document.getElementById('active-quiz');
    const quizTitle = document.getElementById('quiz-title');
    const questionText = document.getElementById('question-text');
    const questionImageContainer = document.getElementById('question-image-container');
    const questionImage = document.getElementById('question-image');
    const optionsList = document.getElementById('options-list');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    const quizResults = document.getElementById('quiz-results');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const restartBtn = document.getElementById('restart-btn');
    const backToListBtn = document.getElementById('back-to-list-btn');
    
    // Quiz state
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    
    // Load quizzes
    loadQuizzes();
    
    // Event Listeners
    nextBtn.addEventListener('click', handleNextQuestion);
    finishBtn.addEventListener('click', handleFinishQuiz);
    restartBtn.addEventListener('click', handleRestartQuiz);
    backToListBtn.addEventListener('click', handleBackToList);
    
    /**
     * Load available quizzes
     */
    function loadQuizzes() {
        // In a real app, this would fetch quizzes from Firebase
        // For now, we'll create a sample quiz
        const sampleQuiz = {
            id: 'sample-quiz',
            title: 'Sample Quiz',
            description: 'A sample quiz with a few questions',
            questions: []
        };
        
        // Get questions from our simulated database
        getQuestions()
            .then(questions => {
                if (questions.length === 0) {
                    // If no questions, create some sample ones
                    const sampleQuestions = createSampleQuestions();
                    sampleQuiz.questions = sampleQuestions;
                } else {
                    sampleQuiz.questions = questions;
                }
                
                renderQuizList([sampleQuiz]);
            })
            .catch(error => {
                console.error('Error loading questions:', error);
                // Create sample questions as fallback
                const sampleQuestions = createSampleQuestions();
                sampleQuiz.questions = sampleQuestions;
                renderQuizList([sampleQuiz]);
            });
    }
    
    /**
     * Create sample questions if none exist
     */
    function createSampleQuestions() {
        return [
            {
                id: 'q1',
                text: 'What is the capital of France?',
                options: ['London', 'Paris', 'Berlin', 'Madrid'],
                correctOption: 1,
                imageUrl: null
            },
            {
                id: 'q2',
                text: 'Which planet is known as the Red Planet?',
                options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
                correctOption: 1,
                imageUrl: null
            },
            {
                id: 'q3',
                text: 'What is the largest mammal?',
                options: ['Elephant', 'Giraffe', 'Blue Whale', 'Hippopotamus'],
                correctOption: 2,
                imageUrl: null
            }
        ];
    }
    
    /**
     * Render the list of available quizzes
     */
    function renderQuizList(quizzes) {
        quizList.innerHTML = '';
        
        quizzes.forEach(quiz => {
            const quizElement = document.createElement('div');
            quizElement.className = 'quiz-item';
            quizElement.innerHTML = `
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <p><strong>Questions:</strong> ${quiz.questions.length}</p>
                <button class="btn start-quiz-btn" data-id="${quiz.id}">Start Quiz</button>
            `;
            
            quizList.appendChild(quizElement);
            
            // Add start quiz event listener
            const startBtn = quizElement.querySelector('.start-quiz-btn');
            startBtn.addEventListener('click', () => startQuiz(quiz));
        });
    }
    
    /**
     * Start a quiz
     */
    function startQuiz(quiz) {
        currentQuestions = quiz.questions;
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        
        quizTitle.textContent = quiz.title;
        quizSelection.style.display = 'none';
        activeQuiz.style.display = 'block';
        quizResults.style.display = 'none';
        
        renderQuestion();
    }
    
    /**
     * Render the current question
     */
    function renderQuestion() {
        const question = currentQuestions[currentQuestionIndex];
        questionText.textContent = question.text;
        
        // Handle question image
        if (question.imageUrl) {
            questionImage.src = question.imageUrl;
            questionImageContainer.style.display = 'block';
        } else {
            questionImageContainer.style.display = 'none';
        }
        
        // Render options
        optionsList.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('li');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => selectOption(optionElement, index));
            
            optionsList.appendChild(optionElement);
        });
        
        // Update button visibility
        if (currentQuestionIndex === currentQuestions.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            finishBtn.style.display = 'none';
        }
    }
    
    /**
     * Handle option selection
     */
    function selectOption(optionElement, index) {
        // Clear previous selection
        const options = optionsList.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        
        // Mark as selected
        optionElement.classList.add('selected');
        selectedOption = index;
    }
    
    /**
     * Handle next question button click
     */
    function handleNextQuestion() {
        if (selectedOption !== null) {
            checkAnswer();
            currentQuestionIndex++;
            selectedOption = null;
            renderQuestion();
        } else {
            showToast('Please select an option', 'warning');
        }
    }
    
    /**
     * Handle finish quiz button click
     */
    function handleFinishQuiz() {
        if (selectedOption !== null) {
            checkAnswer();
            showResults();
        } else {
            showToast('Please select an option', 'warning');
        }
    }
    
    /**
     * Check if the selected answer is correct
     */
    function checkAnswer() {
        const question = currentQuestions[currentQuestionIndex];
        if (selectedOption === question.correctOption) {
            score++;
            showToast('Correct!', 'success');
        } else {
            showToast(`Incorrect. The correct answer is: ${question.options[question.correctOption]}`, 'error');
        }
    }
    
    /**
     * Show quiz results
     */
    function showResults() {
        scoreElement.textContent = score;
        totalQuestionsElement.textContent = currentQuestions.length;
        
        questionText.style.display = 'none';
        questionImageContainer.style.display = 'none';
        optionsList.style.display = 'none';
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'none';
        
        quizResults.style.display = 'block';
    }
    
    /**
     * Handle restart quiz button click
     */
    function handleRestartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        
        questionText.style.display = 'block';
        optionsList.style.display = 'block';
        quizResults.style.display = 'none';
        
        renderQuestion();
    }
    
    /**
     * Handle back to list button click
     */
    function handleBackToList() {
        activeQuiz.style.display = 'none';
        quizSelection.style.display = 'block';
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