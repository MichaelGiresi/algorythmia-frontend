export const oktaConfig = {
    clientId: '0oa91dh5cox3GvGmU5d7',
    issuer: 'https://dev-28096334.okta.com/oauth2/default',
    redirectUri: 'https://frolicking-pudding-12f017.netlify.app/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}