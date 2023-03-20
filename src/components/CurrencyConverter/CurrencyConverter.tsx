import { useEffect, useState } from "react";
import currencies from "./currencies";
import "./index.scss";

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState<any>();

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data: any) => {
        setExchangeRate(data.rates[toCurrency]);
        setConvertedAmount((amount * data.rates[toCurrency]).toFixed(2));
      });
  }, [fromCurrency, toCurrency, amount]);

  //   console.log(currencies)

  return (
    <div className="CurrencyConverter">
      <input
        type="number"
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency: any) => {
          return (
            <option value={currency.code}>
              {currency.name} {currency.code}
            </option>
          );
        })}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencies.map((currency: any) => {
          return (
            <option value={currency.code}>
              {currency.name} {currency.code}
            </option>
          );
        })}
      </select>
      <h2>{convertedAmount}</h2>
    </div>
  );
}

export default CurrencyConverter;
