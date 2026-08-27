
import {test, expect} from '@playwright/test';

let access_token: string;

test.beforeEach('POST -- generate the PayPal access token', async({request})=> {
//     curl -v -X POST "https://api-m.sandbox.paypal.com/v1/oauth2/token" \
//  -u "CLIENT_ID:CLIENT_SECRET" \
//  -H "Content-Type: application/x-www-form-urlencoded" \
//  -d "grant_type=client_credentials"

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const grantType = process.env.GRANT_TYPE;

    const response = await request.post(
    'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
        form: {
            grant_type: grantType!
        }
    }
);
    expect(response.status()).toBe(200);
    access_token = (await response.json()).access_token;
})

test('GET invoices', async({request})=> {
    //https://api-m.sandbox.paypal.com/v1/invoicing/invoices?page=3&page_size=4&total_count_required=true
    let baseUrl = 'https://api-m.sandbox.paypal.com'
    let endPoint = '/v1/invoicing/invoices'
    let queryParams = {
        page: 3,
        page_size: 4,
        total_count_required:true
    }
    let response = await request.get(`${baseUrl}${endPoint}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${access_token}`
        },
        params: queryParams
    })
    expect(response.status()).toBe(200);
    console.log("GET RESPONSE => ", await response.json());
})
