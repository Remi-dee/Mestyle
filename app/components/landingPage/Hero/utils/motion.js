const elementAnimation = {
    hidden: { opacity: 0, y: 30 }, // Move from bottom (adjust the y value based on your needs)
    show: { opacity: 1, y: 0, transition: { duration: 1 } }, // Move to its original position
  };

  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.9 } },
    element: elementAnimation,
  };

  const heroMotion = [
    {
      leftImage: {
        hidden: {
          opacity: 0,
          x: 0,
        },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 8,
          },
        },
      },
    },
    {
      centerImage: {
        hidden: {
          opacity: 0,
          y: 30,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 5,
            type: "spring",
            bounce: 0.25,
          },
        },
      },
    },

    {
      rightImage: {
        hidden: {
          opacity: 0,
          x: 0,
        },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 2,
          },
        },
      },
    },
  ];

  export {elementAnimation, heroMotion, variants}