import "./sass/App.css";

function App() {
	return (
		<form className="appForm">
			<div className="appHeader">
				Рассчитайте стоимость автомобиля в лизинг
			</div>
			<label className="carPrice">
				<div className="title">Стоимость автомобиля</div>
				<input type="text" className="input"></input>
				<span className="lastSymbolCarPrice">&#8381;</span>

				{/* RANGE */}
			</label>

			<label className="initialPayment">
				<div className="title">Первоначальный взнос</div>
				<input type="text" className="input"></input>
				<div className="lastSymbolInitialPayment">13%</div>

				{/* RANGE */}
			</label>

			<label className="leaseTerm">
				<div className="title">Срок лизинга</div>
				<input type="text" className="input"></input>\
				<div className="lastSymbolLeaseTerm">мес.</div>
				{/* RANGE */}
			</label>
			<div className="totalCost">
				<div>Сумма договора лизинга</div>
				<div className="total">
					<h1>4 467 313</h1>
					<h1 className="lastSymbolTotal"> &#8381;</h1>
				</div>
			</div>
			<div className="monthlyPayment">
				<div>Ежемесячный платеж от</div>
				<div className="total">
					<h1>114 455</h1>
					<h1 className="lastSymbolTotal"> &#8381;</h1>
				</div>
			</div>
			<input className="button" type="submit" value="Оставить заявку" />
		</form>
	);
}

export default App;
