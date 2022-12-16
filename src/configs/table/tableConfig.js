function getColumnDef() {
    const columnDef = [
        {
            headerName: "Coin",
            field: "coin",
            cellRenderer: "coinCellRenderer",
            resizable: true,
            flex: 1,
            minWidth: 275,
            sortable: false,
        },
        {
            headerName: "Price",
            field: "price",
            cellRenderer: "priceCellRenderer",
            resizable: true,
            flex: 1,
            minWidth: 275,
            sortable: true,
        },
        {
            headerName: "Price 24h",
            field: "change",
            cellRenderer: "priceChangeCellRenderer",
            resizable: true,
            flex: 1,
            minWidth: 275,
            sortable: true,
        },
        {
            headerName: "Market Cap",
            field: "marketcap",
            cellRenderer: "marketCapCellRenderer",
            resizable: true,
            flex: 1,
            minWidth: 275,
            sortable: true,
        },
        {
            headerName: "Volume",
            field: "volume",
            cellRenderer: "volumeCellRenderer",
            resizable: true,
            flex: 1,
            minWidth: 275,
            sortable: true,
        },
        {
            headerName: "Volume 24h",
            field: "volume_change",
            cellRenderer: "volumeChangeCellRenderer",
            resizable: true,
            flex: 1,
            minWidth: 275,
            sortable: true,
        },
    ];

    return columnDef;
}

// function dataOrganizer(data) {
//     let result = [];
//     data.forEach(el => {
//         el.price = el.price.toFixed(2);
//         el.price_change = el.price_change.toFixed(2);
//         el.market_cap = el.market_cap.toFixed(2);
//         el.volume = el.volume.toFixed(2);
//         el.volume_change = el.volume_change.toFixed(2);
//     });
// }

export default { getColumnDef };