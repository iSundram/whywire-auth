// This example is disabled for Appwrite integration
// Please refer to the 'with-session' example for Appwrite authentication patterns

export default async function WithNextjs() {
  return (
    <main>
      <h1>Using Appwrite Authentication</h1>
      <h2>With Next.js (Example Disabled)</h2>
      <p>This example has been disabled in favor of the Appwrite integration.</p>
      <p>Please see the <a href="/using-hosted-authkit/with-session">&apos;with-session&apos; example</a> for a working Appwrite authentication implementation.</p>
      
      <h3>Migration Notes:</h3>
      <ul>
        <li>Replace @workos-inc/authkit-nextjs with direct Appwrite Web SDK usage</li>
        <li>Handle OAuth flows through Appwrite&apos;s OAuth endpoints</li>
        <li>Manage sessions using JWT tokens and cookies</li>
        <li>Use Appwrite&apos;s account service for user management</li>
      </ul>
    </main>
  );
}
