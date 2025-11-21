// --- ЗАВДАННЯ 1: Логування ---
function logEvent(message) {
    console.log(`[Подія]: ${message}`);
    // Перевіряємо, чи є блок для логів на сторінці (він є в lab7.html, але може не бути в index.html видимим)
    const logDiv = document.getElementById('logs');
    if (logDiv) {
        const time = new Date().toLocaleTimeString();
        const newLog = document.createElement('div');
        newLog.textContent = `[${time}] ${message}`;
        logDiv.prepend(newLog);
    } else {
        // Якщо блоку немає, виводимо просто alert або в консоль, щоб виконати умову
        // alert(message); // Можна розкоментувати, але буде дратувати
    }
}

// --- ЗАВДАННЯ 2 & 4: Ефекти (працюють всюди) ---
function changeHeaderColor(element) {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    element.style.color = randomColor;
}

function zoomIn(img) {
    img.style.transform = "scale(1.2)";
    img.style.transition = "transform 0.3s";
}

function zoomOut(img) {
    img.style.transform = "scale(1.0)";
}

function changeBorder(img, color) {
    img.style.border = `5px solid ${color}`;
}

// --- ЗАВДАННЯ 3, 5, 6 (Тільки для lab7.html) ---
// Ми перевіряємо, чи існують елементи, перед тим як з ними працювати.

function showBrowserInfo() {
    const output = document.getElementById('browser-output');
    if (!output) return; // Якщо елемента немає, виходимо

    const info = `Browser: ${navigator.userAgent}\nApp: ${navigator.appName}`;
    output.value = info;
}

function findDigits() {
    const input = document.getElementById('regex-input');
    const resultElement = document.getElementById('regex-result');
    if (!input || !resultElement) return;

    const text = input.value;
    const regex = /\d/g; 
    const found = text.match(regex);
    
    if (found) {
        resultElement.innerHTML = `<b>Знайдено:</b> ${found.length} (${found.join(', ')})`;
    } else {
        resultElement.innerHTML = "Цифр не знайдено.";
    }
}

function processArray() {
    const input = document.getElementById('array-input');
    const output = document.getElementById('array-output');
    if (!input || !output) return;

    let arr = input.value.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
    
    if (arr.length === 0) return;

    let resultArr = [...arr];
    const middle = Math.floor(arr.length / 2);
    
    for (let i = 0; i < arr.length; i++) {
        if (i < middle) resultArr[i] = arr[i] * 2;
        else resultArr[i] = arr[i] * 3;
    }

    output.value = `Рез: [${resultArr.join(', ')}]`;
}

// Функції для жирного тексту (Завдання 2)
function makeItalic(element) {
    element.style.fontStyle = "italic";
    element.style.color = "red"; // Додамо червоний колір, щоб зміну було краще видно
    element.style.cursor = "help"; // Змінимо курсор, щоб було видно, що це інтерактивний елемент
}

function removeItalic(element) {
    element.style.fontStyle = "normal";
    element.style.color = "inherit"; // Повертаємо старий колір
    element.style.cursor = "default";
}