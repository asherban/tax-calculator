# Israeli Tax Calculator

A simple React application that calculates income tax based on the Israeli tax system.

## Features

- Calculate income tax based on annual income
- Apply tax credit points (נקודות זיכוי) to reduce your tax liability
- Include pension contribution tax credits (35% of eligible contributions)
- View effective tax rate
- See net income after tax
- Detailed breakdown of tax by brackets
- Choose tax year from 2020 to 2024
- Responsive design for mobile and desktop
- Persistent data across sessions

## Tax Brackets by Year

The calculator supports tax calculations for the years 2020-2024 with the appropriate tax brackets for each year:

### 2024 Tax Brackets
| Income Range (NIS)    | Tax Rate |
|-----------------------|----------|
| 0 - 81,480            | 10%      |
| 81,481 - 116,760      | 14%      |
| 116,761 - 187,440     | 20%      |
| 187,441 - 260,520     | 31%      |
| 260,521 - 542,160     | 35%      |
| 542,161 - 698,280     | 47%      |
| 698,281 and above     | 50%      |

### 2023 Tax Brackets
| Income Range (NIS)    | Tax Rate |
|-----------------------|----------|
| 0 - 79,800            | 10%      |
| 79,801 - 114,240      | 14%      |
| 114,241 - 183,240     | 20%      |
| 183,241 - 254,880     | 31%      |
| 254,881 - 530,520     | 35%      |
| 530,521 - 682,920     | 47%      |
| 682,921 and above     | 50%      |

### 2022 Tax Brackets
| Income Range (NIS)    | Tax Rate |
|-----------------------|----------|
| 0 - 77,400            | 10%      |
| 77,401 - 110,880      | 14%      |
| 110,881 - 178,080     | 20%      |
| 178,081 - 247,440     | 31%      |
| 247,441 - 514,920     | 35%      |
| 514,921 - 663,240     | 47%      |
| 663,241 and above     | 50%      |

### 2021 Tax Brackets
| Income Range (NIS)    | Tax Rate |
|-----------------------|----------|
| 0 - 75,960            | 10%      |
| 75,961 - 108,960      | 14%      |
| 108,961 - 174,960     | 20%      |
| 174,961 - 243,120     | 31%      |
| 243,121 - 504,360     | 35%      |
| 504,361 - 651,600     | 47%      |
| 651,601 and above     | 50%      |

### 2020 Tax Brackets
| Income Range (NIS)    | Tax Rate |
|-----------------------|----------|
| 0 - 75,720            | 10%      |
| 75,721 - 108,600      | 14%      |
| 108,601 - 174,360     | 20%      |
| 174,361 - 242,400     | 31%      |
| 242,401 - 504,360     | 35%      |
| 504,361 - 651,600     | 47%      |
| 651,601 and above     | 50%      |

## Tax Credit Points (2020-2024)

Each tax credit point (נקודת זיכוי) value by year:
- 2024: ₪2,820 per year
- 2023: ₪2,760 per year
- 2022: ₪2,676 per year
- 2021: ₪2,616 per year
- 2020: ₪2,628 per year

Every Israeli resident is automatically entitled to credit points:
- Every resident: 2.25 points
- Women: Additional 0.5 points (total 2.75)
- Parents of young children, new immigrants, and others may be eligible for additional points

## Pension Contribution Tax Credit (2020-2024)

Employees in Israel can receive a 35% tax credit on their pension contributions, subject to the following limits:
- The contribution must not exceed 7% of annual income
- The maximum eligible contribution varies by year:
  - 2024: ₪7,896 per year (₪658 per month)
  - 2023: ₪7,824 per year (₪652 per month)
  - 2022: ₪7,668 per year (₪639 per month)
  - 2021: ₪7,584 per year (₪632 per month)
  - 2020: ₪7,440 per year (₪620 per month)

Source: [All Rights - Israeli Tax Brackets](https://www.kolzchut.org.il/he/%D7%9E%D7%93%D7%A8%D7%92%D7%95%D7%AA_%D7%9E%D7%A1_%D7%94%D7%9B%D7%A0%D7%A1%D7%94) and [All Rights - Pension Tax Credit](https://www.kolzchut.org.il/he/%D7%96%D7%99%D7%9B%D7%95%D7%99_%D7%9E%D7%9E%D7%A1_%D7%94%D7%9B%D7%A0%D7%A1%D7%94_%D7%91%D7%92%D7%99%D7%9F_%D7%94%D7%A4%D7%A8%D7%A9%D7%95%D7%AA_%D7%9C%D7%91%D7%99%D7%98%D7%95%D7%97_%D7%A4%D7%A0%D7%A1%D7%99%D7%95%D7%A0%D7%99)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory

```bash
cd tax-calculator
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Select the tax year you want to calculate for (2020-2024)
2. Enter your annual income (in NIS) in the input field
3. Set your number of tax credit points (default is 2.25 for Israeli residents)
4. Enter your annual pension contribution (optional)
5. The calculator will automatically update and show:
   - Total tax amount (after applying all credits)
   - Effective tax rate
   - Net income after tax
   - Detailed breakdown of tax calculation including:
     - Regular tax by bracket
     - Credit points deduction
     - Pension contribution credit

Your inputs will be saved in your browser, so they'll be automatically loaded the next time you use the calculator.

## Technology Stack

- React
- JavaScript
- CSS
- Local Storage for data persistence

## Important Notes

- This calculator provides an estimate based on basic Israeli tax brackets, credit points, and pension contributions
- It does not account for all possible deductions or factors that might affect your actual tax liability
- Always consult a tax professional for accurate tax advice

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tax bracket, credit point, and pension credit information based on the Israeli Tax Authority guidelines and All Rights website
