import Head from 'next/head';
import React from 'react';
import FormFlight from '../../components/organisms/formFlight';

function flight() {
   return (
      <>
         <Head>
            <title>Search Flight</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/vector.png" />
         </Head>
         <div className={`d-flex justify-content-center`}>
            <FormFlight />
         </div>
      </>
   );
}

export default flight;