import PremiumDownwardMenu, { MenuItem } from './components/Menu';
import { Home, Mail, User, Settings } from 'lucide-react';
import Status from './components/Status';
const menuItems: MenuItem[] = [
  { icon: <Home size={22} />, id: 'home', label: 'Home' },
  { icon: <Mail size={22} />, id: 'mail', label: 'Mail' },
  { icon: <User size={22} />, id: 'user', label: 'Profile' },
  { icon: <Settings size={22} />, id: 'settings', label: 'Settings' }
];

export default function HomePage() {
  return (
    <div className="flex relative justify-center items-center h-screen">
        <PremiumDownwardMenu 
          className="absolute top-2 left-2"
          menuItems={menuItems}
          onSelect={(id) => console.log('Selected:', id)}
        />
      <Status />
    </div>
  );
}
