export default function InspectionsLayout({
    children, modal_create_new
  }: {
    children: React.ReactNode,
    modal_create_new: React.ReactNode,
  }) {
  
    return (
        <section>
            {modal_create_new}
            {children}
        </section>
    );
  }