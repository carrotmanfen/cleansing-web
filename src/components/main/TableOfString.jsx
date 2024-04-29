import React from "react";

export const TableDataOfString = ({ data }) => {
  //   console.log(data);
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

  const uniqueCount = new Set(data).size;
  //   console.log(count);
  //   console.log(nonUniqueCount);
  return (
    <div className="w-full text-[16px]">
      <p className="w-full text-center">
        จำนวนข้อมูลที่มีข้อมูลซ้ำในแถวอื่น : {nonUniqueCount} ข้อมูล
      </p>
      <p className="w-full text-center">
        จำนวนข้อมูลเฉพาะทั้งหมด : {uniqueCount} แถว
      </p>
      <div className="px-10 overflow-auto max-h-[500px]">
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="w-10/12 px-4 py-2">Value</th>
              <th className="w-2/12 px-4 py-2 text-center">จำนวน<br/>ข้อมูลซ้ำ</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(count)
              .sort((a, b) => a[1] - b[1])
              .map(([key, value], index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {key}
                  </td>
                  <td className="border px-4 py-2 text-center">{value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
