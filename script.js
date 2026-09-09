// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    
    // Обработчики для кнопок веток
    const branchButtons = document.querySelectorAll('.branch-btn');
    branchButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchBranch(this.dataset.branch);
        });
    });
});

// Переключение веток
function switchBranch(branch) {
    // Убираем активный класс у всех кнопок
    document.querySelectorAll('.branch-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Добавляем активный класс нажатой кнопке
    document.querySelector(`[data-branch="${branch}"]`).classList.add('active');
    
    // Скрываем все контенты
    document.querySelectorAll('.branch-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Показываем нужный контент
    const contentMap = {
        wei: 'wei-content',
        feng: 'feng-content',
        pei: 'pei-content',
        cao: 'cao-content'
    };
    
    const contentId = contentMap[branch];
    if (contentId) {
        document.getElementById(contentId).classList.add('active');
    }
}

// Обработка формы
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем данные
    const huntTime = document.getElementById('huntTime').value;
    const leaderId = document.getElementById('leaderId').value.trim();
    let collectorId = document.getElementById('collectorId').value.trim();
    
    // Если собирающий не указан, используем ведущего
    if (!collectorId && leaderId) {
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
        branch: 'wei',
        huntTime,
        leaderId,
        collectorId,
        participantsText,
        carriersText,
        report,
        date: new Date().toISOString()
    });
});

function parseParticipants(text) {
    if (!text) return [];
    
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
    
    // Ведущий - если пусто, то "-"
    if (leaderId) {
        report += `[b]Ведущий:[/b] [cat${leaderId}] [${leaderId}].\n`;
    } else {
        report += `[b]Ведущий:[/b] -.\n`;
    }
    
    // Собирающий - если пусто, то "-"
    if (collectorId) {
        report += `[b]Собирающий:[/b] [cat${collectorId}] [${collectorId}].\n`;
    } else {
        report += `[b]Собирающий:[/b] -.\n`;
    }
    
    // Участники - если пусто, то "-"
    if (participants.length > 0) {
        const participantsStr = participants.map(p => 
            `[cat${p.id}] [${p.id}] (${p.count})`
        ).join(', ');
        report += `[b]Участники:[/b] ${participantsStr}.\n`;
    } else {
        report += `[b]Участники:[/b] -.\n`;
    }
    
    // Таскающие - если пусто, то "-"
    if (carriers.length > 0) {
        const carriersStr = carriers.map(c => 
            `[cat${c}] [${c}]`
        ).join(', ');
        report += `[b]Таскающие:[/b] ${carriersStr}.\n`;
    } else {
        report += `[b]Таскающие:[/b] -.\n`;
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
        alert('Скопировано! 📋');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = reportText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Скопировано! 📋');
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
        historyList.innerHTML = '<p style="color: #8a7b6b;">История пуста</p>';
        return;
    }
    
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item">
            <strong>Охота ${new Date(item.date).toLocaleDateString('ru-RU')}</strong>
            <small>${item.huntTime === 'morning' ? 'Утренняя' : item.huntTime === 'evening' ? 'Вечерняя' : 'Для Ванцань'}</small>
            <div class="history-actions">
                <button onclick="viewHistoryItem(${index})">Просмотр</button>
                <button onclick="deleteHistoryItem(${index})" style="background: #5a4e3e;">Удалить</button>
            </div>
        </div>
    `).join('');
}

function viewHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem('catwarHistory')) || [];
    const item = history[index];
    
    if (item) {
        displayReport(item.report);
    }
}

function deleteHistoryItem(index) {
    if (confirm('Удалить этот отчет из истории?')) {
        let history = JSON.parse(localStorage.getItem('catwarHistory')) || [];
        history.splice(index, 1);
        localStorage.setItem('catwarHistory', JSON.stringify(history));
        loadHistory();
    }
}

function clearForm() {
    document.getElementById('reportForm').reset();
    document.getElementById('reportOutput').classList.add('hidden');
}