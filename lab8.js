const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Змінні для анімації
let isAnimating = false;
let animationId;
let time = 0;

// Кольори (як у SVG)
const colors = {
    darkBlue: "#2c3e50",
    bodyBlue: "#3498db",
    legBlue: "#2980b9",
    headBlue: "#007bff",
    gold: "gold"
};

window.onload = function() {
    drawFigure();
    
    canvas.addEventListener('mousedown', function() {
        isAnimating = !isAnimating;
        if (isAnimating) {
            animate();
        } else {
            cancelAnimationFrame(animationId);
        }
    });
};

function resetAnimation() {
    isAnimating = false;
    cancelAnimationFrame(animationId);
    time = 0;
    drawFigure();
}

function animate() {
    time += 0.05;
    drawFigure();
    if (isAnimating) {
        animationId = requestAnimationFrame(animate);
    }
}

function drawFigure() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. МАЛЮЄМО ТЕКСТ ПО КРИВІЙ
    // Параметри кривої з SVG: M 50 60 Q 250 10 450 60
    // P0=(50,60), Control=(250,10), P2=(450,60)
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = colors.darkBlue;
    ctx.textAlign = "center";
    
    drawTextAlongBezier("AlcoFresh - Смак, що дарує настрій!", 50, 60, 250, 10, 450, 60);

    // Малюємо саму лінію (для краси, як у SVG)
    ctx.beginPath();
    ctx.moveTo(50, 60);
    ctx.quadraticCurveTo(250, 10, 450, 60);
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.stroke();

    // --- ТІЛО (Анімація: дихання) ---
    let bodyScale = 1 + 0.05 * Math.sin(time * 2); 
    
    ctx.save();
    ctx.translate(250, 270);
    ctx.scale(bodyScale, bodyScale);
    ctx.beginPath();
    ctx.ellipse(0, 0, 130, 80, 0, 0, Math.PI * 2);
    ctx.fillStyle = colors.bodyBlue;
    ctx.fill();
    ctx.restore();

    // --- НОГИ (Анімація: нахил) ---
    let skewVal = 0.2 * Math.sin(time * 1.5);

    ctx.save();
    ctx.translate(210, 320);
    ctx.transform(1, skewVal, 0, 1, 0, 0); // SkewY
    ctx.fillStyle = colors.legBlue;
    ctx.fillRect(0, 0, 80, 50);
    ctx.restore();

    // --- РУКИ (Анімація: обертання) ---
    
    // Ліва
    ctx.save();
    ctx.translate(95, 270);
    ctx.rotate(time * 2);
    ctx.fillStyle = colors.darkBlue;
    ctx.fillRect(-30, -30, 60, 60); 
    ctx.restore();

    // Права
    ctx.save();
    ctx.translate(405, 270);
    ctx.rotate(time * 2);
    ctx.fillStyle = colors.darkBlue;
    ctx.fillRect(-30, -30, 60, 60);
    ctx.restore();

    // --- ГОЛОВА (Статичні квадрати) ---
    ctx.fillStyle = colors.headBlue;
    ctx.fillRect(100, 130, 50, 50);
    ctx.fillRect(350, 130, 50, 50);
    ctx.fillRect(150, 80, 50, 50);
    ctx.fillRect(300, 80, 50, 50);

    // --- ОЧІ (Анімація: мигання кольором) ---
    let eyeColor = (Math.sin(time) > 0) ? colors.headBlue : colors.gold;
    ctx.fillStyle = eyeColor;
    
    ctx.beginPath();
    ctx.arc(200, 180, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(300, 180, 50, 0, Math.PI * 2);
    ctx.fill();
}

// === ДОДАТКОВА ФУНКЦІЯ ДЛЯ ТЕКСТУ ПО КРИВІЙ ===
function drawTextAlongBezier(str, x0, y0, cx, cy, x2, y2) {
    var len = str.length;
    // Розбиваємо криву на відрізки для кожної літери
    // Це спрощений підхід, де ми просто ділимо 't' на кількість літер
    
    for (var i = 0; i < len; i++) {
        // t йде від 0 до 1. Трохи відступаємо від країв (0.1 до 0.9)
        var t = 0.1 + (i / (len - 1)) * 0.8; 
        
        // Формула квадратичної кривої Безьє для координат (x,y)
        // B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        var xt = Math.pow(1-t, 2) * x0 + 2 * (1-t) * t * cx + Math.pow(t, 2) * x2;
        var yt = Math.pow(1-t, 2) * y0 + 2 * (1-t) * t * cy + Math.pow(t, 2) * y2;

        // Формула похідної (дотичної), щоб знати кут повороту літери
        // B'(t) = 2(1-t)(P1 - P0) + 2t(P2 - P1)
        var dxt = 2 * (1-t) * (cx - x0) + 2 * t * (x2 - cx);
        var dyt = 2 * (1-t) * (cy - y0) + 2 * t * (y2 - cy);
        var angle = Math.atan2(dyt, dxt);

        ctx.save();
        ctx.translate(xt, yt);
        ctx.rotate(angle);
        ctx.fillText(str[i], 0, 0);
        ctx.restore();
    }
}