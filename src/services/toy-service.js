import { storageService } from './storage-service.js';
import { utilService } from './util-service.js';
import { httpService } from './http-service.js';

// const KEY = 'toys_db';
const ENDPOINT = 'toy';

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
};

async function query(filterBy) {
  return await httpService.get(ENDPOINT, filterBy);
  // return storageService.query(KEY)
}

async function getById(toyId) {
  return await httpService.get(`${ENDPOINT}/${toyId}`);
  // return storageService.get(KEY, toyId)
}

async function remove(toyId) {
  return await httpService.delete(`${ENDPOINT}/${toyId}`);
  // return storageService.remove(KEY, toyId)
}

async function save(toy) {
  var toy = JSON.parse(JSON.stringify(toy));
  if (toy._id) {
    return await httpService.put(`${ENDPOINT}/${toy._id}`, toy);
  } else {
    if (!toy.name) toy.name = 'Unknown';
    return await httpService.post(ENDPOINT, toy);
  }
  // if (toy._id) return storageService.put(KEY, toy)
  // return storageService.post(KEY, toy)
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: ['Doll', 'Battery Powered'],
    inStock: true,
    reviews: [],
    createdAt: Date.now(),
  };
}

function _createToys() {
  return [
    {
      _id: utilService.makeId(),
      name: 'Talking Doll',
      price: 123,
      labels: ['Doll', 'Battery Powered', 'Baby'],
      createdAt: 1631031801011,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: 'Robot',
      price: 130,
      labels: ['Battery Powered'],
      createdAt: 1631031801011,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: 'Barbie',
      price: 90,
      labels: ['Doll'],
      createdAt: 1631031801011,
      inStock: true,
    },
  ];
}

function _createToy(name, price, labels) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    createdAt: Date.now(),
  };
}
