const Footer = () => {
    return (
        <nav className="navbar fixed-bottom navbar-light text-center p-5">
        <span className="font-weight-light">&copy; { (new Date()).getFullYear()}, mc2.io</span>
        </nav>
      );
}
 
export default Footer;