import { formatDate } from './dateFormat.js'

export function createGraph(date, times, temps) {
    const nextDayFormatted = formatDate(date);

    const searchDate = nextDayFormatted.substring(0, 10);

    const start = times.indexOf(searchDate + "T00:00");

    const graphData = [{
        x: times.slice(start, start + 24),
        y: temps.slice(start, start + 24),
        mode: "lines",
        type: "scatter",
        line: { shape: 'spline' },
    }];
    
    const layout = {
        title: {
            text: `Weather on ${date.toDateString()}`,
            font: {
                family: 'Segoe UI',
                size: 18,
                color: '#afafaf',
            }
        },
        xaxis: {
            title: {
                text: 'Time',
                font: {
                    family: 'Segoe UI',
                    size: 18,
                    color: '#afafaf',
                },
            },
            tickfont: {
                color: '#afafaf',
            }
        }, 
        yaxis: {
            title: {
                text: 'Temperature in Degrees',
                font: {
                    family: 'Segoe UI',
                    size: 18,
                    color: '#afafaf',
                },
            },
            tickfont: {
                color: '#afafaf',
            }
        },
        plot_bgcolor: '#0c2143',
        paper_bgcolor: '#0c2143',
        border_radius: '20px',

    }

    Plotly.newPlot("weather-plot", graphData, layout);
}
