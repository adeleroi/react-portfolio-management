var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
  export const data = (dataX, dataY, companyName) => ({
      labels: dataX,
      datasets: [
        {
          label: `${companyName}`,
          borderColor: chartColors.blue,
          backgroundColor: "rgb(255, 99, 132)",
          lineTension: 0,
          fill: false,
          borderWidth: 1,
          data: dataY,
          pointStyle: 'none',
        }

      ]
    });
  export const options =  {
      layout:{
        padding:{
          left: 0,
          right: 0,
          bottom: 20,
          top: 30
        }
      },
      elements:{
        point:{
          radius: 0
        }
      },
      plugins:{
        streaming: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            dispdlay: false,
            drawBorder: true,
          },
          type: 'time',
          distribution: "linear",
          offset: true,
          time:{
            unit:'day'
          },
          display: true,
          scaleLabel: {
              display: true,
              labelString: "Period"
          }
      }],
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: true,
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Close price'
          },
          ticks:{
          }
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
      legend: {
          labels: {
              font: {
                  // color: "red",
                  size: 16,
              }
          }
      }
    };
