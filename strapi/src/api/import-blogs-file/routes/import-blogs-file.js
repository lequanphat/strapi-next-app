module.exports = {
  routes: [
    {
      method: "POST",
      path: "/import-blogs-file",
      handler: "import-blogs-file.postsReport",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};