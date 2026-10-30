import Navbar from "../sections/Navbar";
import { hasPosts } from "../lib/blog";

export default function PageNav() {
  return <Navbar showBlog={hasPosts()} />;
}
