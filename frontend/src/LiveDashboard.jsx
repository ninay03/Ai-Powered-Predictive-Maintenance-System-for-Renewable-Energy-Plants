import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  AreaChart, Area, BarChart, Bar, ResponsiveContainer,
} from "recharts";

const socket = io("http://localhost:3000"); 

const LiveDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("data_stream", (newData) => {
      setData((prevData) => [...prevData.slice(-50), newData.data]); 
    });

    return () => socket.off("data_stream");
  }, []);


  const formatXAxis = (tick, index) => {
    if (index % 5 === 0) return new Date(tick).toLocaleTimeString(); 
    return "";
  };

  return (
    <div className="dashboard">
      <h1>🌞 Live Renewable Energy Dashboard</h1>

      <div className="chart">
        <h3>⚡ Power Output Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="Timestamp" tickFormatter={formatXAxis} />
            <YAxis 
  label={{ value: "kW", angle: -90, position: "insideLeft" }} 
  domain={[0, 500]} 
/>
            <Tooltip />
            <CartesianGrid strokeDasharray="3 5" />
            <Legend />
            <Line type="monotone" dataKey="Power_Output_kW" stroke="#ff7300" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

  
      <div className="chart">
        <h3>🌡️ Temperature & ☀️ Solar Irradiance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey="Timestamp" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <Area type="monotone" dataKey="Temperature_C" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Solar_Irradiance_Wm2" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>


      <div className="chart">
        <h3>💨 Wind Speed & 🌫️ Dust Level</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="Timestamp" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Wind_Speed_mps" fill="#FFBB28" />
            <Bar dataKey="Dust_Level_gm2" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LiveDashboard;
