document.addEventListener('DOMContentLoaded', function() {
    const bugReportForm = document.getElementById('bugReportForm');
    const fileUpload = document.getElementById('fileUpload');
    const formInputs = document.querySelectorAll('.form-control');
    let fileName = '';
    
    // upload file
    fileUpload.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileName = this.files[0].name;
            
            // display file name naturally
            const fileLabel = document.querySelector('.file-upload-label') || document.createElement('span');
            fileLabel.className = 'file-upload-label';
            fileLabel.textContent = 'Selected file: ' + fileName;
            this.parentElement.appendChild(fileLabel);
        }
    });

    // validation for each section question
    formInputs.forEach(input => {
        // visual feedback while form fields are focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            validateField(this);
        });
    });
    
    // event listener to immediately validate
    const agreementCheckbox = document.getElementById('agreementCheckbox');
    if (agreementCheckbox) {
        agreementCheckbox.addEventListener('change', function() {
            validateCheckbox(this);
        });
    }
    
    // form submission
    bugReportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const bugCategory = document.getElementById('bugCategory');
        const bugTitle = document.getElementById('bugTitle');
        const detailDescription = document.getElementById('detailDescription');
        const suggestions = document.getElementById('suggestions');
        
        // selected severity
        let severityLevel = '';
        const severityOptions = document.getElementsByName('severity');
        for (const option of severityOptions) {
            if (option.checked) {
                severityLevel = option.value;
                break;
            }
        }
        
        // follow-up preference
        const followUp = document.getElementById('followUpCheck').checked;
        
        // validate all fields before submission
        const fieldsToValidate = [username, email, bugCategory, bugTitle, detailDescription];
        let isValid = true;
        
        fieldsToValidate.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // validate severity separately
        if (!severityLevel) {
            isValid = false;
            showError(severityOptions[0].parentElement.parentElement, 'Please select a severity level');
        }
        
        // validate the agreement checkbox
        if (agreementCheckbox && !validateCheckbox(agreementCheckbox)) {
            isValid = false;
        }
        
        if (isValid) {
            showSuccessMessage('Thank you for your bug report! ' + 
                (followUp ? 'We will contact you soon.' : 'We will review it shortly.'));

            bugReportForm.reset();

            const fileLabel = document.querySelector('.file-upload-label');
            if (fileLabel) fileLabel.remove();
        }
    });
    
    // function for form validation
    function validateField(field) {
        const fieldValue = field.value.trim();
        const fieldId = field.id;
        let isValid = true;
        
        clearError(field);
        
        if (fieldId !== 'suggestions' && !fieldValue) {
            showError(field, 'This field is required');
            return false;
        }
        
        // specific validations
        switch (fieldId) {
            case 'username':
                if (fieldValue.length < 2) {
                    showError(field, 'Name seems too short');
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!fieldValue.includes('@') || !fieldValue.includes('.')) {
                    showError(field, 'This doesn\'t look like an email address');
                    isValid = false;
                } else {
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
    
    // checkbox validation function
    function validateCheckbox(checkboxField, errorMessage = 'You must check this box to continue') {
        clearError(checkboxField);
        
        if (!checkboxField.checked) {
            showError(checkboxField, errorMessage);
            return false;
        }
        
        return true;
    }
    
    // show error message
    function showError(field, message) {
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff3333';
        errorElement.style.fontSize = '0.85em';
        errorElement.style.marginTop = '5px';
        
        field.classList.add('error');
        
        if (field.type === 'checkbox') {
            const label = field.parentElement.querySelector('label') || field.parentElement;
            label.parentElement.appendChild(errorElement);
        } else {
            field.parentElement.appendChild(errorElement);
        }
    }
    
    // clear error message function
    function clearError(field) {
        field.classList.remove('error');
        
        let parent = field.type === 'checkbox' ?
            field.parentElement.querySelector('label')?.parentElement || field.parentElement :
            field.parentElement;
            
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // show success message
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
        
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }

    // mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // mobile menu button
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // burger and X
        const menuIcon = this.querySelector('.menu-icon');
        if (navLinks.classList.contains('active')) {
            menuIcon.innerHTML = '✕';
        } else {
            menuIcon.innerHTML = '☰';
        }
    });
    
    // close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && 
            !event.target.closest('.nav-links') && 
            navLinks.classList.contains('active')) {
            
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
    
    // close menu when window is resized above mobile size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 940 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('.menu-icon').innerHTML = '☰';
        }
    });
});