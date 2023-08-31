import React, { Fragment } from "react";
import { AuthLayout } from "../../auth/layouts/AuthLayout";

export const Home: React.FC = () => {
  return (
    <Fragment>
      <div className="min-h-[100vh]">
        <header className="text-gray-light-2">
          <nav className="bg-primary flex items-center justify-between px-6 py-4">
            <span>Owino</span>
            <ul className="flex items-center gap-x-6">
              <li>
                <AuthLayout label="signup" />
              </li>
              <li>
                <AuthLayout label="signin" />
              </li>
            </ul>
          </nav>
          <div className="bg-gray-light-2 h-[70vh]"></div>
        </header>
      </div>
    </Fragment>
  );
};
