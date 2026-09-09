// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    showFoxMessage('Готова помочь с отчетом! 🦊');
});

// Обработка формы
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем данные
    const huntTime = document.getElementById('huntTime').value;
    const leaderId = document.getElementById('leaderId').value.trim();
    let collectorId = document.getElementById('collectorId').value.trim();
    
    // Если собирающий не указан, используем ведущего
    if (!collectorId) {
        collectorId = leaderId;
    }
    
    // Парсим участников
    const participantsText = document.getElementById('participants').value.trim();
    const participants = parseParticipants(participantsText);
    
    // Парсим таскающих
    const carriersText = document.getElementById('carriers').value.trim();
    const carriers = parseCarriers(carriersText);
    
    // Генерируем отчет
    const report = generateReport(huntTime, leaderId, collectorId, participants, carriers);
    
    // Показываем результат
    displayReport(report);
    
    // Сохраняем в историю
    saveToHistory({
        huntTime,
        leaderId,
        collectorId,
        participantsText,
        carriersText,
        report,
        date: new Date().toISOString()
    });
    
    // Сообщение от лисички
    showFoxMessage('Отчет готов! 🎉');
});

function parseParticipants(text) {
    const participants = [];
    const lines = text.split('\n');
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
            const id = parts[0];
            const count = parts[1];
            participants.push({ id, count });
        } else if (parts.length === 1) {
            // Если только ID без количества
            participants.push({ id: parts[0], count: '1' });
        }
    }
    
    return participants;
}

function parseCarriers(text) {
    if (!text) return [];
    
    const carriers = [];
    const lines = text.split('\n');
    
    for (let line of lines) {
        line = line.trim();
        if (line) {
            carriers.push(line);
        }
    }
    
    return carriers;
}

function generateReport(huntTime, leaderId, collectorId, participants, carriers) {
    // Получаем текущую дату
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const dateStr = `${day}.${month}.${year}`;
    
    // Определяем вид охоты
    const huntTypeMap = {
        morning: 'утренняя',
        evening: 'вечерняя',
        vantsan: 'для Ванцань'
    };
    const huntType = huntTypeMap[huntTime] || huntTime;
    
    // Формируем отчет
    let report = `[b]Охота [${dateStr}][/b]\n`;
    report += `[b]Вид:[/b] ${huntType}.\n`;
    report += `[b]Ведущий:[/b] [cat${leaderId}] [${leaderId}].\n`;
    report += `[b]Собирающий:[/b] [cat${collectorId}] [${collectorId}].\n`;
    
    // Участники
    if (participants.length > 0) {
        const participantsStr = participants.map(p => 
            `[cat${p.id}] [${p.id}] (${p.count})`
        ).join(', ');
        report += `[b]Участники:[/b] ${participantsStr}.\n`;
    }
    
    // Таскающие
    if (carriers.length > 0) {
        const carriersStr = carriers.map(c => 
            `[cat${c}] [${c}]`
        ).join(', ');
        report += `[b]Таскающие:[/b] ${carriersStr}.\n`;
    }
    
    return report;
}

function displayReport(report) {
    const output = document.getElementById('reportOutput');
    const generated = document.getElementById('generatedReport');
    generated.textContent = report;
    output.classList.remove('hidden');
    output.scrollIntoView({ behavior: 'smooth' });
}

function copyReport() {
    const reportText = document.getElementById('generatedReport').textContent;
    navigator.clipboard.writeText(reportText).then(() => {
        showFoxMessage('Скопировано! 📋');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = reportText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showFoxMessage('Скопировано! 📋');
    });
}

function downloadReport() {
    const reportText = document.getElementById('generatedReport').textContent;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date();
    const filename = `охота_${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}.txt`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function saveToHistory(data) {
    let history = JSON.parse(localStorage.getItem('catwarHistory')) || [];
    history.unshift(data);
    
    // Ограничиваем историю 50 записями
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    localStorage.setItem('catwarHistory', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('catwarHistory')) || [];
    const historyList = document.getElementById('historyList');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="color: #999;">История пуста</p>';
        return;
    }
    
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item">
            <strong>Охота ${new Date(item.date).toLocaleDateString('ru-RU')}</strong>
            <small>${item.huntTime === 'morning' ? 'Утренняя' : item.huntTime === 'evening' ? 'Вечерняя' : 'Для Ванцань'}</small>
            <div class="history-actions">
                <button onclick="viewHistoryItem(${index})">Просмотр</button>
                <button onclick="deleteHistoryItem(${index})" style="background: #e53e3e;">Удалить</button>
            </div>
        </div>
    `).join('');
}

function viewHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem('catwarHistory')) || [];
    const item = history[index];
    
    if (item) {
        displayReport(item.report);
        showFoxMessage('Вот этот отчет! 📜');
    }
}

function deleteHistoryItem(index) {
    if (confirm('Удалить этот отчет из истории?')) {
        let history = JSON.parse(localStorage.getItem('catwarHistory')) || [];
        history.splice(index, 1);
        localStorage.setItem('catwarHistory', JSON.stringify(history));
        loadHistory();
        showFoxMessage('Отчет удален 🗑️');
    }
}

function clearForm() {
    document.getElementById('reportForm').reset();
    document.getElementById('reportOutput').classList.add('hidden');
    showFoxMessage('Давай заполним новый отчет! 📝');
}

function showFoxMessage(message) {
    const speech = document.querySelector('.fox-speech');
    if (speech) {
        speech.innerHTML = message;
    }
}