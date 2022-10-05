import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "./sass/App.css";

function App() {
	const [loading, setLoading] = useState(false);
	const [update, setUpdate] = useState(false);
	const [carPrice, setCarPrice] = useState();
	const [initialPayment, setInitialPayment] = useState();
	const [leaseTerm, setLeaseTerm] = useState();
	const [monthlyPayment, setMonthlyPayment] = useState();
	const [totalCost, setTotalCost] = useState();

	useEffect(() => {
		setCarPrice(3300000);
		setInitialPayment(13);
		setLeaseTerm(60);
	}, []);

	useEffect(() => {
		changeMonthlyPayment(carPrice, initialPayment, leaseTerm);
		changeTotalCost(initialPayment, leaseTerm, monthlyPayment);
		document.getElementById("carPrice").value = normalizeString(carPrice);
		document.getElementById("initialPayment").value = normalizeString(
			Math.floor((initialPayment / 100) * carPrice)
		);
		document.getElementById("procent").innerHTML = initialPayment + "%";
		document.getElementById("leaseTerm").value = leaseTerm;

		document.getElementById("monthlyPayment").innerHTML =
			normalizeString(monthlyPayment);
		document.getElementById("totalCost").innerHTML =
			normalizeString(totalCost);

		setUpdate(false);
	}, [
		carPrice,
		initialPayment,
		leaseTerm,
		update,
		monthlyPayment,
		totalCost,
	]);

	const changePrice = (event, newValue) => {
		setCarPrice((Number(newValue) * 5000000) / 100 + 1000000);
	};

	const changePriceInput = (v) => {
		let value = normalizeNumber(v.target.value);
		setCarPrice(
			value < 1000000 ? 1000000 : value > 6000000 ? 6000000 : value
		);
		setUpdate(true);
	};

	const changeInitialPayment = (event, newValue) => {
		setInitialPayment(Math.floor((Number(newValue) * 50) / 100 + 10));
	};

	const changeInitialPaymentInput = (v) => {
		let value = normalizeNumber(v.target.value);
		if (value !== (initialPayment / 100) * carPrice) {
			setInitialPayment(value < 10 ? 10 : value > 60 ? 60 : value);
			setUpdate(true);
		}
	};

	const changeLeaseTerm = (event, newValue) => {
		setLeaseTerm(Math.floor((Number(newValue) * 59) / 100 + 1));
	};

	const changeLeaseTermInput = (v) => {
		let value = Number(v.target.value);
		setLeaseTerm(value < 1 ? 1 : value > 60 ? 60 : value);
		setUpdate(true);
	};

	const changeMonthlyPayment = (
		price = 3300000,
		initial = 13,
		months = 60
	) => {
		setMonthlyPayment(
			Math.floor(
				(price - (initial / 100) * price) *
					((0.035 * Math.pow(1 + 0.035, months)) /
						(Math.pow(1 + 0.035, months) - 1))
			)
		);
	};

	const changeTotalCost = (initial = 13, month = 60, monthlyPayment = 0) => {
		setTotalCost(
			Math.floor((initial / 100) * carPrice + month * monthlyPayment)
		);
	};

	const normalizeNumber = (str = "0") => {
		return Number(str.replace(/\s/g, ""));
	};

	const normalizeString = (num) => {
		return (num = new Intl.NumberFormat("ru-RU").format(num));
	};

	const theme = createTheme({
		palette: {
			primary: {
				main: "#FF9514",
				white: "#fff",
			},
		},
	});

	const sendData = (e) => {
		axios
			.post(
				"https://hookb.in/eK160jgYJ6UlaRPldJ1P",
				{
					car_coast: carPrice,
					initial_payment: (initialPayment / 100) * carPrice,
					initial_payment_percent: initialPayment,
					lease_term: leaseTerm,
					total_sum: totalCost,
					monthly_payment_from: monthlyPayment,
				},
				{ headers: { "Content-Type": "application/json" } }
			)
			.then((res) => {
				console.log(res.data);
			});
		e.preventDefault();
		setLoading(true);
		document.getElementById("carPrice").disabled = true;
		document.getElementById("initialPayment").disabled = true;
		document.getElementById("leaseTerm").disabled = true;

		setTimeout(() => {
			setLoading(false);
			document.getElementById("carPrice").disabled = false;
			document.getElementById("initialPayment").disabled = false;
			document.getElementById("leaseTerm").disabled = false;
		}, 7000);
	};
	return (
		<form className="appForm" onSubmit={sendData}>
			<div className="appHeader">
				Рассчитайте стоимость автомобиля в лизинг
			</div>

			<label className="carPrice">
				<div className="title">Стоимость автомобиля</div>
				<input
					id="carPrice"
					type="text"
					onBlur={changePriceInput}
					className="input"
					style={{
						opacity: !loading ? 1 : 0.5,
					}}
				></input>
				<span
					className="lastSymbolCarPrice"
					style={{
						opacity: !loading ? 1 : 0.5,
					}}
				>
					&#8381;
				</span>
				<Slider
					className="slider"
					size="small"
					value={Math.floor((carPrice - 1000000) * 100) / 5000000}
					onChange={changePrice}
					sx={{
						color: theme.palette.primary.main,
						opacity: !loading ? 1 : 0.5,
					}}
				/>
			</label>

			<label className="initialPayment">
				<div className="title">Первоначальный взнос</div>
				<input
					id="initialPayment"
					type="text"
					onBlur={changeInitialPaymentInput}
					className="input"
					style={{
						opacity: !loading ? 1 : 0.5,
					}}
				></input>
				<div
					id="procent"
					className="lastSymbolInitialPayment"
					style={{
						opacity: !loading ? 1 : 0.5,
					}}
				>
					13%
				</div>
				<Slider
					className="slider"
					size="small"
					value={Math.floor((initialPayment - 10) * 100) / 50}
					onChange={changeInitialPayment}
					sx={{
						color: theme.palette.primary.main,
						opacity: !loading ? 1 : 0.5,
					}}
				/>
			</label>

			<label className="leaseTerm">
				<div className="title">Срок лизинга</div>
				<input
					id="leaseTerm"
					type="text"
					onBlur={changeLeaseTermInput}
					className="input"
					style={{
						opacity: !loading ? 1 : 0.5,
					}}
				></input>
				<div
					className="lastSymbolLeaseTerm"
					style={{
						opacity: !loading ? 1 : 0.5,
					}}
				>
					мес.
				</div>
				<Slider
					className="slider"
					size="small"
					value={Math.floor((leaseTerm - 1) * 100) / 59}
					onChange={changeLeaseTerm}
					sx={{
						color: theme.palette.primary.main,
						opacity: !loading ? 1 : 0.5,
					}}
				/>
			</label>

			<div className="totalCost">
				<div>Сумма договора лизинга</div>
				<div className="total">
					<h1 id="totalCost">4 467 313</h1>
					<h1 className="lastSymbolTotal"> &#8381;</h1>
				</div>
			</div>

			<div className="monthlyPayment">
				<div>Ежемесячный платеж от</div>
				<div className="total">
					<h1 id="monthlyPayment">114 455</h1>
					<h1 className="lastSymbolTotal"> &#8381;</h1>
				</div>
			</div>
			<button
				className="button"
				type="submit"
				disabled={loading}
				style={{
					opacity: !loading ? 1 : 0.5,
				}}
			>
				{!loading ? (
					"Оставить заявку"
				) : (
					<CircularProgress
						sx={{ color: theme.palette.primary.white }}
					/>
				)}
			</button>
		</form>
	);
}

export default App;
