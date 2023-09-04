const dataUriToArrayBuffer = async (dataUri: string) => {
  try {
    const response = await fetch(dataUri);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.error("Error converting data URI to ArrayBuffer:", error);
  }
};

export default dataUriToArrayBuffer;
