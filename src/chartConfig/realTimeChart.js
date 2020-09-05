
const getData = (volatility, old_price) => {
    const random = Math.random();
    let change_percent = 2 * volatility * random;
    if(change_percent > volatility){
        change_percent -= (2 * volatility);
    }
    const change_amount = old_price * change_percent;
    const new_price = old_price + change_amount;
    return new_price;
}
var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};
export const data = (label) => ({
    datasets: [
      {
        label,
        borderColor: chartColors.blue,
        backgroundColor: "rgb(255, 99, 132)",
        lineTension: 0,
        fill: false,
        // borderDash: [8, 4],
        borderWidth: 4,
        data: []
      }

    ]
  });
export const options = (basePrice) => ({
    scales: {
      xAxes: [
        {
          type: "realtime",
          time:{
            // unit: "second"
          },
          realtime: {
            duration: 5300, //5300
            refresh: 200,
            delay: 200,
            onRefresh: function(chart) {
              chart.config.data.datasets.forEach((dataset) => dataset.data.push({
                x: Date.now(),
                y: getData(0.01, basePrice)
              }));
            },
          }
        }
      ],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Real Time Value'
        },
        // ticks: {
        //   min: -150,
        //   max: 150
        // }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        clip: true,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: function(value) {
          return value.y;
        }
      }
    }
  });
