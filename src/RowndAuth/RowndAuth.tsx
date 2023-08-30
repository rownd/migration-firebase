import { useEffect } from 'react';
import '../App.css';
import { auth } from '../firebase';
import Todo from '../Todo';
import { useRownd } from '@rownd/react';
import { signInWithCustomToken } from 'firebase/auth';

function RowndAuth() {
  const { user, requestSignIn, access_token } = useRownd();

  // useEffect(() => {
  //   if (!access_token) return;

  //   async () => {
  //     const token: string = await firebase.getToken(access_token)

  //     await signInWithCustomToken(auth, token)
  //   }
  // }, [])

  return (
    <>
      {user.data.id ? (
        <>
          Logged in: <strong>{user.data?.email || 'Anonymous'}</strong>
          <button onClick={() => auth.signOut()}>Sign out</button>
          <hr />
          <Todo userId={user.data.id} />
        </>
      ) : (
        <>
          <div className="card">
            <h2>Firebase migration</h2>
            <button style={{ width: '100%' }} onClick={() => requestSignIn()}>
              Sign in with Google
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default RowndAuth;
