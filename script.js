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
    
    // Обработчики форм
    document.getElementById('groupHuntForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateGroupHunt();
    });
    
    document.getElementById('soloHuntForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateSoloHunt();
    });
    
    document.getElementById('borderPatrolForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateBorderPatrol();
    });
    
    document.getElementById('watchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateWatch();
    });
    
    document.getElementById('selfPatrolForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateSelfPatrol();
    });
});

// Переключение веток
function switchBranch(branch) {
    document.querySelectorAll('.branch-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-branch="${branch}"]`).classList.add('active');
    
    document.querySelectorAll('.branch-content').forEach(content => {
        content.classList.remove('active');
    });
    
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
    
    document.getElementById('reportOutput').classList.add('hidden');
}

// Переключение типов отчетов
function switchReportType(branch, reportType) {
    const branchContent = document.getElementById(branch + '-content');
    branchContent.querySelectorAll('.report-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    branchContent.querySelector(`[data-report="${reportType}"]`).classList.add('active');
    
    branchContent.querySelectorAll('.report-form').forEach(form => {
        form.classList.remove('active');
    });
    
    const formMap = {
        'group-hunt': 'groupHuntForm',
        'solo-hunt': 'soloHuntForm',
        'border-patrol': 'borderPatrolForm',
        'watch': 'watchForm',
        'self-patrol': 'selfPatrolForm'
    };
    
    const formId = formMap[reportType];
    if (formId) {
        document.getElementById(formId).classList.add('active');
    }
    
    document.getElementById('reportOutput').classList.add('hidden');
}

// Переключение типа дозора
function switchWatchType(type) {
    const routeGroup = document.getElementById('watchRouteGroup');
    const locationGroup = document.getElementById('watchLocationGroup');
    
    if (type === 'active') {
        routeGroup.style.display = 'block';
        locationGroup.style.display = 'none';
        document.getElementById('watchRoute').required = true;
        document.getElementById('watchLocation').required = false;
    } else {
        routeGroup.style.display = 'none';
        locationGroup.style.display = 'block';
        document.getElementById('watchRoute').required = false;
        document.getElementById('watchLocation').required = true;
    }
}

// Форматирование времени
function formatTime(timeStr) {
    if (!timeStr) return '-';
    
    timeStr = timeStr.trim();
    timeStr = timeStr.replace(/[.\s]+/g, ':');
    
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    return timeStr;
}

// Получение текущей даты
function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
}

// Парсинг ID
function parseIds(text) {
    if (!text) return [];
    
    const ids = [];
    const lines = text.split('\n');
    
    for (let line of lines) {
        line = line.trim();
        if (line) {
            ids.push(line);
        }
    }
    
    return ids;
}

// Парсинг участников
function parseParticipants(text) {
    if (!text) return [];
    
    const participants = [];
    const lines = text.split('\n');
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
            participants.push({ id: parts[0], count: parts[1] });
        } else if (parts.length === 1) {
            participants.push({ id: parts[0], count: '1' });
        }
    }
    
    return participants;
}

// Генерация групповой охоты
function generateGroupHunt() {
    const huntType = document.getElementById('huntType').value;
    const leaderId = document.getElementById('leaderId').value.trim();
    let collectorId = document.getElementById('collectorId').value.trim();
    
    if (!collectorId && leaderId) {
        collectorId = leaderId;
    }
    
    const participantsText = document.getElementById('participants').value.trim();
    const participants = parseParticipants(participantsText);
    
    const carriersText = document.getElementById('carriers').value.trim();
    const carriers = parseIds(carriersText);
    
    const dateStr = getCurrentDate();
    
    const huntTypeMap = {
        morning: 'утренняя',
        evening: 'вечерняя',
        vantsan: 'для Ванцань'
    };
    const huntTypeStr = huntTypeMap[huntType] || huntType;
    
    let report = `[b]Охота [${dateStr}][/b]\n`;
    report += `[b]Вид:[/b] ${huntTypeStr}.\n`;
    
    if (leaderId) {
        report += `[b]Ведущий:[/b] [cat${leaderId}] [${leaderId}].\n`;
    } else {
        report += `[b]Ведущий:[/b] -.\n`;
    }
    
    if (collectorId) {
        report += `[b]Собирающий:[/b] [cat${collectorId}] [${collectorId}].\n`;
    } else {
        report += `[b]Собирающий:[/b] -.\n`;
    }
    
    if (participants.length > 0) {
        const participantsStr = participants.map(p => 
            `[cat${p.id}] [${p.id}] (${p.count})`
        ).join(', ');
        report += `[b]Участники:[/b] ${participantsStr}.\n`;
    } else {
        report += `[b]Участники:[/b] -.\n`;
    }
    
    if (carriers.length > 0) {
        const carriersStr = carriers.map(c => 
            `[cat${c}] [${c}]`
        ).join(', ');
        report += `[b]Таскающие:[/b] ${carriersStr}.\n`;
    } else {
        report += `[b]Таскающие:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({
        type: 'group-hunt',
        report,
        date: new Date().toISOString()
    });
}

// Генерация одиночной охоты
function generateSoloHunt() {
    const time = formatTime(document.getElementById('soloTime').value);
    const location = document.getElementById('soloLocation').value;
    const hunterText = document.getElementById('soloHunter').value.trim();
    
    const dateStr = getCurrentDate();
    
    const locationMap = {
        'zablachny': 'Заоблачный предел',
        'apelsin': 'Апельсиновая Роща'
    };
    const locationStr = locationMap[location] || location;
    
    let report = `[b]Одиночная охота [${dateStr}][/b]\n`;
    report += `[b]Время:[/b] ${time}.\n`;
    report += `[b]Локация:[/b] ${locationStr}.\n`;
    
    if (hunterText) {
        const parts = hunterText.split(/\s+/);
        if (parts.length >= 2) {
            report += `[b]Охотник:[/b] [cat${parts[0]}] [${parts[0]}] (${parts[1]}).\n`;
        } else if (parts.length === 1) {
            report += `[b]Охотник:[/b] [cat${parts[0]}] [${parts[0]}].\n`;
        }
    } else {
        report += `[b]Охотник:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({
        type: 'solo-hunt',
        report,
        date: new Date().toISOString()
    });
}

// Генерация пограничного патруля
function generateBorderPatrol() {
    const time = document.getElementById('borderTime').value;
    const collectorId = document.getElementById('borderCollector').value.trim();
    const participantsText = document.getElementById('borderParticipants').value.trim();
    const participants = parseIds(participantsText);
    const violatorsText = document.getElementById('borderViolators').value.trim();
    const violators = parseIds(violatorsText);
    const route = document.getElementById('borderRoute').value.trim();
    
    const dateStr = getCurrentDate();
    
    let report = `[b]Пограничный патруль[/b]\n`;
    report += `[b]Дата:[/b] ${dateStr}, ${time}.\n`;
    
    if (collectorId) {
        report += `[b]Собирающий:[/b] [cat${collectorId}] [${collectorId}].\n`;
    } else {
        report += `[b]Собирающий:[/b] -.\n`;
    }
    
    if (participants.length > 0) {
        const participantsStr = participants.map(p => 
            `[cat${p}] [${p}]`
        ).join(', ');
        report += `[b]Участники:[/b] ${participantsStr}.\n`;
    } else {
        report += `[b]Участники:[/b] -.\n`;
    }
    
    if (violators.length > 0) {
        const violatorsStr = violators.map(v => 
            `[cat${v}] [${v}] - скриншот`
        ).join(', ');
        report += `[b]Нарушители:[/b] ${violatorsStr}.\n`;
    } else {
        report += `[b]Нарушители:[/b] -.\n`;
    }
    
    if (route) {
        report += `\nЯ, [b][link${collectorId || 'ID'}] [${collectorId || 'ID'}][/b], занял локацию/маршрут ${route}.`;
    }
    
    displayReport(report);
    saveToHistory({
        type: 'border-patrol',
        report,
        date: new Date().toISOString()
    });
}

// Генерация дозора
function generateWatch() {
    const time = formatTime(document.getElementById('watchTime').value);
    const dateStr = getCurrentDate();
    
    let watchType;
    let location;
    
    if (document.getElementById('watchRoute').required) {
        watchType = 'Активный';
        location = `Маршрут ${document.getElementById('watchRoute').value}`;
    } else {
        watchType = 'Пассивный';
        location = document.getElementById('watchLocation').value;
    }
    
    const guardId = document.getElementById('watchGuard').value.trim();
    
    let report = `[b]${watchType} дозор[/b]\n`;
    report += `[b]Дата:[/b] ${dateStr}, ${time}.\n`;
    report += `[b]Маршрут/Локация:[/b] ${location}.\n`;
    
    if (guardId) {
        report += `[b]Дозорный:[/b] [cat${guardId}] [${guardId}].\n`;
    } else {
        report += `[b]Дозорный:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({
        type: 'watch',
        report,
        date: new Date().toISOString()
    });
}

// Генерация самостоятельного патруля
function generateSelfPatrol() {
    const time = formatTime(document.getElementById('selfTime').value);
    const participantId = document.getElementById('selfParticipant').value.trim();
    const violatorsText = document.getElementById('selfViolators').value.trim();
    const violators = parseIds(violatorsText);
    const screenshots = document.getElementById('selfScreenshots').value.trim();
    
    const dateStr = getCurrentDate();
    
    let report = `[b]Самостоятельный патруль[/b]\n`;
    report += `[b]Дата:[/b] ${dateStr}, ${time}.\n`;
    
    if (participantId) {
        report += `[b]Участник:[/b] [cat${participantId}] [${participantId}].\n`;
    } else {
        report += `[b]Участник:[/b] -.\n`;
    }
    
    if (violators.length > 0) {
        const violatorsStr = violators.map(v => 
            `[cat${v}] [${v}], [url=ссылка]скриншот нарушения[/url]`
        ).join(', ');
        report += `[b]Нарушители:[/b] ${violatorsStr}.\n`;
    } else {
        report += `[b]Нарушители:[/b] -.\n`;
    }
    
    if (screenshots) {
        report += `[b]Скриншоты:[/b] начало (стартовая локация), конец (конечная локация), скриншот истории.\n`;
    }
    
    displayReport(report);
    saveToHistory({
        type: 'self-patrol',
        report,
        date: new Date().toISOString()
    });
}

// Общие функции
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
    const filename = `отчет_${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}.txt`;
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
            <strong>${getReportTypeName(item.type)}</strong>
            <small>${new Date(item.date).toLocaleDateString('ru-RU')}</small>
            <div class="history-actions">
                <button onclick="viewHistoryItem(${index})">Просмотр</button>
                <button onclick="deleteHistoryItem(${index})" style="background: #5a4e3e;">Удалить</button>
            </div>
        </div>
    `).join('');
}

function getReportTypeName(type) {
    const names = {
        'group-hunt': 'Групповая охота',
        'solo-hunt': 'Одиночная охота',
        'border-patrol': 'Пограничный патруль',
        'watch': 'Дозор',
        'self-patrol': 'Самостоятельный патруль'
    };
    return names[type] || 'Отчет';
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

function clearHistory() {
    if (confirm('Очистить всю историю отчетов?')) {
        localStorage.removeItem('catwarHistory');
        loadHistory();
        alert('История очищена!');
    }
}

function clearForm() {
    document.querySelectorAll('form').forEach(form => {
        form.reset();
    });
    document.getElementById('reportOutput').classList.add('hidden');
}