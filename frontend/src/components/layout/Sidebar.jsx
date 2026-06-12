import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-16 hidden md:block">
      <ul className="p-4 space-y-2">
        <li><Link to="/dashboard" className="block p-2 hover:bg-gray-100 rounded">Dashboard</Link></li>
        <li><Link to="/log" className="block p-2 hover:bg-gray-100 rounded">Log Meal</Link></li>
        <li><Link to="/history" className="block p-2 hover:bg-gray-100 rounded">History</Link></li>
        <li><Link to="/nutrition" className="block p-2 hover:bg-gray-100 rounded">Nutrition</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
