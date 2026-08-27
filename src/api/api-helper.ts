
import { APIRequestContext } from "@playwright/test";

export class APIHelper{

    private readonly request: APIRequestContext;
    private readonly baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string){
        this.request = request;
        this.baseUrl = baseUrl;
    }

    //GET
    async get(endPoint: string, headers?: Record<string, string>){
        let response = await this.request.get(`${this.baseUrl}${endPoint}`, { headers: headers });
        return {
            status: response.status(),
            body: await response.json()
        };
    }

    //POST
    async post(endPoint: string, data: object, headers?: Record<string, string>){
        let response = await this.request.post(`${this.baseUrl}${endPoint}`, { headers: headers, data: data });
        return {
            status: response.status(),
            body: await response.json()
        };
    }

    //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>){
        let response = await this.request.put(`${this.baseUrl}${endPoint}`, { headers: headers, data: data });
        return {
            status: response.status(),
            body: await response.json()
        };
    }

    //DELETE
    async delete(endPoint: string, headers?: Record<string, string>){
        let response = await this.request.delete(`${this.baseUrl}${endPoint}`, { headers: headers});
        return {
            status: response.status(),
        };
    }
}