// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  apiUrl: 'http://localhost:8000',
  apiUser: 'one',
  apiPassword: 'password123',
  userPoolId: 'us-east-1_g3G3toClb',
  userPoolClientId: '3gd8s897i5rj177eeir1o6j4pa',
};
