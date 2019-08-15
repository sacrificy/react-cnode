import axios from 'axios';

const request = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
});

const foo = f => f;

export {
  request,
  foo,
};
