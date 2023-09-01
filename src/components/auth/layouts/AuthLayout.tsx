import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "../../shared/UI/Modal";
import { SignIn } from "../UI/SignIn";
import { SignUp } from "../UI/SignUp";

interface AuthLayoutProps {
  label?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const [label, setLabel] = useState<string>(
    props?.label ? props.label : "signin"
  );

  const [propsLabel, setPropsLabel] = useState<string | undefined>(
    props?.label
  );

  const labelHandler = (label: string) => {
    console.log("Label updated from the child component");
    console.log(label);
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
    return () => {
      console.log("Unmounting");
      console.log("label on closing the modal");
      console.log(propsLabel);
      setLabel(propsLabel || "signin");
    };
  }, [propsLabel]);

  return (
    <Fragment>
      <Modal
        openModalElement={<span className="cursor-pointer">{label}</span>}
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
