// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to form elements
    const bugReportForm = document.getElementById('bugReportForm');
    const fileUpload = document.getElementById('fileUpload');
    const formInputs = document.querySelectorAll('.form-control');
    let fileName = '';
    
    // File upload handling
    fileUpload.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileName = this.files[0].name;
            
            // Display file name more naturally
            const fileLabel = document.querySelector('.file-upload-label') || document.createElement('span');
            fileLabel.className = 'file-upload-label';
            fileLabel.textContent = 'Selected file: ' + fileName;
            this.parentElement.appendChild(fileLabel);
        }
    });
    
    // Real-time validation for each field
    formInputs.forEach(input => {
        // Add visual feedback when form fields are focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validate field when user finishes typing
            validateField(this);
        });
    });
    
    // Checkbox handling - add event listener to immediately validate
    const agreementCheckbox = document.getElementById('agreementCheckbox');
    if (agreementCheckbox) {
        agreementCheckbox.addEventListener('change', function() {
            validateCheckbox(this);
        });
    }
    
    // Form submission
    bugReportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const bugCategory = document.getElementById('bugCategory');
        const bugTitle = document.getElementById('bugTitle');
        const detailDescription = document.getElementById('detailDescription');
        const suggestions = document.getElementById('suggestions');
        
        // Get selected severity
        let severityLevel = '';
        const severityOptions = document.getElementsByName('severity');
        for (const option of severityOptions) {
            if (option.checked) {
                severityLevel = option.value;
                break;
            }
        }
        
        // Get follow-up preference
        const followUp = document.getElementById('followUpCheck').checked;
        
        // Validate all fields before submission
        const fieldsToValidate = [username, email, bugCategory, bugTitle, detailDescription];
        let isValid = true;
        
        fieldsToValidate.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate severity separately since it's a radio button group
        if (!severityLevel) {
            isValid = false;
            showError(severityOptions[0].parentElement.parentElement, 'Please select a severity level');
        }
        
        // Validate the agreement checkbox
        if (agreementCheckbox && !validateCheckbox(agreementCheckbox)) {
            isValid = false;
        }
        
        if (isValid) {
            // Success message
            showSuccessMessage('Thank you for your bug report! ' + 
                (followUp ? 'We will contact you soon.' : 'We will review it shortly.'));
            
            // Here you would normally send the data to a server
            console.log('Form submitted successfully', {
                username: username.value,
                email: email.value,
                bugCategory: bugCategory.value,
                bugTitle: bugTitle.value,
                detailDescription: detailDescription.value,
                suggestions: suggestions.value,
                severityLevel: severityLevel,
                followUp: followUp,
                agreement: agreementCheckbox ? agreementCheckbox.checked : 'N/A',
                attachment: fileName
            });
            
            // Optional: Reset form
            bugReportForm.reset();
            
            // Clear any file upload label
            const fileLabel = document.querySelector('.file-upload-label');
            if (fileLabel) fileLabel.remove();
        }
    });
    
    // Field validation function
    function validateField(field) {
        const fieldValue = field.value.trim();
        const fieldId = field.id;
        let isValid = true;
        
        // Remove any existing error message
        clearError(field);
        
        // Required field validation
        if (fieldId !== 'suggestions' && !fieldValue) {
            showError(field, 'This field is required');
            return false;
        }
        
        // Specific validations
        switch (fieldId) {
            case 'username':
                if (fieldValue.length < 2) {
                    showError(field, 'Name seems too short');
                    isValid = false;
                }
                break;
                
            case 'email':
                // Simple email validation without regex
                if (!fieldValue.includes('@') || !fieldValue.includes('.')) {
                    showError(field, 'This doesn\'t look like an email address');
                    isValid = false;
                } else {
                    // Check for common email mistakes
                    const emailParts = fieldValue.split('@');
                    if (emailParts.length !== 2 || !emailParts[0] || !emailParts[1]) {
                        showError(field, 'Please check your email format');
                        isValid = false;
                    } else if (!emailParts[1].includes('.')) {
                        showError(field, 'Domain seems incorrect');
                        isValid = false;
                    } else {
                        const domainParts = emailParts[1].split('.');
                        if (domainParts[domainParts.length - 1].length < 2) {
                            showError(field, 'Domain extension seems too short');
                            isValid = false;
                        }
                    }
                }
                break;
                
            case 'bugTitle':
                if (fieldValue.length < 5) {
                    showError(field, 'Please provide a more descriptive title [>5 characters]');
                    isValid = false;
                }
                break;
                
            case 'detailDescription':
                if (fieldValue.length < 20) {
                    showError(field, 'Please provide more details about the bug [>20 characters]');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }
    
    // Checkbox validation function
    function validateCheckbox(checkboxField, errorMessage = 'You must check this box to continue') {
        // Remove any existing error message
        clearError(checkboxField);
        
        // Check if the checkbox is checked
        if (!checkboxField.checked) {
            showError(checkboxField, errorMessage);
            return false;
        }
        
        return true;
    }
    
    // Show error message
    function showError(field, message) {
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff3333';
        errorElement.style.fontSize = '0.85em';
        errorElement.style.marginTop = '5px';
        
        field.classList.add('error');
        
        // For checkbox, add error after the label
        if (field.type === 'checkbox') {
            const label = field.parentElement.querySelector('label') || field.parentElement;
            label.parentElement.appendChild(errorElement);
        } else {
            field.parentElement.appendChild(errorElement);
        }
    }
    
    // Clear error message
    function clearError(field) {
        field.classList.remove('error');
        
        // For checkbox, look for error in the parent of the label
        let parent = field.type === 'checkbox' ? 
            field.parentElement.querySelector('label')?.parentElement || field.parentElement :
            field.parentElement;
            
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Show success message
    function showSuccessMessage(message) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        successElement.style.backgroundColor = '#dff0d8';
        successElement.style.color = '#3c763d';
        successElement.style.padding = '15px';
        successElement.style.marginBottom = '20px';
        successElement.style.borderRadius = '4px';
        
        bugReportForm.prepend(successElement);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }

    // Mobile menu handling
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle menu icon between burger and X
        const menuIcon = this.querySelector('.menu-icon');
        if (navLinks.classList.contains('active')) {
            menuIcon.innerHTML = '✕';
        } else {
            menuIcon.innerHTML = '☰';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && 
            !event.target.closest('.nav-links') && 
            navLinks.classList.contains('active')) {
            
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 940 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
});