
function FormattedDate(date){
    return date.toISOString().slice(0,10);

}

export default FormattedDate;

export function getDateMinusDays(date,days){
    return new Date(date.getFullYear(),date.getMonth(),date.getDate() - days);
}