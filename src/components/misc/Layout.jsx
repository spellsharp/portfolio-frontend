export const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-page px-6 md:px-10 ${className}`}>{children}</div>
);

export const PageHeader = ({ eyebrow, title, lead }) => (
  <header className="border-b border-rule-soft pb-10 pt-16 md:pt-24">
    {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
    <h1 className="text-4xl md:text-5xl">{title}</h1>
    {lead && (
      <p className="mt-5 max-w-prose text-[17px] text-muted">{lead}</p>
    )}
  </header>
);

export const Section = ({ title, children, className = "" }) => (
  <section className={`py-14 ${className}`}>
    {title && (
      <h2 className="eyebrow mb-8 border-b border-rule-soft pb-3">{title}</h2>
    )}
    {children}
  </section>
);
