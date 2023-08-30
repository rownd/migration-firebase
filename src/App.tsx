import { useEffect } from 'react';
import Todo from './Todo';
import './App.css';
import { useRownd } from '@rownd/react';

function App() {
  const { is_authenticated, is_initializing, requestSignIn, user, signOut } = useRownd();

  useEffect(() => {
    if (!is_authenticated && !is_initializing) {
        requestSignIn({ 
            prevent_closing: true,
        })
    }
  }, [is_authenticated, is_initializing, requestSignIn])

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
