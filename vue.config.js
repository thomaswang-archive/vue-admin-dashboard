module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
                  @import "@/global-styles/colors.scss";
                  @import "@/global-styles/typography.scss";
              `
      }
    }
  }
};
