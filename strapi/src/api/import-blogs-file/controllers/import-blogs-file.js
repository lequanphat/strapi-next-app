'use strict';
module.exports = {
  async postsReport(ctx, next) {
    try {

      const data = await strapi
        .service("api::import-blogs-file.import-blogs-file")
        .postsReport();

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
