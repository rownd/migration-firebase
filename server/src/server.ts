import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../fir-auth-c80a9-firebase-adminsdk-pfj4x-013b53f096.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

const app = express();
const PORT = 3124;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: string;
      decodedToken?: DecodedIdToken;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).send({ error: 'No credentials' });
  }

  try {
    // Get bearer token
    const token = authorization.substring(7, authorization.length);
    const decodedToken = await getAuth().verifyIdToken(token);
    req.userId = decodedToken?.uid;
    req.decodedToken = decodedToken;

    next();
  } catch (err) {
    return res.status(401).send({ error: 'User is not authenticated' });
  }
};

app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.get('/user', authMiddleware, async (req: Request, res: Response) => {
  const userRecord = await db
    .collection('users')
    .doc(req.userId || '')
    .get();
  let user = userRecord.data();

  // Create a new user in firestore if one doesn't already exist.
  if (!user) {
    await db
      .collection('users')
      .doc(req.userId || '')
      .set({
        email: req.decodedToken?.email || 'anonymously',
        age: 25,
        job: 'title',
      });

    const userRecord = await db
      .collection('users')
      .doc(req.userId || '')
      .get();
    user = userRecord.data();
  }

  res.send({
    user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
