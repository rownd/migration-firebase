import { useEffect, useState } from 'react';
import './App.css';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInAnonymously,
  User,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';
import { auth } from "./firebase";
import axios from "axios";
import Todo from "./Todo";

const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState<null | User>(auth.currentUser);
  const [response, setResponse] = useState<null | Record<string, unknown>>(
    null
  );
  const [verifyEmail, setVerifyEmail] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (!user) {
      setUser(null);
      setResponse(null);
      setVerifyEmail(false);
      return;
    }

    setUser(user);
  });

  if (isSignInWithEmailLink(auth, window.location.href)) {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    signInWithEmailLink(auth, email || '', window.location.href)
  }

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
      console.log({ err });
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchUserData();
    }
  }, [user?.uid]);

  const handleEmailSignInLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData: { email?: string; } = Object.fromEntries(
      new FormData(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        e.target
      )
    );

    sendSignInLinkToEmail(auth, formData?.email || '', {
      url: `http://localhost:5173?email=${formData.email}`,
      handleCodeInApp: true
    }).then((res) => {
      setVerifyEmail(true);
      console.log({res})
    }).catch((err) => {
      console.log({err})
    })
  }

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
          <h1>Sign-in or sign-up</h1>
          <div className="card">
            <button onClick={() => signInWithRedirect(auth, googleProvider)}>
              Sign in with Google
            </button>
            <button onClick={() => signInAnonymously(auth)}>
              Sign in Anonymously
            </button>
            {verifyEmail ? <h3>Verify your email...</h3> : <form onSubmit={(e) => handleEmailSignInLink(e)}>
              <input type="email" name="email" placeholder="Email" />
              <input type="submit" value="Sign in or sign up" />
            </form>}
          </div>
        </>
      )}
    </>
  );
}

export default App;
