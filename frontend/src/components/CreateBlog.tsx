import Header from "./Header";

export default function CreateBlog() {
  return (
    <section>
      <Header />
      <main className="mt-10 flex justify-center">
        <div className="basis-4/6">
          <h3 contentEditable="true" className="text-5xl outline-none font-semibold">
            Title
          </h3>
          <p contentEditable className="text-lg mt-3 outline-none">
            Tell your story...
          </p>
        </div>
      </main>
    </section>
  );
}
