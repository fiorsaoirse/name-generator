import express from 'express';
import {
  checkDns, fetchData, generateWords, transformIncomingData,
} from '../utils';

const router = express.Router();
const nicUrl = 'https://www.nic.ru/app/v1/get/services';

router.get('/', (req, res) => {
  res.render('index', { title: 'Генератор имен' });
});

router.post('/words', (req, res) => {
  const { body: { data } } = req;
  const transformedData = transformIncomingData(data);
  const generatedData = generateWords(transformedData);
  const promisesArray = generatedData.map((genData) => checkDns(genData));
  Promise.allSettled(promisesArray)
    .then((result) => result.filter((pr) => pr.status === 'rejected'))
    .then((successful) => successful.map((pr) => pr.reason.hostname))
    .then((mapped) => {
      console.log('DNS DOMAINS CHECKED ', mapped);
      return mapped;
    })
    .then((mapped) => mapped.map((domain) => fetchData(domain, nicUrl)))
    .then((promisesFetchArray) => Promise.all(promisesFetchArray))
    .then((fetchedResult) => fetchedResult.filter(Boolean))
    .then((result) => result.map((el) => {
      const { title, prices } = el;
      const [oneYearPrice] = prices;
      const { cost: { string: price } } = oneYearPrice;
      return { title, price };
    }))
    .then((domains) => {
      res.render('domains', { title: 'Домены', domains });
    })
    .catch((error) => {
      const message = 'Ooops, something was wrong. Try again.';
      res.render('error', { title: 'Error', message, error });
    });
});

export default router;
