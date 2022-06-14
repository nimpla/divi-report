import React, { useEffect, useState } from 'react';
import { ComposedChart, BarChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Bar } from 'recharts';
import Container from 'react-bootstrap/Container';
import papa from 'papaparse';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
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
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <h4 className="title">{label}</h4>
                    {payload.map(e => (
                        <p className="label">{`${e.name} : ${e.value}`}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <Container className="pt-5 pb-5">
            <div className="box">
                <h2>Aktuelle Fälle</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ bottom: 50 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="faelle_covid_aktuell" name="Fälle (Gesamt)" stackId="1" fill="#2379D0" />
                        <Bar dataKey="faelle_covid_aktuell_invasiv_beatmet" name="Fälle (invasiv beatmet)" stackId="1" fill="#6361D5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="box mt-5">
                <h2>Bettenbelegung</h2>
                <ResponsiveContainer>
                    <ComposedChart data={data} margin={{ bottom: 50 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="betten_belegt" name="Betten (belegt)" stackId="1" stroke="#E24C4C" fill="#E24C4C" />
                        <Area type="monotone" dataKey="betten_frei" name="Betten (frei)" stackId="1" stroke="#479E58" fill="#479E58" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Container>
    );
}

export default App;
