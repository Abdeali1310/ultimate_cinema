import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="text-zinc-400 text-center flex flex-col mt-20 gap-3">
      <div className="copyright text-white">
        &copy; The Ultimate Cinema. All Rights Reserved.
      </div>
      <div className="coa underline grid grid-cols-2 gap-4 mx-20 my-3">
        <div className="privacy">
          <Link to={"/privacy"}>Privacy Policy </Link>
        </div>
        <div className="terms">
          <Link to={"/terms"}>Terms </Link>
        </div>
        <div className="contact">
          <Link to={"/contact"}>Contact Us </Link>
        </div>
        <div className="about">
          <Link to={"/about"}>About Us </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
