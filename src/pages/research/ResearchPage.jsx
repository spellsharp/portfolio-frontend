import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, PageHeader } from "../../components/misc/Layout";
import ResearchEntry from "../../components/research/ResearchEntry";
import Publications from "../../components/research/Publications";
import { research } from "../../content/site";

const ResearchPage = () => {
  const { hash } = useLocation();

  // Deep links from the home page land on a specific entry.
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <Container>
      <PageHeader
        eyebrow="Research"
        title="Selected work"
        lead="Machine learning applied to clinical imaging, and the scientific ML infrastructure that supports it."
      />
      {research.map((item) => (
        <ResearchEntry key={item.slug} item={item} />
      ))}
      <Publications />
    </Container>
  );
};

export default ResearchPage;
