import { useMemo, useEffect, useRef } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Animated weather particles (rain drops, snow flakes, or sun rays)
 */
const WeatherParticles = () => {
  const { weather } = useWeather();
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const weatherMain = weather?.weather?.[0]?.main?.toLowerCase();

  const particleConfig = useMemo(() => {
    switch (weatherMain) {
      case 'rain':
      case 'drizzle':
        return { type: 'rain', count: 80, color: isDark ? 'rgba(147, 197, 253, 0.4)' : 'rgba(59, 130, 246, 0.3)' };
      case 'thunderstorm':
        return { type: 'rain', count: 120, color: isDark ? 'rgba(167, 139, 250, 0.5)' : 'rgba(109, 40, 217, 0.3)' };
      case 'snow':
        return { type: 'snow', count: 50, color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.8)' };
      case 'clear':
        return { type: 'sparkle', count: 20, color: isDark ? 'rgba(253, 224, 71, 0.3)' : 'rgba(253, 224, 71, 0.4)' };
      case 'clouds':
        return { type: 'float', count: 15, color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.3)' };
      default:
        return { type: 'float', count: 10, color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)' };
    }
  }, [weatherMain, isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particles.push(createParticle(canvas.width, canvas.height, particleConfig.type));
      }
    };

    const createParticle = (w, h, type) => {
      const base = {
        x: Math.random() * w,
        y: Math.random() * h,
        opacity: Math.random() * 0.5 + 0.3,
      };

      switch (type) {
        case 'rain':
          return { ...base, speedY: Math.random() * 8 + 6, speedX: Math.random() * 1 - 0.5, length: Math.random() * 15 + 8, width: 1 };
        case 'snow':
          return { ...base, speedY: Math.random() * 1.5 + 0.3, speedX: Math.random() * 1 - 0.5, size: Math.random() * 4 + 2, wobble: Math.random() * Math.PI * 2 };
        case 'sparkle':
          return { ...base, speedY: Math.random() * 0.3 - 0.15, speedX: Math.random() * 0.3 - 0.15, size: Math.random() * 3 + 1, pulse: Math.random() * Math.PI * 2 };
        case 'float':
        default:
          return { ...base, speedY: Math.random() * 0.5 - 0.25, speedX: Math.random() * 0.5 - 0.25, size: Math.random() * 30 + 10, pulse: Math.random() * Math.PI * 2 };
      }
    };

    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity;

        switch (particleConfig.type) {
          case 'rain':
            ctx.strokeStyle = particleConfig.color;
            ctx.lineWidth = p.width;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
            ctx.stroke();
            p.y += p.speedY;
            p.x += p.speedX;
            if (p.y > canvas.height) {
              p.y = -p.length;
              p.x = Math.random() * canvas.width;
            }
            break;

          case 'snow':
            p.wobble += 0.02;
            ctx.fillStyle = particleConfig.color;
            ctx.beginPath();
            ctx.arc(p.x + Math.sin(p.wobble) * 30, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y += p.speedY;
            p.x += p.speedX;
            if (p.y > canvas.height) {
              p.y = -p.size;
              p.x = Math.random() * canvas.width;
            }
            break;

          case 'sparkle':
            p.pulse += 0.03;
            const sparkleOpacity = (Math.sin(p.pulse) + 1) / 2 * 0.6;
            ctx.globalAlpha = sparkleOpacity;
            ctx.fillStyle = particleConfig.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            break;

          case 'float':
          default:
            p.pulse += 0.005;
            const floatOpacity = (Math.sin(p.pulse) + 1) / 2 * 0.15;
            ctx.globalAlpha = floatOpacity;
            ctx.fillStyle = particleConfig.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < -p.size || p.x > canvas.width + p.size) p.speedX *= -1;
            if (p.y < -p.size || p.y > canvas.height + p.size) p.speedY *= -1;
            break;
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [particleConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default WeatherParticles;
