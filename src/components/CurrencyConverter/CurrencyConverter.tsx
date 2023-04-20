import { useEffect, useState } from "react";
import currencies from "./currencies";
import axios from "axios";
import "./CurrencyConverter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState<any>();

  useEffect(() => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        const data = response.data;
        setExchangeRate(data.rates[toCurrency]);
        setConvertedAmount((amount * data.rates[toCurrency]).toFixed(2));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fromCurrency, toCurrency, amount]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

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
            <option key={currency.code} value={currency.code}>
              {currency.name} {currency.code}
            </option>
          );
        })}
      </select>
      <button onClick={swapCurrencies}>&#8646;</button>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencies.map((currency: any) => {
          return (
            <option key={currency.code} value={currency.code}>
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