class FileType {
  private type: string;

  constructor(mimeType: string) {
    this.type = mimeType;
  }

  private isImageType() {
    const isImage = this.type.startsWith("image");
    if (isImage) return true;
    return false;
  }
  private isVideoType() {
    const isVideo = this.type.startsWith("video");
    if (isVideo) return true;
    return false;
  }
  //   Other file types(word, ppt, pdf etc) #Research

  getType() {
    if (this.isImageType()) return "image";
    if (this.isVideoType()) return "video";
    // TODO: add all known file types here
    return "unknown";
  }
  getMimeType() {
    return this.type;
  }
}

export default FileType;
