
export const switchCenterImage = (
  centerImageIndex,
  setCenterImageIndex,
  dynamicCenterImages
) => {
  setCenterImageIndex(
    (prevIndex) => (prevIndex + 1) % dynamicCenterImages.length
  );
};
