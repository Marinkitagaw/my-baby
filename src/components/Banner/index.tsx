import React, { useLayoutEffect, useCallback } from "react";
import settings from "../../../config/settings";
import styles from "./index.less";

const Banner: React.FunctionComponent<any> = () => {
  const resize = useCallback(() => {
    const banner = document.querySelector("#module-banner");
    if (banner) {
      const width = banner.getBoundingClientRect().width || 0;
      (banner as HTMLDivElement).style.height = width / 4 + "px";
      (banner as HTMLDivElement).style.fontSize =
        width / 24 > 16 ? width / 24 + "px" : "16px";
    }
  }, []);

  useLayoutEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <div
      id="module-banner"
      className={styles.banner}
      style={{ backgroundImage: `url(${settings.banner})` }}
    >
      {settings.title}
    </div>
  );
};

export default Banner;
