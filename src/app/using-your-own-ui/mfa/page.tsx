// MFA placeholder for Appwrite migration

export default function Mfa() {
  return (
    <main>
      <h1>Multi-Factor Auth (Disabled)</h1>
      <p>This example has been disabled for the Appwrite migration.</p>
      <p>Use the <a href="/using-hosted-authkit/with-session">working Appwrite authentication example</a> instead.</p>
      
      <h3>Migration Notes:</h3>
      <ul>
        <li>Appwrite supports MFA through the account.createMfaChallenge() method</li>
        <li>Use account.updateMfaChallenge() to verify TOTP codes</li>
        <li>Configure MFA factors using account.createMfaRecoveryCodes()</li>
      </ul>
    </main>
  );
}