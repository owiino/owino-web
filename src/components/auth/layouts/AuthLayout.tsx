import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "../../shared/UI/Modal";
import { SignIn } from "../UI/SignIn";
import { SignUp } from "../UI/SignUp";
// import { PersonPlaceHolder } from "../UI/PersonPlaceHolder";

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
        // className="fixed top-[15vh] -translate-x-1/2 -translate-y-1/2
        //  w-[90%] left-0 right-0 sm:w-96 md:w-96 xl:w-96 transition-all"
        className="fixed top-[15vh] -translate-x-1/2 -translate-y-1/2 left-[5%]
        w-[90%] sm:left-[20%] sm:w-[60%]  md:left-[25%] md:w-[50%] xl:left-[35%]
        xl:w-[30%] transition-all"
      >
        <div className="sm:w-full relative">
          {auths.map((auth) => {
            return (
              <div key={auth.label}>
                {auth.label === label && auth.component}
              </div>
            );
          })}
          {/* <PersonPlaceHolder /> */}
        </div>
      </Modal>
    </Fragment>
  );
};
