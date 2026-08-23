import { APIHelper } from '../api/api-helper';
import { test as baseTest } from '@playwright/test';


//define the types for API fixtures
type apiFixtures = {
    apiHelper: APIHelper,
}

//extend Playwright baseRequest
export let test = baseTest.extend<apiFixtures>({
    apiHelper: async ({request}, use) => {
        let apiHelper = new APIHelper(
            request, 
            process.env.API_BASE_URL!);
        await use(apiHelper);
    },
});

export {expect} from '@playwright/test';