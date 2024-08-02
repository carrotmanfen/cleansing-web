//useDownload.jsx
import Papa from 'papaparse';

const useDownload = () => {
    const handleDownload = (data, fileName, selectOption) => {
        if (!data) {
            console.error("No data provided for download.");
            return;
        }

        const config = {
            delimiter: ',',
            header: true,
            newline: '\n'
        };

        // Flatten the nested data
        const flattenedRows = data.data_set.rows.map(row => {
            const flattenedRow = {};
            data.data_set.columns.forEach(column => {
                const dataKey = column.dataKey;
                flattenedRow[dataKey] = row[dataKey];
            });
            return flattenedRow;
        });

        // Use the flattened data with Papa.unparse
        // const csvString = Papa.unparse({ fields: data.data_set.columns.map(column => column.dataKey), data: flattenedRows }, config);
        const csvString = Papa.unparse(
            { fields: data.data_set.columns.map(column => column.dataKey), data: flattenedRows },
            { ...config, encoding: 'UTF-8' }
        );
        console.log(csvString)
        const utf8Encoder = new TextEncoder();
        const utf8Bytes = utf8Encoder.encode(csvString);

        const blob = new Blob([utf8Bytes], { type: 'text/csv;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${selectOption}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Downloading...', data, fileName, selectOption);
    };

    return { handleDownload };
};

export default useDownload;
