import React, { Fragment, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";

type pageLink = {
  linkValue: string;
  linkName: string;
  linkComponent: ReactNode;
};

interface PageLayoutProps {
  pageIcon: string;
  pageLabel: string;
  pageLinks: pageLink[];
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const pageLinks = props.pageLinks;
  const [activePageLink, setActivePageLink] = useState(pageLinks[0]);

  const setActiveLinkHandler = (pageLink: pageLink) => {
    setActivePageLink(() => pageLink);
  };

  const activeLinkStyles = `font-semibold rounded bg-gray-200 relative before:absolute 
                             before:w-2 before:h-full before:top-0 before:-left-0 
                             before:bg-primary before:rounded-tl-[4px] before:rounded-bl-[4px]`;
  return (
    <Fragment>
      <div className="px-8 py-9 text-gray-800">
        <div>
          <div
            className="mb-4 border-[1px] border-gray-300 
             flex items-center justify-start gap-x-3 p-3 rounded-md"
          >
            <svg
              className="w-[20px] h-[20px] fill-gray-800 cursor-pointer 
                         group-hover:fill-gray-400 font-light"
            >
              <use href={`${sprite}#${props.pageIcon}`}></use>
            </svg>
            <span className="text-xl text-gray-800">{props.pageLabel}</span>
          </div>
        </div>
        <div className="flex items-start justify-start w-full gap-x-8">
          <aside className="w-auto text-gray-600">
            <ul className="">
              {pageLinks?.map((pageLink, index) => (
                <li
                  key={index}
                  className={`pl-4 px-3 py-1 ${
                    pageLink.linkValue === activePageLink.linkValue &&
                    activeLinkStyles
                  }`}
                  onClick={() => setActiveLinkHandler(pageLink)}
                >
                  <Link to={pageLink.linkValue}>{pageLink.linkName}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <main className="flex-1 border-[1px] p-6 border-gray-300 rounded-md">
            <p
              className="font-semibold text-lg border-b-[1px] border-b-gray-300
                pb-3 mb-3"
            >
              {activePageLink.linkName}
            </p>
            <div>{activePageLink.linkComponent}</div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};
