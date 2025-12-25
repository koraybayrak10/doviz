import { useEffect, useState } from "react";
import "./style.css";

const currencies = ["USD", "EUR", "TRY"];

export default function App() {
  const [rates, setRates] = useState({});
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("TRY");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then(res => res.json())
      .then(data => setRates(data.rates));
  }, []);

  const convert = () => {
    const value = (amount / rates[from]) * rates[to];
    const record = { from, to, amount, result: value.toFixed(2) };
    setResult(record.result);
    setHistory(prev => [record, ...prev.slice(0, 5)]);
  };

  return (
    <div className="glass">
      <h2>💱 Döviz Dönüştürücü</h2>

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <select value={from} onChange={e => setFrom(e.target.value)}>
        {currencies.map(c => <option key={c}>{c}</option>)}
      </select>

      <select value={to} onChange={e => setTo(e.target.value)}>
        {currencies.map(c => <option key={c}>{c}</option>)}
      </select>

      <button onClick={convert}>Çevir</button>

      {result && <h3>Sonuç: {result}</h3>}

      <div className="history">
        {history.map((h, i) => (
          <div key={i} onClick={() => setResult(h.result)}>
            {h.amount} {h.from} → {h.result} {h.to}
          </div>
        ))}
      </div>
    </div>
  );
}
