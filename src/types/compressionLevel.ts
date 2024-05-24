enum CompressionLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

function getCompressionLevelInfo(level :CompressionLevel) {
  switch (level) {
    case CompressionLevel.Low:
      return 'the PDF quality is remained';
    case CompressionLevel.Medium:
      return 'images in the PDF may lose slightly quality. This is the default level';
    case CompressionLevel.High:
      return 'images in the PDF can lose a lot of quality';
    default:
      return '';
  }
}

export default CompressionLevel;
export { CompressionLevel, getCompressionLevelInfo };
