// import '../App.css';
// import {
//   signInWithRedirect,
//   GoogleAuthProvider,
//   signInAnonymously,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';
// import { auth } from '../firebase';

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const googleProvider = new GoogleAuthProvider();

// function FirebaseAuth() {
//   const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const formData: { email?: string; password?: string } = Object.fromEntries(
//       new FormData(
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         e.target
//       )
//     );

//     createUserWithEmailAndPassword(
//       auth,
//       formData?.email || '',
//       formData?.password || ''
//     )
//       .then((userCredential) => {
//         console.log(`Successfully created a new user ${userCredential}`);
//       })
//       .catch((error) => {
//         console.log({ error });
//         toast.error('Error with sign up. Please try again');
//       });
//   };

//   const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const formData: { email?: string; password?: string } = Object.fromEntries(
//       new FormData(
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         e.target
//       )
//     );

//     signInWithEmailAndPassword(
//       auth,
//       formData?.email || '',
//       formData?.password || ''
//     )
//       .then((userCredential) => {
//         console.log(`Successfully signed in a user ${userCredential}`);
//       })
//       .catch((error) => {
//         console.log({ error });
//         toast.error('Error with sign in. Please try again');
//       });
//   };

//   return (
//     <>
//       <div className="card">
//         <h2>Firebase migration</h2>
//         <button
//           style={{ width: '100%' }}
//           onClick={() => signInWithRedirect(auth, googleProvider)}
//         >
//           Sign in with Google
//         </button>
//         <button
//           style={{ width: '100%' }}
//           onClick={() => signInAnonymously(auth)}
//         >
//           Sign in Anonymously
//         </button>
//         <form onSubmit={(e) => handleSignUp(e)}>
//           <input type="email" name="email" placeholder="Email" />
//           <input type="text" name="password" placeholder="****" />
//           <button style={{ width: '100%' }} type="submit">
//             Sign up
//           </button>
//         </form>
//         <div>Or</div>
//         <form onSubmit={(e) => handleSignIn(e)}>
//           <input type="email" name="email" placeholder="Email" />
//           <input type="text" name="password" placeholder="****" />
//           <button style={{ width: '100%' }} type="submit">
//             Sign in
//           </button>
//         </form>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }

// export default FirebaseAuth;
