# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users-api-separate.spec.ts >> @regression DELETE API -- delete a user
- Location: tests/api/users-api-separate.spec.ts:68:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 422
```

# Test source

```ts
  1  | 
  2  | import { test, expect } from '../../src/fixtures/api-fixtures';
  3  | 
  4  | const TOKEN = process.env.API_TOKEN;
  5  | const AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`};
  6  | 
  7  | let userData = {
  8  |         name: 'Anasooya Dwivedi',
  9  |         email: `user_${Date.now()}@api.com`,
  10 |         gender: 'female',
  11 |         status: 'inactive'
  12 |     };
  13 | 
  14 | //helper function: create a new user
  15 | async function createUser(apiHelper: any): Promise<any> {
  16 |     let response: { status: number; body: any } = await apiHelper.post('public/v2/users', userData, AUTH_HEADER);
> 17 |     expect(response.status).toBe(201);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  18 |     console.log("CREATE USER: RESPONSE BODY =>", response.body);
  19 |     return response.body;
  20 | }
  21 | 
  22 | 
  23 | test('@smoke GET API -- get all users', async({apiHelper})=> {
  24 |     let response = await apiHelper.get('public/v2/users', AUTH_HEADER);
  25 |     expect(response.status).toBe(200);
  26 |     console.log("RESPONSE BODY =>", response.body);
  27 |     expect(response.body.length).toBeGreaterThan(0);
  28 | })
  29 | 
  30 | test('@regression POST API -- create a new users', async({apiHelper})=> {
  31 |     //create user
  32 |     let responseBody = await createUser(apiHelper);
  33 |     let userID = responseBody.id;
  34 |     //verify the created user
  35 |     let response = await apiHelper.get(`public/v2/users/${userID}`, AUTH_HEADER);
  36 |     expect(response.status).toBe(200);
  37 |     //verify the created user details
  38 |     expect(response.body.name).toBe(userData.name);
  39 |     expect(response.body.email).toEqual(userData.email);
  40 |     expect(response.body.gender).toEqual(userData.gender);
  41 |     expect(response.body.status).toEqual(userData.status);
  42 | })
  43 | 
  44 | 
  45 | test('@regression PUT API -- update a user', async({apiHelper})=> {
  46 |     //create a new user
  47 |     let responseBody = await createUser(apiHelper);
  48 |     let userID = responseBody.id;
  49 |     //store global variable in a local variable for updates
  50 |     let requestBody = userData;
  51 |     //update the user details
  52 |     requestBody.name = 'Anonymous';
  53 |     requestBody.gender = 'male';
  54 |     console.log("PUT REQUEST BODY => ", requestBody);
  55 |     //update the created user with PUT
  56 |     let putResponse = await apiHelper.put(`public/v2/users/${userID}`, requestBody, AUTH_HEADER);
  57 |     expect(putResponse.status).toBe(200);
  58 | 
  59 |     //verify the created user with GET
  60 |     let getResponse = await apiHelper.get(`public/v2/users/${userID}`, AUTH_HEADER);
  61 |     expect(getResponse.status).toBe(200);
  62 |     //verify the updated user details
  63 |     console.log("PUT RESPONSE BODY =>", putResponse.body);
  64 |     expect(getResponse.body.name).toBe(requestBody.name);
  65 |     expect(getResponse.body.gender).toBe(requestBody.gender);
  66 | })
  67 | 
  68 | test('@regression DELETE API -- delete a user', async({apiHelper})=> {
  69 |     //create a new user
  70 |     let responseBody = await createUser(apiHelper);
  71 |     let userID = responseBody.id;
  72 | 
  73 |     //delete the created user with DELETE
  74 |     let delResponse = await apiHelper.delete(`public/v2/users/${userID}`, AUTH_HEADER);
  75 |     expect(delResponse.status).toBe(204);
  76 |     //verify the deleted user with GET
  77 |     let response = await apiHelper.get(`public/v2/users/${userID}`, AUTH_HEADER);
  78 |     expect(response.status).toBe(404);
  79 |     expect(response.body.message).toBe('Resource not found');
  80 | })
```