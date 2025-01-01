function range(length: number) {
  return Array(length)
    .fill(0)
    .map((_, i) => i);
}

export function imageCropper(url: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;

      const cropTop = range(img.height).find((y) =>
        pixels
          .slice(y * img.width * 4, (y + 1) * img.width * 4)
          .some((v) => v !== 255),
      );

      const cropBottom = range(img.height)
        .reverse()
        .find((y) =>
          pixels
            .slice(y * img.width * 4, (y + 1) * img.width * 4)
            .some((v) => v !== 255),
        );

      canvas.height = cropBottom! - cropTop!;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, -cropTop!);
      resolve(canvas.toDataURL("png"));

      img.onerror = function (error) {
        reject(error);
      };
    };
    img.src = `https://cors-proxy.jolly-unit-1591.workers.dev/?url=${encodeURIComponent(url)}`;
  });
}
