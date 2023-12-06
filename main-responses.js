let chatbotResponses = {};

function loadResponses() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'responses.txt', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            chatbotResponses = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}

function handleUserInput(input) {
    const calculationPattern = /berapa\s+(-?[\d.]+)\s*([+\-*/])\s*(-?[\d.]+)/i; 
    const matchCalculation = input.match(calculationPattern);

    if (matchCalculation) {
        const operand1 = parseFloat(matchCalculation[1]);
        const operator = matchCalculation[2];
        const operand2 = parseFloat(matchCalculation[3]);

        let result;
        switch (operator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                result = operand1 / operand2;
                break;
            default:
                result = 'Invalid operator';
        }

        return `Hasil dari ${operand1} ${operator} ${operand2} adalah: ${result}`;
    } else if (input.toLowerCase().includes('go google')) {
        const searchQuery = encodeURIComponent(input.replace('go google', '').trim());
        const googleSearchURL = `https://www.google.com/search?q=${searchQuery}`;
        // Change the current page's location
        window.location.href = googleSearchURL;
    } else if (input.toLowerCase().includes('google')) {
        const searchQuery = encodeURIComponent(input.replace('google', '').trim());
        const googleSearchURL = `https://www.google.com/search?q=${searchQuery}`;
        return `Berikut hasil pencarian Google untuk '${input}': <a href="${googleSearchURL}" target="_blank">${googleSearchURL}</a>`;
    } else {
        // Handle other types of input or use the original chatbotResponses logic here
        return chatbotResponses[input] || 'Maaf, saya tidak mengerti.';
    }
}
