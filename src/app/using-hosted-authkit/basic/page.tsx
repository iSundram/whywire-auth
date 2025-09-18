// This example uses Next.js with React Server Components.
// Because this page is an RSC, the code stays on the server for authentication setup.
//
// If your application is a single page app (SPA), you will need to:
// - create client-side authentication flows using Appwrite Web SDK
// - handle OAuth redirects appropriately

export default function Basic({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Generate OAuth URL for Google authentication
  const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const redirectUri = 'http://localhost:3000/using-hosted-authkit/basic/callback';
  
  const googleOAuthUrl = `${appwriteEndpoint}/account/sessions/oauth2/google?project=${projectId}&success=${encodeURIComponent(redirectUri)}`;

  const result = JSON.parse(String(searchParams.response ?? '{ "error": null }'));

  return (
    <main>
      <h1>Using Appwrite Authentication</h1>
      <h2>Basic example</h2>
      <a href={googleOAuthUrl} style={{ 
        display: 'inline-block', 
        padding: '10px 20px', 
        backgroundColor: '#4285f4', 
        color: 'white', 
        textDecoration: 'none', 
        borderRadius: '5px' 
      }}>
        Sign-in with Google
      </a>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
