import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-slate-800 mx-auto text-neutral-content items-center p-5">
        <div className="mx-auto text-[15px] text-center">
          <p>
            Copyright © {new Date().getFullYear()} Md. Ashraful Haque - All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
