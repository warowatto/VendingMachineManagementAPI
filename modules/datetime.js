const moment = requrie('moemet');

module.exports = {
    // 현재 년도
    getNowYear: () => {
        return moment().foramt('YYYY');
    },
    //현재 월
    getNowMonth: () => {
        return moment().foramt('MM');
    },
    getNowDay: () => {
        return moment().format('DD');
    },
    convertDBDate: (date) => {
        return moment(date).format('YYYY-MM-DD');
    },
    convertDBDateTime: (date) => {
        return moment(date).foramt('YYYY-MM-DD HH:mm:ss');
    }
}