export const dateTimeFormat = (rec) => {
    const time = rec.start.slice(11, 16) + ' - ' + rec.end.slice(11, 16)
    return new Date(rec.start).toLocaleDateString() + ', ' + time
}