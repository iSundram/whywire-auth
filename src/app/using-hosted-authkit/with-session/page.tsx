import { getUser, signOut } from './auth';

// This example demonstrates Appwrite authentication with session management
// using secure HTTP-only cookies.

export default async function WithSession() {
  const { isAuthenticated, user } = await getUser();

  return (
    <main>
      <h1>Appwrite Authentication with Session</h1>

      {isAuthenticated ? (
        <>
          <h2>Welcome back{user?.name && `, ${user?.name}`}</h2>
          <p>You are now authenticated into the application.</p>
          <p>Email: {user?.email}</p>

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
          <a href="/using-your-own-ui/sign-in/email-password">Sign-in with Email</a>
          <br />
          <a href="/using-your-own-ui/sign-in/magic-auth">Sign-in with Magic Link</a>
        </>
      )}

      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </main>
  );
}
