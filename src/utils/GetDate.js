export const getDate = (a) => {
    let date = new Date(a);
    let str = `${date.getFullYear()}年${date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        }月${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}日`;
    return str;
}
export function getDateMon(a) {
    let date = new Date(a);
    let str = `${date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}月${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}日`;
    return str;
}
export const getTime = (a) => {
    let min = parseInt(a / 60);
    min = min > 10 ? min : "0" + min;
    let sec = a % 60;
    sec = sec > 10 ? sec : "0" + sec;
    return min + ":" + sec;
}
export const monthEnList = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}