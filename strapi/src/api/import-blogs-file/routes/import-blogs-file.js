module.exports = {
  routes: [
    {
      method: "GET",
      path: "/import-blogs-file",
      handler: "import-blogs-file.postsReport",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};