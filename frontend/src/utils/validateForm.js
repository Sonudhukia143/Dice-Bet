export default function validateForm(validation, formData, setValidation) {
    let isValid = true;
    const newValidation = { ...validation };
    let hasChanges = false;

    // Email validation
    if (newValidation.gmail !== undefined) {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.gmail);
        if (newValidation.gmail !== isEmailValid) {
            newValidation.gmail = isEmailValid;
            hasChanges = true;
        }
        if (!isEmailValid) isValid = false;
    }

    // Password validation (min 6 characters)
    if (newValidation.password !== undefined) {
        const isPasswordValid = formData.password.trim().length >= 6;
        if (newValidation.password !== isPasswordValid) {
            newValidation.password = isPasswordValid;
            hasChanges = true;
        }
        if (!isPasswordValid) isValid = false;
    }

    // Username validation
    if (newValidation.username !== undefined) {
        const isUsernameValid = formData.username.trim() !== "";
        if (newValidation.username !== isUsernameValid) {
            newValidation.username = isUsernameValid;
            hasChanges = true;
        }
        if (!isUsernameValid) isValid = false;
    }

    // income validation
    if (newValidation.income !== undefined) {
        const isincomeValid = formData.income.trim() !== "";
        if (newValidation.income !== isincomeValid) {
            newValidation.income = isincomeValid;
            hasChanges = true;
        }
        if (!isincomeValid) isValid = false;
    }

    // income validation
    if (newValidation.investments !== undefined) {
        const isinvestmentsValid = formData.investments.trim() !== "";
        if (newValidation.investments !== isinvestmentsValid) {
            newValidation.investments = isinvestmentsValid;
            hasChanges = true;
        }
        if (!isinvestmentsValid) isValid = false;
    }    
    
    // income validation
    if (newValidation.deductions !== undefined) {
        const isdeductionsValid = formData.deductions.trim() !== "";
        if (newValidation.deductions !== isdeductionsValid) {
            newValidation.deductions = isdeductionsValid;
            hasChanges = true;
        }
        if (!isdeductionsValid) isValid = false;
    }    
    
    // income validation
    if (newValidation.otherIncome !== undefined) {
        const isotherIncomeValid = formData.otherIncome.trim() !== "";
        if (newValidation.otherIncome !== isotherIncomeValid) {
            newValidation.otherIncome = isotherIncomeValid;
            hasChanges = true;
        }
        if (!isotherIncomeValid) isValid = false;
    }

    if (hasChanges) {
        setValidation(newValidation);
    }

    return isValid;
}