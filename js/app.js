// Main Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz Application Initialized');
    
    // Check if Cloudinary configuration is loaded
    if (typeof uploadImageToCloudinary === 'function') {
        console.log('Cloudinary configuration loaded successfully');
    } else {
        console.warn('Cloudinary configuration not loaded');
    }
    
    // Check if Firebase configuration is loaded
    if (typeof db !== 'undefined' && typeof auth !== 'undefined') {
        console.log('Firebase configuration loaded successfully');
    } else {
        console.warn('Firebase configuration not loaded');
    }
    
    // Initialize toast functionality
    initializeToasts();
    
    /**
     * Initialize toast notifications
     */
    function initializeToasts() {
        // Create toast container if it doesn't exist
        if (!document.getElementById('toast')) {
            const toastContainer = document.createElement('div');
            toastContainer.id = 'toast';
            toastContainer.className = 'toast';
            document.body.appendChild(toastContainer);
        }
        
        // Add global showToast function
        window.showToast = function(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast toast-${type} show`;
            
            setTimeout(() => {
                toast.className = toast.className.replace('show', '');
            }, 3000);
        };
        
        console.log('Toast notifications initialized');
    }
});