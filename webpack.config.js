const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry:path.join(__dirname,'frontend/index.js'),
    output:{
        path:path.join(__dirname,'backend/public'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader'
                }
            },{
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            }
        ]
    },
    plugins:[
        new htmlPlugin({
            template:'./frontend/index.html',
            filename:"index.html"
        })
    ],
    watch:true
}