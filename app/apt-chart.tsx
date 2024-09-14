import { useEffect, useRef } from 'react';
// import billboard.js
import bb, { scatter } from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AptChart({setChartRef, clearAptList}) {

  let chartRef = useRef();

  useEffect(() => {

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
    <div className="my-20 ml-5 flex flex-col">
      <div id="chart2"></div>
      <div className="px-10">
        <IconButton aria-label="delete" size="large"
          disabled={chartRef.current?.data.length > 0 ? false : true}
          onClick={() => {
            chartRef.current.unload();
            clearAptList();
	  }}
	>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  )
}
