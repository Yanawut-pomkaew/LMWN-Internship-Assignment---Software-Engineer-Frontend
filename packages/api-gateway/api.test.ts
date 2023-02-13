import app from './index';
import request from 'supertest';

describe('test api request store info (ลืมเคี้ยว) json message' ,  () => {
    test('Should return info restaurant ลืมเคี้ยว as json message' , async () => {
        const response = await request(app).get('/Restaurant/info/567051')
        expect(response.body).toHaveProperty('message');
    }); 
})

describe('test api request store info (Ekkamai Macchiato - Home Brewer) json message' ,  () => {
    test('Should return info restaurant Ekkamai Macchiato - Home Brewer as json message' , async () => {
        const response = await request(app).get('/Restaurant/info/227018')
        expect(response.body).toHaveProperty('message');
    }); 
})

describe('test api request menu info (ลืมเคี้ยว - เขียวหวานผัดแห้ง ทะเล) json message' ,  () => {
    test('Should return short info menu ลืมเคี้ยว - เขียวหวานผัดแห้ง ทะเล as json message' , async () => {
        const url = '/Restaurant/short/567051/เขียวหวานผัดแห้ง ทะเล'
        const response = await request(app).get(encodeURI(url))
        expect(response.body).toHaveProperty('message');
    }); 
})

describe('test api request menu info (Ekkamai Macchiato - Home Brewer - หมูมิโสะ Miso Pork) json message' ,  () => {
    test('Should return short info menu ลืมเคี้ยว - หมูมิโสะ Miso Pork as json message' , async () => {
        const url = "/Restaurant/short/227018/หมูมิโสะ Miso Pork";
        const response = await request(app).get(encodeURI(url))
        expect(response.body).toHaveProperty('message');
    }); 
})


describe('test api request menu info (ลืมเคี้ยว - พริกแกงทะเล) json message' ,  () => {
    test('Should return full info menu ลืมเคี้ยว - พริกแกงทะเล as json message' , async () => {
        const url = '/Restaurant/full/567051/พริกแกงทะเล'
        const response = await request(app).get(encodeURI(url))
        expect(response.body).toHaveProperty('message');
    }); 
})

describe('test api request menu info (Ekkamai Macchiato - Home Brewer - หมูมิโสะ Miso Pork) json message' ,  () => {
    test('Should return full info menu ลืมเคี้ยว - หมูมิโสะ Miso Pork as json message' , async () => {
        const url = "/Restaurant/full/227018/หมูมิโสะ Miso Pork";
        const response = await request(app).get(encodeURI(url))
        expect(response.body).toHaveProperty('message');
    }); 
})