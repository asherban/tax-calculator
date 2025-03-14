/**
 * Israeli Tax Data for Years 2019-2024
 * Source: Israeli Tax Authority
 * Based on: https://www.kolzchut.org.il/he/מדרגות_מס_הכנסה
 */

// Tax data by year
export const TAX_DATA = {
  2019: {
    TAX_BRACKETS: [
      { max: 75720, rate: 0.1 },
      { max: 108600, rate: 0.14 },
      { max: 174360, rate: 0.2 },
      { max: 242400, rate: 0.31 },
      { max: 504360, rate: 0.35 },
      { max: 649560, rate: 0.47 },
      { max: Infinity, rate: 0.5 }
    ],
    TAX_CREDIT_POINT_VALUE: 2580,
    MAX_PENSION_CONTRIBUTION_FOR_CREDIT: 7308, // 609 NIS per month * 12
    PENSION_CONTRIBUTION_PERCENTAGE_LIMIT: 0.07, // 7%
    PENSION_TAX_CREDIT_RATE: 0.35 // 35%
  },
  2020: {
    TAX_BRACKETS: [
      { max: 75960, rate: 0.1 },
      { max: 108960, rate: 0.14 },
      { max: 174960, rate: 0.2 },
      { max: 243120, rate: 0.31 },
      { max: 505920, rate: 0.35 },
      { max: 651600, rate: 0.47 },
      { max: Infinity, rate: 0.5 }
    ],
    TAX_CREDIT_POINT_VALUE: 2628,
    MAX_PENSION_CONTRIBUTION_FOR_CREDIT: 7440, // 620 NIS per month * 12
    PENSION_CONTRIBUTION_PERCENTAGE_LIMIT: 0.07,
    PENSION_TAX_CREDIT_RATE: 0.35
  },
  2021: {
    TAX_BRACKETS: [
      { max: 75480, rate: 0.1 },
      { max: 108360, rate: 0.14 },
      { max: 173880, rate: 0.2 },
      { max: 241680, rate: 0.31 },
      { max: 502920, rate: 0.35 },
      { max: 647640, rate: 0.47 },
      { max: Infinity, rate: 0.5 }
    ],
    TAX_CREDIT_POINT_VALUE: 2616,
    MAX_PENSION_CONTRIBUTION_FOR_CREDIT: 7584, // 632 NIS per month * 12
    PENSION_CONTRIBUTION_PERCENTAGE_LIMIT: 0.07,
    PENSION_TAX_CREDIT_RATE: 0.35
  },
  2022: {
    TAX_BRACKETS: [
      { max: 77400, rate: 0.1 },
      { max: 110880, rate: 0.14 },
      { max: 178080, rate: 0.2 },
      { max: 247440, rate: 0.31 },
      { max: 514920, rate: 0.35 },
      { max: 663240, rate: 0.47 },
      { max: Infinity, rate: 0.5 }
    ],
    TAX_CREDIT_POINT_VALUE: 2676,
    MAX_PENSION_CONTRIBUTION_FOR_CREDIT: 7668, // 639 NIS per month * 12
    PENSION_CONTRIBUTION_PERCENTAGE_LIMIT: 0.07,
    PENSION_TAX_CREDIT_RATE: 0.35
  },
  2023: {
    TAX_BRACKETS: [
      { max: 81480, rate: 0.1 },
      { max: 116760, rate: 0.14 },
      { max: 187440, rate: 0.2 },
      { max: 260520, rate: 0.31 },
      { max: 542160, rate: 0.35 },
      { max: 698280, rate: 0.47 },
      { max: Infinity, rate: 0.5 }
    ],
    TAX_CREDIT_POINT_VALUE: 2760,
    MAX_PENSION_CONTRIBUTION_FOR_CREDIT: 7824, // 652 NIS per month * 12
    PENSION_CONTRIBUTION_PERCENTAGE_LIMIT: 0.07,
    PENSION_TAX_CREDIT_RATE: 0.35
  },
  2024: {
    TAX_BRACKETS: [
      { max: 84120, rate: 0.1 },
      { max: 120720, rate: 0.14 },
      { max: 193800, rate: 0.2 },
      { max: 269280, rate: 0.31 },
      { max: 560280, rate: 0.35 },
      { max: 721560, rate: 0.47 },
      { max: Infinity, rate: 0.5 }
    ],
    TAX_CREDIT_POINT_VALUE: 2904,
    MAX_PENSION_CONTRIBUTION_FOR_CREDIT: 7932, // 661 NIS per month * 12
    PENSION_CONTRIBUTION_PERCENTAGE_LIMIT: 0.07,
    PENSION_TAX_CREDIT_RATE: 0.35
  }
};

// Default year
export const DEFAULT_TAX_YEAR = 2024;

// For convenience, export the current year's values directly
export const TAX_BRACKETS = TAX_DATA[DEFAULT_TAX_YEAR].TAX_BRACKETS;
export const TAX_CREDIT_POINT_VALUE = TAX_DATA[DEFAULT_TAX_YEAR].TAX_CREDIT_POINT_VALUE;
export const MAX_PENSION_CONTRIBUTION_FOR_CREDIT = TAX_DATA[DEFAULT_TAX_YEAR].MAX_PENSION_CONTRIBUTION_FOR_CREDIT;
export const PENSION_CONTRIBUTION_PERCENTAGE_LIMIT = TAX_DATA[DEFAULT_TAX_YEAR].PENSION_CONTRIBUTION_PERCENTAGE_LIMIT;
export const PENSION_TAX_CREDIT_RATE = TAX_DATA[DEFAULT_TAX_YEAR].PENSION_TAX_CREDIT_RATE;

/**
 * Calculate income tax based on Israeli tax brackets for the selected year
 * @param {number} yearlyIncome - Annual gross income
 * @param {number} creditPoints - Number of tax credit points
 * @param {number} pensionContribution - Annual pension contribution
 * @param {number} taxYear - Year to use for tax calculation (2020-2024)
 * @returns {object} Tax calculation details
 */
export function calculateIncomeTax(
  yearlyIncome, 
  creditPoints = 2.25, 
  pensionContribution = 0,
  taxYear = DEFAULT_TAX_YEAR
) {
  // Get tax data for the selected year
  const yearData = TAX_DATA[taxYear] || TAX_DATA[DEFAULT_TAX_YEAR];
  const brackets = yearData.TAX_BRACKETS;
  const creditPointValue = yearData.TAX_CREDIT_POINT_VALUE;
  const maxPensionContribution = yearData.MAX_PENSION_CONTRIBUTION_FOR_CREDIT;
  const pensionPercentageLimit = yearData.PENSION_CONTRIBUTION_PERCENTAGE_LIMIT;
  const pensionCreditRate = yearData.PENSION_TAX_CREDIT_RATE;
  
  let tax = 0;
  const bracketDetails = [];

  // Calculate tax by brackets
  let previousMax = 0;

  for (const bracket of brackets) {
    const bracketMin = previousMax;
    const bracketMax = bracket.max;
    const bracketRate = bracket.rate;

    if (yearlyIncome > bracketMin) {
      const taxableAmount = Math.min(yearlyIncome, bracketMax) - bracketMin;
      const taxAmount = taxableAmount * bracketRate;
      tax += taxAmount;

      bracketDetails.push({
        bracketMin,
        bracketMax,
        bracketRate: (bracketRate * 100).toFixed(0),
        taxableAmount,
        taxAmount
      });
    }
    
    previousMax = bracketMax;
  }

  const taxBeforeCredits = tax;

  // Calculate tax credit points deduction
  const creditPointsDeduction = Math.min(creditPoints * creditPointValue, taxBeforeCredits);
  tax -= creditPointsDeduction;

  // Calculate pension contribution tax credit
  // Limited to the percentage limit of income and the maximum eligible amount
  const eligiblePensionContribution = Math.min(
    pensionContribution,
    yearlyIncome * pensionPercentageLimit,
    maxPensionContribution
  );
  
  const pensionCreditDeduction = Math.min(
    eligiblePensionContribution * pensionCreditRate,
    tax // Cannot exceed remaining tax
  );
  
  tax -= pensionCreditDeduction;

  // Ensure tax is not negative
  tax = Math.max(0, tax);

  return {
    yearlyIncome,
    taxYear,
    taxBeforeCredits,
    creditPointsDeduction,
    creditPointValue,
    eligiblePensionContribution,
    pensionCreditDeduction,
    tax,
    brackets: bracketDetails,
    effectiveRate: (tax / yearlyIncome * 100).toFixed(2)
  };
}

/**
 * Format a number as Israeli currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
} 