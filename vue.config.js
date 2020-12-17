module.exports = {
  publicPath: "/OofMeter/",
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
}