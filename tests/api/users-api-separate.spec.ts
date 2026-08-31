
import { test, expect } from '../../src/fixtures/api-fixtures';

const TOKEN = process.env.API_TOKEN;
const AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`};

let userData = {
        name: 'Anasooya Dwivedi',
        email: `user_${Date.now()}@api.com`,
        gender: 'female',
        status: 'inactive'
    };

//helper function: create a new user
async function createUser(apiHelper: any): Promise<any> {
    let response: { status: number; body: any } = await apiHelper.post('public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    console.log("CREATE USER: RESPONSE BODY =>", response.body);
    return response.body;
}


test('@smoke GET API -- get all users', async({apiHelper})=> {
    let response = await apiHelper.get('public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    console.log("RESPONSE BODY =>", response.body);
    expect(response.body.length).toBeGreaterThan(0);
})

test('@regression POST API -- create a new users', async({apiHelper})=> {
    //create user
    let responseBody = await createUser(apiHelper);
    let userID = responseBody.id;
    //verify the created user
    let response = await apiHelper.get(`public/v2/users/${userID}`, AUTH_HEADER);
    expect(response.status).toBe(200);
    //verify the created user details
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toEqual(userData.email);
    expect(response.body.gender).toEqual(userData.gender);
    expect(response.body.status).toEqual(userData.status);
})


test('@regression PUT API -- update a user', async({apiHelper})=> {
    //create a new user
    let responseBody = await createUser(apiHelper);
    let userID = responseBody.id;
    //store global variable in a local variable for updates
    let requestBody = userData;
    //update the user details
    requestBody.name = 'Anonymous';
    requestBody.gender = 'male';
    console.log("PUT REQUEST BODY => ", requestBody);
    //update the created user with PUT
    let putResponse = await apiHelper.put(`public/v2/users/${userID}`, requestBody, AUTH_HEADER);
    expect(putResponse.status).toBe(200);

    //verify the created user with GET
    let getResponse = await apiHelper.get(`public/v2/users/${userID}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    //verify the updated user details
    console.log("PUT RESPONSE BODY =>", putResponse.body);
    expect(getResponse.body.name).toBe(requestBody.name);
    expect(getResponse.body.gender).toBe(requestBody.gender);
})

test('@regression DELETE API -- delete a user', async({apiHelper})=> {
    //create a new user
    let responseBody = await createUser(apiHelper);
    let userID = responseBody.id;

    //delete the created user with DELETE
    let delResponse = await apiHelper.delete(`public/v2/users/${userID}`, AUTH_HEADER);
    expect(delResponse.status).toBe(204);
    //verify the deleted user with GET
    let response = await apiHelper.get(`public/v2/users/${userID}`, AUTH_HEADER);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Resource not found');
})