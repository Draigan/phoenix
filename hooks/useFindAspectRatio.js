import React, { useState } from "react";
import { Image, Dimensions } from "react-native";

export function useFindDimensions(imagePath) {
  const image = Image.resolveAssetSource(imagePath);
  let srcWidth = image["width"];
  let srcHeight = image["height"];
  const maxHeight = Dimensions.get("window").height;
  const maxWidth = Dimensions.get("window").width;
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  let height = srcHeight * ratio;
  let width = srcWidth * ratio;

  return [width, height];
}

export default useFindDimensions;
