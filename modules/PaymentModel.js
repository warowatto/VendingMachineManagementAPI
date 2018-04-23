// 결제 목록 가져오기

const db = require('./database');

let companyYearQuery = `
SELECT
    COUNT(DISTINCT machineId) as machines, SUM(price) as price, count(price) as count, MONTH(create_at) as month
FROM v_test
WHERE
    companyId = ? AND
    YEAR(create_at) = ?
GROUP BY MONTH(create_at)
ORDER BY MONTH(create_at) DESC
`;

let companyMonthQuery = `
SELECT 
    machineId, machineName, SUM(price) as price, count(price) as count, DATE(create_at) as date
FROM v_test
WHERE
    companyId = ? AND
    create_at >= ? AND create_at <= ?
GROUP BY machineId, date
ORDER BY date DESC;
`;

let companyDayQuery = `
SELECT 
    DAY(create_at) as day, SUM(price) as total
FROM v_test
WHERE
	companyId = ? AND
    YEAR(create_at) = ? AND MONTH(create_at) = ?
GROUP BY day
ORDER BY day ASC;
`;

let companyMachinesQuery = `
SELECT
    machineId, machineName, SUM(price) as price, count(price) as count
FROM v_test
WHERE
    companyId = ? AND
    create_at >= ? AND create_at <= ?
GROUP BY machineId
`;

let companyMachineQuery = `
SELECT
    machineId, machineName, price, create_at
FROM v_test
WHERE
    machineId = ? AND
    create_at >= ? AND create_at <= ?
ORDER BY create_at DESC
LIMIT ? 
OFFSET ?
`;

module.exports = {
    getCompanyYear: (companyId, year) => {
        // 1년간 월 업체 판매현황
        return db.query(companyYearQuery, [companyId, year]);
    },
    getCompanyDay: (companyId, year, month) => {
        // 달력 일간 판매현황
        return db.query(companyDayQuery, [companyId, year, month]);
    },
    getCompanyMonth: (companyId, startDate, endDate) => {
        // 1달간 장치별 매출
        return db.query(companyMonthQuery, [companyId, startDate, endDate])
    },
    getmachines: (companyId, startDate, endDate) => {
        return db.query(companyMachinesQuery, [companyId, startDate, endDate]);
    },
    getMachine: (machineId, startDate, endDate, pageSize, offset) => {
        // 특정 장치 기간내 판매 기록
        return db.query(companyMachineQuery, [machineId, startDate, endDate, pageSize, offset]);
    }
}