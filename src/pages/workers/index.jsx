import { WorkerTable } from "@ui";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import WorkerModal from "../../components/modal/worker"

import workers from "../../service/workers";

const index = () => {
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await workers.get();
      setData(response?.data?.user);
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <WorkerModal/>
      </div>
      <WorkerTable data={data} />
    </div>
  );
};

export default index;
