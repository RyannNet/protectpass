function evaluatePassword(password) {
    const statusElement = document.getElementById('passwordStatus');

    if (password.length === 0) {
        statusElement.textContent = 'Verifique a segurança da senha.';
        statusElement.style.color = '#636363';
    } else if (password.length < 8) {
        statusElement.textContent = 'Senha vulnerável';
        statusElement.style.color = 'orange';
    } else if (password.length < 12) {
        statusElement.textContent = 'Senha equilibrada';
        statusElement.style.color = '#8585ff';
    } else {
        statusElement.textContent = 'Senha segura';
        statusElement.style.color = 'green';
    }
}

function generatePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    const passwordLengthInput = document.getElementById('passwordLength');
    let passwordLength = parseInt(passwordLengthInput.value);

    if (passwordLength < 7) {
        alert('O mínimo para gerar uma senha é de 7 caracteres.');
        passwordLengthInput.value = 7;  // Ajusta o valor no input para o mínimo permitido
        passwordLength = 7;
    } else if (passwordLength > 65) {
        alert('O limite para gerar uma senha é de 65 caracteres.');
        passwordLengthInput.value = 65;  // Ajusta o valor no input para o máximo permitido
        passwordLength = 65;
    }

    for (let i = 0; i < passwordLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.textContent = `Senha gerada: ${password}`;
    evaluatePassword(password);

    savePasswordToHistory(password);
}

function savePasswordToHistory(password) {
    let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    passwordHistory.push(password);
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
}

function viewHistory() {
    const container = document.querySelector('.container');
    const historyContainer = document.getElementById('historyContainer');
    const passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    const historyList = document.getElementById('passwordHistory');

    historyList.innerHTML = '';

    passwordHistory.forEach(function(password) {
        const listItem = document.createElement('li');
        listItem.textContent = password;
        historyList.appendChild(listItem);
    });

    container.style.display = 'none';
    historyContainer.style.display = 'block';
}

function clearHistory() {
    localStorage.removeItem('passwordHistory');
    viewHistory();
}

function goBack() {
    const container = document.querySelector('.container');
    const historyContainer = document.getElementById('historyContainer');

    historyContainer.style.display = 'none';
    container.style.display = 'block';
}