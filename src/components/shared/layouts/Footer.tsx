import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <Fragment>
      <footer
        className="w-full text-center p-8 pb-16 pt-10 mt-16 space-y-10
        text-gray-800 relative bg-gradient-to-tr from-primary-light
        via-primary to-primary-dark"
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <div
            className="bg-gray-200 rounded-2xl rounded-tl-none 
                rounded-br-none shadow-xl p-2"
          >
            <h4 className="text-lg font-semibold">About Us</h4>
            <ul>
              <li>
                <Link to="">About owino</Link>
              </li>
              <li>
                <Link to="">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="">Privacy policy</Link>
              </li>
            </ul>
          </div>
          <div
            className="bg-gray-200 rounded-2xl rounded-tl-none 
                rounded-br-none shadow-xl p-2"
          >
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul>
              <li>
                <Link to="">owino@support.com</Link>
              </li>
              <li>
                <Link to="">Live message</Link>
              </li>
              <li>
                <Link to="">FAQ</Link>
              </li>
            </ul>
          </div>
          <div
            className="bg-gray-200 rounded-2xl rounded-tl-none 
                rounded-br-none shadow-xl p-2"
          >
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <ul>
              <li>
                <Link to="">Instagram</Link>
              </li>
              <li>
                <Link to="">Twitter</Link>
              </li>
              <li>
                <Link to="">Facebook</Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-primary-light
           via-purple-300 to-primary h-[2px] rounded"
        />
        <div
          className="bg-green-500s absolute bottom-6 right-0 
              left-0 text-gray-100"
        >
          Owino.com &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </Fragment>
  );
};
