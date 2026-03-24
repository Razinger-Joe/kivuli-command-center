import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", attacks: 2 },
  { time: "04:00", attacks: 1 },
  { time: "08:00", attacks: 5 },
  { time: "12:00", attacks: 8 },
  { time: "16:00", attacks: 12 },
  { time: "20:00", attacks: 7 },
  { time: "23:59", attacks: 4 },
];

export const AttackChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="time" 
          stroke="rgba(255,255,255,0.5)" 
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.9)', 
            border: '1px solid #00ff9d',
            borderRadius: '8px',
            color: '#fff'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="attacks" 
          stroke="#00ff9d" 
          strokeWidth={2}
          dot={{ fill: '#00ff9d', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
