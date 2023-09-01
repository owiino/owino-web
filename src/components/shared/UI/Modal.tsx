import React, { useState, Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";
import sprite from "../../../assets/icons/sprite.svg";
import { twMerge } from "tailwind-merge";

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-60 z-30"
      onClick={() => onClose()}
    />
  );
};

interface ModalContentProps {
  content: ReactNode;
  onClose: () => void;
  className?: string;
}

const ModalContent: React.FC<ModalContentProps> = ({
  content,
  onClose,
  className,
}) => {
  return (
    <div
      className={twMerge(
        `p-0 rounded-lg z-[1000] bg-gray-light-1 shadow-2xl animate-slideDown`,
        className
      )}
    >
      <svg
        className="w-[20px] h-[20px] fill-gray-dark-2 absolute right-4 top-4 z-[2000]"
        onClick={() => onClose()}
      >
        <use href={`${sprite}#icon-cross-small`}></use>
      </svg>
      {content}
    </div>
  );
};

interface ModalProps {
  openModalElement: ReactNode;
  className?: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const onOpenHandler = () => setIsOpen(true);
  const onCloseHandler = () => setIsOpen(false);
  if (!isOpen) {
    return <div onClick={() => onOpenHandler()}>{props.openModalElement}</div>;
  }

  const createAppendPortalElement = () => {
    const portalElement = document.createElement("div");
    portalElement.setAttribute("id", "portal");
    const body = document.body;
    body.appendChild(portalElement);
  };
  createAppendPortalElement();

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex items-center justify-center">
          <ModalOverlay onClose={() => onCloseHandler()} />
          <ModalContent
            content={props.children}
            onClose={() => onCloseHandler()}
            className={props?.className}
          />
        </div>,
        document.getElementById("portal")!
      )}
    </Fragment>
  );
};
