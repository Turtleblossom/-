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
    
    // Награды
    document.getElementById('medalsForm').addEventListener('submit', e => { e.preventDefault(); generateMedals(); });
    document.getElementById('specialNameForm').addEventListener('submit', e => { e.preventDefault(); generateSpecialName(); });
    document.getElementById('personalMedalForm').addEventListener('submit', e => { e.preventDefault(); generatePersonalMedal(); });
    document.getElementById('personalTrophyForm').addEventListener('submit', e => { e.preventDefault(); generatePersonalTrophy(); });
    document.getElementById('personalStatusForm').addEventListener('submit', e => { e.preventDefault(); generatePersonalStatus(); });
    document.getElementById('personalPositionForm').addEventListener('submit', e => { e.preventDefault(); generatePersonalPosition(); });
    document.getElementById('tribalStatusForm').addEventListener('submit', e => { e.preventDefault(); generateTribalStatus(); });
    
    // Боевая школа
    document.getElementById('prepGroupForm').addEventListener('submit', e => { e.preventDefault(); generatePrepGroup(); });
    document.getElementById('rankCheckForm').addEventListener('submit', e => { e.preventDefault(); generateRankCheck(); });
    document.getElementById('obedienceForm').addEventListener('submit', e => { e.preventDefault(); generateObedience(); });
    document.getElementById('resourcesForm').addEventListener('submit', e => { e.preventDefault(); generateResources(); });
    document.getElementById('herbsForm').addEventListener('submit', e => { e.preventDefault(); generateHerbs(); });
    document.getElementById('sleepersForm').addEventListener('submit', e => { e.preventDefault(); generateSleepers(); });
    document.getElementById('trashForm').addEventListener('submit', e => { e.preventDefault(); generateTrash(); });
    document.getElementById('qigongForm').addEventListener('submit', e => { e.preventDefault(); generateQigong(); });
    
    // Слушатели для переключений
    document.getElementById('talesCame').addEventListener('change', updateTalesFields);
    document.getElementById('gamesCame').addEventListener('change', updateGamesFields);
    document.getElementById('lecturesCame').addEventListener('change', updateLecturesFields);
    document.getElementById('tribalMarks').addEventListener('change', updateTribalMarksFields);
    document.getElementById('obedType').addEventListener('change', updateObedFields);
    document.getElementById('trashType').addEventListener('change', updateTrashFields);
    document.getElementById('qigongType').addEventListener('change', updateQigongFields);
    document.getElementById('qigongPearType').addEventListener('change', updateQigongPearFields);
    
    // Инициализация полей
    updateTalesFields();
    updateGamesFields();
    updateLecturesFields();
    updateTribalMarksFields();
    updateObedFields();
    updateTrashFields();
    updateQigongFields();
    updateQigongPearFields();
});

function switchBranch(branch) {
    document.querySelectorAll('.branch-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-branch="${branch}"]`).classList.add('active');
    
    document.querySelectorAll('.branch-content').forEach(content => content.classList.remove('active'));
    const contentMap = {
        wei: 'wei-content',
        feng: 'feng-content',
        pei: 'pei-content',
        cao: 'cao-content',
        awards: 'awards-content',
        school: 'school-content'
    };
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
        'mouse-hunt': 0, 'herb-collect': 1, 'solo-collect': 2, 'healing': 3, 'self-heal': 4, 'cleaning': 5,
        'medals': 0, 'special-name': 1, 'personal-medal': 2, 'personal-trophy': 3, 'personal-status': 4, 'personal-position': 5, 'tribal-status': 6,
        'prep-group': 0, 'rank-check': 1, 'obedience': 2, 'resources': 3, 'herbs': 4, 'sleepers': 5, 'trash': 6, 'qigong': 7
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
        'healing': 'healingForm', 'self-heal': 'selfHealForm', 'cleaning': 'cleaningForm',
        'medals': 'medalsForm', 'special-name': 'specialNameForm', 'personal-medal': 'personalMedalForm',
        'personal-trophy': 'personalTrophyForm', 'personal-status': 'personalStatusForm',
        'personal-position': 'personalPositionForm', 'tribal-status': 'tribalStatusForm',
        'prep-group': 'prepGroupForm', 'rank-check': 'rankCheckForm', 'obedience': 'obedienceForm',
        'resources': 'resourcesForm', 'herbs': 'herbsForm', 'sleepers': 'sleepersForm',
        'trash': 'trashForm', 'qigong': 'qigongForm'
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

function updateTribalMarksFields() {
    const marks = document.getElementById('tribalMarks').value;
    document.getElementById('tribalMarksDetailsGroup').style.display = marks === 'yes' ? 'block' : 'none';
    document.getElementById('tribalMarksColorGroup').style.display = marks === 'yes' ? 'block' : 'none';
}

function updateObedFields() {
    const type = document.getElementById('obedType').value;
    document.getElementById('obedTribeGroup').style.display = type === 'foreign' ? 'block' : 'none';
}

function updateTrashFields() {
    const type = document.getElementById('trashType').value;
    document.getElementById('trashCountGroup').style.display = type === 'clean' ? 'block' : 'none';
}

function updateQigongFields() {
    const type = document.getElementById('qigongType').value;
    document.getElementById('qigongPartner').style.display = type === 'partner' ? 'block' : 'none';
    document.getElementById('qigongButterfly').style.display = type === 'butterfly' ? 'block' : 'none';
    document.getElementById('qigongPear').style.display = type === 'pear' ? 'block' : 'none';
}

function updateQigongPearFields() {
    const type = document.getElementById('qigongPearType').value;
    document.getElementById('qigongPearSmallGroup').style.display = type === 'double' ? 'block' : 'none';
}
// ==================== ОБЩИЕ ФУНКЦИИ ====================

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

function parseViolators(text) {
    if (!text) return [];
    const lines = text.split(/\n/).map(l => l.trim()).filter(l => l);
    return lines.map(line => {
        const parts = line.split(/\s+/);
        return {
            id: parts[0] || '',
            violation: parts[1] || '',
            count: parts[2] || '1'
        };
    });
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
    
    report += screenshots.length > 0 ? screenshots.join(' и ') : 'скриншот до и после через url.';
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
    report += screenshot ? `[url=${screenshot}]скриншот выполнения[/url]` : `[url=]скриншот выполнения[/url]`;
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

// ==================== ВЕТКА НАГРАД ====================

function generateMedals() {
    const catId = document.getElementById('medalsId').value.trim();
    const medalName = document.getElementById('medalsName').value.trim();
    const screenshot = document.getElementById('medalsScreenshot').value.trim();
    
    let report = `${catId ? `[link${catId}] [${catId}]` : '[linkID] [ID]'} — ${medalName || 'название медали'} `;
    report += screenshot ? `[[url=${screenshot}]скриншот требований[/url]].` : `[[url=ссылка]скриншот требований[/url]].`;
    
    displayReport(report);
    saveToHistory({ type: 'medals', report, date: new Date().toISOString() });
}

function generateSpecialName() {
    const catId = document.getElementById('specialNameYourId').value.trim();
    const desiredName = document.getElementById('specialNameDesired').value.trim();
    const screenshot = document.getElementById('specialNameScreenshot').value.trim();
    
    let report = `[b]Имя [ID]:[/b] ${catId ? `[link${catId}] [${catId}]` : '[linkID] [ID]'}.\n`;
    report += `[b]Желаемое имя:[/b] ${desiredName || ''}.\n`;
    report += `[b]Скриншоты выполненных требований:[/b] `;
    report += screenshot ? `[url=${screenshot}]скриншот[/url].` : `через url.`;
    
    displayReport(report);
    saveToHistory({ type: 'special-name', report, date: new Date().toISOString() });
}

function generatePersonalMedal() {
    const catId = document.getElementById('personalMedalYourId').value.trim();
    const medalImage = document.getElementById('personalMedalImage').value.trim();
    const medalName = document.getElementById('personalMedalName').value.trim();
    const screenshot = document.getElementById('personalMedalScreenshot').value.trim();
    
    let report = `[b]Имя [ID]:[/b] ${catId ? `[link${catId}] [${catId}]` : '[linkID] [ID]'}.\n`;
    report += `[b]Медаль:[/b] `;
    report += medalImage ? `[img]${medalImage}[/img]` : `[img]изображение медали[/img]`;
    report += ` - ${medalName ? `«${medalName}»` : 'название'}.\n`;
    report += `[b]Скриншоты выполненных требований:[/b] `;
    report += screenshot ? `[url=${screenshot}]скриншот[/url].` : `через url.`;
    
    displayReport(report);
    saveToHistory({ type: 'personal-medal', report, date: new Date().toISOString() });
}

function generatePersonalTrophy() {
    const catId = document.getElementById('personalTrophyYourId').value.trim();
    const trophyImage = document.getElementById('personalTrophyImage').value.trim();
    const trophyName = document.getElementById('personalTrophyName').value.trim();
    const action = document.getElementById('personalTrophyAction').value.trim();
    const history = document.getElementById('personalTrophyHistory').value.trim();
    const screenshot = document.getElementById('personalTrophyScreenshot').value.trim();
    
    let report = `[b]Имя [ID]:[/b] ${catId ? `[link${catId}] [${catId}]` : '[linkID] [ID]'}.\n`;
    report += `[b]Трофей:[/b] `;
    report += trophyImage ? `[img]${trophyImage}[/img]` : `[img]изображение трофея[/img]`;
    report += ` - ${trophyName || 'название'}.\n`;
    report += `[b]Название действия:[/b] ${action || ''}.\n`;
    report += `[b]Строчка в истории:[/b] ${history || ''}.\n`;
    report += `[b]Скриншоты выполненных требований:[/b] `;
    report += screenshot ? `[url=${screenshot}]скриншот[/url].` : `через url.`;
    
    displayReport(report);
    saveToHistory({ type: 'personal-trophy', report, date: new Date().toISOString() });
}

function generatePersonalStatus() {
    const catId = document.getElementById('personalStatusYourId').value.trim();
    const statusImage = document.getElementById('personalStatusImage').value.trim();
    const statusText = document.getElementById('personalStatusText').value.trim();
    const screenshot = document.getElementById('personalStatusScreenshot').value.trim();
    
    let report = `[b]Имя [ID]:[/b] ${catId ? `[link${catId}] [${catId}]` : '[linkID] [ID]'}.\n`;
    report += `[b]Статус:[/b] `;
    report += statusImage ? `[img]${statusImage}[/img]/${statusText || ''}` : `${statusText || ''}`;
    report += `.\n`;
    report += `[b]Скриншоты выполненных требований:[/b] `;
    report += screenshot ? `[url=${screenshot}]скриншот[/url].` : `через url.`;
    
    displayReport(report);
    saveToHistory({ type: 'personal-status', report, date: new Date().toISOString() });
}

function generatePersonalPosition() {
    const catId = document.getElementById('personalPositionYourId').value.trim();
    const desiredPosition = document.getElementById('personalPositionDesired').value.trim();
    const screenshot = document.getElementById('personalPositionScreenshot').value.trim();
    
    let report = `[b]Имя [ID]:[/b] ${catId ? `[link${catId}] [${catId}]` : '[linkID] [ID]'}.\n`;
    report += `[b]Желаемая должность:[/b] ${desiredPosition || ''}.\n`;
    report += `[code][b]Скриншоты выполненных требований:[/b] `;
    report += screenshot ? `[url=${screenshot}]скриншот[/url].` : `через url.`;
    
    displayReport(report);
    saveToHistory({ type: 'personal-position', report, date: new Date().toISOString() });
}

function generateTribalStatus() {
    const spiritName = document.getElementById('tribalSpiritName').value.trim();
    const spiritColor = document.getElementById('tribalSpiritColor').value.trim();
    const fox = document.getElementById('tribalFox').value;
    const frame = document.getElementById('tribalFrame').value;
    const marks = document.getElementById('tribalMarks').value;
    const marksNumber = document.getElementById('tribalMarksNumber').value.trim();
    const marksColor = document.getElementById('tribalMarksColor').value.trim();
    const stones = document.getElementById('tribalStones').value;
    
    let report = `[b]Духовное имя и цвет:[/b] ${spiritName || ''}, ${spiritColor || ''}.\n`;
    report += `[b]Желаемая лиса:[/b] ${fox}.\n`;
    report += `[b]Рамка:[/b] ${frame}.\n`;
    report += marks === 'yes'
        ? `[b]Духовные метки и цвет:[/b] Да, ${marksNumber || 'N'}, ${marksColor || 'цвет'}.\n`
        : `[b]Духовные метки и цвет:[/b] Нет.\n`;
    report += `[b]Камни:[/b] ${stones}.`;
    
    displayReport(report);
    saveToHistory({ type: 'tribal-status', report, date: new Date().toISOString() });
}

// ==================== БОЕВАЯ ШКОЛА ====================

function generatePrepGroup() {
    const catId = document.getElementById('prepYourId').value.trim();
    const level = document.getElementById('prepLevel').value.trim();
    const vk = document.getElementById('prepVk').value.trim();
    const bu = document.getElementById('prepBu').value.trim();
    
    let report = `Я, ${catId ? `[link${catId}]` : '[linkID]'}, имею ${level || 'n'} уровень БУ и хочу попасть в Подготовительную группу.\n`;
    report += `ВК: ${vk ? `[url=${vk}]ссылка[/url]` : '[url=ССЫЛКА]ссылка[/url]'}\n`;
    report += `БУ: ${bu ? `[url=${bu}]ссылка[/url]` : '[url=ссылка]ссылка[/url]'}`;
    
    displayReport(report);
    saveToHistory({ type: 'prep-group', report, date: new Date().toISOString() });
}

function generateRankCheck() {
    const catId = document.getElementById('rankYourId').value.trim();
    const level = document.getElementById('rankLevel').value.trim();
    const vk = document.getElementById('rankVk').value.trim();
    const bu = document.getElementById('rankBu').value.trim();
    
    let report = `Я, ${catId ? `[link${catId}]` : '[linkID]'}, имею ${level || 'n'} уровень БУ и хочу пройти проверку для определения ранга.\n`;
    report += `ВК: ${vk ? `[url=${vk}]ссылка[/url]` : '[url=ССЫЛКА]ссылка[/url]'}\n`;
    report += `БУ: ${bu ? `[url=${bu}]ссылка[/url]` : '[url=ссылка]ссылка[/url]'}`;
    
    displayReport(report);
    saveToHistory({ type: 'rank-check', report, date: new Date().toISOString() });
}

function generateObedience() {
    const type = document.getElementById('obedType').value;
    const violators = parseViolators(document.getElementById('obedViolators').value.trim());
    const tribesText = document.getElementById('obedTribes').value.trim();
    const tribes = tribesText ? tribesText.split(',').map(t => t.trim()) : [];
    
    let reports = violators.map((v, i) => {
        if (type === 'temple') {
            return `[cat${v.id}] [${v.id}] – нарушение ${v.violation} (${v.count}) (скриншот при наличии).`;
        } else {
            const tribe = tribes[i] || 'Племя';
            return `[cat${v.id}] [${v.id}] – ${tribe} – нарушение ${v.violation} (${v.count}) (скриншот при наличии).`;
        }
    });
    
    let report = reports.join('\n\n');
    
    displayReport(report);
    saveToHistory({ type: 'obedience', report, date: new Date().toISOString() });
}

function generateResources() {
    const place = document.getElementById('resPlace').value;
    const who = document.getElementById('resWho').value.trim();
    const resourcesText = document.getElementById('resList').value.trim();
    const proof = document.getElementById('resProof').value.trim();
    const dateStr = getShortDate();
    
    const resources = resourcesText.split(/\n/).map(l => l.trim()).filter(l => l);
    
    let report = `[b]Место добычи:[/b] ${place}.\n`;
    report += `[b]Дата:[/b] ${dateStr}.\n`;
    report += `[b]Кто принёс:[/b] ${who ? `[cat${who}] [${who}]` : '-'}.\n`;
    report += `[b]Ресурсы:[/b] ${resources.join(', ') || '-'}.\n`;
    report += `[b]Подтверждение:[/b] ${proof ? `[url=${proof}]скриншот[/url]` : 'скриншот через url'}.`;
    
    displayReport(report);
    saveToHistory({ type: 'resources', report, date: new Date().toISOString() });
}

function generateHerbs() {
    const catId = document.getElementById('herbsId').value.trim();
    const time = document.getElementById('herbsTime').value.trim();
    const items = document.getElementById('herbsItems').value.trim();
    const dateStr = getShortDate();
    
    let report = `[b]Cбор целительских ресурсов [${dateStr}][/b]\n`;
    report += `[b]${catId ? `[cat${catId}] [${catId}]` : '[catID] [ID]'}[/b] ${time || 'nn:nn'} | ${items || ''}.`;
    
    displayReport(report);
    saveToHistory({ type: 'herbs', report, date: new Date().toISOString() });
}

function generateSleepers() {
    const catId = document.getElementById('sleepersId').value.trim();
    const count = document.getElementById('sleepersCount').value.trim();
    const proof = document.getElementById('sleepersProof').value.trim();
    
    let report = `[b]Относил(а):[/b] ${catId ? `[cat${catId}] [${catId}]` : '-'}.\n`;
    report += `[b]Количество убранных:[/b] ${count || 'n'}.\n`;
    report += `[b]Доказательство:[/b] ${proof ? proof : 'через url'}.`;
    
    displayReport(report);
    saveToHistory({ type: 'sleepers', report, date: new Date().toISOString() });
}

function generateTrash() {
    const type = document.getElementById('trashType').value;
    const catId = document.getElementById('trashId').value.trim();
    const count = document.getElementById('trashCount').value.trim();
    const proof = document.getElementById('trashProof').value.trim();
    
    let report = '';
    
    if (type === 'clean') {
        report += `[b]Убирал(а):[/b] ${catId ? `[cat${catId}] [${catId}]` : '-'}.\n`;
        report += `[b]Количество утилизированного:[/b] ${count || 'n'}.\n`;
        report += `[b]Доказательство:[/b] ${proof ? proof : 'через url'}.`;
    } else {
        report += `Я, ${catId ? `[cat${catId}] [${catId}]` : '[catID] [ID]'}, нашёл(ла) бесхозный(е) предмет(ы).\n`;
        report += `[b]Доказательство:[/b] ${proof ? proof : 'через url'}.`;
    }
    
    displayReport(report);
    saveToHistory({ type: 'trash', report, date: new Date().toISOString() });
}

function generateQigong() {
    const type = document.getElementById('qigongType').value;
    let report = '';
    
    if (type === 'partner') {
        const catId = document.getElementById('qigongPartnerId').value.trim();
        const wish = document.getElementById('qigongPartnerWish').value.trim();
        report += `[b]Ваш ID:[/b] ${catId || 'ID'}\n`;
        report += `[b]Пожелания:[/b] ${wish || ''}`;
    } else if (type === 'butterfly') {
        const activatorId = document.getElementById('qigongActivatorId').value.trim();
        const buLink = document.getElementById('qigongBuLink').value.trim();
        const dialogLink = document.getElementById('qigongDialogLink').value.trim();
        report += `[b]Активатор[/b]: ${activatorId ? `[cat${activatorId}] [${activatorId}]` : '[catID] [ID]'}\n`;
        report += `[b]Скришот котенка до и после активации:[/b] ${buLink ? `[url=${buLink}]БУ[/url]` : '[url=ССЫЛКА]БУ[/url]'}\n`;
        report += `[b]Скриншот ника котёнка и части диалога с бабочкой[/b]: ${dialogLink ? `[url=${dialogLink}]Скрин[/url]` : '[url=ССЫЛКА]Скрин[/url]'}`;
    } else if (type === 'pear') {
        const timeStart = formatTime(document.getElementById('qigongPearStart').value);
        const timeEnd = formatTime(document.getElementById('qigongPearEnd').value);
        const pearType = document.getElementById('qigongPearType').value;
        const bigId = document.getElementById('qigongPearBig').value.trim();
        const smallId = document.getElementById('qigongPearSmall').value.trim();
        
        report += `[b]Время:[/b] ${timeStart} - ${timeEnd}.\n`;
        
        if (pearType === 'double') {
            report += `[b]Большая груша:[/b] ${bigId ? `[cat${bigId}] [${bigId}]` : '[catID] [ID]'}.\n`;
            report += `[b]Маленькая груша:[/b] ${smallId ? `[cat${smallId}] [${smallId}]` : '[catID] [ID]'}.`;
        } else {
            report += `[b]Одиночное грушевание:[/b] ${bigId ? `[cat${bigId}] [${bigId}]` : '[catID] [ID]'}.`;
        }
    }
    
    displayReport(report);
    saveToHistory({ type: 'qigong', report, date: new Date().toISOString() });
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
        'cleaning': 'Уборка в Теплой канавке',
        'medals': 'Медали',
        'special-name': 'Особое имя',
        'personal-medal': 'Личная медаль',
        'personal-trophy': 'Личный трофей',
        'personal-status': 'Личный статус',
        'personal-position': 'Личная должность',
        'tribal-status': 'Племенной статус',
        'prep-group': 'В Подготовительную группу',
        'rank-check': 'Проверка на ранг',
        'obedience': 'Стена послушания',
        'resources': 'Отпись ресурсов',
        'herbs': 'Сбор трав',
        'sleepers': 'Относ спящих',
        'trash': 'Уборка мусора',
        'qigong': 'Техника Цигун'
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
    updateTribalMarksFields();
    updateObedFields();
    updateTrashFields();
    updateQigongFields();
    updateQigongPearFields();
}