import Footer from "../footer/Footer";
import Header from "../header/Header";

// This is a wrapper for All Pages so that header and footer does not need to be imported again and again
export default function LayoutTopBottom(props) {
  let { children } = props;
  return (
    <>
      <Header />
      <div className="body-app">{children}</div>
      <Footer />
    </>
  );
}
