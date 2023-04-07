export const oktaConfig = {
    clientId: '0oa91dh5cox3GvGmU5d7',
    issuer: 'https://dev-28096334.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}