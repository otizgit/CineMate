export const slideAnimation = {
  init: {
    x: "-100vw",
  },
  slide: {
    x: 0,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
};

export const bopAnimation = {
  init: {
    y: "100vh",
  },
  bop: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
};

export const fadeAnimation = {
  init: {
    opacity: 0,
    y: 50,
  },
  fade: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export const headingAnimation = {
  init: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      duration: 1.2,
      bounce: 0.5,
    },
  },
};

export const opacityAnimation = {
  init: {
    opacity: 0,
  },
  opacity: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};
