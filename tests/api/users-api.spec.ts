import { test } from "@playwright/test";

let AUTH_TOKEN = {Authorization: "Bearer 10c0ba53681b541d08ba132593d8f32c28b45c81fd7717b42cc1f833144f01c2"};

test('@regression get user test', async({ request }) => {   
    let response = await request.get('https://gorest.co.in/public/v2/users/8525307', {
        headers: AUTH_TOKEN
    });
    console.log("FULL RESPONSE ==> ", response);
    let statusCode = response.status();
    console.log('STATUS CODE ==> '+ statusCode);
    let responseBody = await response.json();
    console.log('RESPONSE BODY ==> ', responseBody);
})

let userJson = {
    "id": 8525307,
    "name": "Aslesha Patel",
    "email": "patel_vislesha@gibson.test",
    "gender": "female",
    "status": "active"
}

test('@regression create a new user test', async({ request }) => {    
    let userData = {
        name: 'anil',
        email: `automation_${Date.now()}@api.com`,
        gender: 'male',
        status: 'active'
    }
    
    let response = await request.post('https://gorest.co.in/public/v2/users/', {
        headers: AUTH_TOKEN,
        data: userData
    });
    console.log('STATUS CODE ==> '+ response.status());
    console.log('STATUS CODE ==> '+ response.statusText());
    let responseBody = await response.json();
    console.log('RESPONSE BODY ==> ', responseBody);
})

test('@regression update a user test', async({ request }) => {    
    let userData = {
        email: `automation_${Date.now()}@api.com`,
        gender: 'male',
        status: 'active'
    }
    
    let response = await request.put('https://gorest.co.in/public/v2/users/8525315', {
        headers: AUTH_TOKEN,
        data: userData
    });
    console.log('STATUS CODE ==> '+ response.status());
    console.log('STATUS CODE ==> '+ response.statusText());
    let responseBody = await response.json();
    console.log('RESPONSE BODY ==> ', responseBody);
})

test('@regression delete a user test', async({ request }) => {      
    let response = await request.delete('https://gorest.co.in/public/v2/users/8525314', {
        headers: AUTH_TOKEN,
    });
    console.log('STATUS CODE ==> '+ response.status());
    console.log('STATUS CODE ==> '+ response.statusText());
})