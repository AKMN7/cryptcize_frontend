function MarketCapChartOptions(lableTitles, darkMode) {
    return {
        chart: {
            type: "area",
            background: "transparent"
        },
        title: {
            text: "Bitcoin Market Cap",
            align: "left",
            style: {
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "Lato, sans-serif",
                color: darkMode ? "#EEEEEE" : "#22233C",
            },
        },
        xaxis: {
            type: "category",
            categories: lableTitles,
            labels: {
                style: {
                    fontSize: "12px",
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 400,
                    color: darkMode ? "#22233C" : "#EEEEEE",
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            tickAmount: 4,
            labels: {
                style: {
                    fontSize: "12px",
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 700,
                    color: darkMode ? "#22233C" : "#EEEEEE",
                },
                formatter: function (val) {
                    if (Math.abs(Number(val)) >= 1.0e12)
                        return (Math.abs(Number(val)) / 1.0e12).toFixed(2) + "T";
                    if (Math.abs(Number(val)) >= 1.0e9)
                        return (Math.abs(Number(val)) / 1.0e9).toFixed(2) + "B";
                    if (Math.abs(Number(val)) >= 1.0e6)
                        return (Math.abs(Number(val)) / 1.0e6).toFixed(2) + "M";
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        grid: {
            padding: {
                left: 15,
            },
        },
        colors: ['#7920FF'],
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.7,
                opacityTo: 0.275,
            }
        },
        theme: {
            mode: darkMode ? "dark" : "light",
            monochrome: {
                enabled: true,
                color: "#7920FF",
                shadeTo: "light",
                shadeIntensity: 0.1,
            },
        },
    };
}

export default { MarketCapChartOptions };