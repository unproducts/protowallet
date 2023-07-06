// Import Chart.js
import { Chart, Tooltip } from 'chart.js';
// Import Tailwind config
import { tailwindConfig } from './utils/Utils';

Chart.register(Tooltip);

// Define Chart.js default settings
Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = '500';
// @ts-ignore
Chart.defaults.color = tailwindConfig().theme.colors.slate[400];
// @ts-ignore
Chart.defaults.scale.grid.color = tailwindConfig().theme.colors.slate[100];
// @ts-ignore
Chart.defaults.plugins.tooltip.titleColor = tailwindConfig().theme.colors.slate[800];
// @ts-ignore
Chart.defaults.plugins.tooltip.bodyColor = tailwindConfig().theme.colors.slate[800];
// @ts-ignore
Chart.defaults.plugins.tooltip.backgroundColor = tailwindConfig().theme.colors.white;
Chart.defaults.plugins.tooltip.borderWidth = 1;
// @ts-ignore
Chart.defaults.plugins.tooltip.borderColor = tailwindConfig().theme.colors.slate[200];
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = 'nearest';
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
Chart.defaults.plugins.tooltip.padding = 8;

// Register Chart.js plugin to add a bg option for chart area
Chart.register({
  id: 'chartAreaPlugin',
  // eslint-disable-next-line object-shorthand
  beforeDraw: (chart) => {
    // @ts-ignore
    if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
      const ctx = chart.canvas.getContext('2d');
      const { chartArea } = chart;
      // @ts-ignore
      ctx.save();
      // @ts-ignore
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      // eslint-disable-next-line max-len
      // @ts-ignore
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      // @ts-ignore
      ctx.restore();
    }
  },
});