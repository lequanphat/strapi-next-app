
module.exports = {
    postsReport: async () => {
      try {
        // fetching data
        const entries = await strapi.entityService.findMany(
          "api::blog.blog",
          {
            fields: ["id", "title"],
          }
        );
  
        // reduce the data to the format we want to return
        let entriesReduced;
        if (entries && Array.isArray(entries)) {
          entriesReduced = entries.reduce((acc, item) => {
            acc = acc || [];
            acc.push({
              // @ts-ignore
              id: item.id,
              // @ts-ignore
              title: item.title || "",
            });
            return acc;
          }, []);
        }
  
        // return the reduced data
        return entriesReduced;
      } catch (err) {
        return err;
      }
    },
  };