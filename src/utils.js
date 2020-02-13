import dns from './promisified-dns';
import request from "request-promise-native";

// @param <string>
// returns array<string>
export const transformIncomingData = (string) => {
  return string.split(',').map(e => e.trim());
};

export const generateWords = (array) => {
  return array.reduce((acc, element, index) => {
    const iter = array.reduce((acc, el, ind) => {
      if (ind !== index) {
        acc.push(element.concat(el));
      }
      return acc;
      }, []);
    return [ ...acc, ...iter ];
  }, []);
};

// @param word<string>
// returns request's object
export const generateRequest = (word) => {
  return {
    page: 'category',
    url: 'domains',
    searchWord: word,
    filters: {
      zones: ['com']
    },
    offset: 0,
    seed: 'zloxoprz8tp',
    rest: -1,
    rankingOffset: 0,
    lang: 'ru',
  };
};

// @param address<string> - domain to check
// returns Promise
export const checkDns = (address) => {
  const addressPattern = `www.%address%.com`;
  const searchAddress = addressPattern.replace('%address%', address);
  return dns(searchAddress);
};

// @param url<string> - url to fetch data
// @param word<string> - domain to check
export const fetchData = (word, url) => {
  const formattedData = generateRequest(word);
  return request.post({
    uri: url,
    body: formattedData,
    json: true,
    headers: {
      'content-type': 'application/json'
    }
  }).then(data => data.body)
    .then(data => {
      const [ domain ] = data.services;
      return domain;
    })
    .catch(ex => {
      console.error(ex);
      throw new Error(ex);
    })
};