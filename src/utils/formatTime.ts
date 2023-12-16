export function formatTime(time: string) {
    const DateData = new Date(time);
    const diff = Date.now() - DateData.getTime();
    if (diff < 1000 * 60 * 60) {
        return `${Math.floor(diff / (1000 * 60))}m`;
    }
    if (diff < 1000 * 60 * 60 * 24) {
        return `${Math.floor(diff / (1000 * 60 * 60))}h`;
    }
    return `${
        {
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
            11: 'Dec',
        }[DateData.getMonth()]
    }.${DateData.getDate()}`;
}
