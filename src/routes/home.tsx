import { Link } from 'react-router-dom';

export default function Home(): React.ReactElement {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SCX FE Base</h1>
      <p className="text-gray-600 mb-8">
        A modern React + TypeScript + React Router + UnoCSS starter template
      </p>
      <div className="flex gap-4">
        <Link
          to="/about"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          About
        </Link>
      </div>
    </div>
  );
}
