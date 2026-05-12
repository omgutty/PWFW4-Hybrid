import { test, expect } from '../fixtures/fixture';
import { Credentials } from '../testdata/types';
//import credentials from '../testdata/credentials.json';
import { credentials } from '../testdata/credentials'


// Type assertion — confirms the JSON shape matches our interface
const creds = credentials as Credentials;

test.describe('Login tests',()=>{

    test('Login with valid credentials should redirect away from login page', async ({ loginPage }) => {
    await loginPage.goto('/login');
     console.log('Password length:', credentials.password.length)
     console.log('Password starts with:', credentials.password.substring(0, 3))

    await loginPage.loginToApplication(creds.username, creds.password);
    await loginPage.assertUrlContains(/Index/);
    await loginPage.wait();
  });


})