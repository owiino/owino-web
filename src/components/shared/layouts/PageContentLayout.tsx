import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import { TPageLink } from "../../../types/page";

interface PageContentLayoutProps {
  pageIcon: string;
  pageLabel: string;
  pageLinks: TPageLink[];
}

export const PageContentLayout: React.FC<PageContentLayoutProps> = (props) => {
  const pageLinks = props.pageLinks;
  const [activePageLink, setActivePageLink] = useState(pageLinks[0]);

  const setActiveLinkHandler = (pageLink: TPageLink) => {
    setActivePageLink(() => pageLink);
  };

  const activeLinkStyles = `font-semibold rounded bg-gray-300`;
  return (
    <Fragment>
      <div className="mb-12 px-8 py-9 text-gray-800 transition-all">
        <div>
          <div
            className="mb-4 border-[1px] border-gray-300 
             flex items-center justify-start gap-x-3 p-3 rounded-md"
          >
            <svg
              className="w-7 h-7 fill-gray-600 cursor-pointer 
                         group-hover:fill-gray-400 font-light"
            >
              <use href={`${sprite}#icon-${props.pageIcon}`}></use>
            </svg>
            <span className="text-xl text-gray-800">{props.pageLabel}</span>
          </div>
        </div>
        <div className="sm:flex items-start justify-start w-full gap-x-8">
          <aside
            className="my-8 sm:my-0 w-auto text-gray-600 rounded-md
                  border-[1px] p-6 border-gray-300"
          >
            <ul className="">
              {pageLinks?.map((pageLink, index) => (
                <li
                  key={index}
                  className={`pl-4 px-3 py-2 ${
                    pageLink.linkValue === activePageLink.linkValue &&
                    activeLinkStyles
                  }`}
                  onClick={() => setActiveLinkHandler(pageLink)}
                >
                  <Link to={`/settings#${pageLink.linkValue}`}>
                    {pageLink.linkName}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <main className="flex-1 border-[1px] p-6 border-gray-300 rounded-md">
            <p
              className="font-semibold text-lg border-b-[1px] border-b-gray-300
                pb-6 mb-6"
            >
              {activePageLink.linkName}
            </p>
            <div className="mb-6 z-20">{activePageLink.linkComponent}</div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};
