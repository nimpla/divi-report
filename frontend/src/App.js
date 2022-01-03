import React, { useEffect, useState } from 'react';
import { ComposedChart, BarChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Bar } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';
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

    if (!data) return <></>;
    return (
        <Container className="pt-3 pb-3">

            {/* <Row>
                <Col>
                    <div className="box">
                        <h2>faelle_covid_aktuell</h2>
                        <p>{Number(data[data.length-2]?.faelle_covid_aktuell).toLocaleString('de-DE')}</p>
                    </div>
                </Col>
                <Col>
                    <div className="box">
                        <h2>betten_belegt</h2>
                        <p>{Number(data[data.length-2]?.betten_belegt).toLocaleString('de-DE')}</p>
                    </div>
                </Col>
            </Row> */}

            {/* <div class="flex items-center justify-center w-screen h-screen text-black bg-gray-100">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="w-48 bg-white shadow-2xl p-6 rounded-2xl">
                        <div class="flex items-center">
                            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100">
                                <svg class="w-4 h-4 stroke-current text-pink-600"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <span class="ml-2 text-sm font-medium text-gray-500">Followers</span>
                        </div>
                        <span class="block text-4xl font-semibold mt-4">1,320</span>
                        <div class="flex text-xs mt-3 font-medium">
                            <span class="text-green-500">+8%</span>
                            <span class="ml-1 text-gray-500">last 14 days</span>
                        </div>
                    </div>
                    <div class="w-48 bg-white shadow-2xl p-6 rounded-2xl">
                        <div class="flex items-center">
                            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
                                <svg class="w-4 h-4 stroke-current text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </span>
                            <span class="ml-2 text-sm font-medium text-gray-500">Likes</span>
                        </div>
                        <span class="block text-4xl font-semibold mt-4">3,814</span>
                        <div class="flex text-xs mt-3 font-medium">
                            <span class="text-green-500">+12%</span>
                            <span class="ml-1 text-gray-500">last 14 days</span>
                        </div>
                    </div>
                    <div class="w-48 bg-white shadow-2xl p-6 rounded-2xl">
                        <div class="flex items-center">
                            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100">
                                <svg class="w-4 h-4 stroke-current text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </span>
                            <span class="ml-2 text-sm font-medium text-gray-500">Comments</span>
                        </div>
                        <span class="block text-4xl font-semibold mt-4">264</span>
                        <div class="flex text-xs mt-3 font-medium">
                            <span class="text-red-500">-2%</span>
                            <span class="ml-1 text-gray-500">last 14 days</span>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="box mt-3">
                <h2>Aktuelle Fälle</h2>
                <ResponsiveContainer height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="faelle_covid_aktuell" name="Fälle (Gesamt)" stackId="1" fill="#2379D0" />
                        <Bar dataKey="faelle_covid_aktuell_invasiv_beatmet" name="Fälle (invasiv beatmet)" stackId="1" fill="#6361D5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="box mt-3">
                <h2>Bettenbelegung</h2>
                <ResponsiveContainer height={400}>
                    <ComposedChart data={data}>
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
