function TopFavsChartOptions(coinNames, darkMode) {
    return {
        chart: {
            height: 350,
            type: "bar",
        },
        title: {
            text: "Top Favourites",
            align: "left",
            style: {
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "Lato, sans-serif",
                color: darkMode ? "#EEEEEE" : "#22233C",
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "40%",
                distributed: true,
                borderRadius: 5,
            },
        },
        colors: ["#7920ff"],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        labels: coinNames,
        xaxis: {
            labels: {
                style: {
                    fontSize: 12,
                    color: "#FFFFFF",
                },
            },
        },
        yaxis: {
            show: false,
        },
    };
}

export default { TopFavsChartOptions };