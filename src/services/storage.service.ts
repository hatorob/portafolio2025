import { uploadData, getUrl, remove } from "aws-amplify/storage";

export const storageService = {
  async uploadProjectImage(file: File) {
    const extension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const path = `projects/${fileName}`;

    await uploadData({
      path,
      data: file,
      options: {
        contentType: file.type,
      },
    }).result;

    return path;
  },

  async uploadBlogImage(file: File) {
    const extension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const path = `blogs/${fileName}`;

    await uploadData({
      path,
      data: file,
      options: {
        contentType: file.type,
      },
    }).result;

    return path;
  },

  async getFileUrl(path: string) {
    const result = await getUrl({
      path,
    });

    return result.url.toString();
  },

  async removeFile(path: string) {
    await remove({
      path,
    });
  },
};