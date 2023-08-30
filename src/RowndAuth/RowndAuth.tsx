import { useEffect } from 'react';
import { useRownd } from '@rownd/react';

function RowndAuth() {
  const { requestSignIn } = useRownd();

  useEffect(() => {
    requestSignIn();
  }, [])

  return (
    <div className="card">
      <h2>Firebase migration</h2>
      <button style={{ width: '100%' }} onClick={() => requestSignIn()}>
        Sign in with Rownd
      </button>
    </div>
  );
}

export default RowndAuth;
