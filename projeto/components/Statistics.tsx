import React, { useMemo, useState } from 'react';
import { PieChart, BarChart3, Calendar } from 'lucide-react';
import { Session, Subject } from '../types';

interface StatisticsProps {
  sessions: Session[];
  subjects: Subject[];
}

type TimePeriod = '1month' | '3months' | '6months' | '1year' | 'all';

const Statistics: React.FC<StatisticsProps> = ({ sessions, subjects }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('all');
  
  const getSubjectColor = (subjectName: string) => {
    const found = subjects.find(s => s.name === subjectName);
    return found?.color || '#a1a1aa'; 
  };

  const filterSessionsByPeriod = (sessions: Session[], period: TimePeriod): Session[] => {
    if (period === 'all') return sessions;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (period) {
      case '1month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    // Compara apenas as datas (sem horário) para evitar problemas de timezone
    return sessions.filter(session => {
      const sessionDate = session.date.split('T')[0]; // YYYY-MM-DD
      const cutoffDateStr = cutoffDate.toISOString().split('T')[0];
      return sessionDate >= cutoffDateStr;
    });
  };

  const filteredSessions = useMemo(() => 
    filterSessionsByPeriod(sessions, selectedPeriod),
    [sessions, selectedPeriod]
  );

  const timeBySubject = useMemo(() => {
    const result: Record<string, number> = {};
    filteredSessions.forEach(session => {
      if (!result[session.subject]) {
        result[session.subject] = 0;
      }
      result[session.subject] += session.duration;
    });
    return result;
  }, [filteredSessions]);

  const questionsBySubject = useMemo(() => {
    const result: Record<string, { total: number; correct: number }> = {};
    filteredSessions.forEach(session => {
      if (!result[session.subject]) {
        result[session.subject] = { total: 0, correct: 0 };
      }
      result[session.subject].total += session.questions;
      result[session.subject].correct += session.correctQuestions;
    });
    return result;
  }, [filteredSessions]);

  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const hasTimeData = Object.keys(timeBySubject).length > 0;
  const hasQuestionData = Object.keys(questionsBySubject).length > 0;

  return (
    <div className="stats-container">
      <div className="period-filter">
        <div className="period-filter-header">
          <Calendar size={18} />
          <span>Período</span>
        </div>
        <div className="period-buttons">
          <button
            className={`period-button ${selectedPeriod === '1month' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('1month')}
          >
            1 Mês
          </button>
          <button
            className={`period-button ${selectedPeriod === '3months' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('3months')}
          >
            3 Meses
          </button>
          <button
            className={`period-button ${selectedPeriod === '6months' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('6months')}
          >
            6 Meses
          </button>
          <button
            className={`period-button ${selectedPeriod === '1year' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('1year')}
          >
            1 Ano
          </button>
          <button
            className={`period-button ${selectedPeriod === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('all')}
          >
            Tudo
          </button>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-header">
          <PieChart size={22} />
          <h2>Tempo de Estudo</h2>
        </div>

        {!hasTimeData ? (
          <div className="empty-stats">
            <p>Nenhuma sessão registrada.</p>
            <p>Complete um Pomodoro para ver as estatísticas!</p>
          </div>
        ) : (
          <div className="chart-container">
            <div className="pie-chart" style={{ position: 'relative' }}>
              {(() => {
                const total = Object.values(timeBySubject).reduce((a, b) => a + b, 0);
                let currentAngle = 0;

                const center = 100;
                const outerRadius = 90;
                const innerRadius = 62; 
                const padding = 2; 

                return (
                  <svg viewBox="0 0 200 200" className="pie-svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
                    <circle cx={center} cy={center} r={outerRadius} fill="#18181b" opacity="0.5" />

                    {Object.entries(timeBySubject).map(([subject, time]) => {
                      const percentage = time / total;
                      const angle = percentage * 360;
                      const startAngle = currentAngle;
                      currentAngle += angle;

                      const isFullCircle = angle >= 359.9;
                      const color = getSubjectColor(subject);
                      const strokeColor = "#18181b"; 

                      if (isFullCircle) {
                         return (
                          <g key={subject}>
                             <circle 
                              cx={center} 
                              cy={center} 
                              r={outerRadius} 
                              fill={color} 
                            />
                            <circle cx={center} cy={center} r={innerRadius} fill={strokeColor} />
                          </g>
                        );
                      }

                      const r = outerRadius;
                      const x1 = center + r * Math.cos((startAngle - 90) * Math.PI / 180);
                      const y1 = center + r * Math.sin((startAngle - 90) * Math.PI / 180);
                      const x2 = center + r * Math.cos((startAngle + angle - 90) * Math.PI / 180);
                      const y2 = center + r * Math.sin((startAngle + angle - 90) * Math.PI / 180);

                      const largeArc = angle > 180 ? 1 : 0;

                      return (
                         <path
                          key={subject}
                          d={`M ${center} ${center} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={color}
                          stroke={strokeColor}
                          strokeWidth="3"
                        />
                      );
                    })}
                    
                    <circle cx={center} cy={center} r={innerRadius} fill="#18181b" />
                    
                    <circle 
                      cx={center} 
                      cy={center} 
                      r={innerRadius - padding} 
                      fill="none" 
                      stroke="rgba(255, 255, 255, 0.15)" 
                      strokeWidth="1.5" 
                    />

                    <text x={center} y={center - 10} className="chart-label">
                      TEMPO TOTAL
                    </text>
                    <text x={center} y={center + 25} className="chart-value">
                      {formatHours(total)}
                    </text>
                  </svg>
                );
              })()}
            </div>

            <div className="legend">
              {Object.entries(timeBySubject).map(([subject, time]) => {
                const total = Object.values(timeBySubject).reduce((a, b) => a + b, 0);
                const percentage = ((time / total) * 100).toFixed(1);
                const color = getSubjectColor(subject);

                return (
                  <div key={subject} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}66` }} />
                    <div className="legend-text">
                      <span className="legend-subject">{subject}</span>
                      <span className="legend-value">{formatHours(time)} ({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="stats-card">
        <div className="stats-header">
          <BarChart3 size={22} />
          <h2>Questões por Matéria</h2>
        </div>

        {!hasQuestionData ? (
          <div className="empty-stats">
            <p>Nenhuma questão registrada.</p>
          </div>
        ) : (
          <div className="bar-chart">
            {Object.entries(questionsBySubject).map(([subject, data]) => {
              const maxQuestions = Math.max(...Object.values(questionsBySubject).map(d => d.total));
              const totalPercentage = (data.total / maxQuestions) * 100;
              const correctPercentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
              const accuracyRate = data.total > 0 ? ((data.correct / data.total) * 100).toFixed(1) : 0;
              const color = getSubjectColor(subject);

              return (
                <div key={subject} className="bar-item">
                  <div className="bar-label">
                    <span className="bar-subject">{subject}</span>
                    <span className="bar-values">{data.correct}/{data.total} ({accuracyRate}%)</span>
                  </div>
                  <div className="bar-container">
                    <div className="bar-fill bar-total" style={{ width: `${totalPercentage}%` }}>
                      <div className="bar-fill" style={{ width: `${correctPercentage}%`, background: color, boxShadow: `0 0 10px ${color}66` }} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bar-legend">
              <div className="bar-legend-item">
                <div className="bar-legend-color bar-legend-total" />
                <span>Total</span>
              </div>
              <div className="bar-legend-item">
                <div className="bar-legend-color" style={{ background: 'var(--text-muted)' }} />
                <span>Corretas (Cor da Matéria)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
