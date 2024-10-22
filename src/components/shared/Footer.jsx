import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer justify-around bg-neutral text-neutral-content p-6">
        <div>
          <h6 className="footer-title">Address</h6>
          <p>
            <i className="fa-solid fa-location-dot"></i> Upazila ICT Officer
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> Upazila Office,
            Department of ICT
          </p>
          <p>
            <i className="fa-solid fa-earth-asia"></i> Atpara, Netrokona
          </p>
          <p>
            <i className="fa-solid fa-earth-asia"></i>Bangladesh
          </p>
        </div>
        <nav>
          <h6 className="footer-title">Social Links</h6>
          <a
            className="link link-hover"
            href="http://x.com/imashrafulhaque"
            target="_blank"
          >
            Twitter
          </a>

          <a
            className="link link-hover"
            href="http://facebook.com/imashrafulhaque"
            target="_blank"
          >
            Facebook
          </a>
          <a
            className="link link-hover"
            href="http://linkedin.com/imashrafulhaque"
            target="_blank"
          >
            Linkedin
          </a>
          <a
            className="link link-hover"
            href="http://google.com/ashrafulhaque"
            target="_blank"
          >
            Google Plus
          </a>
        </nav>
        <div>
          <h6 className="footer-title">Contact</h6>
          <p>
            <i className="fa-solid fa-phone"></i> Phone: 555-555-5555
          </p>
          <p>
            <i className="fa-solid fa-mobile-screen"></i> Mobile: +880
            1712-345678
          </p>
          <p>
            <i className="fa-solid fa-globe"></i> www.nfscarshop.com
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> contact@nfscarshop.com
          </p>
        </div>
      </footer>
      <div className="mx-auto text-center text-[15px] bg-slate-800 text-neutral-content py-4">
        <p>
          Copyright © {new Date().getFullYear()} Md. Ashraful Haque - All right
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
