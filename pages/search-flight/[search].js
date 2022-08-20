import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import FormFlight from "../../components/organisms/formFlight";
import { useRouter } from "next/router";
import LoadingComp from "../../components/organisms/loadingComp";

function flight() {
  const router = useRouter();
  const queryDest = router?.query?.search;
  const [initiateDest, setInitiateDest] = useState([]);
  const [dataAllDestinations, setDataAllDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllDestinations();
    getDestination();
  }, [dataAllDestinations[0]?.destination_id]);

  const getDestination = () => {
    setLoading(true);

    axios
      .get(
        `https://bypass-ankasa-backend.herokuapp.com/destinations/${queryDest}`
      )
      .then((res) => {
        const destination = res?.data?.data[0];
        setInitiateDest(destination);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        setLoading(false);
      });
  };

  const getAllDestinations = () => {
    axios
      .get("https://bypass-ankasa-backend.herokuapp.com/destination")
      .then((res) => {
        const allDestinations = res?.data?.data;
        setDataAllDestinations(allDestinations);
      });
  };

  console.log("initiateDest", initiateDest, loading);

  return (
    <>
      <Head>
        <title>Ankasa - Search Flight</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/vector.png" />
      </Head>
      {loading ? (
        <LoadingComp />
      ) : (
        <div className={`d-flex justify-content-center`}>
          <FormFlight
            inititateDestination={initiateDest}
            destinationList={dataAllDestinations}
          />
        </div>
      )}
    </>
  );
}

export default flight;