import { useEffect, useState } from 'react';
import Todo from './Todo';
import './App.css';
import { useRownd } from '@rownd/react';
import { auth } from './firebase';

function App() {
  const { is_authenticated, is_initializing, requestSignIn, user, signOut, getAccessToken } = useRownd();
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

        requestSignIn({ 
            prevent_closing: true,
        })
    }
  }, [is_authenticated, is_initializing, requestSignIn, getAccessToken, isSignedInFirebaseUser]);

  if (is_initializing) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      Logged in: <strong>{user.data?.email || 'Anonymous'}</strong>
      <button onClick={() => signOut()}>Sign out</button>
      <hr />
      <Todo userId={user.data?.id} />
    </>
  );
}

export default App;
