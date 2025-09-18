import { getUser, signOut } from '../with-session/auth';

export default async function WithNextjs() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await getUser();

  return (
    <main>
      <h1>Using Appwrite Authentication</h1>
      <h2>With Next.js</h2>
      {user ? (
        <>
          <p>Welcome back {user?.name && `, ${user?.name}`}</p>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </>
      ) : (
        <a href="/using-your-own-ui/sign-in/email-password">Sign in</a>
      )}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
