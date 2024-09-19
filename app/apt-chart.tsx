import { useEffect, useRef } from 'react';
import bb, { scatter } from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

export default function AptChart({setChartRef}) {

  let chartRef = useRef();

  useEffect(() => {

    let valuesArr = [];
    for(let y = 2007; y < 2025; y++) {
      valuesArr.push(y + '-01-01');
    }

    var chart2 = bb.generate({
      data: {
        xs: [],
        columns: [],
        type: scatter(), // for ESM specify as: line()
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
	    values: valuesArr
          },
        },
        y: {
          label: {
            text: "만원",
            position: ""
          },
	  min: 0,
	  padding: 0
        }
      },
      grid: {
        x: {
          show: false
        },
        y: {
          show: true
        }
      },
      size: {
        width: Math.min(700, window.innerWidth - 50),
        height: 400 
      },
      padding: {
        left: 50
      },
      bindto: "#chart2"
    });

    chartRef.current = chart2;
    setChartRef(chart2);

  }, []);

  return (
    <div className="pt-20 pl-5 flex flex-col bg-white">
      <div id="chart2"></div>
    </div>
  )
}
