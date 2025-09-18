// OAuth placeholder for Appwrite migration

export default function OAuthExample({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = JSON.parse(String(searchParams.response ?? '{ "error": null }'));

  return (
    <main>
      <h1>OAuth Example (Disabled)</h1>
      <p>This example has been disabled for the Appwrite migration.</p>
      <p>Use the <a href="/using-hosted-authkit/with-session">working Appwrite authentication example</a> instead.</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
