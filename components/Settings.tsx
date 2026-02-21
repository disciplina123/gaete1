import React, { useRef } from 'react';
import { Palette, VolumeX, Volume2, Bell, Download, Upload, AlertTriangle, Trash2, Database, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import { ColorMode, BackgroundMode, SidebarLayout } from '../types';
import { storageService } from '../services/storageService';

interface SettingsProps {
  onDataImported: () => void;
  primaryColor: string;
  onColorChange: (color: string) => void;
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
  backgroundMode: BackgroundMode;
  onBackgroundModeChange: (mode: BackgroundMode) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  notificationsEnabled: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  sidebarLayout: SidebarLayout;
  onSidebarLayoutChange: (layout: SidebarLayout) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  onDataImported, 
  primaryColor, 
  onColorChange,
  colorMode: _colorMode,
  onColorModeChange: _onColorModeChange,
  backgroundMode,
  onBackgroundModeChange,
  volume,
  onVolumeChange,
  notificationsEnabled,
  onNotificationsChange,
  sidebarLayout,
  onSidebarLayoutChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = storageService.createBackup();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = storageService.restoreBackup(content);
        if (success) {
          alert('Dados restaurados com sucesso! A página será recarregada.');
          onDataImported();
          window.location.reload();
        } else {
          alert('Erro ao restaurar arquivo. Verifique se é um backup válido.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearData = () => {
    if (confirm('TEM CERTEZA? Isso apagará TODAS as suas matérias, sessões e estatísticas permanentemente. Esta ação não pode ser desfeita.')) {
      storageService.clearAll();
      window.location.reload();
    }
  };

  const handleResetColor = () => onColorChange('#ffffff');
  const requestNotificationPermission = async () => {
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      onNotificationsChange(permission === 'granted');
      if (permission !== 'granted') alert('Permissão de notificação negada pelo navegador.');
    } else {
      onNotificationsChange(!notificationsEnabled);
    }
  };

  const backgrounds = [
    { value: 'solid',   label: 'Sólido',      desc: 'Foco total' },
    { value: 'soft',    label: 'Suave',        desc: 'Conforto visual' },
    { value: 'ocean',   label: 'Oceano',       desc: 'Animado' },
    { value: 'sunset',  label: 'Entardecer',   desc: 'Animado' },
    { value: 'snow',    label: 'Neve',         desc: 'Animado' },
    { value: 'space',   label: 'Espaço',       desc: 'Sideral' },
    { value: 'forest',  label: 'Floresta',     desc: 'Natural' },
    { value: 'mosaic',  label: 'Mosaico',      desc: 'Geométrico' },
  ];

  const layouts = [
    {
      id: 'icons' as SidebarLayout,
      label: 'Ícones',
      desc: 'Barra lateral compacta',
      preview: (
        <div className="cfg-layout-preview cfg-preview-icons">
          <div className="cfg-preview-sidebar">
            {[0,1,2,3,4].map(i => <div key={i} className="cfg-prev-dot" />)}
          </div>
          <div className="cfg-preview-content" />
        </div>
      )
    },
    {
      id: 'gaete' as SidebarLayout,
      label: 'Gaete',
      desc: 'Barra lateral com texto',
      preview: (
        <div className="cfg-layout-preview cfg-preview-gaete">
          <div className="cfg-preview-sidebar cfg-preview-sidebar-wide">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="cfg-prev-row">
                <div className="cfg-prev-dot" />
                <div className="cfg-prev-bar" />
              </div>
            ))}
          </div>
          <div className="cfg-preview-content" />
        </div>
      )
    },
    {
      id: 'bottom' as SidebarLayout,
      label: 'Inferior',
      desc: 'Barra no rodapé',
      preview: (
        <div className="cfg-layout-preview cfg-preview-bottom">
          <div className="cfg-preview-content cfg-preview-content-full" />
          <div className="cfg-preview-bottombar">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="cfg-prev-bottom-item">
                <div className="cfg-prev-dot" />
                <div className="cfg-prev-bar cfg-prev-bar-short" />
              </div>
            ))}
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="cfg-root">

      {/* ── APARÊNCIA ─────────────────────────────────────────── */}
      <section className="cfg-section">
        <div className="cfg-section-label">
          <Palette size={15} />
          Aparência
        </div>

        <div className="cfg-cards-row">

          {/* Cor principal */}
          <div className="cfg-card">
            <div className="cfg-card-title">Cor Principal</div>
            <div className="cfg-card-desc">Define a cor de destaque do app</div>
            <div className="cfg-color-row">
              <label className="cfg-color-swatch" style={{ background: primaryColor }}>
                <input type="color" value={primaryColor} onChange={e => onColorChange(e.target.value)} />
              </label>
              <span className="cfg-color-hex">{primaryColor.toUpperCase()}</span>
              <button className="cfg-btn-ghost" onClick={handleResetColor}>Resetar</button>
            </div>
          </div>

          {/* Plano de fundo */}
          <div className="cfg-card cfg-card-wide">
            <div className="cfg-card-title">Plano de Fundo</div>
            <div className="cfg-card-desc">Estilo visual do fundo da aplicação</div>
            <div className="cfg-bg-grid">
              {backgrounds.map(({ value, label, desc }) => (
                <button
                  key={value}
                  className={`cfg-bg-option ${backgroundMode === value ? 'cfg-bg-active' : ''}`}
                  onClick={() => onBackgroundModeChange(value as BackgroundMode)}
                >
                  <span className="cfg-bg-name">{label}</span>
                  <span className="cfg-bg-desc">{desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── BARRA DE NAVEGAÇÃO ────────────────────────────────── */}
      <section className="cfg-section">
        <div className="cfg-section-label">
          <SettingsIcon size={15} />
          Barra de Navegação
        </div>

        <div className="cfg-layouts-row">
          {layouts.map(({ id, label, desc, preview }) => (
            <button
              key={id}
              className={`cfg-layout-card ${sidebarLayout === id ? 'cfg-layout-active' : ''}`}
              onClick={() => onSidebarLayoutChange(id)}
            >
              {preview}
              <div className="cfg-layout-info">
                <span className="cfg-layout-name">{label}</span>
                <span className="cfg-layout-desc">{desc}</span>
              </div>
              {sidebarLayout === id && <div className="cfg-layout-check">✓</div>}
            </button>
          ))}
        </div>
      </section>

      {/* ── SOM & NOTIFICAÇÕES ────────────────────────────────── */}
      <section className="cfg-section">
        <div className="cfg-section-label">
          <Volume2 size={15} />
          Som &amp; Notificações
        </div>

        <div className="cfg-cards-row">

          <div className="cfg-card">
            <div className="cfg-card-title">Volume dos Efeitos</div>
            <div className="cfg-card-desc">Sons ao interagir com o app</div>
            <div className="cfg-volume-row">
              {volume === 0 ? <VolumeX size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <Volume2 size={16} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />}
              <input
                type="range" min="0" max="1" step="0.1" value={volume}
                onChange={e => onVolumeChange(parseFloat(e.target.value))}
                className="cfg-slider"
                style={{ '--accent': primaryColor } as React.CSSProperties}
              />
              <span className="cfg-volume-pct">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          <div className="cfg-card">
            <div className="cfg-card-title">Notificações</div>
            <div className="cfg-card-desc">Alertas ao fim do temporizador</div>
            <button
              className={`cfg-toggle ${notificationsEnabled ? 'cfg-toggle-on' : ''}`}
              onClick={requestNotificationPermission}
            >
              <div className="cfg-toggle-track">
                <div className="cfg-toggle-thumb" />
              </div>
              <span>{notificationsEnabled ? 'Ativadas' : 'Desativadas'}</span>
              <Bell size={15} />
            </button>
          </div>

        </div>
      </section>

      {/* ── DADOS ─────────────────────────────────────────────── */}
      <section className="cfg-section">
        <div className="cfg-section-label">
          <Database size={15} />
          Dados
        </div>

        <div className="cfg-cards-row">

          <div className="cfg-card">
            <div className="cfg-card-title">Backup</div>
            <div className="cfg-card-desc">Exporte ou importe seus dados de estudo</div>
            <div className="cfg-data-btns">
              <button className="cfg-btn-primary" onClick={handleExport}>
                <Download size={16} /> Exportar
              </button>
              <button className="cfg-btn-secondary" onClick={handleImportClick}>
                <Upload size={16} /> Importar
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" style={{ display: 'none' }} />
            </div>
          </div>

          <div className="cfg-card cfg-card-danger">
            <div className="cfg-card-title cfg-danger-title">Zona de Perigo</div>
            <div className="cfg-card-desc">Remove permanentemente todos os dados deste navegador</div>
            <button className="cfg-btn-danger" onClick={handleClearData}>
              <Trash2 size={16} /> Apagar Tudo
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Settings;
