const   ONE_SECOND  = 1000,
        ONE_MINUTE  = 60000,
        ONE_HOUR    = 3600000,
        ONE_DAY     = 86400000,
        ONE_YEAR    = 31557600000;

function strToTime(timeStr) {
    const len = timeStr.length - 1;
    const c = timeStr.charAt(len) || '';
    let timeVar = c >= '0' && c <= '9' ? timeStr : timeStr.substr(0, len);
    const magic = {
        m: int => int * ONE_MINUTE,
        h: int => int * ONE_HOUR,
        d: int => int * ONE_DAY,
        s: int => int * ONE_SECOND,
        y: int => int * ONE_YEAR
    };
    timeVar = !!magic[c] ? magic[c](timeVar) : magic.s(timeVar);
    return timeVar;
};

function timeToStr(restTime) {
    const times = [
        { counter: 0, ending: 'y', value: ONE_YEAR },
        { counter: 0, ending: 'd', value: ONE_DAY },
        { counter: 0, ending: 'h', value: ONE_HOUR },
        { counter: 0, ending: 'm', value: ONE_MINUTE },
        { counter: 0, ending: 's', value: ONE_SECOND },
    ];
    for (let i = 0, v; v = times[i]; i++) {
        while (restTime > v.value) {
            restTime -= v.value;
            v.counter++;
        }
    }
    if (restTime < 0) {
        times[4].counter--;
    }
    const outStr = [];
    for (let i = 0, l; l = times[i]; i++) {
        if (l.counter === 0) {
            continue;
        }
        outStr.push(`${l.counter}${l.ending}`);
    }
    return outStr.join(' ') || '0';
};

module.exports = {
    strToTime: strToTime,
    timeToStr: timeToStr,
}