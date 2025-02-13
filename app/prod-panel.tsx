import { useEffect, useState } from "react";

import { getAptInfo } from "./get-data";
import ProdItem from "./prod-item";
import Skel from "./skel";

export default function ProdPanel({ queryObj, addAptList }) {
  let [rtnItems, setRtnItems] = useState();

  useEffect(() => {
    setRtnItems();
    getAptInfo(queryObj).then((x) => {
      setRtnItems(x);
    });
  }, [queryObj]);

  return (
    <div>
      {rtnItems && (
        <div className="m-3 p-3">{rtnItems.length} 건이 조회되었습니다.</div>
      )}
      <div className="p-3 flex flex-col gap-3">
        {rtnItems ? (
          rtnItems.map((x) => (
            <ProdItem key={Math.random()} prodObj={x} addAptList={addAptList} />
          ))
        ) : (
          <Skel />
        )}
      </div>
    </div>
  );
}
