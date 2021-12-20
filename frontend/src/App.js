import React, { useEffect, useState } from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar, Line } from 'recharts';
import papa from 'papaparse';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const url = 'https://raw.githubusercontent.com/nimpla/divi-report/master/date_grouped.csv';
        const response = await fetch(url);
        const data = await response.text();

        const dateDiff = new Date();
        dateDiff.setDate(dateDiff.getDate() - 90);

        papa.parse(data, {
            header: true,
            worker: true,
            complete: result => {
                setData(result.data.filter(e => new Date(e.date) >= dateDiff));
            }
        });
    }, [])

    return (
        <div style={{ width: '100%', height: 500 }}>
           <ResponsiveContainer>
                <ComposedChart data={data}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="betten_belegt" stackId="1" stroke="red" fill="red" />
                    <Area type="monotone" dataKey="betten_frei" stackId="1" stroke="green" fill="green" />
                    <Bar dataKey="faelle_covid_aktuell" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="faelle_covid_aktuell_invasiv_beatmet" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default App;
