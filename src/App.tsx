import { useEffect, useState } from 'react';
import Todo from './Todo';
import './App.css';
import { useRownd } from '@rownd/react';
import { auth } from './firebase';
import { signInWithCustomToken } from 'firebase/auth';

function App() {
  const { is_authenticated, is_initializing, requestSignIn, user, signOut, getAccessToken } = useRownd();
  const [isSignedInFirebaseUser, setIsSignedInFirebaseUser] = useState<boolean | undefined>(undefined);
  const [firebaseToken, setFirebaseToken] = useState<string | null>(null);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
        setIsSignedInFirebaseUser(!!user);
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    if (!is_authenticated && !is_initializing) {
        // Convert a signed in Firebase user into a Rownd user.
        if (isSignedInFirebaseUser) {
            auth.currentUser?.getIdToken().then((idToken) => {
                getAccessToken({ token: idToken })
            })
            return;
        } else {
        requestSignIn({ 
            prevent_closing: true,
        });
      }
    }
  }, [is_authenticated, is_initializing, requestSignIn, getAccessToken, isSignedInFirebaseUser]);

  useEffect(() => {
    (async () => {
      if (is_authenticated) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firebaseToken = await (window as any).rownd.firebase.getIdToken();
        signInWithCustomToken(auth, firebaseToken);
        setFirebaseToken(firebaseToken);
      }
    })();
  }, [is_authenticated]);

  if (is_initializing) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      {is_authenticated && !is_initializing && firebaseToken &&
        <>
          Logged in: <strong>{user.data?.email || 'Anonymous'}</strong>
          <button onClick={() => signOut()}>Sign out</button>
          <hr />
          <Todo userId={user.data?.user_id} />
        </>
      }
    </>
  );
}

export default App;
