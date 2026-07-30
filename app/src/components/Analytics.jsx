import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function Analytics({ history }) {
    const { language } = useContext(LanguageContext);

const text = translations[language];

    const healthyCount = history.filter(item =>
        item.disease.toLowerCase().includes("healthy")
    ).length;

    const diseasedCount = history.length - healthyCount;

    const data = [
    {
        name: text.healthyLabel,
        value: healthyCount
    },
    {
        name: text.diseasedLabel,
        value: diseasedCount
    }
];

    const COLORS = ["#2e7d32", "#d32f2f"];
    const diseaseStats = {};

history.forEach(item => {

    diseaseStats[item.disease] =
        (diseaseStats[item.disease] || 0) + 1;

});

const diseaseChartData = Object.entries(diseaseStats).map(
    ([name, value]) => ({
        name,
        value
    })
);

    return (

        <div className="analytics-card">

            <h2>📈 {text.predictionAnalytics}</h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>
            <h2 style={{ marginTop: "40px" }}>
    📊 {text.mostDetectedDiseases}
</h2>

<ResponsiveContainer
    width="100%"
    height={350}
>

    <BarChart data={diseaseChartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
            dataKey="name"
            angle={-15}
            textAnchor="end"
            interval={0}
        />

        <YAxis />

        <Tooltip />

        <Bar
            dataKey="value"
            fill="#2e7d32"
        />

    </BarChart>

</ResponsiveContainer>

        </div>

    );

}

export default Analytics;