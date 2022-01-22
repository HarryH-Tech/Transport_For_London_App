import React from 'react';
import { isAuthenticated } from '../auth';

function Home(props) {
  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
      ></div>
      <div className="flex items-center justify-center h-screen">
        <div
          style={{ zIndex: '1' }}
          className="bg-blue-500 text-white text-center font-bold rounded-lg border shadow-lg p-4 m-auto w-3/4"
        >
          <h3>Welcome!</h3>
          <br />
          <p className="text-center">
            This app can be used to check pollution levels, nearby taxi centers
            and to plan journeys to places in london. Just sign up and login to
            use it.
            <br />
            <br />
            {!isAuthenticated && (
              <p>
                (If you don't want to sign up you can use the email:
                user@user.com and password: user123 to login.)
              </p>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
