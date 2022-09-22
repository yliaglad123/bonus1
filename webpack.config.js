const path=require('path')
const HTMLWebpackPlugin=require('html-webpack-plugin')

module.exports={
    entry:'./src/scripts.js',
    mode: 'development',
    output: {
        filename:"bondle.js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
}