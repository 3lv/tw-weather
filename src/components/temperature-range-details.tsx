import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TemperatureRangeDetailsProps {
  hourlyForecasts: {
    dateTime: Date;
    temp: string;
  }[];
  tempUnit: string;
}

export function TemperatureRangeDetails({ hourlyForecasts, tempUnit }: TemperatureRangeDetailsProps) {
  const currentDate = new Date().toDateString();
  const todayForecasts = hourlyForecasts.filter(forecast => forecast.dateTime.toDateString() === currentDate);

  const chartData = todayForecasts.map(forecast => ({
    time: forecast.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: parseFloat(forecast.temp)
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Today's Temperature Range</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Temperature ({tempUnit})</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todayForecasts.map((forecast, index) => (
            <TableRow key={index}>
              <TableCell>{forecast.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
              <TableCell>{forecast.temp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
