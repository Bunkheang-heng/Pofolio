import { useState, useMemo } from "react";
import "./SanSomSimulator.css";

export default function SanSomSimulator() {
  const [loanAmount, setLoanAmount] = useState(3000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [tenureMonths, setTenureMonths] = useState(12);

  // Amortized Loan Calculation (Annuity Formula)
  const calculation = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const n = tenureMonths;
    const p = loanAmount;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = p / n;
    } else {
      monthlyPayment = (p * (monthlyRate * Math.pow(1 + monthlyRate, n))) / (Math.pow(1 + monthlyRate, n) - 1);
    }

    const totalRepay = monthlyPayment * n;
    const totalInterest = totalRepay - p;

    // Generate first 3 installments
    let balance = p;
    const schedule = [];
    for (let i = 1; i <= Math.min(3, n); i++) {
      const interestPart = balance * monthlyRate;
      const principalPart = monthlyPayment - interestPart;
      balance = Math.max(0, balance - principalPart);
      schedule.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principalPart.toFixed(2),
        interest: interestPart.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepay: totalRepay.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      schedule,
    };
  }, [loanAmount, annualRate, tenureMonths]);

  return (
    <div className="sansom-simulator" role="region" aria-label="SanSom Loan Engine Live Calculator">
      <div className="sansom-sim-header">
        <div className="sansom-sim-badge">
          <span className="sim-pulse-dot" aria-hidden="true" />
          <span>SANSOM CORE LOGIC // LIVE ENGINE PREVIEW</span>
        </div>
        <span className="sim-tag">Amortization Engine</span>
      </div>

      <div className="sansom-sim-body">
        {/* Controls Column */}
        <div className="sansom-controls-col">
          <div className="sim-field">
            <div className="sim-field-label">
              <span>Principal Amount</span>
              <strong>${loanAmount.toLocaleString()}</strong>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="sim-slider"
              aria-label="Loan Principal Amount"
            />
            <div className="sim-range-marks">
              <span>$500</span>
              <span>$5,000</span>
              <span>$10,000</span>
            </div>
          </div>

          <div className="sim-field">
            <div className="sim-field-label">
              <span>Annual Interest Rate</span>
              <strong>{annualRate}% APR</strong>
            </div>
            <input
              type="range"
              min="3"
              max="18"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="sim-slider"
              aria-label="Annual Interest Rate Percentage"
            />
            <div className="sim-range-marks">
              <span>3%</span>
              <span>10%</span>
              <span>18%</span>
            </div>
          </div>

          <div className="sim-field">
            <div className="sim-field-label">
              <span>Repayment Tenure</span>
              <strong>{tenureMonths} Months</strong>
            </div>
            <input
              type="range"
              min="3"
              max="24"
              step="1"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="sim-slider"
              aria-label="Repayment Tenure in Months"
            />
            <div className="sim-range-marks">
              <span>3 mo</span>
              <span>12 mo</span>
              <span>24 mo</span>
            </div>
          </div>
        </div>

        {/* Real-time Results Display */}
        <div className="sansom-results-col">
          <div className="sim-result-card-main">
            <span className="sim-result-sub">ESTIMATED MONTHLY REPAYMENT</span>
            <div className="sim-result-hero-num">
              <span>$</span>{calculation.monthlyPayment}
              <small>/mo</small>
            </div>
          </div>

          <div className="sim-result-stats">
            <div className="sim-stat-box">
              <span>Total Interest</span>
              <strong>${calculation.totalInterest}</strong>
            </div>
            <div className="sim-stat-box">
              <span>Total Repayable</span>
              <strong>${calculation.totalRepay}</strong>
            </div>
          </div>

          {/* Mini Schedule Snapshot */}
          <div className="sim-mini-schedule">
            <span className="sim-schedule-label">Schedule Schedule Preview (Mo 1–3):</span>
            <div className="sim-schedule-table">
              {calculation.schedule.map((row) => (
                <div key={row.month} className="sim-schedule-row">
                  <span className="sch-mo">Mo {row.month}</span>
                  <span className="sch-item">P: ${row.principal}</span>
                  <span className="sch-item">I: ${row.interest}</span>
                  <span className="sch-bal">Bal: ${row.balance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sansom-sim-footer">
        <span className="sim-footer-note">
          ✓ Microfinance compliant amortization engine built for Cambodian MSME portfolio management.
        </span>
      </div>
    </div>
  );
}
