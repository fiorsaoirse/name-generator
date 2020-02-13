import dns from 'dns';

export default (address) => new Promise((resolve, reject) => {
  dns.resolve(address, (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});
