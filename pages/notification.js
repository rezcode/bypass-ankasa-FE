import Head from "next/head";
import React from "react";
import FormNotif from "../components/organisms/formNotif";

//Redux
import { useSelector } from "react-redux";

// Firebase
import { database } from "../firebase";
import { ref, onValue, remove } from "firebase/database";

function Notif() {
	const { auth, loggedInUser } = useSelector((state) => state);
	const { user } = loggedInUser;
	const [notification, setNotification] = React.useState({});
	const [keys, setKeys] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [msg, setMessage] = React.useState("");
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (!auth) {
			router.replace("/login");
		}
	}, [auth]);

	React.useEffect(() => {
		const starCountRef = ref(database, `notification/${user?.user_id}`);

		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();

			if (data && typeof data === "object") {
				setNotification(data);
				setKeys(Object.keys(data).reverse().slice(0, 10));
			}
		});
	}, [user?.user_id]);

	const handleClear = () => {
		setIsLoading(true);
		const db = ref(database, `notification/${user?.user_id}/`);
		return remove(db)
			.then(() => {
				setIsLoading(false);
				setMessage("Seluruh notifikasi berhasil di hapus");
				setKeys([]);
				setOpen(true);
			})
			.catch((err) => {
				setIsLoading(false);
				setMessage(err.message);
				setOpen(true);
			});
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Head>
				<title>Ankasa - Notification</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/vector.png" />
			</Head>
			<div className={`d-flex justify-content-center`}>
				<FormNotif data={{ notification, keys, user: user?.user_id, handleClear, isLoading, msg, open, handleClose }} />
			</div>
		</>
	);
}

export default Notif;
