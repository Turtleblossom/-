// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    
    const branchButtons = document.querySelectorAll('.branch-btn');
    branchButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchBranch(this.dataset.branch);
        });
    });
    
    // Вэй
    document.getElementById('groupHuntForm').addEventListener('submit', e => { e.preventDefault(); generateGroupHunt(); });
    document.getElementById('soloHuntForm').addEventListener('submit', e => { e.preventDefault(); generateSoloHunt(); });
    
    // Фэн
    document.getElementById('borderPatrolForm').addEventListener('submit', e => { e.preventDefault(); generateBorderPatrol(); });
    document.getElementById('watchForm').addEventListener('submit', e => { e.preventDefault(); generateWatch(); });
    document.getElementById('selfPatrolForm').addEventListener('submit', e => { e.preventDefault(); generateSelfPatrol(); });
    
    // Пэй
    document.getElementById('talesForm').addEventListener('submit', e => { e.preventDefault(); generateTales(); });
    document.getElementById('gamesForm').addEventListener('submit', e => { e.preventDefault(); generateGames(); });
    document.getElementById('lecturesForm').addEventListener('submit', e => { e.preventDefault(); generateLectures(); });
    document.getElementById('kittenPatrolForm').addEventListener('submit', e => { e.preventDefault(); generateKittenPatrol(); });
    document.getElementById('kittenWatchForm').addEventListener('submit', e => { e.preventDefault(); generateKittenWatch(); });
    document.getElementById('butterflyForm').addEventListener('submit', e => { e.preventDefault(); generateButterfly(); });
    document.getElementById('yuanForm').addEventListener('submit', e => { e.preventDefault(); generateYuan(); });
    document.getElementById('monthlyForm').addEventListener('submit', e => { e.preventDefault(); generateMonthly(); });
    
    // Цао
    document.getElementById('mouseHuntForm').addEventListener('submit', e => { e.preventDefault(); generateMouseHunt(); });
    document.getElementById('herbCollectForm').addEventListener('submit', e => { e.preventDefault(); generateHerbCollect(); });
    document.getElementById('soloCollectForm').addEventListener('submit', e => { e.preventDefault(); generateSoloCollect(); });
    document.getElementById('healingForm').addEventListener('submit', e => { e.preventDefault(); generateHealing(); });
    document.getElementById('selfHealForm').addEventListener('submit', e => { e.preventDefault(); generateSelfHeal(); });
    document.getElementById('cleaningForm').addEventListener('submit', e => { e.preventDefault(); generateCleaning(); });
    
    document.getElementById('talesCame').addEventListener('change', updateTalesFields);
    document.getElementById('gamesCame').addEventListener('change', updateGamesFields);
    document.getElementById('lecturesCame').addEventListener('change', updateLecturesFields);
    
    updateTalesFields();
    updateGamesFields();
    updateLecturesFields();
});

function switchBranch(branch) {
    document.querySelectorAll('.branch-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-branch="${branch}"]`).classList.add('active');
    
    document.querySelectorAll('.branch-content').forEach(content => content.classList.remove('active'));
    const contentMap = { wei: 'wei-content', feng: 'feng-content', pei: 'pei-content', cao: 'cao-content' };
    document.getElementById(contentMap[branch]).classList.add('active');
    
    document.getElementById('reportOutput').classList.add('hidden');
}

function switchReportType(branch, reportType) {
    const branchContent = document.getElementById(branch + '-content');
    branchContent.querySelectorAll('.report-type-btn').forEach(btn => btn.classList.remove('active'));
    
    const btnMap = {
        'group-hunt': 0, 'solo-hunt': 1,
        'border-patrol': 0, 'watch': 1, 'self-patrol': 2,
        'tales': 0, 'games': 1, 'lectures': 2, 'kitten-patrol': 3, 'kitten-watch': 4, 'butterfly': 5, 'yuan': 6, 'monthly': 7,
        'mouse-hunt': 0, 'herb-collect': 1, 'solo-collect': 2, 'healing': 3, 'self-heal': 4, 'cleaning': 5
    };
    
    const btns = branchContent.querySelectorAll('.report-type-btn');
    const btnIndex = btnMap[reportType];
    if (btns[btnIndex]) btns[btnIndex].classList.add('active');
    
    branchContent.querySelectorAll('.report-form').forEach(form => form.classList.remove('active'));
    
    const formMap = {
        'group-hunt': 'groupHuntForm', 'solo-hunt': 'soloHuntForm',
        'border-patrol': 'borderPatrolForm', 'watch': 'watchForm', 'self-patrol': 'selfPatrolForm',
        'tales': 'talesForm', 'games': 'gamesForm', 'lectures': 'lecturesForm',
        'kitten-patrol': 'kittenPatrolForm', 'kitten-watch': 'kittenWatchForm',
        'butterfly': 'butterflyForm', 'yuan': 'yuanForm', 'monthly': 'monthlyForm',
        'mouse-hunt': 'mouseHuntForm', 'herb-collect': 'herbCollectForm', 'solo-collect': 'soloCollectForm',
        'healing': 'healingForm', 'self-heal': 'selfHealForm', 'cleaning': 'cleaningForm'
    };
    
    document.getElementById(formMap[reportType]).classList.add('active');
    document.getElementById('reportOutput').classList.add('hidden');
}

function updateTalesFields() {
    const came = document.getElementById('talesCame').value;
    document.getElementById('talesYuanGroup').style.display = came === 'yes' ? 'block' : 'none';
}

function updateGamesFields() {
    const came = document.getElementById('gamesCame').value;
    document.getElementById('gamesYuanGroup').style.display = came === 'yes' ? 'block' : 'none';
    document.getElementById('gamesGuestsGroup').style.display = came === 'yes' ? 'block' : 'none';
}

function updateLecturesFields() {
    const came = document.getElementById('lecturesCame').value;
    document.getElementById('lecturesYuanGroup').style.display = came === 'yes' ? 'block' : 'none';
    document.getElementById('lecturesGuestsGroup').style.display = came === 'yes' ? 'block' : 'none';
}

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

function switchKittenWatchType(type) {
    const routeGroup = document.getElementById('kittenWatchRouteGroup');
    const locationGroup = document.getElementById('kittenWatchLocationGroup');
    
    if (type === 'active') {
        routeGroup.style.display = 'block';
        locationGroup.style.display = 'none';
    } else {
        routeGroup.style.display = 'none';
        locationGroup.style.display = 'block';
    }
}

function formatTime(timeStr) {
    if (!timeStr) return '-';
    timeStr = timeStr.trim();
    timeStr = timeStr.replace(/[.\s]+/g, ':');
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
        return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
    }
    return timeStr;
}

function getCurrentDate() {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getFullYear()).slice(-2)}`;
}

function getShortDate() {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function parseIds(text) {
    if (!text) return [];
    const cleaned = text.replace(/[,\n\r]+/g, ' ');
    return cleaned.split(/\s+/).filter(p => p.trim());
}

function parseIdCountPairs(text) {
    if (!text) return [];
    const results = [];
    const chunks = text.split(/[,\n\r]+/).map(c => c.trim()).filter(c => c !== '');
    
    for (const chunk of chunks) {
        const parts = chunk.split(/\s+/).filter(p => p);
        if (parts.length >= 2) {
            for (let i = 0; i < parts.length; i += 2) {
                if (parts[i + 1]) {
                    results.push({ id: parts[i], count: parts[i + 1] });
                } else {
                    results.push({ id: parts[i], count: '1' });
                }
            }
        } else if (parts.length === 1) {
            results.push({ id: parts[0], count: '1' });
        }
    }
    return results;
}

function formatCollector(text) {
    if (text.includes('/')) {
        const id = text.split('/')[0];
        return `[cat${id}] [${text}]`;
    }
    return `[cat${text}] [${text}]`;
}
// ==================== ВЕТКА ВЭЙ ====================

function generateGroupHunt() {
    const huntType = document.getElementById('huntType').value;
    const leaderId = document.getElementById('leaderId').value.trim();
    let collectorId = document.getElementById('collectorId').value.trim();
    if (!collectorId && leaderId) collectorId = leaderId;
    
    const participants = parseIdCountPairs(document.getElementById('participants').value.trim());
    const carriers = parseIds(document.getElementById('carriers').value.trim());
    const dateStr = getCurrentDate();
    const huntTypeMap = { morning: 'утренняя', evening: 'вечерняя', vantsan: 'для Ванцань' };
    
    let report = `[b]Охота [${dateStr}][/b]\n`;
    report += `[b]Вид:[/b] ${huntTypeMap[huntType] || huntType}.\n`;
    report += `[b]Ведущий:[/b] ${leaderId ? `[cat${leaderId}] [${leaderId}]` : '-'}.\n`;
    report += `[b]Собирающий:[/b] ${collectorId ? `[cat${collectorId}] [${collectorId}]` : '-'}.\n`;
    report += participants.length > 0 
        ? `[b]Участники:[/b] ${participants.map(p => `[cat${p.id}] [${p.id}] (${p.count})`).join(', ')}.\n`
        : `[b]Участники:[/b] -.\n`;
    report += carriers.length > 0 
        ? `[b]Таскающие:[/b] ${carriers.map(c => `[cat${c}] [${c}]`).join(', ')}.\n`
        : `[b]Таскающие:[/b] -.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'group-hunt', report, date: new Date().toISOString() });
}

function generateSoloHunt() {
    const time = formatTime(document.getElementById('soloTime').value);
    const location = document.getElementById('soloLocation').value;
    const hunterText = document.getElementById('soloHunter').value.trim();
    const dateStr = getCurrentDate();
    
    let report = `[b]Одиночная охота [${dateStr}][/b]\n`;
    report += `[b]Время:[/b] ${time}.\n`;
    report += `[b]Локация:[/b] ${location}.\n`;
    
    if (hunterText) {
        const parts = hunterText.split(/\s+/);
        report += parts.length >= 2
            ? `[b]Охотник:[/b] [cat${parts[0]}] [${parts[0]}] (${parts[1]}).\n`
            : `[b]Охотник:[/b] [cat${parts[0]}] [${parts[0]}].\n`;
    } else {
        report += `[b]Охотник:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({ type: 'solo-hunt', report, date: new Date().toISOString() });
}

// ==================== ВЕТКА ФЭН ====================

function generateBorderPatrol() {
    const time = document.getElementById('borderTime').value;
    const collectorId = document.getElementById('borderCollector').value.trim();
    const participants = parseIds(document.getElementById('borderParticipants').value.trim());
    const violators = parseIds(document.getElementById('borderViolators').value.trim());
    const route = document.getElementById('borderRoute').value.trim();
    const dateStr = getCurrentDate();
    
    let report = `[b]Пограничный патруль[/b]\n`;
    report += `[b]Дата:[/b] ${dateStr}, ${time}.\n`;
    report += `[b]Собирающий:[/b] ${collectorId ? `[cat${collectorId}] [${collectorId}]` : '-'}.\n`;
    report += participants.length > 0
        ? `[b]Участники:[/b] ${participants.map(p => `[cat${p}] [${p}]`).join(', ')}.\n`
        : `[b]Участники:[/b] -.\n`;
    report += violators.length > 0
        ? `[b]Нарушители:[/b] ${violators.map(v => `[cat${v}] [${v}] - скриншот`).join(', ')}.\n`
        : `[b]Нарушители:[/b] -.\n`;
    
    if (route) {
        report += `\nЯ, [b][link${collectorId || 'ID'}] [${collectorId || 'ID'}][/b], занял локацию/маршрут ${route}.`;
    }
    
    displayReport(report);
    saveToHistory({ type: 'border-patrol', report, date: new Date().toISOString() });
}

function generateWatch() {
    const time = formatTime(document.getElementById('watchTime').value);
    const dateStr = getCurrentDate();
    
    let watchType, location;
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
    report += `[b]Дозорный:[/b] ${guardId ? `[cat${guardId}] [${guardId}]` : '-'}.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'watch', report, date: new Date().toISOString() });
}

function generateSelfPatrol() {
    const time = formatTime(document.getElementById('selfTime').value);
    const participantId = document.getElementById('selfParticipant').value.trim();
    const violators = parseIds(document.getElementById('selfViolators').value.trim());
    const screenshotStart = document.getElementById('selfScreenshotStart').value.trim();
    const screenshotEnd = document.getElementById('selfScreenshotEnd').value.trim();
    const screenshotHistory = document.getElementById('selfScreenshotHistory').value.trim();
    const dateStr = getCurrentDate();
    
    let report = `[b]Самостоятельный патруль[/b]\n`;
    report += `[b]Дата:[/b] ${dateStr}, ${time}.\n`;
    report += `[b]Участник:[/b] ${participantId ? `[cat${participantId}] [${participantId}]` : '-'}.\n`;
    report += violators.length > 0
        ? `[b]Нарушители:[/b] ${violators.map(v => `[cat${v}] [${v}], [url=ссылка]скриншот нарушения[/url]`).join(', ')}.\n`
        : `[b]Нарушители:[/b] -.\n`;
    report += `[b]Скриншоты:[/b]\n`;
    report += `начало (стартовая локация)${screenshotStart ? ` - [url=${screenshotStart}]скриншот[/url]` : ''},\n`;
    report += `конец (конечная локация)${screenshotEnd ? ` - [url=${screenshotEnd}]скриншот[/url]` : ''},\n`;
    report += `скриншот истории${screenshotHistory ? ` - [url=${screenshotHistory}]скриншот[/url]` : ''}.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'self-patrol', report, date: new Date().toISOString() });
}

// ==================== ВЕТКА ПЭЙ ====================

function generateTales() {
    const leaderId = document.getElementById('talesLeader').value.trim();
    const count = document.getElementById('talesCount').value.trim();
    const came = document.getElementById('talesCame').value;
    const yuan = parseIdCountPairs(document.getElementById('talesYuan').value.trim());
    const dateStr = getCurrentDate();
    
    let report = `[b]Сказки [${dateStr}][/b]\n`;
    
    if (came === 'no') {
        report += `\nЯ, ${leaderId ? `[cat${leaderId}] [${leaderId}]` : '[catID] [ID]'}, собрал(-а) сказки, но никто не пришёл.`;
    } else {
        report += `[b]Вёл:[/b] ${leaderId ? `[cat${leaderId}] [${leaderId}]` : '-'}.\n`;
        report += `[b]Кол-во рассказанных сказок:[/b] ${count || 'n'}.\n`;
        report += yuan.length > 0
            ? `[b]Юани:[/b] ${yuan.map(y => `[cat${y.id}] [${y.id}] (${y.count})`).join(', ')}.\n`
            : `[b]Юани:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({ type: 'tales', report, date: new Date().toISOString() });
}

function generateGames() {
    const leaderId = document.getElementById('gamesLeader').value.trim();
    const count = document.getElementById('gamesCount').value.trim();
    const came = document.getElementById('gamesCame').value;
    const yuan = parseIdCountPairs(document.getElementById('gamesYuan').value.trim());
    const guests = parseIdCountPairs(document.getElementById('gamesGuests').value.trim());
    const dateStr = getCurrentDate();
    
    let report = `[b]Игры [${dateStr}][/b]\n`;
    
    if (came === 'no') {
        report += `\nЯ, ${leaderId ? `[cat${leaderId}] [${leaderId}]` : '[catID] [ID]'}, собрал(-а) игры, но никто не пришёл.`;
    } else {
        report += `[b]Вёл:[/b] ${leaderId ? `[cat${leaderId}] [${leaderId}]` : '-'}.\n`;
        report += `[b]Кол-во проведённых игр:[/b] ${count || 'n'}.\n`;
        report += yuan.length > 0
            ? `[b]Юани:[/b] ${yuan.map(y => `[cat${y.id}] [${y.id}] (${y.count})`).join(', ')}.\n`
            : `[b]Юани:[/b] -.\n`;
        report += guests.length > 0
            ? `[b]Гости:[/b] ${guests.map(g => `[cat${g.id}] [${g.id}] (${g.count})`).join(', ')}.\n`
            : `[b]Гости:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({ type: 'games', report, date: new Date().toISOString() });
}

function generateLectures() {
    const topic = document.getElementById('lecturesTopic').value.trim();
    const speakerId = document.getElementById('lecturesSpeaker').value.trim();
    const came = document.getElementById('lecturesCame').value;
    const yuan = parseIdCountPairs(document.getElementById('lecturesYuan').value.trim());
    const guests = parseIdCountPairs(document.getElementById('lecturesGuests').value.trim());
    const dateStr = getCurrentDate();
    
    let report = `[b]Лекции [${dateStr}][/b]\n`;
    
    if (came === 'no') {
        report += `\nЯ, ${speakerId ? `[cat${speakerId}] [${speakerId}]` : '[catID] [ID]'}, собрал(-а) лекции, но никто не пришёл.`;
    } else {
        report += `[b]Тема:[/b] ${topic || '-'}.\n`;
        report += `[b]Рассказывал:[/b] ${speakerId ? `[cat${speakerId}] [${speakerId}]` : '-'}.\n`;
        report += yuan.length > 0
            ? `[b]Юани:[/b] ${yuan.map(y => `[cat${y.id}] [${y.id}] (${y.count})`).join(', ')}.\n`
            : `[b]Юани:[/b] -.\n`;
        report += guests.length > 0
            ? `[b]Гости:[/b] ${guests.map(g => `[cat${g.id}] [${g.id}] (${g.count})`).join(', ')}.\n`
            : `[b]Гости:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({ type: 'lectures', report, date: new Date().toISOString() });
}

function generateKittenPatrol() {
    const endTime = formatTime(document.getElementById('kittenPatrolEnd').value);
    const route = document.getElementById('kittenPatrolRoute').value.trim();
    const memberId = document.getElementById('kittenPatrolMember').value.trim();
    const dateStr = getCurrentDate();
    
    let report = `[b]Патруль (${endTime}), [${dateStr}], маршрут ${route || 'n'}[/b]\n`;
    report += `[b]Участник:[/b] ${memberId ? `[cat${memberId}] [${memberId}]` : '-'}.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'kitten-patrol', report, date: new Date().toISOString() });
}

function generateKittenWatch() {
    const timeStart = formatTime(document.getElementById('kittenWatchTimeStart').value);
    const timeEnd = formatTime(document.getElementById('kittenWatchTimeEnd').value);
    const guardId = document.getElementById('kittenWatchGuard').value.trim();
    const dateStr = getCurrentDate();
    
    let watchType, location;
    const routeGroup = document.getElementById('kittenWatchRouteGroup');
    
    if (routeGroup.style.display !== 'none') {
        watchType = 'активного';
        location = `Маршрут ${document.getElementById('kittenWatchRoute').value}`;
    } else {
        watchType = 'пассивного';
        location = document.getElementById('kittenWatchLocation').value;
    }
    
    let report = `Я, ${guardId ? `[cat${guardId}] [${guardId}]` : '[catID] [ID]'}, занял ${location} ${watchType} дозора.\n\n`;
    report += `[b]${watchType === 'активного' ? 'Активный' : 'Пассивный'} дозор[/b] [${dateStr}].\n`;
    report += `[b]Маршрут/локация:[/b] ${location}.\n`;
    report += `[b]Дозорил:[/b] ${guardId ? `[cat${guardId}] [${guardId}]` : '-'}.\n`;
    report += `[b]Время:[/b] ${timeStart} - ${timeEnd}.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'kitten-watch', report, date: new Date().toISOString() });
}

function generateButterfly() {
    const timeStart = formatTime(document.getElementById('butterflyTimeStart').value);
    const timeEnd = formatTime(document.getElementById('butterflyTimeEnd').value);
    const catcherText = document.getElementById('butterflyCatcher').value.trim();
    const dateStr = getCurrentDate();
    
    let report = `[b]Охота (${timeStart} - ${timeEnd}) [${dateStr}][/b]\n`;
    
    if (catcherText) {
        const parts = catcherText.split(/\s+/);
        if (parts.length >= 3) {
            report += `[b]Ловил:[/b] [cat${parts[0]}] [${parts[0]}] (${parts[1]} бабочек, ${parts[2]} светлячков).\n`;
        } else if (parts.length >= 2) {
            report += `[b]Ловил:[/b] [cat${parts[0]}] [${parts[0]}] (${parts[1]} бабочек).\n`;
        } else {
            report += `[b]Ловил:[/b] [cat${parts[0]}] [${parts[0]}].\n`;
        }
    } else {
        report += `[b]Ловил:[/b] -.\n`;
    }
    
    displayReport(report);
    saveToHistory({ type: 'butterfly', report, date: new Date().toISOString() });
}

function generateYuan() {
    const catId = document.getElementById('yuanCatId').value.trim();
    const skill = document.getElementById('yuanSkill').value.trim();
    const start = document.getElementById('yuanStart').value.trim();
    const end = document.getElementById('yuanEnd').value.trim();
    const screenshotBefore = document.getElementById('yuanScreenshotBefore').value.trim();
    const screenshotAfter = document.getElementById('yuanScreenshotAfter').value.trim();
    
    let report = `Я, [b]${catId ? `[cat${catId}] [${catId}]` : '[catID] [ID]'}[/b], повысил(а) уровень навыка(ов) ${skill || 'N'}/активности с ${start || 'начальный'} до ${end || 'конечный'}.\n`;
    report += `[b]Скриншоты:[/b] `;
    
    const screenshots = [];
    if (screenshotBefore) screenshots.push(`[url=${screenshotBefore}]до[/url]`);
    if (screenshotAfter) screenshots.push(`[url=${screenshotAfter}]после[/url]`);
    
    if (screenshots.length > 0) {
        report += screenshots.join(' и ');
    } else {
        report += 'скриншот до и после через url.';
    }
    report += '.';
    
    displayReport(report);
    saveToHistory({ type: 'yuan', report, date: new Date().toISOString() });
}

function generateMonthly() {
    const catId = document.getElementById('monthlyCatId').value.trim();
    const category = document.getElementById('monthlyCategory').value;
    const number = document.getElementById('monthlyNumber').value;
    const screenshot = document.getElementById('monthlyScreenshot').value.trim();
    
    let report = `Я, [b]${catId ? `[cat${catId}]` : '[catID]'}[/b], выполнил задание категории (${category}) под номером (${number}).\n`;
    report += `[b]Скриншот:[/b] `;
    
    if (screenshot) {
        report += `[url=${screenshot}]скриншот выполнения[/url]`;
    } else {
        report += `[url=]скриншот выполнения[/url]`;
    }
    report += '.';
    
    displayReport(report);
    saveToHistory({ type: 'monthly', report, date: new Date().toISOString() });
}

// ==================== ВЕТКА ЦАО ====================

function generateMouseHunt() {
    const collectorText = document.getElementById('mouseCollector').value.trim();
    const participants = parseIdCountPairs(document.getElementById('mouseParticipants').value.trim());
    const dateStr = getShortDate();
    
    let report = `[b]Охота на мышей [${dateStr}][/b]\n`;
    report += `[b]Собирающий:[/b] ${collectorText ? formatCollector(collectorText) : '-'}.\n`;
    report += participants.length > 0
        ? `[b]Участники:[/b] ${participants.map(p => `[cat${p.id}] [${p.id}] (${p.count})`).join(', ')}.\n`
        : `[b]Участники:[/b] -.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'mouse-hunt', report, date: new Date().toISOString() });
}

function generateHerbCollect() {
    const herbType = document.getElementById('herbType').value;
    const collectorText = document.getElementById('herbCollector').value.trim();
    const participants = parseIds(document.getElementById('herbParticipants').value.trim());
    const dateStr = getCurrentDate();
    
    let report = `[b]${herbType}[/b]\n`;
    report += `[b]Дата:[/b] ${dateStr}.\n`;
    report += `[b]Собирающий:[/b] ${collectorText ? formatCollector(collectorText) : '-'}.\n`;
    report += participants.length > 0
        ? `[b]Участники:[/b] ${participants.map(p => `[cat${p}] [${p}]`).join(', ')}.\n`
        : `[b]Участники:[/b] -.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'herb-collect', report, date: new Date().toISOString() });
}

function generateSoloCollect() {
    const collectType = document.getElementById('soloCollectType').value;
    const collectors = parseIds(document.getElementById('soloCollectors').value.trim());
    
    let report = `[b]Самостоятельный сбор [${collectType}]\n`;
    report += `Cобиравшие:[/b] `;
    report += collectors.length > 0
        ? collectors.map(c => `[cat${c}] [${c}]`).join(', ')
        : '-';
    report += '.';
    
    displayReport(report);
    saveToHistory({ type: 'solo-collect', report, date: new Date().toISOString() });
}

function generateHealing() {
    const helperText = document.getElementById('healingHelper').value.trim();
    const patients = parseIds(document.getElementById('healingPatients').value.trim());
    const dateStr = getShortDate();
    
    let report = `[b]Лечение Кота [${dateStr}][/b]\n`;
    
    if (helperText) {
        const parts = helperText.split(/\s+/);
        const helperIdPart = parts[0];
        const patientCount = parts[1] || '1';
        report += `[b]Помощник Цао:[/b] ${formatCollector(helperIdPart)} (${patientCount}).\n`;
    } else {
        report += `[b]Помощник Цао:[/b] -.\n`;
    }
    
    report += patients.length > 0
        ? `[b]Вылечили:[/b] ${patients.map(p => `[cat${p}] [${p}]`).join(', ')}.\n`
        : `[b]Вылечили:[/b] -.\n`;
    
    displayReport(report);
    saveToHistory({ type: 'healing', report, date: new Date().toISOString() });
}

function generateSelfHeal() {
    const location = document.getElementById('selfHealLocation').value;
    const helperText = document.getElementById('selfHealHelper').value.trim();
    const dateStr = getShortDate();
    
    let report = `[b]Пополнение кучи самолечения [${dateStr}][/b]\n`;
    report += `[b]${location}[/b]\n`;
    report += `[b]Помощник Цао:[/b] ${helperText ? formatCollector(helperText) : '-'}.`;
    
    displayReport(report);
    saveToHistory({ type: 'self-heal', report, date: new Date().toISOString() });
}

function generateCleaning() {
    const cleaningType = document.getElementById('cleaningType').value;
    const helperText = document.getElementById('cleaningHelper').value.trim();
    const dateStr = getShortDate();
    
    let report = `[b]Уборка в Теплой канавке [${dateStr}][/b]\n`;
    report += `[b]${cleaningType}[/b]\n`;
    report += `[b]Помощник Цао:[/b] ${helperText ? formatCollector(helperText) : '-'}.`;
    
    displayReport(report);
    saveToHistory({ type: 'cleaning', report, date: new Date().toISOString() });
}

// ==================== ОБЩИЕ ФУНКЦИИ ====================

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
    if (history.length > 50) history = history.slice(0, 50);
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
        'self-patrol': 'Самостоятельный патруль',
        'tales': 'Сказки',
        'games': 'Игры',
        'lectures': 'Лекции',
        'kitten-patrol': 'Котячий патруль',
        'kitten-watch': 'Котячий дозор',
        'butterfly': 'Охота на бабочек',
        'yuan': 'Юани',
        'monthly': 'Ежемесячное задание',
        'mouse-hunt': 'Охота на мышей',
        'herb-collect': 'Травник/мховник/веточник',
        'solo-collect': 'Самостоятельный сбор',
        'healing': 'Лечение котов',
        'self-heal': 'Пополнение кучи самолечения',
        'cleaning': 'Уборка в Теплой канавке'
    };
    return names[type] || 'Отчет';
}

function viewHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem('catwarHistory')) || [];
    if (history[index]) displayReport(history[index].report);
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
    document.querySelectorAll('form').forEach(form => form.reset());
    document.getElementById('reportOutput').classList.add('hidden');
    updateTalesFields();
    updateGamesFields();
    updateLecturesFields();
}