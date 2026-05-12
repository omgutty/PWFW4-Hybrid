// import { test, expect } from '../fixtures/fixture';
// import { Credentials } from '../testdata/types';
// import { credentials } from '../testdata/credentials'


// // Type assertion — confirms the JSON shape matches our interface
// const creds = credentials as Credentials;

// test.describe('Login tests',()=>{

//     test('Login with valid credentials should redirect away from login page', async ({ loginPage }) => {
//     await loginPage.goto('/login');
//     //  console.log('Password length:', credentials.password.length)
//     //  console.log('Password starts with:', credentials.password.substring(0, 3))

//     await loginPage.loginToApplication(creds.username, creds.password);
//     //await loginPage.assertUrlContains(/Index/);
//         // Assert we left the login page — URL should NOT contain 'Login'
//       await loginPage.assertURLNotContains(/Login/i);
//          // After successful login, URL must contain Dashboard/Index
//       await loginPage.assertUrlContains(/Dashboard\/Index/);
//     await loginPage.wait();
//   });


// })


import { test }        from '../fixtures/fixture';
import { credentials } from '../testdata/credentials';

test.describe('Login tests', () => {

  test('Login with valid credentials should redirect to Dashboard',
    async ({ loginPage }) => {
      await loginPage.goto('/login');
      await loginPage.loginToApplication(credentials.username, credentials.password);

      // Single clear assertion — we arrived at the Dashboard
      await loginPage.assertUrlContains(/Dashboard\/Index/);
  });

});