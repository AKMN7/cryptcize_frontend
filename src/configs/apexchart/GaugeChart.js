function GuageChartOptions(darkMode, text = null) {
    return {
        chart: {
            type: "radialBar",
            offsetY: -30,
            sparkline: {
                enabled: true
            },
            background: "transparent",
            fontFamily: "Lato, sans-serif",
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '85%',
                    margin: 1,
                },
                dataLabels: {
                    name: {
                        show: true,
                    },
                    value: {
                        offsetY: 20,
                        fontSize: '28px',
                        fontWeight: 700,
                        color: darkMode ? "#EEEEEE" : "#22233C",
                        formatter: function (val) {
                            if (val == Infinity) return "Infinity";
                            if (isNaN(val)) return "Unkown";
                            return val + "%";
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10,
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 0.9,
                opacityTo: 1,
                stops: [0, 50, 73, 91]
            },
        },
        labels: [text != null ? text : '---'],
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

export default { GuageChartOptions };