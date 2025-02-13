const path = require('path');

module.exports = {
    entry: './assets/js/main.js', // 🔹 File JS principale
    output: {
        filename: 'bundle.js', // 🔹 File generato
        path: path.resolve(__dirname, 'dist') // 🔹 Cartella di output
    },
    mode: 'development', // 🔹 Usa "production" per ottimizzare il codice
    module: {
        rules: [
            {
                test: /\.scss$/, // 🔹 Gestisce i file SCSS
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};