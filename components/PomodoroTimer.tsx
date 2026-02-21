import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Square, X } from 'lucide-react';
import { soundService } from '../services/soundService';

interface PomodoroTimerProps {
  isBreak: boolean;
  isRunning: boolean;
  timeLeft: number;
  studyTime: number | '';
  breakTime: number | '';
  questionsResolved: number;
  correctQuestions: number;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onStudyTimeChange: (val: number | '') => void;
  onBreakTimeChange: (val: number | '') => void;
  onStudyTimeBlur: () => void;
  onBreakTimeBlur: () => void;
  onQuestionsResolvedChange: (val: number) => void;
  onCorrectQuestionsChange: (val: number) => void;
  notificationsEnabled: boolean;
  subjects: Array<{ id: number; name: string; color: string }>;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  onSessionComplete: (questions?: number, correct?: number, duration?: number) => void;
  animationKey?: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  isBreak,
  isRunning,
  timeLeft,
  studyTime,
  breakTime,
  questionsResolved,
  correctQuestions,
  onStart,
  onPause,
  onStop,
  onStudyTimeChange,
  onBreakTimeChange,
  onStudyTimeBlur,
  onBreakTimeBlur,
  onQuestionsResolvedChange,
  onCorrectQuestionsChange,
  notificationsEnabled,
  subjects,
  selectedSubject,
  onSubjectChange,
  onSessionComplete,
  animationKey,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [tempQuestionsResolved, setTempQuestionsResolved] = useState(0);
  const [tempCorrectQuestions, setTempCorrectQuestions] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(timeLeft)} - ${isBreak ? 'Pausa' : 'Foco'}`;
    } else {
      document.title = 'Gaete';
    }
    
    return () => {
       if (!isRunning) document.title = 'Gaete';
    };
  }, [timeLeft, isRunning, isBreak]);

  // Detecta quando o timer de foco termina naturalmente (chegou a 0)
  useEffect(() => {
    console.log('⏰ useEffect timer check:', { timeLeft, isRunning, isBreak });
    if (timeLeft === 0 && !isRunning && !isBreak) {
      console.log('🎯 Timer terminou! Mostrando modal de questões');
      // Mostra o modal de questões quando o tempo de foco acaba
      setShowQuestionsModal(true);
    }
  }, [timeLeft, isRunning, isBreak]);

  // Re-dispara animação de entrada quando navegar para esta aba
  useEffect(() => {
    const el = containerRef.current;
    if (!el || animationKey === 1) return;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'pomodoroFadeIn 0.3s ease both';
    const onEnd = () => { el.style.animation = ''; };
    el.addEventListener('animationend', onEnd, { once: true });
    return () => el.removeEventListener('animationend', onEnd);
  }, [animationKey]);

  useEffect(() => {
    console.log('🔔 showQuestionsModal mudou para:', showQuestionsModal);
  }, [showQuestionsModal]);

  useEffect(() => {
    if (timeLeft === 0 && !isRunning && notificationsEnabled) {
        if (Notification.permission === 'granted') {
             new Notification(isBreak ? "Intervalo Terminado!" : "Foco Terminado!", {
                body: isBreak ? "Hora de voltar aos estudos." : "Bom trabalho! Hora de uma pausa.",
                icon: "/favicon.ico"
             });
        }
    }
  }, [timeLeft, isRunning, notificationsEnabled, isBreak]);

  const timerMax = isBreak ? (Number(breakTime) || 1) * 60 : (Number(studyTime) || 1) * 60;
  const progress = (timerMax - timeLeft) / timerMax * 100;

  const handleStart = () => {
    if (subjects.length > 0 && timeLeft === (Number(studyTime) || 1) * 60) {
      setShowSubjectModal(true);
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    if (notificationsEnabled && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    soundService.playStart();
    onStart();
    setShowSubjectModal(false);
  };

  const handleSubjectSelect = (subjectName: string) => {
    onSubjectChange(subjectName);
    startTimer();
  };

  const handlePause = () => {
    soundService.playPause();
    onPause();
  };

  const handleStop = () => {
    console.log('🛑 handleStop chamado', { isBreak, isRunning, timeLeft, timerMax });
    soundService.playStop();
    
    // Verifica se houve tempo decorrido (independente de estar rodando ou pausado)
    const tempoDecorrido = timerMax - timeLeft;
    
    // Se estava estudando (não em pausa de descanso) e houve algum tempo decorrido
    if (!isBreak && tempoDecorrido > 0) {
      console.log('✅ Condição atendida: mostrando modal de questões. Tempo decorrido:', tempoDecorrido, 's');
      // Para o timer sem resetar para poder calcular o tempo decorrido
      if (isRunning) onPause();
      setShowQuestionsModal(true);
    } else {
      console.log('❌ Condição NÃO atendida: chamando onStop direto');
      onStop();
    }
  };

  const handleQuestionsSubmit = () => {
    console.log('📝 Confirmando questões:', { tempQuestionsResolved, tempCorrectQuestions });
    
    // Calcula o tempo decorrido em minutos
    const currentStudyTime = Number(studyTime) || 25;
    let elapsedMinutes: number;
    
    if (timeLeft === 0) {
      // Timer completou naturalmente - usa o tempo total
      elapsedMinutes = currentStudyTime;
      console.log('⏱️ Timer completou naturalmente:', elapsedMinutes, 'minutos');
    } else {
      // Timer foi finalizado manualmente - calcula tempo decorrido
      const timeElapsedInSeconds = (currentStudyTime * 60) - timeLeft;
      elapsedMinutes = Math.ceil(timeElapsedInSeconds / 60); // Arredonda para cima
      console.log('⏱️ Timer finalizado manualmente. Tempo decorrido:', elapsedMinutes, 'minutos');
    }
    
    setShowQuestionsModal(false);
    
    // Passa os valores diretamente para onSessionComplete, incluindo a duração
    onSessionComplete(tempQuestionsResolved, tempCorrectQuestions, elapsedMinutes);
    
    // Reseta os valores temporários
    setTempQuestionsResolved(0);
    setTempCorrectQuestions(0);
  };

  const handleSkipQuestions = () => {
    console.log('⏭️ Pulando registro de questões');
    setShowQuestionsModal(false);
    setTempQuestionsResolved(0);
    setTempCorrectQuestions(0);
    
    // Calcula o tempo decorrido para salvar a sessão mesmo pulando as questões
    const currentStudyTime = Number(studyTime) || 25;
    let elapsedMinutes: number;
    if (timeLeft === 0) {
      elapsedMinutes = currentStudyTime;
    } else {
      const timeElapsedInSeconds = (currentStudyTime * 60) - timeLeft;
      elapsedMinutes = Math.max(1, Math.ceil(timeElapsedInSeconds / 60));
    }
    
    // Salva a sessão sem questões
    onSessionComplete(0, 0, elapsedMinutes);
  };
  
  return (
    <>
      <div className="pomodoro-container" ref={containerRef}>
        <div className="timer-floating">
          
          <div className="timer-circle">
            <svg className="timer-svg" viewBox="0 0 200 200">
              <circle className="timer-bg" cx="100" cy="100" r="90" />
              <circle
                className="timer-progress"
                cx="100"
                cy="100"
                r="90"
                style={{
                  strokeDasharray: `${2 * Math.PI * 90}`,
                  strokeDashoffset: `${2 * Math.PI * 90 * (1 - progress / 100)}`
                }}
              />
            </svg>
            <div className="timer-display">
              <div className="time-text">{formatTime(timeLeft)}</div>
              {isBreak && <div className="subject-display" style={{color: 'var(--success)'}}>PAUSA</div>}
              {!isBreak && selectedSubject && <div className="subject-display">{selectedSubject}</div>}
            </div>
          </div>
          
          <div className="time-config-row">
            <div className="mini-config-item">
              <label className="mini-label">Foco (min)</label>
              <input
                type="number"
                value={studyTime}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '' || inputValue === null) {
                    onStudyTimeChange('');
                    return;
                  }
                  const val = parseInt(inputValue, 10);
                  if (!isNaN(val) && val >= 1) {
                    onStudyTimeChange(val);
                  }
                }}
                onBlur={onStudyTimeBlur}
                className="mini-input"
                disabled={isRunning}
                min="1"
              />
            </div>

            <div className="mini-config-item">
              <label className="mini-label">Pausa (min)</label>
               <input
                type="number"
                value={breakTime}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '' || inputValue === null) {
                    onBreakTimeChange('');
                    return;
                  }
                  const val = parseInt(inputValue, 10);
                  if (!isNaN(val) && val >= 1) {
                    onBreakTimeChange(val);
                  }
                }}
                onBlur={onBreakTimeBlur}
                className="mini-input"
                disabled={isRunning}
                min="1"
              />
            </div>
          </div>

          <div className="timer-controls">
            {!isRunning ? (
              <button onClick={handleStart} className="btn-primary">
                <Play size={20} /> Iniciar
              </button>
            ) : (
              <button onClick={handlePause} className="btn-secondary">
                <Pause size={20} /> Pausar
              </button>
            )}
            {(isRunning || (!isRunning && timeLeft < timerMax && timeLeft > 0)) && (
              <button onClick={handleStop} className="btn-stop-subtle">
                <Square size={14} /> Finalizar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Seleção de Matéria */}
      {showSubjectModal && (
        <div className="modal-overlay" onClick={() => setShowSubjectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Selecione a Matéria</h2>
              <button className="modal-close" onClick={() => setShowSubjectModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="subject-selection-grid">
                <button
                  className="subject-option"
                  onClick={() => handleSubjectSelect('')}
                  style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border)' }}
                >
                  <span>📚</span>
                  <span>Estudo Livre</span>
                </button>
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    className="subject-option"
                    onClick={() => handleSubjectSelect(subject.name)}
                    style={{ 
                      backgroundColor: subject.color + '20',
                      border: `2px solid ${subject.color}`
                    }}
                  >
                    <span style={{ color: subject.color }}>●</span>
                    <span>{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro de Questões */}
      {showQuestionsModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Sessão Concluída! 🎉</h2>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
                Registre quantas questões você resolveu durante esta sessão:
              </p>
              
              <div className="questions-input-group">
                <div className="question-input-item">
                  <label className="modal-label">Questões Resolvidas</label>
                  <input
                    type="number"
                    value={tempQuestionsResolved}
                    onChange={(e) => setTempQuestionsResolved(Math.max(0, parseInt(e.target.value) || 0))}
                    className="modal-input"
                    min="0"
                    placeholder="0"
                    autoFocus
                  />
                </div>
                
                <div className="question-input-item">
                  <label className="modal-label">Questões Acertadas</label>
                  <input
                    type="number"
                    value={tempCorrectQuestions}
                    onChange={(e) => {
                      const value = Math.max(0, parseInt(e.target.value) || 0);
                      setTempCorrectQuestions(Math.min(value, tempQuestionsResolved));
                    }}
                    className="modal-input"
                    min="0"
                    max={tempQuestionsResolved}
                    placeholder="0"
                  />
                </div>
              </div>

              {tempQuestionsResolved > 0 && (
                <div className="accuracy-display">
                  <span>Taxa de acerto: </span>
                  <strong>{((tempCorrectQuestions / tempQuestionsResolved) * 100).toFixed(1)}%</strong>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleSkipQuestions} style={{ marginRight: 'auto' }}>
                Pular
              </button>
              <button className="btn-primary" onClick={handleQuestionsSubmit}>
                Confirmar e Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PomodoroTimer;