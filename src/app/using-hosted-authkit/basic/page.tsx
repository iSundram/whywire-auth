// This example has been migrated from WorkOS to Appwrite.
// It demonstrates basic authentication flow with redirect.

export default function Basic({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = JSON.parse(String(searchParams.response ?? '{ "error": null }'));

  return (
    <main>
      <h1>Basic Appwrite Authentication</h1>
      <h2>Simple authentication example</h2>
      <a href="/using-your-own-ui/sign-in/email-password">
        Sign-in with Email/Password
      </a>
      <br />
      <a href="/using-your-own-ui/sign-in/magic-auth">
        Sign-in with Magic Link
      </a>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
