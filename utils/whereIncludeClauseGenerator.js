module.exports = {
  whereIncludeClauseGenerator: (query, models) => {
    let whereClause = {};
    let includeModels = [];

    for (key in query) {
      if (key === "include" && typeof query[key] === "object") {
        includeModels = query[key].map((val) => ({
          model: models[val],
        }));
      } else if (key === "include" && typeof query[key] === "string") {
        includeModels.push({ model: models[query[key]] });
      } else if (!(key === "limit" || key === "page")) {
        whereClause[key] = query[key];
      }
    }

    console.log("QUERY HERE", query);

    return {
      where: whereClause,
      include: includeModels,
      limit: parseInt(query.limit) || null,
      offset: query.page && query.limit ? (query.page - 1) * query.limit : 0,
    };
  },
};
