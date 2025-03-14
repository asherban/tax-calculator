import React, { useState, useEffect } from 'react';
import { 
  calculateIncomeTax, 
  formatCurrency, 
  TAX_DATA,
  DEFAULT_TAX_YEAR,
  TAX_CREDIT_POINT_VALUE, 
  MAX_PENSION_CONTRIBUTION_FOR_CREDIT,
  PENSION_CONTRIBUTION_PERCENTAGE_LIMIT,
  PENSION_TAX_CREDIT_RATE
} from '../utils/taxCalculator';
import './TaxCalculator.css';

// Constants for localStorage keys
const STORAGE_KEYS = {
  YEARLY_INCOME: 'tax_calculator_yearly_income',
  CREDIT_POINTS: 'tax_calculator_credit_points',
  PENSION_CONTRIBUTION: 'tax_calculator_pension_contribution',
  TAX_YEAR: 'tax_calculator_tax_year'
};

// Helper functions for localStorage
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Available tax years
const AVAILABLE_YEARS = Object.keys(TAX_DATA).map(Number).sort((a, b) => b - a); // Sort descending

const TaxCalculator = () => {
  // Initialize state from localStorage or use defaults
  const [yearlyIncome, setYearlyIncome] = useState(() => 
    loadFromLocalStorage(STORAGE_KEYS.YEARLY_INCOME, '')
  );
  
  const [creditPoints, setCreditPoints] = useState(() => 
    loadFromLocalStorage(STORAGE_KEYS.CREDIT_POINTS, '2.25')
  );
  
  const [pensionContribution, setPensionContribution] = useState(() => 
    loadFromLocalStorage(STORAGE_KEYS.PENSION_CONTRIBUTION, '')
  );

  const [taxYear, setTaxYear] = useState(() => 
    parseInt(loadFromLocalStorage(STORAGE_KEYS.TAX_YEAR, DEFAULT_TAX_YEAR), 10)
  );
  
  const [taxResult, setTaxResult] = useState(null);
  const [error, setError] = useState('');

  // Save to localStorage whenever values change
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.YEARLY_INCOME, yearlyIncome);
  }, [yearlyIncome]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.CREDIT_POINTS, creditPoints);
  }, [creditPoints]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.PENSION_CONTRIBUTION, pensionContribution);
  }, [pensionContribution]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.TAX_YEAR, taxYear);
  }, [taxYear]);

  // Calculate tax whenever inputs change
  useEffect(() => {
    if (yearlyIncome && !isNaN(yearlyIncome) && yearlyIncome > 0) {
      const result = calculateIncomeTax(
        Number(yearlyIncome), 
        Number(creditPoints),
        Number(pensionContribution) || 0,
        taxYear
      );
      setTaxResult(result);
      setError('');
    } else if (yearlyIncome) {
      setError('Please enter a valid income amount');
      setTaxResult(null);
    } else {
      setTaxResult(null);
      setError('');
    }
  }, [yearlyIncome, creditPoints, pensionContribution, taxYear]);

  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Only allow digits
    setYearlyIncome(value);
  };

  const handleCreditPointsChange = (e) => {
    let value = e.target.value;
    // Allow digits, decimal point, and backspace
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
      // Limit to 2 decimal places
      if (value.includes('.')) {
        const parts = value.split('.');
        if (parts[1].length > 2) {
          value = `${parts[0]}.${parts[1].substring(0, 2)}`;
        }
      }
      setCreditPoints(value);
    }
  };

  const handlePensionContributionChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Only allow digits
    setPensionContribution(value);
  };

  const handleYearChange = (e) => {
    setTaxYear(parseInt(e.target.value, 10));
  };

  // Get current year's tax data
  const currentYearData = TAX_DATA[taxYear];

  // Calculate suggested pension contribution (7% of income)
  const suggestedPensionContribution = yearlyIncome ? Math.min(
    Math.round(Number(yearlyIncome) * currentYearData.PENSION_CONTRIBUTION_PERCENTAGE_LIMIT),
    currentYearData.MAX_PENSION_CONTRIBUTION_FOR_CREDIT
  ) : 0;

  const handleSetSuggestedPension = () => {
    setPensionContribution(suggestedPensionContribution.toString());
  };

  // Clear all stored data
  const handleResetData = () => {
    setYearlyIncome('');
    setCreditPoints('2.25');
    setPensionContribution('');
    setTaxYear(DEFAULT_TAX_YEAR);
    
    // Also clear localStorage
    localStorage.removeItem(STORAGE_KEYS.YEARLY_INCOME);
    localStorage.removeItem(STORAGE_KEYS.CREDIT_POINTS);
    localStorage.removeItem(STORAGE_KEYS.PENSION_CONTRIBUTION);
    localStorage.removeItem(STORAGE_KEYS.TAX_YEAR);
  };

  return (
    <div className="tax-calculator">
      <div className="calculator-card">
        <div className="header-section">
          <div>
            <h2>Israeli Income Tax Calculator</h2>
            <p className="subtitle">Calculate your annual income tax based on the Israeli tax system</p>
          </div>
          <button 
            className="reset-btn" 
            onClick={handleResetData}
            title="Clear all input data"
          >
            Reset
          </button>
        </div>
        
        <div className="input-group">
          <label htmlFor="tax-year">Tax Year</label>
          <select 
            id="tax-year" 
            className="year-select"
            value={taxYear}
            onChange={handleYearChange}
          >
            {AVAILABLE_YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="yearly-income">Annual Income (NIS)</label>
          <div className="input-wrapper">
            <span className="currency-symbol">₪</span>
            <input
              id="yearly-income"
              type="text"
              value={yearlyIncome}
              onChange={handleIncomeChange}
              placeholder="Enter your annual income"
              className="income-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="credit-points">Tax Credit Points (נקודות זיכוי)</label>
          <div className="credit-points-input-wrapper">
            <input
              id="credit-points"
              type="text"
              value={creditPoints}
              onChange={handleCreditPointsChange}
              placeholder="Enter number of tax credit points"
              className="credit-points-input"
            />
            <div className="credit-points-info">
              <span>Value per point: {formatCurrency(currentYearData.TAX_CREDIT_POINT_VALUE)}</span>
              <div className="tooltip">
                <span className="info-icon">ℹ️</span>
                <span className="tooltip-text">
                  Every Israeli resident is entitled to at least 2.25 credit points.
                  Women receive an additional 0.5 point (total 2.75).
                  Parents, new immigrants, and others may be eligible for additional points.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="pension-contribution">
            Annual Pension Contribution (NIS)
            <div className="tooltip">
              <span className="info-icon">ℹ️</span>
              <span className="tooltip-text">
                You can receive a 35% tax credit on pension contributions up to 7% of your income
                (maximum {formatCurrency(currentYearData.MAX_PENSION_CONTRIBUTION_FOR_CREDIT)} per year).
              </span>
            </div>
          </label>
          <div className="pension-input-wrapper">
            <div className="input-wrapper">
              <span className="currency-symbol">₪</span>
              <input
                id="pension-contribution"
                type="text"
                value={pensionContribution}
                onChange={handlePensionContributionChange}
                placeholder="Enter annual pension contribution"
                className="pension-input"
              />
            </div>
            {yearlyIncome > 0 && (
              <button 
                className="suggest-pension-btn" 
                onClick={handleSetSuggestedPension}
                type="button"
              >
                Use optimal value ({formatCurrency(suggestedPensionContribution)})
              </button>
            )}
          </div>
        </div>

        {taxResult && yearlyIncome > 0 && (
          <div className="results-section">
            <div className="result-summary">
              <div className="result-item">
                <h3>Total Tax</h3>
                <p className="tax-amount">{formatCurrency(taxResult.tax)}</p>
              </div>
              <div className="result-item">
                <h3>Effective Tax Rate</h3>
                <p className="tax-rate">{taxResult.effectiveRate}%</p>
              </div>
              <div className="result-item">
                <h3>Net Income</h3>
                <p className="net-income">{formatCurrency(Number(yearlyIncome) - taxResult.tax)}</p>
              </div>
            </div>
            
            <div className="tax-breakdown">
              <h3>Tax Calculation Details ({taxResult.taxYear})</h3>
              <div className="tax-summary">
                <div className="tax-summary-row">
                  <span>Tax Before Credits:</span>
                  <span>{formatCurrency(taxResult.taxBeforeCredits)}</span>
                </div>
                
                <div className="tax-summary-row">
                  <span>Credit Points Deduction ({creditPoints} points @ {formatCurrency(taxResult.creditPointValue)}):</span>
                  <span>-{formatCurrency(taxResult.creditPointsDeduction)}</span>
                </div>
                
                {taxResult.pensionCreditDeduction > 0 && (
                  <div className="tax-summary-row">
                    <span>
                      Pension Credit ({currentYearData.PENSION_TAX_CREDIT_RATE * 100}% of {formatCurrency(taxResult.eligiblePensionContribution)}):
                    </span>
                    <span>-{formatCurrency(taxResult.pensionCreditDeduction)}</span>
                  </div>
                )}
                
                <div className="tax-summary-row total">
                  <span>Final Tax Amount:</span>
                  <span>{formatCurrency(taxResult.tax)}</span>
                </div>
              </div>
              
              <h3>Tax Breakdown by Bracket</h3>
              <table className="bracket-table">
                <thead>
                  <tr>
                    <th>Tax Bracket</th>
                    <th>Rate</th>
                    <th>Taxable Amount</th>
                    <th>Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {taxResult.brackets.map((bracket, index) => (
                    <tr key={index}>
                      <td>
                        {formatCurrency(bracket.bracketMin)} - {bracket.bracketMax === Infinity ? '∞' : formatCurrency(bracket.bracketMax)}
                      </td>
                      <td>{bracket.bracketRate}%</td>
                      <td>{formatCurrency(bracket.taxableAmount)}</td>
                      <td>{formatCurrency(bracket.taxAmount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="total-label">Total Tax Before Credits</td>
                    <td className="total-amount">{formatCurrency(taxResult.taxBeforeCredits)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator; 