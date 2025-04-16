import PremiumDownwardMenu, { MenuItem } from './components/Menu';
import { Home, Mail, User, Settings } from 'lucide-react';
import Status from './components/Status';
import Todo from './components/Todo';
import Tabs from './components/Tabs';
import Toggle from './components/Toggle';
import Layouts from './components/Layouts';

const menuItems: MenuItem[] = [
  { icon: <Home size={22} />, id: 'home', label: 'Home' },
  { icon: <Mail size={22} />, id: 'mail', label: 'Mail' },
  { icon: <User size={22} />, id: 'user', label: 'Profile' },
  { icon: <Settings size={22} />, id: 'settings', label: 'Settings' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <Tabs>
        {/* Day 1 */}
          <div className="w-full h-full">
          <PremiumDownwardMenu 
        className="absolute top-2 left-2"
        menuItems={menuItems}
        onSelect={(id) => console.log('Selected:', id)}
      />
          </div>

        {/* Day 2 */}
          <div className="w-full h-full">
            <Status />
          </div>

        {/* Day 3 */}
          <div className="w-full h-full">
            <Todo />
        </div>

        {/* Day 4 */}
          <div className="w-full h-full">
            <Toggle />
        </div>

        {/* Day 5 */}
          <div className="w-full h-full">
            <Layouts />
        </div>
      </Tabs>
    </div>
  );
}
