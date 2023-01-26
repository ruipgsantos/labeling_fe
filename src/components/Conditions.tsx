import { useEffect, useState, useCallback } from "react";
import { Select } from "@mui/material";
import axios from "axios";
import { Condition } from "../models";

type ConditionsProps = {
  setSelectedCondition: (x: string) => void
}


export default function Conditions({ setSelectedCondition }: ConditionsProps) {

  const [conditionsList, setConditionsList] = useState<Condition[]>([]);

  const getData = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL ?? ""}/condition`);
      if (res.status === 200) {
        setConditionsList(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return <Select onChange={(e) => {
    setSelectedCondition(e.target.value as string);
  }} sx={{ width: 1, flexShrink: 1 }} multiple native>
    {conditionsList.map((condition: Condition, index) => {
      return <option key={index} value={condition._id}>
        {`${condition.icd10} ${condition.description}`}
      </option>
    })}
  </Select>;
}
