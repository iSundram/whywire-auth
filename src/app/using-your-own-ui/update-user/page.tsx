'use client';

import { useFormState } from 'react-dom';
import { getUser, updateUser } from './update-user';

export default function UpdateUser() {
  // This example uses Next.js server actions to call functions on the server side.
  //
  // If your application is a single page app (SPA), you will need to:
  // - handle the form submission in `<form onSubmit>`
  // - make an API call to your backend (e.g using `fetch`)
  const [getUserState, getUserAction] = useFormState(getUser, { error: { code: '', message: '', type: '' } });
  const [updateUserState, updateUserAction] = useFormState(updateUser, { error: { code: '', message: '', type: '' } });

  if (!('user' in getUserState)) {
    return (
      <main key="email">
        <h1>Update user</h1>

        <form action={getUserAction}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoCapitalize="off"
              autoComplete="username"
              autoFocus
              required
            />
          </div>

          <button type="submit">Continue</button>
        </form>

        <pre>{JSON.stringify(getUserState, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main key="code">
      <h1>Update user</h1>

      <form action={updateUserAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" readOnly value={getUserState.user.email} />
        </div>

        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            defaultValue={getUserState.user.name ?? ''}
            autoFocus
          />
        </div>

        <input type="hidden" name="userId" value={getUserState.user.$id} />

        <button type="submit">Update user details</button>
      </form>

      <pre>{JSON.stringify(updateUserState, null, 2)}</pre>
    </main>
  );
}
