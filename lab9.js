// Функція для зміни АУДІО
function changeAudio() {
    // Отримуємо випадаючий список
    const select = document.getElementById('audioSelect');
    // Отримуємо плеєр
    const player = document.getElementById('myAudioPlayer');
    // Отримуємо підпис
    const caption = document.getElementById('audioCaption');

    // Отримуємо вибраний шлях до файлу
    const selectedValue = select.value;
    // Отримуємо текст вибраного пункту (для підпису)
    const selectedText = select.options[select.selectedIndex].text;

    // Міняємо джерело і запускаємо
    player.src = selectedValue;
    caption.textContent = selectedText;
    player.play();
}

// Функція для зміни ВІДЕО
function changeVideo() {
    const select = document.getElementById('videoSelect');
    const player = document.getElementById('myVideoPlayer');
    const caption = document.getElementById('videoCaption');

    const selectedValue = select.value;
    const selectedText = select.options[select.selectedIndex].text;

    player.src = selectedValue;
    caption.textContent = selectedText;
    player.play();
}