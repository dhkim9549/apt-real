'use client'

import { useState, useRef } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ApartmentIcon from '@mui/icons-material/Apartment';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import CachedIcon from '@mui/icons-material/Cached';

import ProdPanel from './prod-panel';
import AptChart from './apt-chart';
import { getAptTrd } from './get-data';

import Footer from './footer.tsx'

export default function AptReal() {

  let [aptNm, setAptNm] = useState();
  let [queryObj, setQueryObj] = useState();
  let [dataLen, setDataLen] = useState(0);

  let aptListRef = useRef([]);
  let chartRef = useRef();
  let chartNodeRef = useRef();

  let minXRef = useRef('00010101');
  let [minX, setMinX] = useState('00010101');

  function setQuery() {
    setQueryObj({aptNm});
  }

  function addAptList(x) {

    let hasApt = false;
    aptListRef.current.forEach((e) => {
      if(e.sggu == x.sggu && e.aptNm == x.aptNm && e.area == x.area) {
	hasApt = true;
      }
    });
    if(hasApt) {
      return;
    }

    getAptTrd(x).then((trd) => {
      x.trd = trd;
      aptListRef.current.push(x);
      return x;
    })
    .then((apt) => {
      loadAptChart(apt);
    });
  }

  function setChartRef(chart) {
    chartRef.current = chart;
  }

  function clearAptList() {
    aptListRef.current = [];
    setDataLen(chartRef.current.data().length);
  }

  function loadAptChart(apt) {
    let chartData = {
      xs: {},
      columns: [],
      resizeAfter: true
    };
    chartData.xs[apt.aptNm + ' ' + apt.area] = apt.aptNm + ' ' + apt.area + '_x';
    let xArr = [apt.aptNm + ' ' + apt.area + '_x'];
    let yArr = [apt.aptNm + ' ' + apt.area];
    apt.trd.forEach((trd) => {
      if(trd.ctrtDy >= minXRef.current) {
        xArr.push(trd.ctrtDy.substring(0, 4) + '-' + trd.ctrtDy.substring(4, 6) + '-' + trd.ctrtDy.substring(6, 8));
        yArr.push(trd.prc / 10000);
      }
    });
    chartData.columns.push(xArr);
    chartData.columns.push(yArr);
    chartRef.current.load(chartData);
    setDataLen(chartRef.current.data().length);
    chartNodeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
   }

  function reloadChart() {
    chartRef.current.unload();
    aptListRef.current.forEach((apt) => {
      loadAptChart(apt);
    });
 }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center bg-white">
      <div className="flex flex-col items-center w-full lg:w-[340px] pb-8 lg:h-screen bg-slate-100">
        <div className="bg-slate-100 lg:fixed mt-8 lg:mt-0 lg:top-8 z-10">
	  <div className="m-4 p-4 flex flex-col items-center">
            <div className="flex flex-row justify-center items-center">
	      <ApartmentIcon />
              <blockquote className="ml-2 text-2xl font-bold italic text-slate-900">
                APT-REAL
              </blockquote>
            </div>
	    <div>
	      아파트 실거래가 비교
	    </div>
	  </div>
	  <div className="w-screen px-4 lg:w-80 lg:px-0">
            <Paper className="p-2 w-full flex flex-row justify-center gap-2">
              <TextField
                id="aptNm" label="주택명 또는 지역명" variant="filled" size="small"
                className="w-full"
                inputProps={{min: 1, maxLength:20 }}
                onChange={(e) => {
                  setAptNm(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setQuery();
                }}}
              />
              <div className="flex flex-col justify-center">
                <Button variant="contained" size="large" className="w-20" onClick={setQuery}>조회</Button>
              </div>
            </Paper>
	  </div>
        </div>
        <div className="w-full lg:mt-[200px] max-h-96 lg:max-h-full overflow-y-auto">
         {queryObj && <ProdPanel queryObj={queryObj} addAptList={addAptList} />}
        </div>
      </div>
      <div ref={chartNodeRef} className="w-full lg:w-[750px] bg-slate-100">
        <AptChart setChartRef={setChartRef} />
        <div className="px-10 pb-7 bg-white">
          <IconButton aria-label="delete" size="large"
            disabled={dataLen > 0 ? false : true}
            onClick={() => {
              chartRef.current.unload();
              clearAptList();
              minXRef.current = '00010101';
              setMinX('00010101');
            }}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="delete" size="large"
            disabled={(dataLen > 0 && minX != '20230101') ? false : true}
             onClick={() => {
              minXRef.current = '20230101';
              setMinX('20230101');
              reloadChart();
            }}
          >
            <LooksOneIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="delete" size="large"
            disabled={(dataLen > 0 && minX != '00010101') ? false : true}
             onClick={() => {
              minXRef.current = '00010101';
              setMinX('00010101');
              reloadChart();
            }}
          >
            <CachedIcon fontSize="large" />
          </IconButton>
        </div>
	<Footer />
      </div>
    </div>
  )
}
