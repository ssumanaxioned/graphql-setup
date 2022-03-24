import { useState, useEffect, useCallback } from "react";
import old from '../../public/Assets/images/old.png';
import Image from "next/image";
import latest from '../../public/Assets/images/new.png';


export default function Navbar() {
  const [y, setY] = useState(0);
  const [logo, setlogo] = useState(false);

  const handleNavigation = useCallback(
    e => {
      const current = e.currentTarget;
      if (y > current.scrollY) {
        setlogo(true);
        console.log("scrolling up");
      } else if (y < current.scrollY) {
        setlogo(false);
        console.log("scrolling down");
      }
      setY(current.scrollY);
    }, [y, logo]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <div className="nav">
      {logo ? <Image width={50} height={50} src={old} alt="old" /> : <Image width={50} height={50} src={latest} alt="old" />}
    </div>
  )

}