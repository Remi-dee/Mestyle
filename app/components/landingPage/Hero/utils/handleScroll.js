const handleScroll = (polygonRef, isScrolling) => {
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

export { handleScroll };
