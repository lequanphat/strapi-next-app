'use strict';

module.exports = {
  async postsReport(ctx, next) {
    try {
      const data = await strapi
        .service("api::import-blogs-file.import-blogs-file")
        .postsReport();
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
