const S3 = require("aws-sdk/clients/s3");

const ID = "28SF7A4FT2RY1DFT8607";
const SECRET = "YrgMN7qj6BMazCFMooYmQ7xRcknXW9597K4jRq1u";

module.exports = {
  S3Client: new S3({
    credentials: {
      accessKeyId: ID,
      secretAccessKey: SECRET,
    },
    endpoint: "https://ap-south-1.linodeobjects.com/",
    region: "ap-south-1",
  }),
  Bucket: "pict-perfect",
};
