import Link from 'next/link'
import Layout from '../Layout'
import useSWR, { Key, Fetcher } from 'swr'
import ReactApexChart from '../chart';
import parseISO from 'date-fns/parseISO'
import getMonth from 'date-fns/getMonth'
import { colorPalette } from '../utils/theme';
import { format } from '../utils/numberFormat';
import { fetcher } from '../utils/fetcher';

interface DashboardProps {
    token: String
}

interface Database {
    id: String;
    icon: {
        type: String,
        emoji?: String
        [key: string]: any
    },
    title: {
        type: String;
        plain_text: String;
        [key: string]: any
    }[],
    properties: {
        Montant: {
            number: {
                format: String
            }
            id: String
            name: String;
            type: String;
        },
        Date: {
            id: String
            name: String
            type: String
        },
        Tags: {
            id: String;
            name: String;
            select: {
                options: {
                    color: String;
                    id: String;
                    name: String
                }[]
            }
            type: String;
        }
    }
}
export default function Dashboard({ token }: DashboardProps) {

    const _options = {
        body: JSON.stringify({
            sorts: [
                {
                    property: "Date",
                    direction: "descending"
                }
            ]
        }),
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }

    }

    const { data, error } = useSWR(['/api/queryDepenses', _options], fetcher)
    const Depenses = useSWR(["api/retrieveDepenses", _options], fetcher)

    if (error || Depenses.error) {
        console.log(error);
        console.log(Depenses.error)
        return <div className="sans" >Failed to load</div>
    }
    if (!data || !Depenses.data) return <Layout title="Loading..."><div className="sans indented">Loading...</div></Layout>

    console.log("Data", data);
    console.log("Depenses", Depenses.data);

    const lowestYear = parseISO(data[0].properties.Date.date.start).getFullYear()
    const highestYear = parseISO(data[data.length - 1].properties.Date.date.start).getFullYear()
    const numberFormat = Depenses.data.properties.Montant.number.format
    const listTags = Depenses.data.properties.Tags.select.options

    let initialYearByMonthSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let initialYearByMonthSumTags = listTags.map(p => {
        let series = []
        for (let i = lowestYear; i <= highestYear; i++) {
            series = [...series, { name: i, data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
        }
        return ({
            name: p.name,
            color: p.color,
            id: p.id,
            series
        })
    })


    for (let i = 0; i < data.length; i++) {
        //------
        //common

        const e = data[i];

        const dateISO = e.properties.Date.date.start

        const cost = e.properties.Montant.number

        const date = parseISO(dateISO)

        const monthIndex = getMonth(date)

        const year = date.getFullYear()

        //------------------
        //cumulated by month

        const sum = initialYearByMonthSum[monthIndex] + cost

        initialYearByMonthSum.splice(monthIndex, 1, sum)

        //----------------
        //by tags by month

        const tag = e.properties.Tags.select.name

        const index = listTags.findIndex((p => p.name === tag))

        let concernChart = initialYearByMonthSumTags[index]

        let [concernSerie] = concernChart.series.filter(p => p.name === year)

        let concernData = concernSerie.data

        const costTags = concernData[monthIndex] + cost

        concernData.splice(monthIndex, 1, costTags)

        concernSerie = { ...concernSerie, data: concernData }

        concernChart.series.splice(concernChart.series.findIndex((p => p.name === year)), 1, concernSerie)

        initialYearByMonthSumTags.splice(index, 1, concernChart)
    }

    console.log(initialYearByMonthSum);
    console.log(initialYearByMonthSumTags);

    const series = [
        {
            name: `Dépenses mensuelles en ${numberFormat}s`,
            data: initialYearByMonthSum
        }
    ]
    const options = {
        xaxis: {
            categories: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre",]
        },
        yaxis: {
            tickAmount: 6,
            floating: false,
            decimalsInFloat: 2
        },
        dataLabels: {
            formatter: function (val: number, opts) {
                const number = new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 4, style: 'currency', currency: format[numberFormat] }).format(val)
                return number
            },
            style: {
                colors: ['black']
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
            },
        },

    }

    return (
        <Layout title="Bilan des dépenses">
            <div className="indented" >
                <h1 className="sans">{Depenses.data.icon.type === "emoji" ? Depenses.data.icon.emoji : ""} {Depenses.data.title[0].plain_text}</h1>
                <small className="sans">Ce graphique montre les dépenses cumulées par mois sur une année</small>
            </div>
            <ReactApexChart type='bar' options={{
                ...options
                , colors: ["#0b6e99", "#6940a5", "#ad1a72"]
            }} series={series} height={400} />
            {
                initialYearByMonthSumTags.map(p => {
                    return (
                        <>
                            <div className="indented" style={{ paddingTop: "1.875rem" }}>
                                <h2 className={`sans select-value-color-${p.color}_0 selected-value`}>{p.name}</h2>
                                <div>
                                    <small className="sans">Dépenses <b>{p.name}</b> par mois sur une année</small>
                                </div>
                            </div>
                            <ReactApexChart key={p.id} type='bar' options={
                                {
                                    ...options,
                                    colors: colorPalette[p.color],
                                }
                            }
                                series={p.series} height={400} />
                        </>
                    )
                })
            }

        </Layout>
    )


}
