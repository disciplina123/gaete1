import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Target, CheckCircle2, AlertTriangle, Edit2, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Session } from '../types';

interface CalendarProps {
  sessions: Session[];
  dailyGoal: number;
  onUpdateGoal: (minutes: number) => void;
}

interface DayData {
  totalDuration: number;
  totalQuestions: number;
  totalCorrect: number;
  subjects: Record<string, {
    duration: number;
    questions: number;
    correct: number;
  }>;
}

const Calendar: React.FC<CalendarProps> = ({ sessions, dailyGoal, onUpdateGoal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSessions, setEditingSessions] = useState<Session[]>([]);
  
  // Inicializa com a data de hoje
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(todayKey);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
  };

  const sessionsByDate = useMemo(() => {
    const grouped: Record<string, DayData> = {};
    
    sessions.forEach(session => {
      const dateKey = session.date.split('T')[0];
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = { 
          totalDuration: 0, 
          totalQuestions: 0,
          totalCorrect: 0,
          subjects: {} 
        };
      }
      
      grouped[dateKey].totalDuration += session.duration;
      grouped[dateKey].totalQuestions += (session.questions || 0);
      grouped[dateKey].totalCorrect += (session.correctQuestions || 0);
      
      if (!grouped[dateKey].subjects[session.subject]) {
        grouped[dateKey].subjects[session.subject] = {
          duration: 0,
          questions: 0,
          correct: 0
        };
      }
      
      grouped[dateKey].subjects[session.subject].duration += session.duration;
      grouped[dateKey].subjects[session.subject].questions += (session.questions || 0);
      grouped[dateKey].subjects[session.subject].correct += (session.correctQuestions || 0);
    });
    
    return grouped;
  }, [sessions]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getFirstDayOfMonth(year, month);
  
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDateKey(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDateKey(null);
  };

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const data = sessionsByDate[dateStr];
    const isSelected = selectedDateKey === dateStr;
    
    const duration = data ? data.totalDuration : 0;
    const isGoalMet = duration >= dailyGoal;
    const isWarning = duration > 0 && duration < dailyGoal;
    
    let goalClass = '';
    if (isGoalMet) goalClass = 'goal-met';
    else if (isWarning) goalClass = 'goal-warning';

    days.push(
      <div 
        key={d} 
        className={`calendar-day ${data ? 'has-data' : ''} ${isSelected ? 'selected' : ''} ${goalClass}`}
        onClick={() => data ? setSelectedDateKey(dateStr) : setSelectedDateKey(null)}
      >
        <span className="day-number">{d}</span>
        {data && (
          <>
            <div className="day-total-mini">{formatDuration(data.totalDuration)}</div>
            <div className="day-indicator">
              <div className="dot"></div>
            </div>
          </>
        )}
      </div>
    );
  }

  const selectedData = selectedDateKey ? sessionsByDate[selectedDateKey] : null;

  // Funções de edição
  const openEditModal = () => {
    // Carregar sessões do localStorage
    const storedSessions = localStorage.getItem('study-sessions');
    const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
    
    // Pegar apenas as últimas 10 sessões
    const recentSessions = allSessions.slice(-10).reverse();
    setEditingSessions(recentSessions);
    setShowEditModal(true);
  };

  const moveSessionToDate = (sessionIndex: number, daysBack: number) => {
    const storedSessions = localStorage.getItem('study-sessions');
    const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
    
    const session = allSessions[sessionIndex];
    if (session) {
      const newDate = new Date(session.date);
      newDate.setDate(newDate.getDate() - daysBack);
      session.date = newDate.toISOString();
      
      localStorage.setItem('study-sessions', JSON.stringify(allSessions));
      window.location.reload();
    }
  };

  const editSessionQuestions = (sessionIndex: number, questions: number, correctQuestions: number) => {
    const storedSessions = localStorage.getItem('study-sessions');
    const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
    
    const session = allSessions[sessionIndex];
    if (session) {
      session.questions = questions;
      session.correctQuestions = correctQuestions;
      
      localStorage.setItem('study-sessions', JSON.stringify(allSessions));
      window.location.reload();
    }
  };

  const editSessionTime = (sessionIndex: number, duration: number) => {
    const storedSessions = localStorage.getItem('study-sessions');
    const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
    
    const session = allSessions[sessionIndex];
    if (session) {
      session.duration = duration;
      
      localStorage.setItem('study-sessions', JSON.stringify(allSessions));
      window.location.reload();
    }
  };

  const deleteSession = (sessionIndex: number) => {
    if (!confirm('Tem certeza que deseja deletar esta sessão?')) return;
    
    const storedSessions = localStorage.getItem('study-sessions');
    const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
    
    allSessions.splice(sessionIndex, 1);
    localStorage.setItem('study-sessions', JSON.stringify(allSessions));
    window.location.reload();
  };

  const fixEarlyMorningSessions = (hourLimit: number = 6) => {
    const storedSessions = localStorage.getItem('study-sessions');
    const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
    const todayStr = new Date().toISOString().split('T')[0];
    let fixed = 0;

    allSessions.forEach(session => {
      if (session.date.startsWith(todayStr)) {
        const sessionDate = new Date(session.date);
        const hour = sessionDate.getHours();
        
        if (hour < hourLimit) {
          sessionDate.setDate(sessionDate.getDate() - 1);
          session.date = sessionDate.toISOString();
          fixed++;
        }
      }
    });

    if (fixed > 0) {
      localStorage.setItem('study-sessions', JSON.stringify(allSessions));
      alert(`${fixed} sessões movidas para o dia anterior!`);
      window.location.reload();
    } else {
      alert('Nenhuma sessão de madrugada encontrada.');
    }
  };

  const moveAllTodayToYesterday = () => {
    if (!confirm('Mover TODAS as sessões de hoje para ontem?')) return;
    
    const storedSessions = localStorage.getItem('study-sessions');
    const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
    const todayStr = new Date().toISOString().split('T')[0];
    let moved = 0;

    allSessions.forEach(session => {
      if (session.date.startsWith(todayStr)) {
        const sessionDate = new Date(session.date);
        sessionDate.setDate(sessionDate.getDate() - 1);
        session.date = sessionDate.toISOString();
        moved++;
      }
    });

    if (moved > 0) {
      localStorage.setItem('study-sessions', JSON.stringify(allSessions));
      alert(`${moved} sessões movidas para ontem!`);
      window.location.reload();
    } else {
      alert('Nenhuma sessão de hoje encontrada.');
    }
  };

  return (
    <div className="calendar-container-horizontal">
      <div className="calendar-left-section">
        <div className="goal-config-compact">
           <Target size={18} color="#ffffff" />
           <label>Meta:</label>
           <input 
             type="number" 
             value={dailyGoal} 
             onChange={(e) => onUpdateGoal(Number(e.target.value))}
             min="1"
           />
           <span className="goal-info">
             ({formatDuration(dailyGoal)})
           </span>
        </div>

        <div className="calendar-header-nav-compact">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon size={20} color="#ffffff" />
            <span className="month-title-compact">{monthNames[month]} {year}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={openEditModal} className="btn-edit-sessions" title="Editar Sessões">
              <Edit2 size={16} />
            </button>
            <button onClick={prevMonth} className="nav-btn-compact"><ChevronLeft size={18} /></button>
            <button onClick={nextMonth} className="nav-btn-compact"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="calendar-grid-compact">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="calendar-day-header-compact">{day}</div>
          ))}
          {days}
        </div>
      </div>

      <div className="calendar-right-section">
        {selectedData && selectedDateKey ? (
          <>
            <div className="details-header-compact">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Hoje - {selectedDateKey.split('-').reverse().join('/')}
              </h3>
              
              <div style={{display: 'flex', gap: '1.5rem', marginBottom: '1rem', color: '#ccc', fontSize: '0.95rem'}}>
                <p>
                  Tempo: <span style={{color: '#fff', fontWeight: 'bold'}}>{formatDuration(selectedData.totalDuration)}</span>
                </p>
                <p>
                  Questões: <span style={{color: '#fff', fontWeight: 'bold'}}>{selectedData.totalCorrect}/{selectedData.totalQuestions}</span>
                </p>
              </div>

              <div className="goal-status-box">
                {selectedData.totalDuration >= dailyGoal ? (
                  <div>
                    <span className="goal-status-text" style={{color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
                      <CheckCircle2 size={16} /> Meta Atingida!
                    </span>
                    <div className="goal-progress-bar">
                      <div className="goal-progress-fill" style={{width: '100%', background: '#22c55e'}}></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="goal-status-text" style={{color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
                      <AlertTriangle size={16} /> Faltam {formatDuration(dailyGoal - selectedData.totalDuration)}
                    </span>
                    <div className="goal-progress-bar">
                      <div 
                        className="goal-progress-fill" 
                        style={{
                          width: `${(selectedData.totalDuration / dailyGoal) * 100}%`, 
                          background: '#f97316'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="day-stats-grid-compact">
              {Object.entries(selectedData.subjects).map(([subject, data]) => (
                <div key={subject} className="stat-box-compact">
                  <span className="stat-subject-compact">{subject}</span>
                  <div className="stat-row-compact">
                    <span>Duração:</span>
                    <span>{formatDuration(data.duration)}</span>
                  </div>
                  <div className="stat-row-compact">
                    <span>Questões:</span>
                    <span>{data.correct}/{data.questions}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>Sem atividades para hoje</p>
          </div>
        )}
      </div>

      {/* Modal de Edição de Sessões */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content session-editor-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Editor de Sessões</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {/* Ações Rápidas */}
              <div className="quick-actions-section">
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                  ⚡ Ações Rápidas
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: '1fr 1fr' }}>
                  <button 
                    className="btn-secondary" 
                    onClick={moveAllTodayToYesterday}
                    style={{ fontSize: '0.9rem', padding: '0.75rem' }}
                  >
                    📅 Mover Hoje → Ontem
                  </button>
                  <button 
                    className="btn-secondary" 
                    onClick={() => fixEarlyMorningSessions(6)}
                    style={{ fontSize: '0.9rem', padding: '0.75rem' }}
                  >
                    🌙 Corrigir Madrugada (00h-06h)
                  </button>
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '1.5rem 0' }} />

              {/* Lista de Sessões */}
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                📋 Últimas 10 Sessões
              </h3>
              
              {editingSessions.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  Nenhuma sessão encontrada
                </p>
              ) : (
                editingSessions.map((session, idx) => {
                  const sessionDate = new Date(session.date);
                  const dateStr = sessionDate.toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: '2-digit',
                    year: 'numeric'
                  });
                  const timeStr = sessionDate.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  });
                  
                  // Encontrar índice real no array completo
                  const storedSessions = localStorage.getItem('study-sessions');
                  const allSessions: Session[] = storedSessions ? JSON.parse(storedSessions) : [];
                  const realIndex = allSessions.findIndex(s => s.id === session.id);

                  return (
                    <div key={session.id} className="session-edit-card">
                      <div className="session-edit-header">
                        <div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {dateStr} às {timeStr}
                          </div>
                          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                            {session.subject}
                          </div>
                        </div>
                        <button 
                          className="btn-danger-small"
                          onClick={() => deleteSession(realIndex)}
                          title="Deletar sessão"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="session-edit-stats">
                        <div className="session-stat-item">
                          <span className="stat-label">⏱️ Tempo:</span>
                          <span className="stat-value">{session.duration} min</span>
                        </div>
                        <div className="session-stat-item">
                          <span className="stat-label">📝 Questões:</span>
                          <span className="stat-value">{session.correctQuestions}/{session.questions}</span>
                        </div>
                      </div>

                      <div className="session-edit-actions">
                        <button 
                          className="btn-action-small"
                          onClick={() => {
                            const newDuration = prompt('Novo tempo (em minutos):', session.duration.toString());
                            if (newDuration && !isNaN(Number(newDuration))) {
                              editSessionTime(realIndex, Number(newDuration));
                            }
                          }}
                        >
                          ⏱️ Editar Tempo
                        </button>
                        <button 
                          className="btn-action-small"
                          onClick={() => {
                            const newTotal = prompt('Total de questões:', session.questions.toString());
                            if (newTotal && !isNaN(Number(newTotal))) {
                              const newCorrect = prompt('Questões acertadas:', session.correctQuestions.toString());
                              if (newCorrect && !isNaN(Number(newCorrect))) {
                                editSessionQuestions(realIndex, Number(newTotal), Number(newCorrect));
                              }
                            }
                          }}
                        >
                          📝 Editar Questões
                        </button>
                        <button 
                          className="btn-action-small"
                          onClick={() => {
                            const days = prompt('Mover para quantos dias atrás?', '1');
                            if (days && !isNaN(Number(days))) {
                              moveSessionToDate(realIndex, Number(days));
                            }
                          }}
                        >
                          📅 Mover Data
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
