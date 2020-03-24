const   ONE_SECOND  = 1000,
        ONE_MINUTE  = 60000,
        ONE_HOUR    = 3600000,
        ONE_DAY     = 86400000,
        ONE_YEAR    = 31557600000;

function strToTime(timeStr) {
    if (!/^[0-9myhds\s]+$/.test(timeStr)) {
        return;
    }
    const arr = timeStr.replace(/\s+/g, '').split('');
    let result = 0;
    let buffer = '';
    const magic = {
        m: int => int * ONE_MINUTE,
        h: int => int * ONE_HOUR,
        d: int => int * ONE_DAY,
        s: int => int * ONE_SECOND,
        y: int => int * ONE_YEAR,
    };
    for (const c of arr) {
        if (c >= '0' && c <= '9') {
            buffer += c;
            continue;
        }
        result += magic[c](buffer);
        buffer = '';
    }
    if (!!buffer) {
        result += magic['s'](buffer);
    }
    return result;
};

function timeToStr(restTime) {
    if(!/^[0-9]+$/.test(restTime)) {
        return;
    }
    const times = [
        { counter: 0, ending: 'y', value: ONE_YEAR   },
        { counter: 0, ending: 'd', value: ONE_DAY    },
        { counter: 0, ending: 'h', value: ONE_HOUR   },
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
};