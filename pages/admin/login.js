import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

import Blue from "../../assets/illustration_blue.svg";

// custom components
import loginStyle from "../../styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginAdmin } from "../../redux/features/authSlice";

const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { auth, loggedInUser } = useSelector((state) => state);

	const { token, isLoading, error } = auth;
	const { user } = loggedInUser;

	useEffect(() => {
		if (token && user?.role === "admin") {
			router.replace("/admin");
		}
	}, [router, token, user?.role]);

	const handleCloseAlert = () => {
		dispatch(clearError());
	};

	const passwordLength = {
		min: 6,
		max: 20,
	};

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email("Please input a valid email").required("Email should not be empty"),
		password: Yup.string()
			.min(passwordLength.min, `Password length must be ${passwordLength.min} or more characters`)
			.max(passwordLength.max, `Password shold not be more than ${passwordLength.max} characters`)
			.required("Password should not be empty"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			dispatch(clearError());
			dispatch(loginAdmin(values));
		},
	});
	const eye = <AiOutlineEye size={25} />;
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};
	const backNavigate = () => {
		router.back();
	};

	return (
		<>
			<section id="styleButton" className={loginStyle.main}>
				<FaAngleLeft className={loginStyle.back} onClick={backNavigate} size={30} />
				<Image src={Blue} alt="" height={250} width={250} />
				<div>
					<h3 className={loginStyle.head}>Login as Administrator</h3>
					{error && (
						<Alert variant="danger" onClose={handleCloseAlert} dismissible>
							{error}
						</Alert>
					)}
					<Form id="formInput" onSubmit={formik.handleSubmit} method="POST">
						<Form.Group className={loginStyle.formControl}>
							<Form.Control type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="Email" size="lg" />
						</Form.Group>
						<InputGroup id="buttonEye" className={loginStyle.formControl} />

						{formik.errors.email && formik.touched.email && <small className="d-block text-danger"> {formik.errors.email} </small>}

						<InputGroup className={loginStyle.formControl}>
							<Form.Control
								type={passwordShown ? "text" : "password"}
								placeholder="Password"
								name="password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
								size="lg"
							/>
							<i onClick={togglePasswordVisiblity}>{eye}</i>
						</InputGroup>

						{formik.errors.password && formik.touched.password && <small className="d-block text-danger"> {formik.errors.password} </small>}

						<div className={loginStyle.button}>
							<Button className={`button {loginStyle.sign}`} type="submit" size="lg" disabled={isLoading}>
								{isLoading ? "Signing In" : "Sign In"}
							</Button>
						</div>
					</Form>
				</div>
			</section>
		</>
	);
};

export default Login;
