import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from "recharts";

const data = [
  { name: "Quater 1", value: 400 },
  { name: "Quater 2", value: 300 },
  { name: "Quater 3", value: 300 },
  { name: "Quater 4", value: 200 },
];
const COLORS = ["#FF735B", "#FF9F5B", "#6629EB", "#34D1B1"];

export const PieChartComponent = ({ title }: any) => {
  // static demoUrl =
  //   "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

  return (
    <ResponsiveContainer width="100%" height={230}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            value={"3986"}
            position="center"
            fill="#414D55"
            fontSize={30}
            fontWeight={700}
            fontFamily="poppins"
            dy={-10}
          />
          <Label
            value={title}
            // value={"Total User Registered"}
            position="center"
            fill="#333"
            fontSize={14}
            fontWeight={700}
            dy={20}
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
