module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/_variables.scss"; @import "./src/styles/_main.scss";`
      }
    }
  }
};
