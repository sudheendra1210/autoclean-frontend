export default function TechStack() {
  const tech = [
    { name: "Ollama (Local AI)", desc: "Run a local language model for private natural-language cleaning instructions" },
    { name: "Spring Boot", desc: "Java REST API for file processing and cleaning operations" },
    { name: "Java data processing", desc: "Allow-listed Java data transformations with CSV, JSON and Excel support" },
    { name: "Allow-listed Operations", desc: "The API applies approved data-cleaning actions; it never runs arbitrary AI-generated code" },
    { name: "React + Vite", desc: "Modern, fast frontend for an intuitive user experience" },
    { name: "MySQL", desc: "Persists dataset and cleaning-job metadata" },
  ]

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
        <p className="text-gray-600 mb-12">Built with proven, open-source tools for reliability and transparency.</p>
        <div className="grid md:grid-cols-2 gap-8">
          {tech.map((item, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
