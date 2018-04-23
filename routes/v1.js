const router = require('express').Router();
const paymentModel = require('../modules/PaymentModel');
const _ = require('lodash');

router.get('/', (req, res) => {
    
    paymentModel.getCompanyMonth(1, '2018-01-01', '2018-03-30')
        .then(result => {
            res.json(result);
        });
});

// 업체 연도별 월 판매현황 보기
router.get('/company/:companyId/year', (req, res) => {
    let companyId = req.params.companyId;
    let year = req.query.year;

    paymentModel.getCompanyYear(companyId, year)
        .then(result => {
            res.json({
                query: {
                    company: companyId,
                    year: year
                },
                data: result
            });
        });
});

// 업체 연도별 일단위 판매현황 보기(1달 출력)
router.get('/company/:companyId/month', (req, res) => {
    let companyId = req.params.companyId;
    let year = req.query.year;
    let month = req.query.month;

    paymentModel.getCompanyDay(companyId, year, month)
        .then(result => {
            let total = _.sumBy(result, 'total');
            let average = total / result.length;
            let min = _.minBy(result, 'total');
            let max = _.maxBy(result, 'total');

            res.json({
                query: {
                    company: companyId,
                    year: year,
                    month: month,
                    request_at: req.time,
                    response_at: new Date()
                },
                data: result,
                summary: {
                    total: total,
                    average: average,
                    min: min,
                    max: max
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// 업체 장치 판매현황
router.get('/company/:companyId/machines', (req, res) => {
    let companyId = req.params.companyId;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    paymentModel.getmachines(companyId, startDate, endDate)
        .then(result => {
            
            let totalRunning = 4000;
            let averageRunning = 1700;
            let minRunning = 500;
            let maxRunning = 2000;

            res.json({
                query: {
                    company: companyId,
                    startDate: startDate,
                    endDate: endDate,
                    request_at: new Date(),
                    response_at: new Date()
                },
                data: result,
                summary: {
                    total: totalRunning,
                    average: averageRunning,
                    min: minRunning,
                    max: maxRunning
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// 장치별 세부사항 보기
router.get('/company/:companyId/machine/:machineId', (req, res) => {
    let machineId = req.params.machineId;
    
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let pageSize = req.query.pageSize ? req.query.pageSize : 10;
    let offset = req.query.page ? pageSize * (req.query.page - 1) : 0;

    paymentModel.getMachine(machineId, startDate, endDate, pageSize, offset)
        .then(result => {
            res.json(result);
        });
});

module.exports = router;