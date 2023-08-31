# Firebase migration to Rownd
This project contains a simple to-do app with a Firebase authentication sign-in and Firestore as the database.

### Code compare
All the code changes made to migrate this sample app from Firebase authentication to Rownd: [https://github.com/rownd/migration-firebase/compare/rownd](https://github.com/rownd/migration-firebase/compare/rownd)

### Docs
- Steps required for migration from Firebase authentication to Rownd. [https://docs.rownd.io/migration/firebase](https://docs.rownd.io/migration/firebase)
- Rownd's React SDK. [https://github.com/rownd/react](https://github.com/rownd/react)

### Migrating React code from Firebase authentication to Rownd

1. Install Rownd
```
npm install @rownd/react
```

2. Add Rownd to main entrypoint:
```jsx
import React from 'react',
import ReactDOM from 'react-dom';
import { RowndProvider } from '@rownd/react';
import App from './App';

ReactDOM.render(
  <RowndProvider
    appKey="<your app key>"
  >
    <App />
  </RowndProvider>,
  document.getElementById('root')
);
```

3. Add a sign-in trigger to all protected pages:

```jsx
import { useRownd } from '@rownd/react';

export default function MyProtectedComponent(props) {
  const { is_authenticated, requestSignIn, is_initializing } = useRownd();

useEffect(() => {
    if (!is_authenticated && !is_initializing) {
        // Trigger Rownd sign-in
        requestSignIn()
    }
  }, [is_authenticated, is_initializing, requestSignIn]);

  return (...)
}
```

### Keep Firebase users signed in
Keep Firebase users signed in when migrating to Rownd. Send the Firebase `idToken` to Rownd using `getAccessToken`

```jsx
import { useRownd } from '@rownd/react';
import { auth } from './firebase';

export default function MyProtectedComponent(props) {
  const { is_authenticated, requestSignIn, is_initializing, getAccessToken } = useRownd();
  const [isSignedInFirebaseUser, setIsSignedInFirebaseUser] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
        setIsSignedInFirebaseUser(!!user);
    });

    return () => {
      listener();
    };
  }, []);

useEffect(() => {
    if (!is_authenticated && !is_initializing && typeof isSignedInFirebaseUser === 'boolean') {
        // Convert a signed in Firebase user into a Rownd user.
        if (isSignedInFirebaseUser) {
            auth.currentUser?.getIdToken().then((idToken) => {
                getAccessToken({ token: idToken })
            })
            return;
        }

        // Trigger Rownd sign-in
        requestSignIn({ 
            prevent_closing: true,
        })
    }
  }, [is_authenticated, is_initializing, requestSignIn, getAccessToken, isSignedInFirebaseUser]);


  return (...)
}
```