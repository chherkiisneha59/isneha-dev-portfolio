import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`w-full text-center py-6 mt-8 ${isDark ? 'text-white/20' : 'text-gray-400'}`}>
      <p className="text-xs">
        Built with ❤️ using React & OpenWeatherMap API
      </p>
      <p className="text-[10px] mt-1">
        © {new Date().getFullYear()} SkyCast Weather
      </p>
    </footer>
  );
};

export default Footer;
