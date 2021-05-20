import { MDCDrawer } from "@material/drawer";
const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

import { MDCTopAppBar } from "@material/top-app-bar";
const topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
topAppBar.setScrollTarget(document.getElementById("main-content"));
topAppBar.listen("MDCTopAppBar:nav", () => {
  drawer.open = !drawer.open;
});

$.get('./data.json', function(data) {
  chart(data)
})

function chart(data) {
  const gctx = $("#graphChart")[0].getContext('2d');
  const graphChart = new Chart(gctx, {
    type: 'line',
    data: {
        labels: data.graphChartLabels,
        datasets: [
          {
            label: 'Revenue',
            data: data.graphChartDataRevenue,
            backgroundColor: '#A1F073',
            borderColor: '#A1F073',
            borderWidth: 1,
            fill: true,
            tension: 0.4,
            pointStyle: 'cross'
        }, {
          label: 'Order',
          data: data.graphChartDataOrder,
          backgroundColor: '#F6A258',
          borderColor: '#F6A258',
          borderWidth: 1,
          fill: true,
          tension: 0.4,
          pointStyle: 'cross'
        }, {
          label: 'Tax',
          data: data.graphChartDataTax,
          backgroundColor: '#3CF3DA',
          borderColor: '#3CF3DA',
          borderWidth: 1,
          fill: true,
          tension: 0.4,
          pointStyle: 'cross'
        }, {
          label: 'Shipment',
          data: data.graphChartDataShipment,
          backgroundColor: '#3C44E3',
          borderColor: '#3C44E3',
          borderWidth: 1,
          fill: true,
          tension: 0.4,
          pointStyle: 'cross'
        },
      ]
    },
    options: {
      scales: {
        y: {
          stacked: true,
          beginAtZero: true
        }
      }
    }
  });

  const nctx = $("#newVisitorsChart")[0].getContext('2d');
  const newVisitorsChart = new Chart(nctx, {
    type: 'line',
    data: {
      labels: data.newVisitorsChartLabels,
      datasets: [
        {
          label: 'Old Visitors',
          data: data.newVisitorsChartDataOld,
          backgroundColor: '#FFB22B',
          borderColor: '#FFB22B',
          borderWidth: 1,
        }, {
          label: 'New Visitors',
          data: data.newVisitorsChartDataNew,
          backgroundColor: '#58F6F1',
          borderColor: '#58F6F1',
          borderWidth: 1,
        },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      }
    }
  });

  const mctx = $("#marketingCampaignChart")[0].getContext('2d');
  const marketingCampaignChart = new Chart(mctx, {
    type: 'doughnut',
    data: {
      labels: data.marketingCampaignChartLabels,
      datasets: [
        {
          label: 'Marketing Campaign',
          data: data.marketingCampaignChartData,
          backgroundColor: [
            '#2B8FFF',
            '#FF8F2B',
            '#55F33C',
            '#3CF3DA',
          ],
          hoverOffset: 4
        }
      ]
    },
    options: {}
  });
}