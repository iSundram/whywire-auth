import { getUser, signOut } from './auth';

// This example uses Next.js with React Server Components.
// Because this page is an RSC, the code stays on the server, which allows
// us to use server-side authentication checks without exposing sensitive data to the client.
//
// If your application is a single page app (SPA), you will need to:
// - create a form that can POST to an endpoint in your backend
// - handle the OAuth flow in that endpoint
// - redirect the user to the appropriate URL

export default async function WithSession() {
  const { isAuthenticated, user } = await getUser();

  // Generate OAuth URL for various providers
  const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const redirectUri = 'http://localhost:3000/using-hosted-authkit/with-session/callback';
  
  // For demo purposes, we'll use Google OAuth
  const googleOAuthUrl = `${appwriteEndpoint}/account/sessions/oauth2/google?project=${projectId}&success=${encodeURIComponent(redirectUri)}`;

  return (
    <main>
      <h1>With session (Appwrite)</h1>

      {isAuthenticated ? (
        <>
          <h2>Welcome back{user?.name && `, ${user?.name}`}</h2>
          <p>You are now authenticated into the application.</p>
          <p>Email: {user?.email}</p>
          <p>ID: {user?.$id}</p>

          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Sign-out</button>
          </form>
        </>
      ) : (
        <>
          <h2>Sign-in</h2>
          <p>Sign-in to view your account details</p>
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
        </>
      )}

      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </main>
  );
}
