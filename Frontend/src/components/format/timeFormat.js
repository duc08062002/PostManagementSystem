function TimeFormat(postDate) {
    let date =`${postDate}`;
    let time= new Date(date).getTime();
    return time
}
export default TimeFormat