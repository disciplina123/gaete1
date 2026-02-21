import React, { useState } from 'react';
import { Plus, Trash2, GraduationCap, TrendingUp, Calendar } from 'lucide-react';
import { EnemResult, FuvestResult } from '../types';

interface ExamTrackerProps {
  enemResults: EnemResult[];
  fuvestResults: FuvestResult[];
  onAddEnemResult: (result: EnemResult) => void;
  onAddFuvestResult: (result: FuvestResult) => void;
  onRemoveEnemResult: (id: string) => void;
  onRemoveFuvestResult: (id: string) => void;
}

type ExamType = 'enem' | 'fuvest';

const ExamTracker: React.FC<ExamTrackerProps> = ({
  enemResults,
  fuvestResults,
  onAddEnemResult,
  onAddFuvestResult,
  onRemoveEnemResult,
  onRemoveFuvestResult
}) => {
  const [activeExam, setActiveExam] = useState<ExamType>('enem');
  const [showAddForm, setShowAddForm] = useState(false);

  // Estado para formulário ENEM
  const [enemForm, setEnemForm] = useState({
    year: new Date().getFullYear(),
    linguagens: 0,
    cienciasHumanas: 0,
    cienciasNatureza: 0,
    matematica: 0,
    redacao: 0
  });

  // Estado para formulário FUVEST
  const [fuvestForm, setFuvestForm] = useState({
    year: new Date().getFullYear(),
    fase1: 0,
    fase2Dia1: 0,
    fase2Dia2: 0
  });

  const handleAddEnem = () => {
    if (enemForm.linguagens > 45 || enemForm.cienciasHumanas > 45 || 
        enemForm.cienciasNatureza > 45 || enemForm.matematica > 45) {
      alert('O número de acertos não pode ser maior que 45 em nenhuma área!');
      return;
    }

    const newResult: EnemResult = {
      id: Date.now().toString(),
      year: enemForm.year,
      linguagens: enemForm.linguagens,
      cienciasHumanas: enemForm.cienciasHumanas,
      cienciasNatureza: enemForm.cienciasNatureza,
      matematica: enemForm.matematica,
      redacao: enemForm.redacao || undefined,
      addedAt: new Date().toISOString()
    };

    onAddEnemResult(newResult);
    setEnemForm({
      year: new Date().getFullYear(),
      linguagens: 0,
      cienciasHumanas: 0,
      cienciasNatureza: 0,
      matematica: 0,
      redacao: 0
    });
    setShowAddForm(false);
  };

  const handleAddFuvest = () => {
    if (fuvestForm.fase1 > 90) {
      alert('O número de acertos da 1ª fase não pode ser maior que 90!');
      return;
    }

    if (fuvestForm.fase2Dia1 && fuvestForm.fase2Dia1 > 10) {
      alert('O número de acertos do 1º dia da 2ª fase não pode ser maior que 10!');
      return;
    }

    if (fuvestForm.fase2Dia2 && fuvestForm.fase2Dia2 > 12) {
      alert('O número de acertos do 2º dia da 2ª fase não pode ser maior que 12!');
      return;
    }

    const newResult: FuvestResult = {
      id: Date.now().toString(),
      year: fuvestForm.year,
      fase1: fuvestForm.fase1,
      fase2Dia1: fuvestForm.fase2Dia1 || undefined,
      fase2Dia2: fuvestForm.fase2Dia2 || undefined,
      addedAt: new Date().toISOString()
    };

    onAddFuvestResult(newResult);
    setFuvestForm({
      year: new Date().getFullYear(),
      fase1: 0,
      fase2Dia1: 0,
      fase2Dia2: 0
    });
    setShowAddForm(false);
  };

  const calculateEnemTotal = (result: EnemResult) => {
    return result.linguagens + result.cienciasHumanas + 
           result.cienciasNatureza + result.matematica;
  };

  const calculateEnemPercentage = (result: EnemResult) => {
    const total = calculateEnemTotal(result);
    return ((total / 180) * 100).toFixed(1);
  };

  const calculateFuvestPercentage = (acertos: number) => {
    return ((acertos / 90) * 100).toFixed(1);
  };

  const calculateFuvestMedia = (result: FuvestResult) => {
    if (!result.fase2Dia1 && !result.fase2Dia2) {
      return null;
    }
    
    const fase1Percent = (result.fase1 / 90) * 100;
    const fase2Dia1Percent = result.fase2Dia1 ? (result.fase2Dia1 / 10) * 100 : 0;
    const fase2Dia2Percent = result.fase2Dia2 ? (result.fase2Dia2 / 12) * 100 : 0;
    
    // Se só tem um dia da fase 2, calcula média com fase1 e esse dia
    if (!result.fase2Dia1 || !result.fase2Dia2) {
      const validDia = result.fase2Dia1 ? fase2Dia1Percent : fase2Dia2Percent;
      return ((fase1Percent + validDia) / 2).toFixed(1);
    }
    
    // Se tem os dois dias, calcula média das três
    return ((fase1Percent + fase2Dia1Percent + fase2Dia2Percent) / 3).toFixed(1);
  };

  const renderEnemForm = () => (
    <div className="exam-form">
      <h3>Adicionar Resultado do ENEM</h3>
      
      <div className="exam-form-group">
        <label>Ano da Prova</label>
        <input
          type="number"
          min="2000"
          max={new Date().getFullYear()}
          value={enemForm.year}
          onChange={(e) => setEnemForm({...enemForm, year: parseInt(e.target.value)})}
        />
      </div>

      <div className="exam-form-grid">
        <div className="exam-form-group">
          <label>Linguagens (0-45)</label>
          <input
            type="number"
            min="0"
            max="45"
            value={enemForm.linguagens}
            onChange={(e) => setEnemForm({...enemForm, linguagens: parseInt(e.target.value) || 0})}
          />
        </div>

        <div className="exam-form-group">
          <label>Ciências Humanas (0-45)</label>
          <input
            type="number"
            min="0"
            max="45"
            value={enemForm.cienciasHumanas}
            onChange={(e) => setEnemForm({...enemForm, cienciasHumanas: parseInt(e.target.value) || 0})}
          />
        </div>

        <div className="exam-form-group">
          <label>Ciências da Natureza (0-45)</label>
          <input
            type="number"
            min="0"
            max="45"
            value={enemForm.cienciasNatureza}
            onChange={(e) => setEnemForm({...enemForm, cienciasNatureza: parseInt(e.target.value) || 0})}
          />
        </div>

        <div className="exam-form-group">
          <label>Matemática (0-45)</label>
          <input
            type="number"
            min="0"
            max="45"
            value={enemForm.matematica}
            onChange={(e) => setEnemForm({...enemForm, matematica: parseInt(e.target.value) || 0})}
          />
        </div>
      </div>

      <div className="exam-form-group">
        <label>Redação (0-1000) - Opcional</label>
        <input
          type="number"
          min="0"
          max="1000"
          value={enemForm.redacao}
          onChange={(e) => setEnemForm({...enemForm, redacao: parseInt(e.target.value) || 0})}
        />
      </div>

      <div className="exam-form-buttons">
        <button className="exam-btn-cancel" onClick={() => setShowAddForm(false)}>
          Cancelar
        </button>
        <button className="exam-btn-save" onClick={handleAddEnem}>
          Salvar Resultado
        </button>
      </div>
    </div>
  );

  const renderFuvestForm = () => (
    <div className="exam-form">
      <h3>Adicionar Resultado da FUVEST</h3>
      
      <div className="exam-form-group">
        <label>Ano da Prova</label>
        <input
          type="number"
          min="2000"
          max={new Date().getFullYear()}
          value={fuvestForm.year}
          onChange={(e) => setFuvestForm({...fuvestForm, year: parseInt(e.target.value)})}
        />
      </div>

      <div className="exam-form-group">
        <label>Acertos 1ª Fase (0-90)</label>
        <input
          type="number"
          min="0"
          max="90"
          value={fuvestForm.fase1}
          onChange={(e) => setFuvestForm({...fuvestForm, fase1: parseInt(e.target.value) || 0})}
        />
      </div>

      <div className="exam-form-group">
        <label>2ª Fase - Dia 1 (0-10 questões) - Opcional</label>
        <input
          type="number"
          min="0"
          max="10"
          value={fuvestForm.fase2Dia1}
          onChange={(e) => setFuvestForm({...fuvestForm, fase2Dia1: parseInt(e.target.value) || 0})}
        />
      </div>

      <div className="exam-form-group">
        <label>2ª Fase - Dia 2 (0-12 questões) - Opcional</label>
        <input
          type="number"
          min="0"
          max="12"
          value={fuvestForm.fase2Dia2}
          onChange={(e) => setFuvestForm({...fuvestForm, fase2Dia2: parseInt(e.target.value) || 0})}
        />
      </div>

      <div className="exam-form-buttons">
        <button className="exam-btn-cancel" onClick={() => setShowAddForm(false)}>
          Cancelar
        </button>
        <button className="exam-btn-save" onClick={handleAddFuvest}>
          Salvar Resultado
        </button>
      </div>
    </div>
  );

  const renderEnemResults = () => (
    <div className="exam-results-list">
      {enemResults.length === 0 ? (
        <div className="exam-empty-state">
          <GraduationCap size={48} />
          <p>Nenhum resultado do ENEM registrado ainda</p>
          <small>Adicione seus resultados para acompanhar sua evolução!</small>
        </div>
      ) : (
        enemResults
          .sort((a, b) => b.year - a.year)
          .map((result) => (
            <div key={result.id} className="exam-result-card">
              <div className="exam-result-header">
                <div className="exam-result-title">
                  <Calendar size={20} />
                  <h4>ENEM {result.year}</h4>
                </div>
                <button
                  className="exam-delete-btn"
                  onClick={() => onRemoveEnemResult(result.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="exam-result-stats">
                <div className="exam-stat-item">
                  <span className="exam-stat-label">Linguagens</span>
                  <span className="exam-stat-value">{result.linguagens}/45</span>
                </div>
                <div className="exam-stat-item">
                  <span className="exam-stat-label">C. Humanas</span>
                  <span className="exam-stat-value">{result.cienciasHumanas}/45</span>
                </div>
                <div className="exam-stat-item">
                  <span className="exam-stat-label">C. Natureza</span>
                  <span className="exam-stat-value">{result.cienciasNatureza}/45</span>
                </div>
                <div className="exam-stat-item">
                  <span className="exam-stat-label">Matemática</span>
                  <span className="exam-stat-value">{result.matematica}/45</span>
                </div>
              </div>

              <div className="exam-result-total">
                <div className="exam-total-score">
                  <TrendingUp size={18} />
                  <span>Total: {calculateEnemTotal(result)}/180 acertos</span>
                  <span className="exam-percentage">({calculateEnemPercentage(result)}%)</span>
                </div>
                {result.redacao && (
                  <div className="exam-redacao">
                    <span>Redação: {result.redacao}/1000</span>
                  </div>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );

  const renderFuvestResults = () => (
    <div className="exam-results-list">
      {fuvestResults.length === 0 ? (
        <div className="exam-empty-state">
          <GraduationCap size={48} />
          <p>Nenhum resultado da FUVEST registrado ainda</p>
          <small>Adicione seus resultados para acompanhar sua evolução!</small>
        </div>
      ) : (
        fuvestResults
          .sort((a, b) => b.year - a.year)
          .map((result) => {
            const media = calculateFuvestMedia(result);
            return (
              <div key={result.id} className="exam-result-card">
                <div className="exam-result-header">
                  <div className="exam-result-title">
                    <Calendar size={20} />
                    <h4>FUVEST {result.year}</h4>
                  </div>
                  <button
                    className="exam-delete-btn"
                    onClick={() => onRemoveFuvestResult(result.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="exam-result-stats">
                  <div className="exam-stat-item">
                    <span className="exam-stat-label">1ª Fase</span>
                    <span className="exam-stat-value">{result.fase1}/90 acertos</span>
                    <span className="exam-percentage">({calculateFuvestPercentage(result.fase1)}%)</span>
                  </div>
                  {result.fase2Dia1 && (
                    <div className="exam-stat-item">
                      <span className="exam-stat-label">2ª Fase - Dia 1</span>
                      <span className="exam-stat-value">{result.fase2Dia1}/10 acertos</span>
                      <span className="exam-percentage">({((result.fase2Dia1 / 10) * 100).toFixed(1)}%)</span>
                    </div>
                  )}
                  {result.fase2Dia2 && (
                    <div className="exam-stat-item">
                      <span className="exam-stat-label">2ª Fase - Dia 2</span>
                      <span className="exam-stat-value">{result.fase2Dia2}/12 acertos</span>
                      <span className="exam-percentage">({((result.fase2Dia2 / 12) * 100).toFixed(1)}%)</span>
                    </div>
                  )}
                </div>

                {media && (
                  <div className="exam-result-total">
                    <div className="exam-total-score">
                      <TrendingUp size={18} />
                      <span>Média das provas: {media}%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
      )}
    </div>
  );

  return (
    <div className="exam-tracker-container">
      <div className="exam-tracker-header">
        <GraduationCap size={32} />
        <div>
          <h2>Organizador de Provas</h2>
          <p>Acompanhe seus resultados no ENEM e FUVEST</p>
        </div>
      </div>

      <div className="exam-tabs">
        <button
          className={`exam-tab ${activeExam === 'enem' ? 'active' : ''}`}
          onClick={() => {
            setActiveExam('enem');
            setShowAddForm(false);
          }}
        >
          ENEM
        </button>
        <button
          className={`exam-tab ${activeExam === 'fuvest' ? 'active' : ''}`}
          onClick={() => {
            setActiveExam('fuvest');
            setShowAddForm(false);
          }}
        >
          FUVEST
        </button>
      </div>

      {!showAddForm && (
        <button
          className="exam-add-button"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} />
          Adicionar Resultado
        </button>
      )}

      {showAddForm ? (
        activeExam === 'enem' ? renderEnemForm() : renderFuvestForm()
      ) : (
        activeExam === 'enem' ? renderEnemResults() : renderFuvestResults()
      )}
    </div>
  );
};

export default ExamTracker;
