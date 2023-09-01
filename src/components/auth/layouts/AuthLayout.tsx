import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "../../shared/UI/Modal";
import { SignIn } from "../UI/SignIn";
import { SignUp } from "../UI/SignUp";
import { uppercaseFirstLetter } from "../../../utils.ts";

interface AuthLayoutProps {
  label: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const [label, setLabel] = useState<string>(
    props?.label ? props.label : "signin"
  );
  const defaultLabel: string = props.label;
  const [modalClosed, setModalClosed] = useState<Boolean>(false);

  const modalCloseHandler = (modalState: Boolean) => {
    if (modalState) {
      setModalClosed((modalState) => !modalState);
    }
  };

  const labelHandler = (label: string) => {
    setLabel(label);
  };

  const auths = [
    {
      label: "signin",
      component: <SignIn onUpdateLabel={labelHandler} />,
    },
    {
      label: "signup",
      component: <SignUp onUpdateLabel={labelHandler} />,
    },
  ];

  useEffect(() => {
    setLabel(defaultLabel);

    return () => {
      setLabel(defaultLabel);
    };
  }, [modalClosed, setLabel, defaultLabel]);

  return (
    <Fragment>
      <Modal
        openModalElement={
          <span className="cursor-pointer">{uppercaseFirstLetter(label)}</span>
        }
        onModalClose={modalCloseHandler}
        className="w-96 h-auto sm:max-h-[80vh]"
      >
        <div className="sm:w-full relative">
          {auths.map((auth) => {
            return (
              <div key={auth.label}>
                {auth.label === label && auth.component}
              </div>
            );
          })}
        </div>
      </Modal>
    </Fragment>
  );
};
