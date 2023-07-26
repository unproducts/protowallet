// Import utilities
import { tailwindConfig, hexToRGB } from '../../../utils/Utils';

export default function createChartData(computedData) {
  return {
    labels: computedData.dates,
    datasets: [
      // Indigo line
      {
        label: 'Expense',
        data: computedData.expense,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.red[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.red[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.red[500],
        clip: 20,
      },
      // Gray line
      {
        label: 'Income',
        data: computedData.income,
        borderColor: tailwindConfig().theme.colors.green[500],
        fill: false,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.08)`,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
        clip: 20,
      },
    ],
  };
}
