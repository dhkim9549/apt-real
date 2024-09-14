import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function ProdItem({prodObj, addAptList}) {

  return(
    <Paper className="w-full lg:w-72 bg-white p-4 flex flex-col">
      <div className="text-black text-xl mb-1">{prodObj.aptNm}</div>
      <div className="text-slate-800">{prodObj.sggu}</div>
      <div className="text-slate-800 text-sm">{prodObj.cnstYr}년 준공</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {prodObj.areas &&
          prodObj.areas.map(x =>
            <AreaItem key={x} area={x} sggu={prodObj.sggu} aptNm={prodObj.aptNm} addAptList={addAptList} />
          )
        }
      </div>
    </Paper>
  )
}

function AreaItem({area, sggu, aptNm, addAptList}) {

  return(
    <Button variant="contained" className="min-w-10 h-8 px-1 py-3 bg-amber-300 text-slate-600 text-sm font-bold" onClick={() => {
      addAptList({sggu, aptNm, area});
    }}>
      {area}
    </Button>
  )
}
