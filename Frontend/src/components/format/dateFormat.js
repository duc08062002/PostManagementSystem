function DateFormat(postDate) {

    let date =`${postDate}`;
    let Day= new Date(date).getDate();
    let Month = new Date(date).getMonth() + 1;
    let Year = new Date(date).getFullYear();
    if (Day < 10 && Month < 10) {
        return `0${Day}/0${Month}/${Year}`
    } else if(Day < 10) {
        return `0${Day}/${Month}/${Year}`
    } else if(Month < 10) {
        return `${Day}/0${Month}/${Year}`
    }
    return `${Day}/${Month}/${Year}`
}
export default DateFormat