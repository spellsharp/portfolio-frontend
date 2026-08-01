import { Link } from "react-router-dom";
import { Container } from "../../components/misc/Layout";
import Icon from "../../components/misc/Icons";

const NotFoundPage = () => (
  <Container className="flex min-h-[70vh] flex-col justify-center">
    <div className="eyebrow mb-5">Error 404</div>
    <h1 className="text-4xl md:text-5xl">This page doesn't exist</h1>
    <p className="mt-5 max-w-prose text-muted">
      The link may be out of date, or the page has moved.
    </p>
    <Link
      to="/"
      className="mt-8 inline-flex w-fit items-center gap-2 border-b border-accent pb-0.5 text-[15px] text-accent transition-opacity hover:opacity-70"
    >
      Back home
      <Icon name="arrow" size={15} />
    </Link>
  </Container>
);

export default NotFoundPage;
