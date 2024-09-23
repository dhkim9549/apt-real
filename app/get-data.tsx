'use server'

export async function getAptInfo(queryObj) {

  console.log("getAptInfo() start...");
  console.log("queryObj = " + JSON.stringify(queryObj));

  const API_URL = process.env.API_SERVER_URL;

  let res = await fetch(API_URL + "/api/get-apt-info?"
    + "&aptNm=" + queryObj.aptNm,
    { next: { revalidate: 600 } }
  );

  let resJson = await res.json();

  console.log("resJson = " + JSON.stringify(resJson));

  console.log("getAptInfo() end...");
 
  return resJson;
}

export async function getAptTrd(queryObj) {

  console.log("getAptTrd() start...");
  console.log("queryObj = " + JSON.stringify(queryObj));

  const API_URL = process.env.API_SERVER_URL;

  let res = await fetch(API_URL + "/api/get-apt-trd?"
    + "&sggu=" + queryObj.sggu
    + "&aptNm=" + queryObj.aptNm
    + "&area=" + queryObj.area,
    { next: { revalidate: 600 } }
  );

  let resJson = await res.json();

  console.log("resJson = " + JSON.stringify(resJson));

  console.log("getAptTrd() end...");
 
  return resJson;
}
