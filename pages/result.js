import Head from 'next/head';
import React from 'react';
import FormResult from '../components/organisms/formResult';

function result() {
   return (
      <>
         <Head>
            <title>Search Result</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/vector.png" />
         </Head>
         <div className={`d-flex justify-content-center`}>
            <FormResult />
         </div>
      </>
   );
}

export default result;