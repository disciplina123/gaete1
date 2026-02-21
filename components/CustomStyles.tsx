import React from 'react';
import { BackgroundMode } from '../types';

interface CustomStylesProps {
  primaryColor: string;
  backgroundMode: BackgroundMode;
}

const CustomStyles: React.FC<CustomStylesProps> = ({ primaryColor, backgroundMode }) => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  const { r, g, b } = hexToRgb(primaryColor);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const btnTextColor = brightness > 128 ? '#09090b' : '#ffffff';

  let backgroundCss = '';

  switch (backgroundMode) {
    case 'grid':
      backgroundCss = `
        background-color: #09090b;
        background-image: 
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 30px 30px;
        background-position: center top;
      `;
      break;
    case 'dots':
      backgroundCss = `
        background-color: #050505;
        background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 20px 20px;
      `;
      break;
    case 'aurora':
      backgroundCss = `
        background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a1a1a);
        background-size: 400% 400%;
        animation: gradientBG 15s ease infinite;
      `;
      break;
    case 'ocean':
      backgroundCss = `
        background: linear-gradient(270deg, #0f2027, #203a43, #2c5364);
        background-size: 600% 600%;
        animation: gradientBG 25s ease infinite;
      `;
      break;
    case 'sunset':
      backgroundCss = `
        background: linear-gradient(135deg, #2b1055, #7597de, #2b1055);
        background-size: 400% 400%;
        animation: gradientBG 20s ease infinite;
      `;
      break;
    case 'snow':
      backgroundCss = `
        background: linear-gradient(to bottom, #0a0e27 0%, #1a1a2e 100%);
        position: relative;
      `;
      break;
    case 'space':
      backgroundCss = `
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        position: relative;
      `;
      break;
    case 'forest':
      backgroundCss = `
        background: linear-gradient(to bottom, #0a1f0a 0%, #050a05 100%);
        position: relative;
      `;
      break;
    case 'mosaic':
      backgroundCss = `
        background-color: #09090b;
        background-image: 
          linear-gradient(30deg, rgba(255, 255, 255, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.02) 87.5%, rgba(255, 255, 255, 0.02)),
          linear-gradient(150deg, rgba(255, 255, 255, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.02) 87.5%, rgba(255, 255, 255, 0.02)),
          linear-gradient(30deg, rgba(255, 255, 255, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.02) 87.5%, rgba(255, 255, 255, 0.02)),
          linear-gradient(150deg, rgba(255, 255, 255, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.02) 87.5%, rgba(255, 255, 255, 0.02)),
          linear-gradient(60deg, rgba(255, 255, 255, 0.03) 25%, transparent 25.5%, transparent 75%, rgba(255, 255, 255, 0.03) 75%, rgba(255, 255, 255, 0.03)),
          linear-gradient(60deg, rgba(255, 255, 255, 0.03) 25%, transparent 25.5%, transparent 75%, rgba(255, 255, 255, 0.03) 75%, rgba(255, 255, 255, 0.03));
        background-size: 80px 140px;
        background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
      `;
      break;
    case 'soft':
      backgroundCss = `
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        position: relative;
      `;
      break;
    case 'solid':
      backgroundCss = `
        background-color: #09090b;
      `;
      break;
    case 'default':
    default:
      backgroundCss = `
        background: radial-gradient(circle at top center, #27272a 0%, #09090b 60%, #000000 100%);
      `;
      break;
  }

  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@500;600;700&display=swap');
      
      :root {
        --bg-app: #09090b; /* Zinc 950 */
        --bg-card: rgba(24, 24, 27, 0.7); /* Zinc 900 semi-transparent */
        --bg-input: rgba(9, 9, 11, 0.6);
        
        /* Dynamic Primary Theme */
        --primary-color: ${primaryColor};
        --primary-glow: rgba(${r}, ${g}, ${b}, 0.25);
        --primary-glow-subtle: rgba(${r}, ${g}, ${b}, 0.1);
        
        --border-subtle: rgba(255, 255, 255, 0.1);
        --border-highlight: rgba(255, 255, 255, 0.5);
        
        --text-main: #f4f4f5;
        --text-muted: #a1a1aa;
        --success: #10b981; /* Emerald 500 */
        --warning: #f59e0b; /* Amber 500 */
        
        --btn-text: ${btnTextColor};
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 80%;
      }

      body {
        font-family: 'Rajdhani', sans-serif;
        background: var(--bg-app);
        color: var(--text-main);
      }

      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes starsAnimation {
        from { background-position: 0 0, 40px 60px, 130px 270px; }
        to { background-position: 550px 550px, 390px 410px, 380px 520px; }
      }

      @keyframes snowfall {
        0% {
          transform: translateY(-10vh) translateX(0);
          opacity: 1;
        }
        100% {
          transform: translateY(110vh) translateX(100px);
          opacity: 0.8;
        }
      }

      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }

      .app {
        min-height: 100vh;
        width: 100%;
        ${backgroundCss}
        transition: background 0.5s ease;
        position: relative;
        overflow: hidden;
      }

      /* Snow effect */
      ${backgroundMode === 'snow' ? `
        .app::before,
        .app::after {
          content: '';
          position: fixed;
          top: -10vh;
          left: 0;
          width: 100%;
          height: 120vh;
          pointer-events: none;
          z-index: 1;
        }

        .app::before {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(2px 2px at 130px 80px, rgba(255, 255, 255, 0.7), transparent),
            radial-gradient(1px 1px at 160px 120px, rgba(255, 255, 255, 0.85), transparent),
            radial-gradient(2px 2px at 190px 20px, rgba(255, 255, 255, 0.75), transparent);
          background-size: 200px 200px;
          background-position: 0 0;
          animation: snowfall 10s linear infinite;
        }

        .app::after {
          background-image: 
            radial-gradient(1px 1px at 50px 50px, rgba(255, 255, 255, 0.7), transparent),
            radial-gradient(2px 2px at 100px 100px, rgba(255, 255, 255, 0.85), transparent),
            radial-gradient(1px 1px at 150px 150px, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(2px 2px at 70px 180px, rgba(255, 255, 255, 0.8), transparent);
          background-size: 250px 250px;
          background-position: 50px 50px;
          animation: snowfall 15s linear infinite;
          animation-delay: -5s;
        }
      ` : ''}

      /* Space effect with twinkling stars */
      ${backgroundMode === 'space' ? `
        .app::before,
        .app::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .app::before {
          background-image: 
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 40% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(2px 2px at 15% 90%, white, transparent),
            radial-gradient(1px 1px at 75% 40%, white, transparent);
          background-size: 200% 200%;
          animation: twinkle 3s ease-in-out infinite;
        }

        .app::after {
          background-image: 
            radial-gradient(1px 1px at 10% 20%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1px 1px at 60% 35%, rgba(255, 255, 255, 0.7), transparent),
            radial-gradient(2px 2px at 25% 55%, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1px 1px at 85% 75%, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(1px 1px at 45% 90%, rgba(255, 255, 255, 0.8), transparent);
          background-size: 200% 200%;
          animation: twinkle 4s ease-in-out infinite;
          animation-delay: -2s;
        }
      ` : ''}

      /* Forest silhouette */
      ${backgroundMode === 'forest' ? `
        .app::before {
          content: '';
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        .app::after {
          content: '';
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25vh;
          background-image: 
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 300' preserveAspectRatio='none'%3E%3Cpath d='M0,300 L0,240 Q50,200 100,240 Q150,280 200,220 Q250,160 300,200 Q350,240 400,190 Q450,140 500,180 Q550,220 600,170 Q650,120 700,190 Q750,260 800,200 Q850,140 900,210 Q950,280 1000,230 L1000,300 Z' fill='%23051005' opacity='0.9'/%3E%3Cpath d='M0,300 L0,260 Q80,230 160,270 Q240,310 320,250 Q400,190 480,240 Q560,290 640,220 Q720,150 800,230 Q880,310 960,260 Q1000,240 1000,260 L1000,300 Z' fill='%23082008' opacity='0.7'/%3E%3C/svg%3E");
          background-size: cover;
          background-position: bottom;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 1;
        }
      ` : ''}

      .app > * {
        position: relative;
        z-index: 2;
      }

      .header {
        background: rgba(24, 24, 27, 0.8);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--border-highlight);
        padding: 1.5rem;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 50;
      }

      .header-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .header h1 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 3rem;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 6px;
        text-shadow: 0 0 30px var(--primary-glow);
      }
      
      .badges-container {
        position: absolute;
        right: 0;
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .streak-badge {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(10, 10, 10, 0.6);
        border: 1px solid rgba(245, 158, 11, 0.4); 
        padding: 0.5rem 1.2rem;
        border-radius: 50px;
        box-shadow: 0 0 15px rgba(245, 158, 11, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        transition: all 0.3s ease;
      }

      .streak-badge:hover {
        transform: scale(1.02);
        background: rgba(20, 10, 10, 0.8);
        border-color: var(--warning);
        box-shadow: 0 0 25px rgba(245, 158, 11, 0.2);
      }

      .streak-count {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2rem;
        color: #fff;
        line-height: 0.9;
      }

      .streak-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--warning);
        font-weight: 700;
        letter-spacing: 2px;
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }

      .fire-icon {
        color: var(--warning);
        filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.5));
        animation: pulse-fire 2.5s infinite ease-in-out;
      }
      
      .title-badge {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(10, 10, 10, 0.6);
        border: 1px solid var(--primary-color); 
        padding: 0.5rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 0 15px var(--primary-glow-subtle);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        transition: all 0.3s ease;
      }
      
      .title-badge:hover {
        transform: scale(1.02);
        background: rgba(20, 10, 10, 0.8);
        box-shadow: 0 0 25px var(--primary-glow);
      }
      
      .title-text {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.5rem;
        color: #fff;
        letter-spacing: 1px;
        white-space: nowrap;
      }
      
      .title-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--primary-color);
        font-weight: 700;
        letter-spacing: 2px;
        display: flex;
        flex-direction: column;
        line-height: 1.1;
        text-align: right;
      }
      
      .trophy-icon {
        color: var(--primary-color);
        filter: drop-shadow(0 0 5px var(--primary-glow));
      }

      @keyframes pulse-fire {
        0% { filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.3)); transform: scale(1); opacity: 0.9; }
        50% { filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.6)); transform: scale(1.1); opacity: 1; }
        100% { filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.3)); transform: scale(1); opacity: 0.9; }
      }

      .tabs {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 0;
        z-index: 100;
        background: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        border-right: none;
        border-radius: 0;
        width: 82px;
        transition:
          width 0.45s cubic-bezier(0.4,0,0.2,1),
          height 0.45s cubic-bezier(0.4,0,0.2,1),
          top 0.45s cubic-bezier(0.4,0,0.2,1),
          bottom 0.45s cubic-bezier(0.4,0,0.2,1),
          left 0.45s cubic-bezier(0.4,0,0.2,1),
          right 0.45s cubic-bezier(0.4,0,0.2,1),
          transform 0.45s cubic-bezier(0.4,0,0.2,1),
          border-radius 0.45s cubic-bezier(0.4,0,0.2,1),
          background-color 0.45s cubic-bezier(0.4,0,0.2,1),
          box-shadow 0.45s cubic-bezier(0.4,0,0.2,1),
          padding 0.45s cubic-bezier(0.4,0,0.2,1);
      }

      .sidebar-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.35rem 0;
        border-bottom: none;
        gap: 0;
        overflow: hidden;
        flex-shrink: 0;
        transition: opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1), padding 0.45s cubic-bezier(0.4,0,0.2,1);
      }

      .sidebar-logo-g {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 800;
        font-size: 1.8rem;
        letter-spacing: 0;
        color: var(--primary-color);
        line-height: 1;
        text-shadow: 0 0 18px var(--primary-glow-subtle);
      }

      .sidebar-logo-rest {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 800;
        font-size: 1.8rem;
        letter-spacing: 2px;
        color: #fff;
        line-height: 1;
        opacity: 0.9;
      }

      .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        padding: 0.5rem 0.5rem;
        flex: 1;
      }

      .sidebar-bottom {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        padding: 0.5rem 0.5rem 0.75rem;
        border-top: none;
        flex-shrink: 0;
      }

      .tab {
        background: transparent;
        border: none;
        padding: 0.75rem;
        color: rgba(255,255,255,0.35);
        cursor: pointer;
        transition:
          color 0.3s cubic-bezier(0.4,0,0.2,1),
          filter 0.3s cubic-bezier(0.4,0,0.2,1),
          background-color 0.3s cubic-bezier(0.4,0,0.2,1),
          transform 0.3s cubic-bezier(0.4,0,0.2,1),
          box-shadow 0.3s cubic-bezier(0.4,0,0.2,1),
          width 0.45s cubic-bezier(0.4,0,0.2,1),
          height 0.45s cubic-bezier(0.4,0,0.2,1),
          min-width 0.45s cubic-bezier(0.4,0,0.2,1),
          padding 0.45s cubic-bezier(0.4,0,0.2,1),
          border-radius 0.45s cubic-bezier(0.4,0,0.2,1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        width: 54px;
        height: 54px;
        position: relative;
      }

      .tab:hover {
        color: rgba(255,255,255,0.95);
        filter: drop-shadow(0 0 6px rgba(255,255,255,0.4));
        background: rgba(255,255,255,0.06);
        transform: scale(1.08);
      }

      .tab.active {
        color: var(--primary-color);
        filter: drop-shadow(0 0 8px var(--primary-glow-subtle));
        background: rgba(255,255,255,0.05);
        transform: scale(1.0);
      }

      .tab::after {
        content: attr(title);
        position: absolute;
        left: 100%;
        margin-left: 12px;
        background: rgba(0, 0, 0, 0.95);
        color: #fff;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.4,0,0.2,1);
        transform: translateX(-4px);
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        letter-spacing: 1px;
        border: 1px solid var(--border-subtle);
      }

      .tab:hover::after {
        opacity: 1;
        transform: translateX(0);
      }

      @keyframes tabFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      .content {
        padding: 2rem 2.5rem 2rem 104px;
        max-width: 1800px;
        margin: 0 auto;
        transition: padding 0.45s cubic-bezier(0.4,0,0.2,1);
      }

      .content.tab-entering {
        animation: tabFadeIn 0.3s cubic-bezier(0.4,0,0.2,1) both;
      }

      .content-pomodoro {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding-top: 0;
        padding-bottom: 0;
      }

      .pomodoro-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.7rem;
        max-width: 510px;
        width: 100%;
        z-index: 1;
      }

      @keyframes pomodoroFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }



      /* ── BOTTOM BAR LAYOUT ───────────────────────────────────── */
      .tabs-bottom {
        position: fixed !important;
        bottom: 1rem !important;
        left: 50% !important;
        right: auto !important;
        top: auto !important;
        transform: translateX(-50%) !important;
        width: auto !important;
        height: 56px !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0 !important;
        padding: 0 0.5rem !important;
        background: rgba(9, 9, 11, 0.92) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border: 1px solid var(--border-subtle) !important;
        border-radius: 9999px !important;
        z-index: 200 !important;
        overflow: hidden !important;
        box-shadow: 0 4px 24px rgba(0,0,0,0.5) !important;
        transition:
          width 0.45s cubic-bezier(0.4,0,0.2,1),
          height 0.45s cubic-bezier(0.4,0,0.2,1),
          top 0.45s cubic-bezier(0.4,0,0.2,1),
          bottom 0.45s cubic-bezier(0.4,0,0.2,1),
          border-radius 0.45s cubic-bezier(0.4,0,0.2,1),
          background 0.45s cubic-bezier(0.4,0,0.2,1),
          box-shadow 0.45s cubic-bezier(0.4,0,0.2,1),
          opacity 0.45s cubic-bezier(0.4,0,0.2,1) !important;
      }

      /* Esconde o sidebar-logo original dentro da pill */
      .tabs-bottom .sidebar-logo {
        display: none !important;
      }

      /* Logo fixo independente no canto superior esquerdo */
      .bottom-fixed-logo {
        position: fixed;
        top: 1.1rem;
        left: 1.35rem;
        display: flex;
        align-items: center;
        gap: 0;
        pointer-events: none;
        z-index: 201;
        animation: logoFadeIn 0.4s cubic-bezier(0.4,0,0.2,1) both;
      }

      @keyframes logoFadeIn {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .bottom-fixed-logo .sidebar-logo-g {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 800;
        font-size: 1.75rem;
        letter-spacing: 0;
        color: var(--primary-color);
        line-height: 1;
        text-shadow: 0 0 18px var(--primary-glow-subtle);
      }

      .bottom-fixed-logo .sidebar-logo-rest {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 800;
        font-size: 1.75rem;
        letter-spacing: 2px;
        color: #fff;
        line-height: 1;
        opacity: 0.9;
      }

      /* sidebar-nav em linha dentro da pill */
      .tabs-bottom .sidebar-nav {
        display: flex !important;
        flex-direction: row !important;
        flex: 0 0 auto !important;
        width: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        gap: 0 !important;
        align-items: center !important;
        min-width: 0 !important;
      }

      .tabs-bottom .sidebar-bottom {
        display: flex !important;
        flex-direction: row !important;
        flex: 0 0 auto !important;
        padding: 0 !important;
        gap: 0 !important;
        align-items: center !important;
        border-top: none !important;
      }

      .tabs-bottom .tab {
        flex: 0 0 auto !important;
        width: auto !important;
        height: 56px !important;
        min-width: 52px !important;
        max-width: none !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 3px !important;
        padding: 6px 12px !important;
        border-radius: 9999px !important;
        border: none !important;
        border-top: none !important;
        position: relative;
      }

      .tabs-bottom .tab svg {
        width: 26px !important;
        height: 26px !important;
        transition: width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1) !important;
      }

      .tabs-bottom .tab .tab-label {
        display: block !important;
        font-family: 'Rajdhani', sans-serif !important;
        font-size: 0.70rem !important;
        font-weight: 700 !important;
        letter-spacing: 0.3px !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 100% !important;
        opacity: 0.9 !important;
        transition: font-size 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s cubic-bezier(0.4,0,0.2,1) !important;
      }

      .tabs-bottom .tab,
      .tabs-bottom .tab *,
      .tabs-bottom .tab svg {
        filter: none !important;
        -webkit-filter: none !important;
      }

      .tabs-bottom .tab:hover {
        color: rgba(255,255,255,0.85) !important;
        filter: none !important;
        background: rgba(255,255,255,0.07) !important;
        transform: translateY(-2px) scale(1.06) !important;
      }

      .tabs-bottom .tab:hover *,
      .tabs-bottom .tab:hover svg {
        filter: none !important;
      }

      .tabs-bottom .tab.active {
        color: var(--primary-color) !important;
        filter: none !important;
        background: rgba(255,255,255,0.08) !important;
        transform: none !important;
      }

      .tabs-bottom .tab.active *,
      .tabs-bottom .tab.active svg {
        filter: none !important;
      }

      .app-bottom .content {
        padding-left: 2.5rem !important;
        padding-bottom: 80px !important;
      }

      /* Sem tooltip na versão rodapé */
      .tabs-bottom .tab::after {
        display: none !important;
      }

      /* Separador visual entre nav e botão de música */
      .tabs-bottom .sidebar-bottom::before {
        content: '' !important;
        display: block !important;
        width: 1px !important;
        height: 24px !important;
        background: var(--border-subtle) !important;
        margin: 0 4px !important;
      }

      /* ── SETTINGS REDESIGN (cfg-*) ───────────────────────────── */
      .cfg-root {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 1rem 3rem;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        animation: fadeIn 0.3s ease;
      }

      .cfg-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .cfg-section-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--text-muted);
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-subtle);
      }

      .cfg-cards-row {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }

      .cfg-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 14px;
        padding: 1.4rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        transition: border-color 0.2s;
      }

      .cfg-card:hover {
        border-color: rgba(255,255,255,0.15);
      }

      .cfg-card-wide {
        grid-column: span 2;
      }

      @media (max-width: 640px) {
        .cfg-card-wide { grid-column: span 1; }
      }

      .cfg-card-danger {
        border-color: rgba(239,68,68,0.2);
      }

      .cfg-card-danger:hover {
        border-color: rgba(239,68,68,0.4);
      }

      .cfg-card-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.2rem;
        letter-spacing: 1px;
        color: #fff;
      }

      .cfg-danger-title {
        color: #ef4444;
      }

      .cfg-card-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.4;
        margin-bottom: 0.4rem;
      }

      /* Color picker */
      .cfg-color-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.25rem;
      }

      .cfg-color-swatch {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        border: 2px solid rgba(255,255,255,0.15);
        cursor: pointer;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.2s;
        flex-shrink: 0;
      }

      .cfg-color-swatch:hover {
        border-color: rgba(255,255,255,0.4);
      }

      .cfg-color-swatch input[type="color"] {
        width: 56px;
        height: 56px;
        border: none;
        padding: 0;
        margin: -8px;
        cursor: pointer;
        background: none;
      }

      .cfg-color-hex {
        font-family: 'Rajdhani', sans-serif;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 1px;
        color: #fff;
        flex: 1;
      }

      .cfg-btn-ghost {
        background: transparent;
        border: 1px solid var(--border-subtle);
        color: var(--text-muted);
        padding: 0.35rem 0.85rem;
        border-radius: 7px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .cfg-btn-ghost:hover {
        border-color: rgba(255,255,255,0.3);
        color: #fff;
      }

      /* Background grid */
      .cfg-bg-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
        margin-top: 0.25rem;
      }

      @media (max-width: 500px) {
        .cfg-bg-grid { grid-template-columns: repeat(2, 1fr); }
      }

      .cfg-bg-option {
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 9px;
        padding: 0.6rem 0.5rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        transition: all 0.15s;
      }

      .cfg-bg-option:hover {
        background: rgba(255,255,255,0.07);
        border-color: rgba(255,255,255,0.2);
      }

      .cfg-bg-active {
        background: rgba(255,255,255,0.08) !important;
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 10px var(--primary-glow-subtle);
      }

      .cfg-bg-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.85rem;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.3px;
      }

      .cfg-bg-desc {
        font-size: 0.7rem;
        color: var(--text-muted);
      }

      /* Layout picker */
      .cfg-layouts-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }

      @media (max-width: 580px) {
        .cfg-layouts-row { grid-template-columns: 1fr; }
      }

      .cfg-layout-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 14px;
        padding: 1.2rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        position: relative;
        transition: all 0.2s;
        text-align: left;
      }

      .cfg-layout-card:hover {
        border-color: rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.03);
      }

      .cfg-layout-active {
        border-color: var(--primary-color) !important;
        background: rgba(255,255,255,0.05) !important;
        box-shadow: 0 0 16px var(--primary-glow-subtle);
      }

      .cfg-layout-preview {
        width: 100%;
        height: 68px;
        border-radius: 8px;
        background: rgba(0,0,0,0.35);
        overflow: hidden;
        display: flex;
      }

      .cfg-preview-sidebar {
        width: 18px;
        background: rgba(255,255,255,0.06);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding: 6px 0;
        flex-shrink: 0;
      }

      .cfg-preview-sidebar-wide {
        width: 38px;
        padding: 6px 5px;
        align-items: flex-start;
      }

      .cfg-preview-content {
        flex: 1;
        background: rgba(255,255,255,0.02);
      }

      .cfg-preview-content-full {
        width: 100%;
        flex: 1;
      }

      .cfg-prev-dot {
        width: 8px;
        height: 8px;
        border-radius: 3px;
        background: rgba(255,255,255,0.25);
        flex-shrink: 0;
      }

      .cfg-prev-row {
        display: flex;
        align-items: center;
        gap: 4px;
        width: 100%;
      }

      .cfg-prev-bar {
        height: 5px;
        border-radius: 3px;
        background: rgba(255,255,255,0.15);
        flex: 1;
      }

      .cfg-preview-bottombar {
        height: 18px;
        width: 100%;
        background: rgba(255,255,255,0.06);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding: 0 4px;
        flex-shrink: 0;
      }

      .cfg-preview-bottom {
        flex-direction: column !important;
      }

      .cfg-prev-bottom-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }

      .cfg-prev-bar-short {
        width: 14px;
        flex: none;
        height: 3px;
      }

      .cfg-layout-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .cfg-layout-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.1rem;
        letter-spacing: 1px;
        color: #fff;
      }

      .cfg-layout-desc {
        font-size: 0.78rem;
        color: var(--text-muted);
      }

      .cfg-layout-check {
        position: absolute;
        top: 10px;
        right: 12px;
        color: var(--primary-color);
        font-size: 0.85rem;
        font-weight: 700;
      }

      /* Volume */
      .cfg-volume-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.25rem;
      }

      .cfg-slider {
        flex: 1;
        height: 4px;
        appearance: none;
        background: rgba(255,255,255,0.1);
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        accent-color: var(--primary-color);
      }

      .cfg-volume-pct {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--text-muted);
        min-width: 36px;
        text-align: right;
      }

      /* Toggle */
      .cfg-toggle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: all 0.2s;
        color: var(--text-muted);
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 0.25rem;
        text-align: left;
      }

      .cfg-toggle:hover {
        border-color: rgba(255,255,255,0.2);
        color: #fff;
      }

      .cfg-toggle-on {
        border-color: var(--primary-color);
        color: #fff;
      }

      .cfg-toggle-track {
        width: 36px;
        height: 20px;
        border-radius: 10px;
        background: rgba(255,255,255,0.1);
        position: relative;
        transition: background 0.2s;
        flex-shrink: 0;
      }

      .cfg-toggle-on .cfg-toggle-track {
        background: var(--primary-color);
      }

      .cfg-toggle-thumb {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        transition: transform 0.2s, background 0.2s;
      }

      .cfg-toggle-on .cfg-toggle-thumb {
        transform: translateX(16px);
        background: #fff;
      }

      /* Data buttons */
      .cfg-data-btns {
        display: flex;
        gap: 0.6rem;
        flex-wrap: wrap;
        margin-top: 0.25rem;
      }

      .cfg-btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: var(--primary-color);
        color: var(--btn-text-color, #000);
        border: none;
        border-radius: 8px;
        padding: 0.6rem 1.1rem;
        font-size: 0.88rem;
        font-weight: 700;
        cursor: pointer;
        transition: opacity 0.2s, transform 0.15s;
        font-family: 'Rajdhani', sans-serif;
        letter-spacing: 0.5px;
      }

      .cfg-btn-primary:hover {
        opacity: 0.85;
        transform: translateY(-1px);
      }

      .cfg-btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: transparent;
        color: #fff;
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
        padding: 0.6rem 1.1rem;
        font-size: 0.88rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Rajdhani', sans-serif;
        letter-spacing: 0.5px;
      }

      .cfg-btn-secondary:hover {
        border-color: rgba(255,255,255,0.3);
        background: rgba(255,255,255,0.05);
      }

      .cfg-btn-danger {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: rgba(239,68,68,0.12);
        color: #ef4444;
        border: 1px solid rgba(239,68,68,0.3);
        border-radius: 8px;
        padding: 0.6rem 1.1rem;
        font-size: 0.88rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Rajdhani', sans-serif;
        letter-spacing: 0.5px;
        margin-top: 0.25rem;
      }

      .cfg-btn-danger:hover {
        background: #ef4444;
        color: #fff;
        border-color: #ef4444;
      }
      /* ─────────────────────────────────────────────────────────── */

      /* ── GAETE SIDEBAR LAYOUT ────────────────────────────────── */
      .tabs-gaete {
        width: 210px;
        top: 0;
        transform: none;
        border-radius: 0;
        background: transparent;
        backdrop-filter: none;
        border-right: none;
      }

      .tabs-gaete .sidebar-logo {
        justify-content: flex-start;
        padding: 1.35rem 1.35rem;
      }

      .tabs-gaete .tab {
        width: 100%;
        height: auto;
        padding: 0.8rem 1rem;
        justify-content: flex-start;
        gap: 0.85rem;
        border-radius: 10px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        font-size: 1.05rem;
        letter-spacing: 0.5px;
      }

      .tabs-gaete .tab .tab-label {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 0 1px 6px rgba(0,0,0,0.8);
        font-size: 1.05rem;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .tabs-gaete .tab::after {
        display: none;
      }

      .tabs-gaete .tab:hover {
        transform: translateX(4px) scale(1.02);
      }

      .tabs-gaete .tab.active {
        transform: translateX(4px);
      }

      .tab-label {
        display: none;
      }

      /* Gaete Settings UI */
      .gaete-layout-picker {
        display: flex;
        gap: 1rem;
        margin-top: 0.75rem;
      }

      .gaete-option {
        flex: 1;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        position: relative;
      }

      .gaete-option:hover {
        border-color: rgba(255,255,255,0.25);
        background: rgba(255,255,255,0.05);
      }

      .gaete-option.gaete-selected {
        border-color: var(--primary-color);
        background: rgba(255,255,255,0.06);
        box-shadow: 0 0 16px var(--primary-glow-subtle);
      }

      .gaete-preview {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: rgba(0,0,0,0.3);
        border-radius: 8px;
        padding: 8px 6px;
        min-height: 80px;
        justify-content: center;
      }

      .gaete-preview-icons {
        align-items: center;
      }

      .gaete-icon-dot {
        width: 18px;
        height: 18px;
        border-radius: 5px;
        background: rgba(255,255,255,0.18);
        flex-shrink: 0;
      }

      .gaete-preview-full .gaete-row-item {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
      }

      .gaete-text-bar {
        height: 8px;
        border-radius: 4px;
        background: rgba(255,255,255,0.15);
        flex: 1;
      }

      .gaete-label {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
        letter-spacing: 1px;
        color: var(--text-muted);
        text-transform: uppercase;
      }

      .gaete-selected .gaete-label {
        color: var(--primary-color);
      }

      .gaete-check {
        position: absolute;
        top: 6px;
        right: 8px;
        color: var(--primary-color);
        font-size: 0.8rem;
        font-weight: 700;
      }

      .gaete-selected .gaete-icon-dot {
        background: var(--primary-color);
        opacity: 0.6;
      }

      .gaete-selected .gaete-text-bar {
        background: rgba(255,255,255,0.25);
      }

      .app-gaete .content {
        padding-left: 228px;
      }
      /* ─────────────────────────────────────────────────────────── */

      /* MUSIC PLAYER STYLES */
      .music-toggle-btn {
        display: none;
      }

      .music-player-panel {
        position: fixed;
        bottom: 4.5rem;
        left: 78px;
        width: 280px;
        background: rgba(24, 24, 27, 0.95);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 1rem;
        z-index: 999;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.25s ease;
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .music-player-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 1rem;
      }

      .music-player-header h4 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.3rem;
        letter-spacing: 2px;
        color: #fff;
        margin: 0;
      }

      .close-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        font-size: 1.8rem;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.2s ease;
        line-height: 1;
      }

      .close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }

      .music-player-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .music-url-input {
        background: rgba(9, 9, 11, 0.5);
        border: 1px solid var(--border-subtle);
        border-radius: 6px;
        padding: 0.65rem;
        color: #fff;
        font-size: 0.85rem;
        font-family: 'Rajdhani', sans-serif;
        transition: all 0.2s ease;
      }

      .music-url-input:focus {
        outline: none;
        border-color: var(--primary-color);
        background: rgba(9, 9, 11, 0.7);
        box-shadow: 0 0 10px var(--primary-glow-subtle);
      }

      .music-url-input::placeholder {
        color: var(--text-muted);
        font-size: 0.8rem;
      }

      .btn-small {
        padding: 0.6rem 1.2rem;
        font-size: 0.95rem;
        min-width: auto;
      }

      .music-controls {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 0.75rem;
        padding: 0.75rem;
        background: rgba(9, 9, 11, 0.4);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
      }

      .music-status {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0;
      }

      .music-indicator {
        font-size: 1.5rem;
      }

      .music-text {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.9rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .music-buttons {
        display: flex;
        gap: 0.75rem;
      }

      .volume-control {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 0;
      }

      .volume-control svg {
        color: var(--text-muted);
        flex-shrink: 0;
      }

      .volume-slider {
        flex: 1;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
      }

      .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        background: var(--primary-color);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .volume-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
        box-shadow: 0 0 8px var(--primary-glow-subtle);
      }

      .volume-slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        background: var(--primary-color);
        border-radius: 50%;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .volume-slider::-moz-range-thumb:hover {
        transform: scale(1.2);
        box-shadow: 0 0 8px var(--primary-glow-subtle);
      }

      .volume-value {
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.85rem;
        color: var(--text-muted);
        min-width: 40px;
        text-align: right;
      }

      .btn-control {
        flex: 1;
        padding: 0.6rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-subtle);
        border-radius: 6px;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .btn-control:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--primary-color);
        transform: translateY(-1px);
      }

      .btn-control:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .btn-stop {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.3);
      }

      .btn-stop:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.2);
        border-color: rgba(239, 68, 68, 0.6);
      }

      .youtube-player-container {
        border-radius: 8px;
        overflow: hidden;
        margin-top: 0.5rem;
        border: 1px solid var(--border-subtle);
      }

      /* MUSIC PROMPT MODAL */
      .music-prompt-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .music-prompt-modal {
        background: rgba(24, 24, 27, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--border-highlight);
        border-radius: 20px;
        padding: 2.5rem;
        max-width: 450px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        animation: scaleIn 0.3s ease;
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .music-prompt-modal h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
        letter-spacing: 2px;
        color: #fff;
        margin-bottom: 1rem;
      }

      .music-prompt-modal p {
        color: var(--text-muted);
        margin-bottom: 2rem;
        line-height: 1.6;
        font-size: 1rem;
      }

      .music-prompt-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      .music-prompt-buttons button {
        flex: 1;
        max-width: 180px;
      }

      /* COMMON CARD STYLES */
      .timer-card, .settings-card, .add-subject-card, .subject-card, .stats-card, .calendar-card, .calendar-details, .config-card, .achievements-card, .library-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 16px;
        padding: 1.5rem;
        backdrop-filter: blur(10px); /* Glassmorphism */
        -webkit-backdrop-filter: blur(10px); /* Glassmorphism */
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        position: relative;
        overflow: hidden;
      }
      
      .timer-card::after, .settings-card::after, .stats-card::after, .calendar-card::after, .config-card::after, .achievements-card::after, .library-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      }

      .timer-card::before, .settings-card::before, .config-card::before, .achievements-card::before, .library-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
        opacity: 0.7;
      }

      /* POMODORO - CENTRO MINIMALISTA - AUMENTADO E CENTRALIZADO */

      /* TIMER FLUTUANTE - SEM CARD - MAIOR */
      .timer-floating {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 1.5rem;
      }

      /* Desktop: Side-by-side layout for Focus mode */
      @media (min-width: 768px) {
        .pomodoro-container.split-view {
          display: grid;
          grid-template-columns: 1fr 1fr; /* EQUAL WIDTH */
          align-items: stretch; /* Both cards same height */
          gap: 1.5rem;
          max-width: 800px; /* Allow width to expand for side-by-side */
        }
        
        .pomodoro-container.single-view {
          display: flex;
          justify-content: center;
          max-width: 500px; /* Limit width when centered */
        }

        .secondary-card {
          margin-top: 0 !important; /* Reset inherited margin */
          height: 100%; /* Match height */
          border-top: 1px solid var(--border-subtle) !important; /* Reset specific style */
          background: var(--bg-card) !important;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }

      .timer-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.8rem 1.2rem; /* Reduced from 2.5rem 1.5rem */
      }

      .timer-header h2 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.5rem;
        letter-spacing: 4px;
        color: #fff;
        text-align: center;
        margin-bottom: 1.5rem;
        text-shadow: 0 2px 10px rgba(0,0,0,0.5);
      }

      .timer-circle {
        position: relative;
        width: 272px;
        height: 272px;
        margin: 0.85rem auto;
      }

      .timer-svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
      }

      .timer-bg {
        fill: none;
        stroke: rgba(255,255,255,0.05);
        stroke-width: 5; /* Slightly thinner */
      }

      .timer-progress {
        fill: none;
        stroke: var(--primary-color);
        stroke-width: 5; /* Slightly thinner */
        stroke-linecap: round;
        transition: stroke-dashoffset 1s linear, stroke 0.5s ease;
        filter: drop-shadow(0 0 5px var(--primary-glow));
      }

      .timer-display {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }

      .time-text {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 4.25rem;
        color: #fff;
        letter-spacing: 4px;
        line-height: 1;
        text-shadow: 0 0 20px rgba(0,0,0,0.5);
      }

      .subject-display {
        font-size: 1.1rem; /* Reduced from 1.5rem */
        color: var(--primary-color);
        margin-top: 0.2rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        opacity: 0.9;
      }

      /* MINIMALIST CONFIG INPUTS - MAIORES */
      .time-config-row {
        display: flex;
        justify-content: center;
        gap: 2.55rem;
        width: 100%;
        margin-top: 1.7rem;
        margin-bottom: 0.85rem;
        padding-top: 1.275rem;
        border-top: 1px solid rgba(255,255,255,0.05);
      }

      .mini-config-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .mini-label {
        font-size: 0.85rem;
        text-transform: uppercase;
        color: var(--text-muted);
        letter-spacing: 1.5px;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }

      .mini-input {
        background: transparent;
        border: none;
        border-bottom: 2px solid var(--border-subtle);
        color: #fff;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.53rem;
        text-align: center;
        width: 68px;
        padding: 0.25rem;
        transition: all 0.2s;
      }

      .mini-input:focus {
        outline: none;
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
      
      .mini-input:disabled {
        opacity: 0.5;
        border-bottom-style: dashed;
      }

      .timer-controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        margin-top: 1.7rem;
        width: 100%;
      }

      .btn-stop-subtle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        padding: 0.45rem 1.4rem;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.45);
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1rem;
        letter-spacing: 2px;
        cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
        text-transform: uppercase;
        opacity: 0.7;
      }

      .btn-stop-subtle:hover {
        color: rgba(255, 255, 255, 0.9);
        border-color: rgba(255, 255, 255, 0.7);
        opacity: 1;
      }
      
      /* Buttons - Tamanho aumentado */
      .btn-primary, .btn-secondary, .btn-danger {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        padding: 1rem 2rem;
        border: 1px solid;
        border-radius: 10px;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.4rem;
        letter-spacing: 2px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-transform: uppercase;
      }

      .btn-primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--btn-text); 
        box-shadow: 0 4px 15px var(--primary-glow);
        font-weight: 700;
        min-width: 150px;
      }

      .btn-primary:hover {
        filter: brightness(1.2);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px var(--primary-glow);
      }

      .btn-secondary {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.1);
        color: #fff;
      }

      .btn-secondary:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
      }

      .btn-danger {
        background: transparent;
        border-color: rgba(239, 68, 68, 0.4);
        color: #ef4444;
      }

      .btn-danger:hover {
        background: rgba(239, 68, 68, 0.1);
        color: #fff;
        border-color: #ef4444;
      }

      /* SUBJECTS - REDESIGN MINIMALISTA TREE VIEW */
      .subjects-container {
        animation: fadeIn 0.4s ease;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        width: 100%;
        box-sizing: border-box;
      }

      .add-subject-wrapper {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 50px;
        padding: 0.75rem 0.75rem 0.75rem 2rem;
        margin-bottom: 2.5rem;
        display: flex;
        align-items: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      }
      
      .add-subject-wrapper:focus-within {
        border-color: var(--primary-color);
        box-shadow: 0 4px 25px var(--primary-glow-subtle);
        background: rgba(20, 20, 23, 0.9);
      }

      .add-subject-input {
        flex: 1;
        background: transparent;
        border: none;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.35rem;
        outline: none;
      }
      
      .add-subject-input::placeholder {
        color: var(--text-muted);
      }
      
      .add-subject-btn {
        background: var(--primary-color);
        color: var(--btn-text);
        border: none;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s;
      }
      
      .add-subject-btn:hover {
        transform: scale(1.1);
      }

      .subjects-tree {
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
      }

      .subject-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 14px;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .subject-card:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      .subject-header-modern {
        display: flex;
        align-items: center;
        padding: 1.75rem 2rem;
        cursor: pointer;
        user-select: none;
      }
      
      .subject-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }
      
      .subject-marker {
        width: 6px;
        height: 32px;
        border-radius: 3px;
      }
      
      .subject-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.5rem;
        color: #fff;
        letter-spacing: 2px;
        font-weight: 700;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      }
      
      .modern-actions {
        display: flex;
        gap: 0.5rem;
        opacity: 0;
        transition: opacity 0.2s;
      }
      
      .subject-header-modern:hover .modern-actions {
        opacity: 1;
      }
      
      .modern-action-btn {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
        border: 1px solid transparent;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .modern-action-btn:hover {
        background: rgba(255,255,255,0.1);
        color: #fff;
      }
      
      .modern-action-btn.delete:hover {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
      
      .subject-content {
        padding-bottom: 1rem;
      }
      
      /* Tree Hierarchy Lines */
      .tree-level-1 {
        margin-left: 2.5rem;
        padding-left: 2rem;
        border-left: none;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .tree-level-1-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        max-width: 100%;
        gap: 1rem;
        padding: 0.5rem;
        align-items: start;
      }
      
      @media (max-width: 600px) {
        .tree-level-1-grid {
          grid-template-columns: 1fr;
        }
      }

      .area-block {
        position: relative;
      }

      .area-block-card {
        position: relative;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 0.7rem 0.9rem;
        transition:
          background-color 0.25s ease,
          border-color 0.25s ease,
          transform 0.25s ease,
          box-shadow 0.25s ease,
          padding 0.3s ease;
      }

      .area-block-card.expanded {
        padding: 1.1rem;
      }

      .area-block-card:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      }

      /* ── Collapsible wrapper (grid-rows trick) ── */
      .collapse-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.28s ease;
        opacity: 0;
      }

      .collapse-wrapper.collapse-open {
        grid-template-rows: 1fr;
        opacity: 1;
      }

      .collapse-inner {
        overflow: hidden;
        min-height: 0;
      }

      /* Chevron rotation */
      .chevron-icon {
        transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        color: var(--text-muted);
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .chevron-icon.open {
        transform: rotate(90deg);
      }
      
      .area-header-modern {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        margin-bottom: 0;
        min-height: 50px;
        cursor: pointer;
        user-select: none;
      }
      
      .area-title-modern {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1.35rem;
        color: var(--text-main);
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        flex: 1;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        line-height: 1.2;
      }
      
      .tree-level-2 {
        margin-left: 0.5rem;
        padding-left: 0.75rem;
        border-left: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-top: 0.5rem;
      }
      
      .chapter-block {
        position: relative;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 0.6rem 0.85rem;
        transition:
          background-color 0.2s ease,
          border-color 0.2s ease,
          transform 0.2s ease,
          box-shadow 0.2s ease;
      }

      .chapter-block:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.18);
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
      }

      /* depth=1: chapters rendered at top level */
      .tree-level-1-grid > div > .chapter-block {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 0.7rem 0.9rem;
        transition:
          background-color 0.2s ease,
          border-color 0.2s ease,
          transform 0.2s ease,
          box-shadow 0.2s ease;
      }

      .tree-level-1-grid > div > .chapter-block:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.22);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      }

      .tree-level-1-grid > div > .chapter-block .chapter-title-modern {
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--text-main);
        text-transform: uppercase;
        letter-spacing: 1px;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      }
      
      .chapter-header-modern {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        min-height: 40px;
        cursor: pointer;
        user-select: none;
      }

      .chapter-title-modern {
        color: var(--text-muted);
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
        transition: color 0.2s;
      }
      
      .chapter-title-modern:hover {
        color: #fff;
      }
      
      .tree-level-3 {
        margin-left: 0.5rem;
        padding-left: 0.75rem;
        border-left: none;
        padding-top: 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      
      .task-modern {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0;
        position: relative;
      }
      
      .task-checkbox-modern {
        appearance: none;
        width: 16px;
        height: 16px;
        border: 2px solid var(--text-muted);
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      
      .task-checkbox-modern:checked {
        background: var(--primary-color);
        border-color: var(--primary-color);
      }
      
      .task-checkbox-modern:checked::after {
        content: '✓';
        position: absolute;
        color: #000;
        font-size: 11px;
        left: 2px;
        top: -2px;
        font-weight: bold;
      }
      
      .task-label-modern {
        color: var(--text-muted);
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        transition: color 0.2s;
        flex: 1;
      }
      
      .task-label-modern:hover {
        color: #fff;
      }
      
      .task-label-modern.completed {
        text-decoration: line-through;
        opacity: 0.5;
      }
      
      /* Input resets for modern edit */
      .modern-edit-input {
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--primary-color);
        color: #fff;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-transform: inherit;
        width: 100%;
        padding: 0;
        outline: none;
      }
      
      .expand-icon {
        transition: transform 0.2s;
        color: var(--text-muted);
      }
      
      .empty-branch {
        font-size: 0.8rem;
        color: var(--text-muted);
        font-style: italic;
        opacity: 0.5;
        padding: 0.2rem 0;
      }


      /* STATS */
      .stats-container {
        display: grid;
        gap: 2rem;
      }

      /* ============================================ */
      /* SUBJECTS GRID & APP-STYLE NAVIGATION */
      /* ============================================ */
      
      .subjects-grid-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--border-subtle);
      }

      .subjects-grid-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2rem;
        letter-spacing: 2px;
        color: var(--text-main);
      }

      .subjects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1.5rem;
        padding: 1rem 0;
        justify-items: stretch;
      }

      .subject-app-card {
        background: var(--bg-card);
        border: 2px solid var(--border-subtle);
        border-radius: 16px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        overflow: hidden;
      }

      .subject-app-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        border-width: 3px;
      }

      .subject-app-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .subject-app-icon {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        transition: all 0.3s ease;
      }

      .subject-app-card:hover .subject-app-icon {
        transform: scale(1.1) rotate(5deg);
      }

      .subject-app-delete {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--danger);
        padding: 0.5rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .subject-app-delete:hover {
        background: var(--danger);
        color: white;
        transform: scale(1.1);
      }

      .subject-app-body {
        flex: 1;
        cursor: pointer;
      }

      .subject-app-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
        letter-spacing: 1.5px;
        color: var(--text-main);
        margin-bottom: 1rem;
        text-transform: uppercase;
      }

      .subject-app-stats {
        display: flex;
        gap: 1.5rem;
      }

      .subject-app-stat {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .subject-app-stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-main);
      }

      .subject-app-stat-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
        font-weight: 600;
      }

      .subject-app-footer {
        padding-top: 0.75rem;
        border-top: 1px solid var(--border-subtle);
        text-align: center;
      }

      /* Color Picker Grid */
      .color-picker-grid {
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        gap: 0.35rem;
        margin-top: 0.4rem;
      }

      .color-option {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 5px;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      }

      .color-option:hover {
        transform: scale(1.2);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .color-option.selected {
        border-color: var(--text-main);
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        transform: scale(1.15);
      }

      .color-option.selected::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 0.7rem;
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      /* Subject Detail View */
      .subject-detail-view {
        animation: slideInRight 0.3s ease;
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .subject-detail-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--bg-card);
        border: 2px solid var(--border-subtle);
        border-radius: 12px;
      }

      .btn-back {
        background: var(--bg-card);
        border: 2px solid var(--border-subtle);
        color: var(--text-main);
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 600;
        font-size: 0.95rem;
      }

      .btn-back:hover {
        background: var(--primary-color);
        color: var(--btn-text-color);
        border-color: var(--primary-color);
        transform: translateX(-4px);
      }

      .subject-detail-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .subject-detail-marker {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.8;
        }
      }

      .subject-detail-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.2rem;
        letter-spacing: 2px;
        color: var(--text-main);
        text-transform: uppercase;
      }

      .subject-detail-content {
        animation: fadeIn 0.4s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Empty State */
      .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-muted);
      }

      .empty-state-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
      }

      .empty-state h3 {
        font-size: 1.5rem;
        color: var(--text-main);
        margin-bottom: 0.5rem;
      }

      .empty-state p {
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }

      .empty-branch {
        color: var(--text-muted);
        font-style: italic;
        opacity: 0.5;
        padding: 0.2rem 0;
        padding-left: 1rem;
      }

      .period-filter {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
      }

      .period-filter-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        color: var(--text-muted);
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .period-buttons {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .period-button {
        flex: 1;
        min-width: 80px;
        padding: 0.75rem 1.25rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
        color: var(--text-muted);
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s;
      }

      .period-button:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255,255,255,0.2);
        color: #fff;
        transform: translateY(-2px);
      }

      .period-button.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--btn-text-color);
        box-shadow: 0 0 20px var(--primary-glow);
      }

      .period-button.active:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 25px var(--primary-glow);
      }

      .stats-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        color: var(--primary-color);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: 1rem;
      }

      .stats-header h2 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
        letter-spacing: 2px;
        color: #fff;
      }

      .empty-stats {
        text-align: center;
        padding: 3rem;
        color: var(--text-muted);
        border: 1px dashed var(--border-subtle);
        border-radius: 8px;
        background: rgba(0,0,0,0.1);
      }

      .chart-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: flex-start;
      }

      .pie-chart {
        width: 100%;
        max-width: 320px;
        margin: 0 auto;
      }

      /* Specific Typography for Chart Center */
      .chart-label {
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px;
        fill: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 600;
        text-anchor: middle;
      }

      .chart-value {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 42px;
        fill: #ffffff;
        text-anchor: middle;
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
      }

      .legend {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
        border: 1px solid var(--border-subtle);
        transition: all 0.2s;
      }

      .legend-item:hover {
        border-color: rgba(255,255,255,0.2);
        background: rgba(255, 255, 255, 0.05);
      }

      .legend-color {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        flex-shrink: 0;
      }

      .legend-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }

      .legend-subject {
        font-weight: 700;
        font-size: 1.1rem;
        color: #fff;
      }

      .legend-value {
        color: var(--text-muted);
        font-size: 0.9rem;
      }

      .bar-chart {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .bar-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .bar-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bar-subject {
        font-weight: 600;
        font-size: 1.05rem;
        color: #fff;
      }

      .bar-values {
        color: var(--text-muted);
        font-size: 0.95rem;
        font-weight: 500;
      }

      .bar-container {
        height: 24px;
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        overflow: hidden;
        position: relative;
      }

      .bar-fill {
        height: 100%;
        transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        position: relative;
        border-radius: 0 12px 12px 0;
      }

      .bar-total {
        background: rgba(255,255,255,0.15);
      }

      .bar-correct {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: var(--primary-color);
        box-shadow: 0 0 10px var(--primary-glow);
      }

      .bar-legend {
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin-top: 1rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-subtle);
      }

      .bar-legend-item {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: var(--text-muted);
        font-size: 0.9rem;
      }

      .bar-legend-color {
        width: 16px;
        height: 16px;
        border-radius: 4px;
      }

      .bar-legend-total {
        background: rgba(255,255,255,0.15);
      }

      .bar-legend-correct {
        background: var(--primary-color);
      }

      /* CALENDAR */
      .calendar-container {
        display: grid;
        gap: 2rem;
      }
      
      .goal-config {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        background: rgba(0,0,0,0.2);
        padding: 1.2rem;
        border-radius: 12px;
        border: 1px solid var(--border-subtle);
        width: fit-content;
      }
      
      .goal-config label {
        color: var(--primary-color);
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 1px;
      }
      
      .goal-config input {
        background: var(--bg-input);
        border: 1px solid var(--border-subtle);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        width: 90px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.1rem;
        text-align: center;
      }
      
      .goal-config input:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      
      .goal-info {
        font-size: 0.95rem;
        color: var(--text-muted);
      }

      .calendar-header-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-subtle);
      }

      .month-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.2rem;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 3px;
      }

      .nav-btn {
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--border-subtle);
        color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .nav-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
        background: rgba(255, 255, 255, 0.1);
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.75rem;
      }

      .calendar-day-header {
        text-align: center;
        color: var(--text-muted);
        font-weight: 700;
        padding: 0.5rem;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
      }

      .calendar-day {
        aspect-ratio: 1;
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      }

      .calendar-day:hover {
        border-color: rgba(255,255,255,0.3);
        transform: translateY(-2px);
      }
      
      .calendar-day.goal-met {
        border-color: rgba(16, 185, 129, 0.5); /* Green */
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), transparent);
        box-shadow: 0 0 15px rgba(16, 185, 129, 0.1) inset;
      }
      
      .calendar-day.goal-met .day-total-mini {
        color: var(--success);
      }
      
      .calendar-day.goal-warning {
        border-color: rgba(245, 158, 11, 0.5); /* Orange/Amber */
        border-style: solid;
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), transparent);
      }
      
      .calendar-day.goal-warning .day-total-mini {
        color: var(--warning);
      }

      .calendar-day.empty {
        background: transparent;
        border: none;
        cursor: default;
        box-shadow: none;
      }

      .calendar-day.selected {
        border-color: var(--primary-color);
        box-shadow: 0 0 20px var(--primary-glow);
        background: rgba(255, 255, 255, 0.05);
      }
      
      .calendar-day.selected.goal-met {
        border-color: var(--success);
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
      }
      
      .calendar-day.selected.goal-warning {
        border-color: var(--warning);
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
      }

      .calendar-day.has-data:not(.goal-met):not(.goal-warning) {
        background: rgba(255, 255, 255, 0.03);
      }

      .day-number {
        position: absolute;
        top: 8px;
        left: 10px;
        font-size: 0.85rem;
        color: var(--text-muted);
        font-weight: 600;
      }
      
      .calendar-day.selected .day-number, .calendar-day:hover .day-number {
        color: #fff;
      }

      .day-indicator {
        margin-top: 0;
        display: flex;
        justify-content: center;
        gap: 3px;
        margin-bottom: 4px;
      }

      .dot {
        width: 6px;
        height: 6px;
        background-color: var(--primary-color);
        border-radius: 50%;
        box-shadow: 0 0 5px var(--primary-glow-subtle);
      }
      
      .calendar-day.goal-met .dot {
        background-color: var(--success);
        box-shadow: 0 0 5px rgba(16, 185, 129, 0.5);
      }
      
      .calendar-day.goal-warning .dot {
        background-color: var(--warning);
        box-shadow: 0 0 5px rgba(245, 158, 11, 0.5);
      }

      .day-total-mini {
        margin-top: auto;
        margin-bottom: auto;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 400; /* Lighter weight for cleaner look */
        color: var(--primary-color);
        font-family: 'Bebas Neue', sans-serif;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      }

      .details-header {
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .details-header h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
        color: #fff;
        letter-spacing: 1px;
      }

      .details-header span {
        color: var(--primary-color);
        font-size: 1.4rem;
        margin-left: 0.5rem;
      }
      
      .goal-status-box {
        margin-top: 1.5rem;
        background: rgba(0,0,0,0.2);
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--border-subtle);
      }
      
      .goal-status-text {
        font-weight: 600;
        margin-bottom: 0.75rem;
        display: block;
        letter-spacing: 0.5px;
      }
      
      .goal-progress-bar {
        height: 10px;
        background: rgba(255,255,255,0.05);
        border-radius: 5px;
        overflow: hidden;
      }
      
      .goal-progress-fill {
        height: 100%;
        transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
      }

      /* ============================================ */
      /* EDITOR DE SESSÕES NO CALENDÁRIO */
      /* ============================================ */
      
      .btn-edit-sessions {
        background: var(--primary-color);
        border: none;
        color: var(--btn-text-color);
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 0 10px var(--primary-glow);
      }

      .btn-edit-sessions:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px var(--primary-glow);
      }

      .session-editor-modal {
        max-width: 800px;
        width: 90%;
      }

      .quick-actions-section {
        background: rgba(255, 255, 255, 0.02);
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--border-subtle);
      }

      .session-edit-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        transition: all 0.2s;
      }

      .session-edit-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .session-edit-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
      }

      .session-edit-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
        padding: 0.75rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
      }

      .session-stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .stat-label {
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      .stat-value {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-main);
      }

      .session-edit-actions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
      }

      .btn-action-small {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-subtle);
        color: var(--text-main);
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .btn-action-small:hover {
        background: var(--primary-color);
        color: var(--btn-text-color);
        border-color: var(--primary-color);
        transform: translateY(-2px);
      }

      .btn-danger-small {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        padding: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-danger-small:hover {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
        transform: scale(1.1);
      }

      .day-stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1.25rem;
        margin-top: 1.5rem;
      }

      .stat-box {
        background: rgba(255,255,255,0.02);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 1.2rem;
        transition: transform 0.2s;
      }
      
      .stat-box:hover {
        transform: translateY(-2px);
        background: rgba(255,255,255,0.04);
      }

      .stat-subject {
        color: #fff;
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
        display: block;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        padding-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .stat-subject-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .stat-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.95rem;
        margin-bottom: 0.4rem;
        color: var(--text-muted);
      }
      
      .stat-row span:last-child {
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
      }

      /* CALENDAR COMPACT HORIZONTAL LAYOUT */
      .calendar-container-horizontal {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 1.5rem;
        height: calc(100vh - 180px);
      }

      .calendar-left-section {
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 1rem;
        overflow-y: auto;
      }

      .calendar-right-section {
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 1.5rem;
        overflow-y: auto;
      }

      .goal-config-compact {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        background: rgba(0,0,0,0.3);
        padding: 0.75rem;
        border-radius: 8px;
        font-size: 0.9rem;
      }

      .goal-config-compact label {
        color: var(--primary-color);
        font-weight: 700;
        font-size: 0.85rem;
      }

      .goal-config-compact input {
        background: var(--bg-input);
        border: 1px solid var(--border-subtle);
        color: #fff;
        padding: 0.4rem 0.75rem;
        border-radius: 6px;
        width: 70px;
        font-size: 0.95rem;
        text-align: center;
      }

      .calendar-header-nav-compact {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border-subtle);
      }

      .month-title-compact {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.5rem;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .nav-btn-compact {
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--border-subtle);
        color: #fff;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .nav-btn-compact:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }

      .calendar-grid-compact {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.4rem;
      }

      .calendar-day-header-compact {
        text-align: center;
        color: var(--text-muted);
        font-weight: 600;
        padding: 0.3rem;
        font-size: 0.75rem;
        letter-spacing: 0.5px;
      }

      .details-header-compact {
        margin-bottom: 1.5rem;
      }

      .day-stats-grid-compact {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .stat-box-compact {
        background: rgba(255,255,255,0.02);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
        padding: 0.75rem;
      }

      .stat-subject-compact {
        color: #fff;
        font-weight: 700;
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        display: block;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        padding-bottom: 0.4rem;
      }

      .stat-row-compact {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        margin-bottom: 0.25rem;
        color: var(--text-muted);
      }

      .stat-row-compact span:last-child {
        color: #fff;
        font-weight: 600;
      }
      
      /* LIBRARY STYLES */
      .library-search-container {
        margin-bottom: 2rem;
      }
      
      .search-box {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      
      .search-box input {
        flex: 1;
        background: var(--bg-input);
        border: 1px solid var(--border-subtle);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.1rem;
      }
      
      .search-box input:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      
      .book-result {
        display: flex;
        gap: 1.5rem;
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border-subtle);
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        align-items: center;
      }
      
      .book-result img {
        width: 80px;
        height: 120px;
        object-fit: cover;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
      }
      
      .book-result-info {
        flex: 1;
      }
      
      .book-result-info h3 {
        color: #fff;
        font-size: 1.4rem;
        margin-bottom: 0.3rem;
      }
      
      .book-result-info p {
        color: var(--text-muted);
        margin-bottom: 1rem;
      }
      
      .library-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }
      
      .book-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
        padding: 0.8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.2s;
        position: relative;
        text-align: center;
      }
      
      .book-card:hover {
        transform: translateY(-5px);
        background: rgba(255,255,255,0.05);
        border-color: var(--primary-color);
      }
      
      .book-card.completed {
        border-color: var(--success);
        background: rgba(16, 185, 129, 0.05);
      }
      
      .book-cover {
        width: 100px;
        height: 150px;
        object-fit: cover;
        border-radius: 4px;
        margin-bottom: 0.8rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      }
      
      .book-title {
        color: #fff;
        font-size: 0.9rem;
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 0.2rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .book-author {
        color: var(--text-muted);
        font-size: 0.8rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .book-remove-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(0,0,0,0.7);
        color: #ef4444;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
      }
      
      .book-status-btn {
        position: absolute;
        top: 5px;
        left: 5px;
        background: rgba(0,0,0,0.7);
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s;
        z-index: 10;
      }
      
      .book-status-btn.completed {
        color: var(--success);
        background: rgba(0,0,0,0.8);
        opacity: 1;
      }

      .book-card:hover .book-remove-btn,
      .book-card:hover .book-status-btn {
        opacity: 1;
      }

      .book-remove-btn:hover {
        background: #ef4444;
        color: #fff;
      }
      
      .book-status-btn:hover {
        background: rgba(255,255,255,0.2);
        transform: scale(1.1);
      }

      /* TOOLS (FERRAMENTAS) STYLES */
      .tool-card-neutral {
        border-color: var(--border-subtle) !important;
        background: var(--bg-card) !important;
      }

      .tool-card-neutral:hover {
        border-color: rgba(255, 255, 255, 0.25) !important;
      }

      .tool-card-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        text-align: center;
        width: 100%;
      }

      .tool-card-inner .subject-app-name {
        margin-bottom: 0;
      }

      .tools-container {
        max-width: 1600px;
        margin: 0 auto;
      }

      .tools-header {
        margin-bottom: 3rem;
      }

      .tools-header-content {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 16px;
      }

      .tools-header-content h1 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.5rem;
        letter-spacing: 2px;
        color: #fff;
        margin: 0;
      }

      .tools-header-content p {
        color: var(--text-muted);
        font-size: 1rem;
        margin: 0.3rem 0 0 0;
      }

      .tools-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .tool-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 2rem;
        cursor: pointer;
        transition: all 0.3s;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .tool-card:hover:not(.disabled) {
        transform: translateY(-5px);
        border-color: var(--primary-color);
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .tool-card.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .tool-icon-wrapper {
        width: 70px;
        height: 70px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid;
        transition: all 0.3s;
      }

      .tool-card:hover:not(.disabled) .tool-icon-wrapper {
        transform: scale(1.1);
      }

      .tool-info h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.5rem;
        letter-spacing: 1px;
        color: #fff;
        margin: 0 0 0.5rem 0;
      }

      .tool-info p {
        color: var(--text-muted);
        font-size: 0.95rem;
        margin: 0;
        line-height: 1.4;
      }

      .tool-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-muted);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-top: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .tools-footer {
        text-align: center;
        padding: 2rem;
        color: var(--text-muted);
        font-size: 0.95rem;
      }

      .tools-app-view {
        animation: fadeIn 0.3s ease;
      }

      .tools-back-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        color: var(--text-muted);
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 2rem;
        transition: all 0.2s;
      }

      .tools-back-btn:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--primary-color);
        color: #fff;
        transform: translateX(-5px);
      }

      .tool-coming-soon {
        text-align: center;
        padding: 5rem 2rem;
        color: var(--text-muted);
        font-size: 1.2rem;
        background: var(--bg-card);
        border: 1px dashed var(--border-subtle);
        border-radius: 12px;
      }

      /* MANGA TRACKER STYLES */
      .manga-tracker-container {
        max-width: 1400px;
        margin: 0 auto;
      }

      .manga-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 2rem;
      }

      .manga-add-section {
        margin-top: 1.5rem;
      }

      .manga-input-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .manga-input-title {
        flex: 1;
        min-width: 250px;
        background: var(--bg-input);
        border: 1px solid var(--border-subtle);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.05rem;
      }

      .manga-input-title:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .manga-input-chapter {
        width: 100px;
        background: var(--bg-input);
        border: 1px solid var(--border-subtle);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.05rem;
        text-align: center;
      }

      .manga-input-chapter:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .manga-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .manga-item {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 1.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.2s;
      }

      .manga-item:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--primary-color);
        transform: translateX(5px);
      }

      .manga-item.completed {
        opacity: 0.6;
        border-color: var(--success);
      }

      .manga-item.completed .manga-title {
        text-decoration: line-through;
        color: var(--text-muted);
      }

      .manga-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .manga-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #fff;
        transition: color 0.2s;
      }

      .manga-chapter-display {
        font-size: 0.95rem;
        color: var(--text-muted);
      }

      .manga-chapter-display strong {
        color: var(--primary-color);
        font-size: 1.1rem;
      }

      .manga-controls {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .manga-chapter-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-subtle);
        color: #fff;
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .manga-chapter-btn:hover:not(:disabled) {
        background: var(--primary-color);
        border-color: var(--primary-color);
        transform: scale(1.1);
      }

      .manga-chapter-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .manga-action-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-subtle);
        color: #fff;
        width: 36px;
        height: 36px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .manga-action-btn:hover {
        transform: scale(1.1);
      }

      .manga-action-btn.edit:hover {
        background: #3b82f6;
        border-color: #3b82f6;
      }

      .manga-action-btn.delete:hover {
        background: #ef4444;
        border-color: #ef4444;
      }

      .manga-action-btn.save:hover {
        background: var(--success);
        border-color: var(--success);
      }

      .manga-action-btn.cancel:hover {
        background: #6b7280;
        border-color: #6b7280;
      }

      .manga-edit-mode {
        display: flex;
        gap: 0.75rem;
        width: 100%;
        align-items: center;
      }

      .manga-edit-input {
        flex: 1;
        background: var(--bg-input);
        border: 1px solid var(--primary-color);
        padding: 0.6rem 0.8rem;
        border-radius: 6px;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1rem;
      }

      .manga-edit-input:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-glow);
      }

      .manga-edit-chapter {
        width: 80px;
        background: var(--bg-input);
        border: 1px solid var(--primary-color);
        padding: 0.6rem 0.8rem;
        border-radius: 6px;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1rem;
        text-align: center;
      }

      .manga-edit-chapter:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-glow);
      }
      
      /* Exam Tracker Styles */
      .exam-tracker-container {
        max-width: 1400px;
        margin: 0 auto;
      }

      .exam-tracker-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 16px;
      }

      .exam-tracker-header svg {
        color: var(--primary-color);
      }

      .exam-tracker-header h2 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.5rem;
        color: #fff;
        margin: 0;
        letter-spacing: 2px;
      }

      .exam-tracker-header p {
        color: var(--text-muted);
        margin: 0.25rem 0 0 0;
        font-size: 1rem;
      }

      .exam-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .exam-tab {
        flex: 1;
        padding: 1rem 1.5rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        color: var(--text-muted);
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.3rem;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .exam-tab:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--primary-color);
        transform: translateY(-2px);
      }

      .exam-tab.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: #fff;
        box-shadow: 0 4px 15px var(--primary-glow);
      }

      .exam-add-button {
        width: 100%;
        padding: 1.25rem;
        background: var(--bg-card);
        border: 2px dashed var(--border-subtle);
        border-radius: 12px;
        color: var(--primary-color);
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.3s;
        margin-bottom: 2rem;
      }

      .exam-add-button:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--primary-color);
        transform: translateY(-2px);
      }

      .exam-form {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
      }

      .exam-form h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
        color: #fff;
        margin-bottom: 1.5rem;
        letter-spacing: 1px;
      }

      .exam-form-group {
        margin-bottom: 1.5rem;
      }

      .exam-form-group label {
        display: block;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .exam-form-group input {
        width: 100%;
        background: var(--bg-input);
        border: 1px solid var(--border-subtle);
        padding: 0.9rem 1rem;
        border-radius: 8px;
        color: #fff;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        transition: all 0.2s;
      }

      .exam-form-group input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px var(--primary-glow);
      }

      .exam-form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
        margin-bottom: 1.5rem;
      }

      .exam-form-buttons {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
      }

      .exam-btn-cancel,
      .exam-btn-save {
        padding: 0.9rem 2rem;
        border-radius: 8px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1.05rem;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
      }

      .exam-btn-cancel {
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-secondary);
        border: 1px solid var(--border-subtle);
      }

      .exam-btn-cancel:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--text-muted);
      }

      .exam-btn-save {
        background: var(--primary-color);
        color: ${btnTextColor};
        box-shadow: 0 2px 10px var(--primary-glow);
      }

      .exam-btn-save:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px var(--primary-glow);
      }

      .exam-results-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .exam-result-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 2rem;
        transition: all 0.3s;
      }

      .exam-result-card:hover {
        border-color: var(--primary-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      .exam-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-subtle);
      }

      .exam-result-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .exam-result-title svg {
        color: var(--primary-color);
      }

      .exam-result-title h4 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
        color: #fff;
        margin: 0;
        letter-spacing: 1px;
      }

      .exam-delete-btn {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .exam-delete-btn:hover {
        background: #ef4444;
        border-color: #ef4444;
        color: #fff;
        transform: scale(1.1);
      }

      .exam-result-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .exam-stat-item {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .exam-stat-label {
        font-size: 0.85rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
      }

      .exam-stat-value {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
        color: #fff;
        letter-spacing: 1px;
      }

      .exam-percentage {
        font-size: 1rem;
        color: var(--primary-color);
        font-weight: 700;
      }

      .exam-result-total {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--primary-color);
        border-radius: 10px;
        padding: 1.25rem;
      }

      .exam-total-score {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: #fff;
      }

      .exam-total-score svg {
        color: var(--primary-color);
      }

      .exam-redacao {
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border-subtle);
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--text-secondary);
      }

      .exam-empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-muted);
      }

      .exam-empty-state svg {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        opacity: 0.5;
      }

      .exam-empty-state p {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.5rem;
        color: #fff;
        margin-bottom: 0.5rem;
        letter-spacing: 1px;
      }

      .exam-empty-state small {
        font-size: 0.95rem;
        color: var(--text-muted);
      }

      @media (max-width: 768px) {
        .exam-form-grid {
          grid-template-columns: 1fr;
        }

        .exam-result-stats {
          grid-template-columns: 1fr;
        }
      }
      
      /* Settings Styles */
      .settings-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .config-section h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.5rem;
        color: #fff;
        margin-bottom: 1rem;
        letter-spacing: 1px;
      }
      
      .config-desc {
        color: var(--text-muted);
        font-size: 0.95rem;
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }
      
      .file-input-wrapper {
        position: relative;
        display: inline-block;
      }
      
      .hidden-input {
        display: none;
      }
      
      .action-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      
      /* Color Picker Input */
      .color-picker-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      
      input[type="color"] {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: none;
        border: 0;
        cursor: pointer;
        width: 50px;
        height: 50px;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
      }
      
      input[type="color"]::-webkit-color-swatch {
        border: 2px solid var(--border-subtle);
        border-radius: 8px;
      }
      
      /* Radio Group Styles */
      .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        margin-bottom: 1.5rem;
      }
      
      .radio-option {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        cursor: pointer;
        padding: 0.8rem;
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border-subtle);
        border-radius: 8px;
        transition: all 0.2s;
      }
      
      .radio-option:hover {
        background: rgba(255,255,255,0.05);
        border-color: rgba(255,255,255,0.2);
      }
      
      .radio-option.selected {
        background: rgba(255,255,255,0.08);
        border-color: var(--primary-color);
        box-shadow: 0 0 10px var(--primary-glow-subtle);
      }
      
      .radio-circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      
      .radio-option.selected .radio-circle {
        border-color: var(--primary-color);
      }
      
      .radio-inner {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--primary-color);
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.2s;
      }
      
      .radio-option.selected .radio-inner {
        opacity: 1;
        transform: scale(1);
      }
      
      .radio-label {
        color: #fff;
        font-weight: 600;
        font-size: 1rem;
      }
      
      /* ACHIEVEMENTS GRID */
      .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
      }
      
      .achievement-card {
        background: rgba(0,0,0,0.2);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        gap: 1.2rem;
        align-items: center;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .achievement-card.unlocked {
        background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.1));
        border-color: rgba(255,255,255,0.2);
      }
      
      .achievement-card.unlocked:hover {
        transform: translateY(-2px);
        border-color: var(--primary-color);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      }
      
      .achievement-card.locked {
        opacity: 0.5;
        filter: grayscale(1);
      }
      
      .achievement-icon-box {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 2px solid transparent;
      }
      
      .achievement-card.unlocked .achievement-icon-box {
        background: rgba(255,255,255,0.1);
        border-color: var(--primary-color);
        box-shadow: 0 0 10px var(--primary-glow-subtle);
      }
      
      .achievement-content {
        flex: 1;
      }
      
      .achievement-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.4rem;
        color: #fff;
        letter-spacing: 1px;
        margin-bottom: 0.2rem;
      }
      
      .achievement-desc {
        color: var(--text-muted);
        font-size: 0.9rem;
        line-height: 1.4;
      }
      
      .achievement-status {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      
      .progress-section {
        margin-bottom: 2rem;
        text-align: center;
        padding: 2rem;
        background: rgba(255,255,255,0.03);
        border-radius: 12px;
        border: 1px solid var(--border-subtle);
      }
      
      .next-rank-info {
        color: var(--text-muted);
        margin-bottom: 1rem;
        font-size: 1rem;
      }
      
      .next-rank-title {
        color: var(--primary-color);
        font-weight: 700;
        text-transform: uppercase;
      }

      @media (max-width: 1024px) {
        .chart-container {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        .badges-container {
           position: relative;
           width: 100%;
           justify-content: center;
           margin-top: 1rem;
        }
      }

      @media (max-width: 768px) {
        .tabs {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: auto;
          transform: none;
          flex-direction: row;
          justify-content: space-around;
          padding: 0.75rem 0.5rem;
          border-radius: 0;
          border-right: none;
          border-top: 1px solid var(--border-subtle);
          background: rgba(9, 9, 11, 0.95);
        }
        
        .tab {
          width: auto;
          height: auto;
          padding: 0.625rem;
        }

        .tab::after {
          display: none;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: row;
          flex: 1;
          padding: 0;
          gap: 0;
          align-items: stretch;
          min-width: 0;
        }

        .sidebar-bottom {
          display: flex;
          flex-direction: row;
          border-top: none;
          padding: 0;
          gap: 0;
          align-items: stretch;
        }

        .sidebar-logo {
          display: none;
        }

        .content {
          padding: 2rem 1rem 6rem 1rem;
        }

        .music-player-panel {
          top: auto;
          bottom: 4.5rem;
          left: 1rem;
          right: 1rem;
          width: auto;
          max-width: calc(100% - 2rem);
        }

        .music-prompt-modal {
          margin: 1rem;
          padding: 2rem;
        }

        .music-prompt-buttons {
          flex-direction: column;
        }

        .music-prompt-buttons button {
          max-width: 100%;
        }

        .pomodoro-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          min-height: unset;
        }
        
        .timer-circle {
          width: 260px;
          height: 260px;
        }
        
        .time-text {
          font-size: 4rem;
        }

        .timer-header h2 {
          font-size: 2rem;
        }

        .btn-primary, .btn-secondary, .btn-danger {
          font-size: 1.2rem;
          padding: 0.85rem 1.75rem;
          min-width: 130px;
        }
        
        .calendar-grid {
           gap: 0.5rem;
        }
        
        .day-number {
           font-size: 0.8rem;
           top: 4px;
           left: 6px;
        }
        
        .day-total-mini {
           font-size: 1rem;
        }
        
        .time-config-row {
           flex-direction: row;
           gap: 2rem;
        }
        
        .secondary-grid {
          grid-template-columns: 1fr;
        }
        
        /* Mobile adjust for tree */
        .tree-level-1 {
           margin-left: 1rem;
        }
        .add-subject-wrapper {
           padding: 0.5rem 0.5rem 0.5rem 1rem;
        }
      }

      /* Modal Styles */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.64);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
        animation: fadeIn 0.38s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .modal-overlay.modal-closing {
        animation: fadeOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      @keyframes fadeOut {
        from { opacity: 1; }
        to   { opacity: 0; }
      }

      .modal-content {
        background: #111113;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 14px;
        max-width: 700px;
        width: 100%;
        max-height: 95vh;
        overflow-y: auto;
        box-shadow: 0 32px 60px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.06);
        animation: slideUp 0.42s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .modal-content.modal-content-closing {
        animation: slideDown 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
      }

      @keyframes slideUp {
        from {
          transform: translateY(28px) scale(0.97);
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }

      @keyframes slideDown {
        from {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        to {
          transform: translateY(20px) scale(0.97);
          opacity: 0;
        }
      }

      .modal-header {
        padding: 1.1rem 1.5rem 1rem;
        border-bottom: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modal-header h2 {
        font-size: 1.7rem;
        font-weight: 900;
        color: var(--primary-color);
        margin: 0;
        letter-spacing: -0.5px;
        text-shadow: 0 0 32px var(--primary-glow-subtle), 0 2px 8px rgba(0,0,0,0.4);
      }

      .modal-close {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .modal-close:hover {
        background: var(--bg-input);
        color: var(--text-primary);
      }

      .modal-body {
        padding: 1.1rem 1.5rem;
      }

      .modal-footer {
        padding: 0.85rem 1.5rem;
        border-top: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.75rem;
        flex-wrap: nowrap;
      }

      .modal-footer .btn-primary,
      .modal-footer .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      }

      /* Subject Selection Grid */
      .subject-selection-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
      }

      .subject-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.25rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
      }

      .subject-option:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .subject-option span:first-child {
        font-size: 2rem;
      }

      /* Questions Input */
      .questions-input-group {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .question-input-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }

      .modal-label {
        display: block;
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--text-primary);
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.75;
      }

      .modal-section-title {
        display: block;
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: 0.2px;
        margin-bottom: 0.4rem;
      }

      .modal-input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 0.6rem 1rem;
        font-size: 1rem;
        color: #f4f4f5;
        transition: all 0.2s;
        font-weight: 600;
      }

      .modal-input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(${r}, ${g}, ${b}, 0.1);
      }

      .accuracy-display {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--bg-input);
        border-radius: 8px;
        text-align: center;
        font-size: 1rem;
        color: var(--text-secondary);
      }

      .accuracy-display strong {
        color: var(--primary);
        font-size: 1.5rem;
        display: block;
        margin-top: 0.25rem;
      }

      @media (max-width: 768px) {
        .subject-selection-grid {
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
        }

        .subject-option {
          padding: 1rem 0.75rem;
          font-size: 0.85rem;
        }

        .subject-option span:first-child {
          font-size: 1.75rem;
        }
      }

      /* ================================================ */
      /* TASK MANAGER — redesign completo               */
      /* ================================================ */

      .tm-root {
        padding: 0 2rem 3rem;
        max-width: 1400px;
        margin: 0 auto;
      }

      /* Header */
      .tm-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid var(--border-subtle);
      }

      .tm-header-left {
        display: flex;
        align-items: baseline;
        gap: 1rem;
      }

      .tm-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.2rem;
        letter-spacing: 2px;
        color: #fff;
        margin: 0;
      }

      .tm-global-badge {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--text-muted);
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      /* Empty state */
      .tm-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5rem 2rem;
        gap: 0.5rem;
      }

      .tm-empty-icon {
        width: 72px;
        height: 72px;
        border-radius: 20px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255,255,255,0.2);
        margin-bottom: 0.75rem;
      }

      .tm-empty-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.5rem;
        letter-spacing: 1px;
        color: rgba(255,255,255,0.4);
        margin: 0;
      }

      .tm-empty-sub {
        font-size: 0.85rem;
        color: rgba(255,255,255,0.2);
        margin: 0;
      }

      /* Grid */
      .tm-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
        align-items: start;
      }

      @media (max-width: 1100px) { .tm-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 680px)  { .tm-grid { grid-template-columns: 1fr; } }

      /* Card */
      .tm-card {
        background: var(--bg-card);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }

      .tm-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        border-color: rgba(255,255,255,0.13);
      }

      /* Faixa colorida no topo */
      .tm-card-stripe {
        height: 4px;
        width: 100%;
        flex-shrink: 0;
      }

      /* Header do card */
      .tm-card-header {
        padding: 1rem 1.1rem 0.9rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
        position: relative;
      }

      .tm-card-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .tm-card-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.35rem;
        letter-spacing: 1px;
        color: #fff;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }

      .tm-card-actions {
        display: flex;
        gap: 0.15rem;
        opacity: 0;
        transition: opacity 0.15s ease;
        flex-shrink: 0;
      }

      .tm-card:hover .tm-card-actions {
        opacity: 1;
      }

      .tm-icon-btn {
        width: 26px;
        height: 26px;
        border-radius: 6px;
        border: none;
        background: transparent;
        color: rgba(255,255,255,0.35);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s, color 0.15s;
      }

      .tm-icon-btn:hover {
        background: rgba(255,255,255,0.08);
        color: #fff;
      }

      .tm-icon-btn-danger:hover {
        background: rgba(239,68,68,0.15);
        color: #ef4444;
      }

      /* Barra de progresso */
      .tm-progress-row {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .tm-progress-track {
        flex: 1;
        height: 4px;
        background: rgba(255,255,255,0.07);
        border-radius: 2px;
        overflow: hidden;
      }

      .tm-progress-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.45s cubic-bezier(0.4,0,0.2,1);
      }

      .tm-progress-label {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.3px;
        flex-shrink: 0;
        font-family: 'Rajdhani', sans-serif;
      }

      /* Chevron */
      .tm-chevron {
        color: rgba(255,255,255,0.2);
        transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), color 0.15s;
        align-self: flex-end;
        position: absolute;
        bottom: 0.9rem;
        right: 1.1rem;
      }

      .tm-chevron-open {
        transform: rotate(180deg);
        color: rgba(255,255,255,0.45);
      }

      /* Corpo expandido */
      .tm-card-body {
        border-top: 1px solid rgba(255,255,255,0.05);
        padding: 0.85rem 1.1rem 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      /* Input de nova tarefa */
      .tm-input-row {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
      }

      .tm-task-input {
        flex: 1;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 8px;
        padding: 0.55rem 0.8rem;
        color: var(--text-main);
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        transition: border-color 0.18s, background-color 0.18s;
        outline: none;
      }

      .tm-task-input::placeholder { color: rgba(255,255,255,0.18); }
      .tm-task-input:focus {
        border-color: rgba(255,255,255,0.22);
        background: rgba(255,255,255,0.06);
      }

      .tm-add-task-btn {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: none;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: opacity 0.15s, transform 0.15s;
        opacity: 0.85;
      }

      .tm-add-task-btn:hover:not(:disabled) { opacity: 1; transform: scale(1.08); }
      .tm-add-task-btn:disabled { opacity: 0.2; cursor: not-allowed; }

      /* Sem tarefas */
      .tm-no-tasks {
        text-align: center;
        padding: 1rem 0 0.5rem;
        color: rgba(255,255,255,0.15);
        font-size: 0.8rem;
        font-style: italic;
        margin: 0;
      }

      /* Lista de tarefas */
      .tm-tasks {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }

      .tm-task {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.45rem 0.5rem;
        border-radius: 7px;
        transition: background-color 0.15s;
      }

      .tm-task:hover { background: rgba(255,255,255,0.04); }

      .tm-task-done .tm-task-label {
        text-decoration: line-through;
        color: rgba(255,255,255,0.22);
      }

      /* Checkbox */
      .tm-checkbox {
        width: 17px;
        height: 17px;
        border: 1.5px solid rgba(255,255,255,0.18);
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: border-color 0.15s, background-color 0.15s;
      }

      .tm-checkbox:hover { border-color: rgba(255,255,255,0.4); }

      /* Título da tarefa */
      .tm-task-label {
        flex: 1;
        font-size: 0.88rem;
        font-weight: 600;
        color: rgba(255,255,255,0.85);
        user-select: none;
        line-height: 1.3;
        cursor: default;
      }

      /* Ações da tarefa */
      .tm-task-actions {
        display: flex;
        gap: 0.1rem;
        opacity: 0;
        transition: opacity 0.15s;
      }

      .tm-task:hover .tm-task-actions { opacity: 1; }

      .tm-task-btn {
        width: 22px;
        height: 22px;
        border-radius: 4px;
        border: none;
        background: transparent;
        color: rgba(255,255,255,0.25);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s, color 0.15s;
      }

      .tm-task-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
      .tm-task-btn-danger:hover { background: rgba(239,68,68,0.12); color: #ef4444; }

      /* Edição inline */
      .tm-name-input,
      .tm-task-edit {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 5px;
        padding: 0.15rem 0.45rem;
        color: var(--text-main);
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        letter-spacing: inherit;
        width: 100%;
        outline: none;
      }

      .tm-name-input:focus, .tm-task-edit:focus {
        border-color: rgba(255,255,255,0.35);
      }

      /* Color picker no modal */
      .tm-color-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.6rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }

      .tm-color-dot {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 8px;
        border: 2px solid transparent;
        cursor: pointer;
        transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
      }

      .tm-color-dot:hover { transform: scale(1.12); }
      .tm-color-dot.selected {
        border-color: #fff;
        box-shadow: 0 0 0 3px rgba(255,255,255,0.12);
        transform: scale(1.08);
      }

      /* Preview de cor no modal */
      .tm-color-preview {
        border: 1px solid;
        border-radius: 10px;
        padding: 0.8rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.25rem;
        transition: border-color 0.2s, background-color 0.2s;
      }

      .tm-color-preview-stripe {
        width: 4px;
        height: 28px;
        border-radius: 2px;
        flex-shrink: 0;
        transition: background-color 0.2s;
      }

      /* Legacy classes (mantidas para compatibilidade) */
      .task-manager-container { padding: 0 2rem 3rem; max-width: 1400px; margin: 0 auto; }
      .task-groups-list { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; align-items: start; }
      .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
      .empty-state h3 { margin: 1rem 0 0.5rem; color: var(--text-main); font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; letter-spacing: 1px; }
    `}</style>
  );
};

export default CustomStyles;