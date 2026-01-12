import { Link } from 'react-router-dom';

export default function About(): React.ReactElement {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About</h1>
      <p className="text-gray-600 mb-8">
        This is a starter template with TypeScript, React Router, UnoCSS, oxlint, and commitlint.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
