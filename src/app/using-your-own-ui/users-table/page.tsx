// Users table placeholder for Appwrite migration
import Link from 'next/link';

export default async function UsersTable({
  searchParams,
}: {
  searchParams: { before?: string; after?: string };
}) {
  return (
    <main>
      <h1>Users table (Disabled)</h1>
      <p>This example has been disabled for the Appwrite migration.</p>
      <p>
        <Link href="/using-hosted-authkit/with-session">
          See the working Appwrite authentication example
        </Link>
      </p>
      
      <h3>Migration Notes:</h3>
      <ul>
        <li>Use Appwrite Teams service for user management</li>
        <li>Implement user listing with Appwrite&apos;s users.list() API</li>
        <li>Handle user operations through Appwrite&apos;s account service</li>
      </ul>
    </main>
  );
}
