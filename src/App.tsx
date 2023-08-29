import { useEffect, useState } from 'react';
import './App.css';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInAnonymously,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from "./firebase";
import axios from "axios";
import Todo from "./Todo";
import { toast } from 'react-toastify';

const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState<null | User>(auth.currentUser);
  const [response, setResponse] = useState<null | Record<string, unknown>>(
    null
  );

  auth.onAuthStateChanged((user) => {
    if (!user) {
      setUser(null);
      setResponse(null);
      return;
    }

    setUser(user);
  });

  const fetchUserData = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await axios.get("http://localhost:3124/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse(res?.data);
    } catch (err) {
      toast.error('Error fetching user data')
      console.log({ err });
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchUserData();
    }
  }, [user?.uid]);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData: { email?: string; password?: string } = Object.fromEntries(
      new FormData(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        e.target
      )
    );

    createUserWithEmailAndPassword(
      auth,
      formData?.email || '',
      formData?.password || ''
    )
      .then((userCredential: UserCredential) => {
        console.log({ userCredential });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        toast.error('Error with sign up. Please try again')
      });
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData: { email?: string; password?: string } = Object.fromEntries(
      new FormData(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        e.target
      )
    );

    signInWithEmailAndPassword(
      auth,
      formData?.email || '',
      formData?.password || ''
    )
      .then((userCredential: UserCredential) => {
        console.log({ userCredential });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        toast.error('Error with sign in. Please try again')
      });
  };

  return (
    <>
      {user ? (
        <>
          Logged in: <strong>{user.email}</strong>
          <div>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
          <button onClick={() => auth.signOut()}>Sign out</button>
          <hr />
          <Todo user={user} />
        </>
      ) : (
        <>
          <h1>Firebase migration</h1>
          <div className="card">
            <button onClick={() => signInWithRedirect(auth, googleProvider)}>
              Sign in with Google
            </button>
            <button onClick={() => signInAnonymously(auth)}>
              Sign in Anonymously
            </button>
            <form onSubmit={(e) => handleSignUp(e)}>
              <input type="email" name="email" placeholder="Email" />
              <input type="text" name="password" placeholder="****" />
              <input type="submit" value="Sign up" />
            </form>
            <div>Or</div>
            <form onSubmit={(e) => handleSignIn(e)}>
              <input type="email" name="email" placeholder="Email" />
              <input type="text" name="password" placeholder="****" />
              <input type="submit" value="Sign in" />
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default App;
