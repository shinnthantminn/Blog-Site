module.exports = {
  image: () => {
    return async (req, res, next) => {
      if (req.files) {
        const file = req.files.file;
        const name = new Date().valueOf() + file.name;
        await file.mv(`./upload/post/image/${name}`);
        req.body.image = name;
        next();
      } else next();
    };
  },
};
