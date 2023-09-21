import React, { Fragment, useEffect, useState } from "react";
import { LinksDesktopLayout } from "./LinksDesktopLayout";
import { LinksMobileLayout } from "./LinksMobileLayout";
import { updateAppWidth } from "../../../../store/actions/shared";
import { useDispatch } from "react-redux";

export const NavLinks: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const dispatch: any = useDispatch();

  const updateAppWidthHandler = (width: number) => {
    dispatch(updateAppWidth(width));
  };

  useEffect(() => {
    const setDefaultView = () => {
      const smallScreenWidth = 640;
      const windowWidth = window.innerWidth;
      if (windowWidth < smallScreenWidth) setIsMobileView(() => true);
      if (windowWidth > smallScreenWidth) setIsMobileView(() => false);
    };
    setDefaultView();
  }, []);

  useEffect(() => {
    const widthResizeHandler = () => {
      const isBelow640px = window.matchMedia("(max-width: 639px)").matches;
      if (isBelow640px) setIsMobileView(() => true);
      if (!isBelow640px) setIsMobileView(() => false);
      updateAppWidthHandler(window.innerWidth);
    };
    window.addEventListener("resize", widthResizeHandler);

    return () => window.removeEventListener("resize", widthResizeHandler);
  }, [window.innerWidth]);

  return (
    <Fragment>
      <div>
        {isMobileView && <LinksMobileLayout />}
        {!isMobileView && <LinksDesktopLayout />}
      </div>
    </Fragment>
  );
};
