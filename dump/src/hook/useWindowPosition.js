import { useLayoutEffect, useState } from 'react';

// listens for id , animation starts
export default function useWindowPosition(id) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    function updatePosition() {
      const offetSetHeight = window.document.getElementById(id).offsetHeight;
    console.log("windPageOffset", window.pageYOffset, offetSetHeight)
    // start animation when scroll down 70%, we equal to id, multiply with 70
      if (window.pageYOffset > offetSetHeight * 0.7) {
        setAnimation(true);
      }
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]);
  return animation;
}