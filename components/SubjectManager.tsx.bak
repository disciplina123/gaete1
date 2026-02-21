import React, { useState } from 'react';
import {
  Plus, Trash2, ChevronDown, ChevronRight, Layers, Book, FolderPlus, FilePlus, ArrowLeft, Palette, Folder,
  Compass, Calculator, Zap, Landmark, Brain, Globe, PenLine, MessageSquare,
  Terminal, Music, Dumbbell, TrendingUp, Scale, Wrench,
  Leaf, BookOpen, Star, Award, Target
} from 'lucide-react';
import { Subject, ColorMode } from '../types';
import { soundService } from '../services/soundService';

const ICON_COLOR = 'rgba(255,255,255,0.75)';

const getSubjectIconComponent = (name: string): React.ReactNode => {
  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const s = { color: ICON_COLOR };

  if (/geo(grafia)?/.test(n))                                              return <Compass size={24} style={s} />;
  if (/matematica|calculo|algebra|geometria|trigonometria|estatistica/.test(n)) return <Calculator size={24} style={s} />;
  if (/fisica/.test(n))                                                    return <Zap size={24} style={s} />;
  if (/quimica/.test(n))                                                   return <Target size={24} style={s} />;
  if (/biologia|botanica|zoologia|ecologia|anatomia/.test(n))              return <Leaf size={24} style={s} />;
  if (/historia/.test(n))                                                  return <Landmark size={24} style={s} />;
  if (/filosofia/.test(n))                                                 return <Brain size={24} style={s} />;
  if (/sociologia/.test(n))                                                return <Globe size={24} style={s} />;
  if (/portugues|redacao|literatura|linguistica/.test(n))                  return <PenLine size={24} style={s} />;
  if (/ingles|frances|espanhol|alemao|italiano|japones|mandarim|coreano|lingua/.test(n)) return <MessageSquare size={24} style={s} />;
  if (/programacao|computacao|informatica|algoritmo|codigo|software|hardware/.test(n))   return <Terminal size={24} style={s} />;
  if (/arte|desenho|pintura|escultura/.test(n))                            return <Star size={24} style={s} />;
  if (/musica|teoria musical/.test(n))                                     return <Music size={24} style={s} />;
  if (/educacao fisica|esporte/.test(n))                                   return <Dumbbell size={24} style={s} />;
  if (/economia|financas|contabilidade/.test(n))                           return <TrendingUp size={24} style={s} />;
  if (/direito|juridico/.test(n))                                          return <Scale size={24} style={s} />;
  if (/medicina|saude|enfermagem|farmacia|psicologia/.test(n))             return <Award size={24} style={s} />;
  if (/engenharia|arquitetura/.test(n))                                    return <Wrench size={24} style={s} />;
  if (/astronomia|astrofisica|religiao|teologia|politica/.test(n))         return <Globe size={24} style={s} />;
  if (/nutricao|agronomia|agricultura|veterinaria/.test(n))                return <Leaf size={24} style={s} />;

  return <BookOpen size={24} style={s} />;
};

interface SubjectManagerProps {
  subjects: Subject[];
  colorMode?: ColorMode;
  onAddSubject: (name: string, color: string) => void;
  onDeleteSubject: (id: number) => void;
  onUpdateSubjectColor?: (id: number, color: string) => void;
  onAddFolder?: (subjectId: number, name: string) => void;
  onDeleteFolder?: (subjectId: number, folderId: number) => void;
  onUpdateFolderName?: (subjectId: number, folderId: number, name: string) => void;
  onAddArea: (subjectId: number, folderId: number | any, name: string) => void;
  onDeleteArea: (subjectId: number, folderId: number | any, areaId?: number) => void;
  onUpdateAreaName: (subjectId: number, folderId: number | any, areaId?: number | any, name?: string) => void;
  onAddChapter: (subjectId: number, folderId: number | any, areaId?: number | any, name?: string) => void;
  onDeleteChapter: (subjectId: number, folderId: number | any, areaId?: number | any, chapterId?: number) => void;
  onUpdateChapterName: (subjectId: number, folderId: number | any, areaId?: number | any, chapterId?: number | any, name?: string) => void;
  onAddTask: (subjectId: number, folderId: number | any, areaId?: number | any, chapterId?: number | any, name?: string) => void;
  onDeleteTask: (subjectId: number, folderId: number | any, areaId?: number | any, chapterId?: number | any, taskId?: number) => void;
  onUpdateTaskName: (subjectId: number, folderId: number | any, areaId?: number | any, chapterId?: number | any, taskId?: number | any, name?: string) => void;
  onToggleTask: (subjectId: number, folderId: number | any, areaId?: number | any, chapterId?: number | any, taskId?: number) => void;
}

const SubjectManager: React.FC<SubjectManagerProps> = ({
  subjects, colorMode = 'vibrant',
  onAddSubject, onDeleteSubject, onUpdateSubjectColor,
  onAddFolder, onDeleteFolder, onUpdateFolderName,
  onAddArea, onDeleteArea, onUpdateAreaName,
  onAddChapter, onDeleteChapter, onUpdateChapterName,
  onAddTask, onDeleteTask, onUpdateTaskName, onToggleTask,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorMode === 'monochrome' ? '#ffffff' : '#3b82f6');
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>({});
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  const [editingFolder, setEditingFolder] = useState<number | null>(null);
  const [editingArea, setEditingArea] = useState<string | null>(null);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingSubjectColor, setEditingSubjectColor] = useState<number | null>(null);
  const [tempColor, setTempColor] = useState('');

  const VIBRANT_COLORS = [
    '#e07b7b','#d4845a','#c9a84c','#8aaa5a','#5aaa8a','#4da8b8',
    '#5a85c9','#7e6db5','#b05aaa','#c45a7a','#4ab0a0','#6b6fb0',
    '#b05888','#3d91b8','#9060b0','#c49040'
  ];
  const MONOCHROME_COLORS = [
    '#ffffff','#f8f9fa','#f1f3f5','#e9ecef','#dee2e6','#ced4da',
    '#adb5bd','#868e96','#6c757d','#495057','#343a40','#212529',
    '#f8f9fa','#dee2e6','#adb5bd','#495057'
  ];
  const AVAILABLE_COLORS = colorMode === 'monochrome' ? MONOCHROME_COLORS : VIBRANT_COLORS;

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
  const selectedFolder = selectedSubject?.folders?.find(f => f.id === selectedFolderId);

  const handleAddSubject = () => {
    if (!newSubjectName.trim()) return;
    soundService.playAdd();
    onAddSubject(newSubjectName, selectedColor);
    setNewSubjectName('');
    setSelectedColor(colorMode === 'monochrome' ? '#ffffff' : '#3b82f6');
    setShowCreateModal(false);
  };

  const handleAddFolder = () => {
    if (!newFolderName.trim() || !selectedSubjectId) return;
    soundService.playAdd();
    onAddFolder?.(selectedSubjectId, newFolderName);
    setNewFolderName('');
    setShowCreateFolderModal(false);
  };

  const toggleArea = (areaId: number) => {
    soundService.playClick();
    const key = `${selectedSubjectId}-${selectedFolderId}-${areaId}`;
    setExpandedAreas(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChapter = (areaId: number, chapterId: number) => {
    soundService.playClick();
    const key = `${selectedSubjectId}-${selectedFolderId}-${areaId}-${chapterId}`;
    setExpandedChapters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // ── VIEW 1: Subjects Grid ────────────────────────────────────────────────
  if (!selectedSubjectId) {
    return (
      <div className="subjects-container">
        <div className="subjects-grid-header">
          <h2 className="subjects-grid-title">Minhas Matérias</h2>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <Plus size={20} /> Nova Matéria
          </button>
        </div>

        {subjects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>Nenhuma matéria criada ainda</h3>
            <p>Crie sua primeira matéria para começar a organizar seus estudos</p>
            <button onClick={() => setShowCreateModal(true)} className="btn-primary" style={{ marginTop: '1rem' }}>
              <Plus size={20} /> Criar Primeira Matéria
            </button>
          </div>
        ) : (
          <div className="subjects-grid">
            {subjects.map(subject => (
              <div key={subject.id} className="subject-app-card"
                style={{ borderColor: subject.color, background: `linear-gradient(135deg, ${subject.color}15 0%, ${subject.color}05 100%)`, cursor: 'pointer' }}
                onClick={() => { soundService.playClick(); setSelectedSubjectId(subject.id); }}>
                <div className="subject-app-header">
                  <div className="subject-app-icon"
                    style={{ backgroundColor: `${subject.color}30`, boxShadow: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={(e) => { e.stopPropagation(); setEditingSubjectColor(subject.id); setTempColor(subject.color); }}
                    title="Clique para mudar a cor">
                    {getSubjectIconComponent(subject.name)}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); if (confirm(`Excluir "${subject.name}"?`)) { soundService.playDelete(); onDeleteSubject(subject.id); } }}
                    className="subject-app-delete" title="Excluir matéria">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="subject-app-body">
                  <h3 className="subject-app-name">{subject.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Nova Matéria</h2>
                <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="modal-label">Nome da Matéria</label>
                  <input type="text" className="modal-input" placeholder="Ex: Matemática, Física..." value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()} autoFocus />
                </div>
                <div className="form-group">
                  <label className="modal-label">Cores Vibrantes</label>
                  <div className="color-picker-grid">
                    {VIBRANT_COLORS.map(c => (
                      <button key={c} className={`color-option ${selectedColor === c ? 'selected' : ''}`}
                        style={{ backgroundColor: c }} onClick={() => setSelectedColor(c)} />
                    ))}
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="modal-label">Cores Neutras</label>
                  <div className="color-picker-grid">
                    {MONOCHROME_COLORS.map(c => (
                      <button key={c} className={`color-option ${selectedColor === c ? 'selected' : ''}`}
                        style={{ backgroundColor: c, border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setSelectedColor(c)} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                <button className="btn-primary" onClick={handleAddSubject} disabled={!newSubjectName.trim()}>
                  <Plus size={18} /> Criar Matéria
                </button>
              </div>
            </div>
          </div>
        )}

        {editingSubjectColor !== null && (
          <div className="modal-overlay" onClick={() => setEditingSubjectColor(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Alterar Cor da Matéria</h2>
                <button className="modal-close" onClick={() => setEditingSubjectColor(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="modal-label">Cores Vibrantes</label>
                  <div className="color-picker-grid">
                    {VIBRANT_COLORS.map(c => <button key={c} className={`color-option ${tempColor===c?'selected':''}`} style={{backgroundColor:c}} onClick={()=>setTempColor(c)} />)}
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label className="modal-label">Cores Neutras</label>
                  <div className="color-picker-grid">
                    {MONOCHROME_COLORS.map(c => <button key={c} className={`color-option ${tempColor===c?'selected':''}`} style={{backgroundColor:c,border:'1px solid rgba(255,255,255,0.2)'}} onClick={()=>setTempColor(c)} />)}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setEditingSubjectColor(null)}>Cancelar</button>
                <button className="btn-primary" onClick={() => { onUpdateSubjectColor?.(editingSubjectColor, tempColor); setEditingSubjectColor(null); soundService.playClick(); }}>
                  <Palette size={18} /> Aplicar Cor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── VIEW 2: Folders inside Subject ──────────────────────────────────────
  if (!selectedFolderId) {
    if (!selectedSubject) return <div>Matéria não encontrada</div>;
    return (
      <div className="subjects-container subject-detail-view">
        <div className="subject-detail-header">
          <button onClick={() => { soundService.playClick(); setSelectedSubjectId(null); }} className="btn-back">
            <ArrowLeft size={20} /> Voltar
          </button>
          <div className="subject-detail-info">
            <div className="subject-detail-marker" style={{ backgroundColor: selectedSubject.color, boxShadow: "none" }} />
            <h2 className="subject-detail-name">{selectedSubject.name}</h2>
          </div>
          <button onClick={() => setShowCreateFolderModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FolderPlus size={18} /> Nova Pasta
          </button>
        </div>

        <div className="subject-detail-content">
          {(!selectedSubject.folders || selectedSubject.folders.length === 0) ? (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <h3>Nenhuma pasta ainda</h3>
              <p>Crie pastas para organizar as áreas desta matéria</p>

            </div>
          ) : (
            <div className="subjects-grid">
              {selectedSubject.folders.map(folder => {
                return (
                  <div key={folder.id} className="subject-app-card"
                    style={{ borderColor: selectedSubject.color, background: `linear-gradient(135deg, ${selectedSubject.color}12 0%, ${selectedSubject.color}04 100%)`, cursor: 'pointer' }}
                    onClick={() => { soundService.playClick(); setSelectedFolderId(folder.id); }}>
                    <div className="subject-app-header">
                      <div className="subject-app-icon" style={{ backgroundColor: `${selectedSubject.color}25`, boxShadow: 'none', display:'flex',alignItems:'center',justifyContent:'center' }}>
                        <Folder size={24} style={{ color: 'rgba(255,255,255,0.75)' }} />
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); if (confirm(`Excluir a pasta "${folder.name}"?`)) { soundService.playDelete(); onDeleteFolder?.(selectedSubject.id, folder.id); } }}
                        className="subject-app-delete" title="Excluir pasta">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="subject-app-body">
                      {editingFolder === folder.id ? (
                        <input type="text" defaultValue={folder.name} className="modern-edit-input"
                          style={{ fontSize: '1.1rem', fontWeight: 600, width: '100%' }}
                          autoFocus onClick={(e) => e.stopPropagation()}
                          onBlur={(e) => { setEditingFolder(null); if (e.target.value.trim()) onUpdateFolderName?.(selectedSubject.id, folder.id, e.target.value); }}
                          onKeyPress={(e) => { if (e.key==='Enter') { setEditingFolder(null); const v=(e.target as HTMLInputElement).value.trim(); if(v) onUpdateFolderName?.(selectedSubject.id,folder.id,v); } }}
                        />
                      ) : (
                        <h3 className="subject-app-name" onDoubleClick={(e) => { e.stopPropagation(); setEditingFolder(folder.id); }}>
                          {folder.name}
                        </h3>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showCreateFolderModal && (
          <div className="modal-overlay" onClick={() => setShowCreateFolderModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Nova Pasta</h2>
                <button className="modal-close" onClick={() => setShowCreateFolderModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="modal-label">Nome da Pasta</label>
                  <input type="text" className="modal-input" placeholder="Ex: Aritmética, Álgebra, Geometria..."
                    value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()} autoFocus />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowCreateFolderModal(false)}>Cancelar</button>
                <button className="btn-primary" onClick={handleAddFolder} disabled={!newFolderName.trim()}>
                  <FolderPlus size={18} /> Criar Pasta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── VIEW 3: Areas + Chapters inside Folder ───────────────────────────────
  if (!selectedSubject || !selectedFolder) return <div>Pasta não encontrada</div>;

  return (
    <div className="subjects-container subject-detail-view">
      <div className="subject-detail-header">
        <button onClick={() => { soundService.playClick(); setSelectedFolderId(null); }} className="btn-back">
          <ArrowLeft size={20} /> Voltar
        </button>
        <div className="subject-detail-info">
          <div className="subject-detail-marker" style={{ backgroundColor: selectedSubject.color, boxShadow: "none" }} />
          <h2 className="subject-detail-name">
            <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.9em' }}>{selectedSubject.name} /</span>{' '}
            {selectedFolder.name}
          </h2>
        </div>
        <button onClick={() => { soundService.playAdd(); onAddArea(selectedSubject.id, selectedFolder.id, "Nova Área"); }} className="btn-primary">
          <FolderPlus size={18} /> Nova Área
        </button>
      </div>

      <div className="subject-detail-content">
        <div className="tree-level-1-grid">
          {selectedFolder.areas && selectedFolder.areas.length > 0 ? selectedFolder.areas.map(area => {
            const areaKey = `${selectedSubject.id}-${selectedFolder.id}-${area.id}`;
            const isAreaExpanded = expandedAreas[areaKey];

            return (
              <div key={area.id} className={`area-block-card ${isAreaExpanded ? 'expanded' : ''}`}>
                <div className="area-header-modern">
                  <div onClick={() => toggleArea(area.id)} style={{ cursor:'pointer',marginRight:'8px',color:'var(--text-muted)',display:'flex',alignItems:'center' }}>
                    {isAreaExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <div className="area-title-modern">
                    <Layers size={14} style={{ color: selectedSubject.color }} />
                    {editingArea === areaKey ? (
                      <input type="text" defaultValue={area.name} autoFocus className="modern-edit-input"
                        onBlur={(e) => { setEditingArea(null); if(e.target.value.trim()) onUpdateAreaName(selectedSubject.id, selectedFolder.id, area.id, e.target.value); }}
                        onKeyPress={(e) => { if(e.key==='Enter'){setEditingArea(null);const v=(e.target as HTMLInputElement).value.trim();if(v) onUpdateAreaName(selectedSubject.id,selectedFolder.id,area.id,v);}}} />
                    ) : (
                      <span onClick={() => setEditingArea(areaKey)}>{area.name}</span>
                    )}
                  </div>
                  <div className="modern-actions" style={{ opacity:1 }}>
                    <button onClick={(e)=>{e.stopPropagation();soundService.playAdd();if(!isAreaExpanded) toggleArea(area.id);onAddChapter(selectedSubject.id,selectedFolder.id,area.id,"Novo Capítulo");}}
                      className="modern-action-btn" title="Adicionar Capítulo" style={{width:'28px',height:'28px'}}>
                      <Plus size={14} />
                    </button>
                    <button onClick={()=>{soundService.playDelete();onDeleteArea(selectedSubject.id,selectedFolder.id,area.id);}}
                      className="modern-action-btn delete" style={{width:'28px',height:'28px'}}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {isAreaExpanded && (
                  <div className="tree-level-2">
                    {area.chapters && area.chapters.length > 0 ? area.chapters.map(chapter => {
                      const chapterKey = `${selectedSubject.id}-${selectedFolder.id}-${area.id}-${chapter.id}`;
                      const isChapterExpanded = expandedChapters[chapterKey];

                      return (
                        <div key={chapter.id} className="chapter-block">
                          <div className="chapter-header-modern">
                            <div onClick={()=>toggleChapter(area.id,chapter.id)} style={{cursor:'pointer',marginRight:'6px',color:'var(--text-muted)',display:'flex',alignItems:'center'}}>
                              {isChapterExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </div>
                            <div className="chapter-title-modern">
                              <Book size={14} style={{ opacity:0.7 }} />
                              {editingChapter === chapterKey ? (
                                <input type="text" defaultValue={chapter.name} autoFocus className="modern-edit-input"
                                  onBlur={(e)=>{setEditingChapter(null);if(e.target.value.trim()) onUpdateChapterName(selectedSubject.id,selectedFolder.id,area.id,chapter.id,e.target.value);}}
                                  onKeyPress={(e)=>{if(e.key==='Enter'){setEditingChapter(null);const v=(e.target as HTMLInputElement).value.trim();if(v) onUpdateChapterName(selectedSubject.id,selectedFolder.id,area.id,chapter.id,v);}}} />
                              ) : (
                                <span onClick={()=>setEditingChapter(chapterKey)}>{chapter.name}</span>
                              )}
                            </div>
                            <div className="modern-actions" style={{ opacity:0.6 }}>
                              <button onClick={(e)=>{e.stopPropagation();soundService.playAdd();if(!isChapterExpanded) toggleChapter(area.id,chapter.id);onAddTask(selectedSubject.id,selectedFolder.id,area.id,chapter.id,"Nova Tarefa");}}
                                className="modern-action-btn" title="Adicionar Tarefa" style={{width:'24px',height:'24px',border:'none'}}>
                                <FilePlus size={14} />
                              </button>
                              <button onClick={()=>{soundService.playDelete();onDeleteChapter(selectedSubject.id,selectedFolder.id,area.id,chapter.id);}}
                                className="modern-action-btn delete" style={{width:'24px',height:'24px',border:'none'}}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {isChapterExpanded && (
                            <div className="tree-level-3">
                              {chapter.tasks.length > 0 ? chapter.tasks.map(task => {
                                const taskKey = `${chapterKey}-${task.id}`;
                                return (
                                  <div key={task.id} className="task-modern">
                                    <input type="checkbox" className="task-checkbox-modern" checked={task.completed}
                                      onChange={()=>{soundService.playToggle();onToggleTask(selectedSubject.id,selectedFolder.id,area.id,chapter.id,task.id);}} />
                                    {editingTask === taskKey ? (
                                      <input type="text" defaultValue={task.name} autoFocus className="modern-edit-input"
                                        onBlur={(e)=>{setEditingTask(null);if(e.target.value.trim()) onUpdateTaskName(selectedSubject.id,selectedFolder.id,area.id,chapter.id,task.id,e.target.value);}}
                                        onKeyPress={(e)=>{if(e.key==='Enter'){setEditingTask(null);const v=(e.target as HTMLInputElement).value.trim();if(v) onUpdateTaskName(selectedSubject.id,selectedFolder.id,area.id,chapter.id,task.id,v);}}} />
                                    ) : (
                                      <span className={`task-label-modern ${task.completed ? 'completed' : ''}`} onClick={()=>setEditingTask(taskKey)}>
                                        {task.name}
                                      </span>
                                    )}
                                    <button onClick={()=>{soundService.playDelete();onDeleteTask(selectedSubject.id,selectedFolder.id,area.id,chapter.id,task.id);}}
                                      className="modern-action-btn delete" style={{width:'20px',height:'20px',background:'transparent',opacity:0.5}}>
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                );
                              }) : <div className="empty-branch">Sem tarefas...</div>}
                            </div>
                          )}
                        </div>
                      );
                    }) : <div className="empty-branch">Sem capítulos...</div>}
                  </div>
                )}
              </div>
            );
          }) : (
            <div className="empty-branch" style={{ paddingLeft:'0' }}>
              Nenhuma área criada. Clique em "Nova Área" para começar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectManager;
