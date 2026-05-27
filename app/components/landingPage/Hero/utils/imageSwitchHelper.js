const imageCenter1 = "/images/hero/heroImage_center.png";
const imageCenter2 = "/images/hero/heroImage_left.png";
const imageCenter3 = "/images/hero/heroImage_right.png";

export const dynamicCenterImages = [
  imageCenter1,
  imageCenter2,
  imageCenter3,
  // Add more image paths as needed
];

export const switchCenterImage = (centerImageIndex, setCenterImageIndex) => {
  setCenterImageIndex(
    (prevIndex) => (prevIndex + 1) % dynamicCenterImages.length
  );
};
