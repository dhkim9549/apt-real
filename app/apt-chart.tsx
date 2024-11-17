import { useState, useEffect, useRef } from 'react';
import bb, { scatter } from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

export default function AptChart({setChartRef}) {

  let [sH, setSH] = useState(999);

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
            text: "억원",
            position: ""
          },
          min: 0,
          padding: {
            top: 30,
            bottom: 0
          }
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
        width: Math.min(700, Math.min(window.screenWidth, window.innerWidth) - 50),
        height: 450 
      },
      padding: {
        left: 50,
        right: 10
      },
      bindto: "#chart2"
    });

    chartRef.current = chart2;
    setChartRef(chart2);

    setSH(window.innerHeight);

    window.addEventListener('resize', function(event) {
      setSH(window.innerHeight);
      chartRef.current.resize({
        width: Math.min(700, Math.min(window.screen.width, window.innerWidth) - 50),
        height: Math.min(window.innerHeight * 0.93, 450)
      });
    }, true);

  }, []);

  return (
    <div>
    {sH <= 400 ?
      <div className="flex flex-col items-center bg-white fixed z-50 top-0 left-0 w-screen h-screen">
        <div id="chart2"></div>
      </div>
    :
      <div className="pt-20 px-5 flex flex-col bg-white">
        <div id="chart2"></div>
      </div>
    }
    </div>
  )
}
