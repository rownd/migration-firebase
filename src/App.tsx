import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import FirebaseAuth from './FirebaseAuth/FirebaseAuth';
import { auth } from './firebase';
import Todo from './Todo';
import './App.css';

function App() {
  const [user, setUser] = useState<null | User>(auth.currentUser);
  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      setUser(user || null);
    });

    return () => {
      listener();
    };
  }, []);

  if (!user) {
    return <FirebaseAuth />;
  }

  return (
    <>
      Logged in: <strong>{user?.email || 'Anonymous'}</strong>
      <button onClick={() => auth.signOut()}>Sign out</button>
      <hr />
      <Todo userId={user.uid} />
    </>
  );
}

export default App;
