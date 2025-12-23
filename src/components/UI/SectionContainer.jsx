function SectionContainer({ children, id }) {
  return (
    <section
      id={id}
      className="w-full flex flex-col py-8 px-4 lg:px-64 min-h-[calc(100vh-6rem)]"
    >
      {children}
    </section>
  );
}

export default SectionContainer;
