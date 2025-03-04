"use client";

import { useEffect, useState } from "react";

export function useStatistics(dataPointCount) {
  const [value, setValue] = useState([]);
  useEffect(() => {
    const unsub = window.electron.suscribeStatistics((data) =>
      setValue((prev) => {
        const newData = [...prev, data];
        if (newData.length > dataPointCount) {
          newData.shift();
        }
        return newData;
      })
    );
    return unsub;
  }, [dataPointCount]);
  return value;
}
