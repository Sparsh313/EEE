import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="px-4 md:px-12 py-10 space-y-16">
      {/* HERO */}
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Build EEE Projects Easily ⚡
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Step-by-step guides for IoT, MATLAB, and core EEE projects — made for
          2nd, 3rd & 4th year students.
        </p>
        <Link to="/projects" className="btn btn-primary mt-6">
          Explore Projects
        </Link>
      </section>

      {/* FEATURED PROJECTS */}
      <section>
        <h2 className="text-2xl font-bold mb-7 text-center">
          Featured Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Replace below with dynamic map later */}
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-primary hover:shadow-2xl transition-all"
            >
              <div className="card-body">
                <h2 className="card-title">Smart Fan Control</h2>
                <p>Temperature-based fan speed control using Arduino & LM35.</p>
                <div className="card-actions justify-end">
                  <Link
                    to="/projects/smart-fan"
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING TOPICS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          EEE Concepts to Learn
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Replace below with dynamic map later */}
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-primary hover:shadow-xl transition-all"
            >
              <div className="card-body">
                <h3 className="card-title">How Relays Work</h3>
                <p>
                  Learn the internal working of electromechanical relays used in
                  home automation.
                </p>
                <Link
                  to="/learning/relay"
                  className="text-primary font-medium mt-2"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
