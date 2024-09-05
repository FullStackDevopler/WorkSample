import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    pv: 20,
    earned: 60,
  },
  {
    name: "Feb",
    pv: 30,
    earned: 13,
  },
  {
    name: "Mar",
    pv: 20,
    earned: 78,
  },
  {
    name: "Apr",
    pv: 27,
    earned: 39,
  },
  {
    name: "May",
    pv: 18,
    earned: 48,
  },
  {
    name: "Jun",
    pv: 23,
    earned: 38,
  },
  {
    name: "Jul",
    pv: 14,
    earned: 13,
  },
  {
    name: "Aug",
    pv: 34,
    earned: 43,
  },
  {
    name: "Sep",
    pv: 34,
    earned: 43,
  },
  {
    name: "Oct",
    pv: 34,
    earned: 23,
  },
  {
    name: "Nov",
    pv: 34,
    earned: 33,
  },
  {
    name: "Dec",
    pv: 34,
    earned: 63,
  },
];

const Example = () => {
  return (
    <ResponsiveContainer width="100%" className={"barchart"} height={300}>
      <BarChart width={1200} height={300} data={data}>
        <CartesianGrid strokeDasharray="1 5" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[20, 100]} // Set the range from 0 to 100
          ticks={[20, 40, 60, 80, 100]} // Set the interval ticks
        />
        <Bar
          dataKey="earned"
          stackId="a"
          fill="#F7931E"
          barSize={30}
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="pv"
          stackId="a"
          fill="#F2EFFF"
          barSize={30}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
