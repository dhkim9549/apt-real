'use client'

import { useState, useRef } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { NumericFormat } from 'react-number-format';

import ProdPanel from './prod-panel';
import AptChart from './apt-chart';
import { getAptTrd } from './get-data';

import Footer from './footer.tsx'

export default function AptReal() {

  let [aptNm, setAptNm] = useState();
  let [queryObj, setQueryObj] = useState();

  let aptListRef = useRef([]);
  let chartRef = useRef();

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
      let chartData = {
        xs: {},
        columns: []
      };
      chartData.xs[apt.aptNm + apt.area] = apt.aptNm + apt.area + '_x';
      let xArr = [apt.aptNm + apt.area + '_x'];
      let yArr = [apt.aptNm + apt.area];
      apt.trd.forEach((trd) => {
        xArr.push(trd.ctrtDy.substring(0, 4) + '-' + trd.ctrtDy.substring(4, 6) + '-' + trd.ctrtDy.substring(6, 8));
        yArr.push(trd.prc);
      });
      chartData.columns.push(xArr);
      chartData.columns.push(yArr);
      chartRef.current.load(chartData);
    });
  }

  function setChartRef(chart) {
    chartRef.current = chart;
  }

  function clearAptList() {
    aptListRef.current = [];
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center bg-white">
      <div className="flex flex-col items-center w-full lg:w-[340px] pb-8 lg:h-screen bg-slate-100">
        <div className="bg-slate-100 lg:fixed mt-8 lg:mt-0 lg:top-8 z-10">
          <div className="m-4 p-4 flex flex-row justify-center items-center">
	    <ApartmentIcon />
            <blockquote className="ml-2 text-2xl font-bold italic text-slate-900">
              APT-REAL
            </blockquote>
          </div>
          <Paper className="p-2 w-80 flex flex-row justify-center gap-2">
            <TextField
              id="aptNm" label="aptNm" variant="filled" size="small"
              className=""
              inputProps={{min: 0, maxLength:20 }}
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
        <div className="w-full max-h-96 lg:mt-[200px] overflow-y-auto">
         {queryObj && <ProdPanel queryObj={queryObj} addAptList={addAptList} />}
        </div>
      </div>
      <div className="w-full lg:w-[750px] bg-white">
        <AptChart setChartRef={setChartRef} clearAptList={clearAptList} />
	<Footer />
      </div>
    </div>
  )
}
