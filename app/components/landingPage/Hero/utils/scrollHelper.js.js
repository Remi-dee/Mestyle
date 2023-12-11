// util/scrollHelper.js
export const handleScroll = (polygonRef) => {
  if (!isScrolling) {
    isScrolling = true;
    requestIdleCallback(() => {
      const scrollY = window.scrollY;
      const parentBottom =
        polygonRef.current.parentElement.getBoundingClientRect().bottom;

      if (scrollY > parentBottom) {
        polygonRef.current.classList.add("hidden");
      } else {
        polygonRef.current.classList.remove("hidden");
      }

      isScrolling = false;
    });
  }
};

export const switchCenterImage = (
  centerImageIndex,
  setCenterImageIndex,
  dynamicCenterImages
) => {
  // Your image switching logic here
};
