
import {test, expect} from '../../src/fixtures/api-fixtures'
import Ajv from 'ajv'

let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = {'Authorization': `Bearer ${TOKEN}`};

//setup AJV
let ajv = new Ajv();

//define the JSON schema
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
        "type": "number"
        },
        "name": {
        "type": "string"
        },
        "email": {
        "type": "string"
        },
        "gender": {
        "type": "string"
        },
        "status": {
        "type": "string"
        }
    },
    "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
    ]
}

let userArraySchema = {
    "type": "array",
    "items": userSchema
}

test('@smoke Get a single user and validate the schema', async({apiHelper})=> {
    let userData = {
        name: 'Schema User',
        email: `user_${Date.now()}@schema.com`,
        gender: 'male',
        status: 'active'
    };
    //create a new user
    let response: { status: number; body: any } = await apiHelper.post('public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    console.log("CREATE USER: RESPONSE BODY =>", response.body);
    let userId = response.body.id;
    
    //fetch the created user
    let getResponse = await apiHelper.get(`public/v2/users/${userId}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    //schema validation
    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getResponse.body)
    if(!isSchemaValid){
        console.log("SCHEMA ERRORS", validate.errors);
    }
    expect(isSchemaValid).toBeTruthy();
})

test('@smoke Get all users and validate the schema', async({apiHelper})=> {
    //fetch all users
    let getResponse = await apiHelper.get(`public/v2/users/`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    //schema validation
    let validate = ajv.compile(userArraySchema);
    let isSchemaValid = validate(getResponse.body)
    if(!isSchemaValid){
        console.log("SCHEMA ERRORS", validate.errors);
    }
    expect(isSchemaValid).toBeTruthy();
})
