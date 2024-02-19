import React from "react";

export const TableDataOfString = ({ data }) => {
  console.log(data);
  let count = {};

  data.forEach((value) => {
    if (value in count) {
      count[value]++;
    } else {
      count[value] = 1;
    }
  });

  let nonUniqueCount = 0;
  for (let value in count) {
    if (count[value] > 1) {
      nonUniqueCount++;
    }
  }

  console.log(count);
  console.log(nonUniqueCount);
  return (
    <div>
      <p>จำนวนข้อมูลซ้ำทั้งหมด : {nonUniqueCount} แถว</p>
    </div>
  );
};
