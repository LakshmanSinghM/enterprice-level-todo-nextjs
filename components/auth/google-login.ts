
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const NEXT_APP_GOOGLE_AUTH_REDIRECT_URL = process.env.NEXT_PUBLIC_NEXT_APP_GOOGLE_AUTH_REDIRECT_URL

export const googleLogin = (router: any) => {

    if (!GOOGLE_CLIENT_ID || !NEXT_APP_GOOGLE_AUTH_REDIRECT_URL) {
        console.log("The google auth credentials are missing from the env");
        return;
    }

    const scope = "openid email profile";
    const responseType = "code";
    const accessType = "offline";

    const url =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(NEXT_APP_GOOGLE_AUTH_REDIRECT_URL)}` +
        `&response_type=${responseType}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&access_type=${accessType}` +
        `&prompt=consent`;
    router.push(url);
};