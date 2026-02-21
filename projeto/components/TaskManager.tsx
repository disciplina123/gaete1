import React, { useState } from 'react';
import { Plus, X, Check, Trash2, Edit2, FolderPlus, Folder } from 'lucide-react';
import { TaskGroup, TaskItem } from '../types';
import { soundService } from '../services/soundService';

interface TaskManagerProps {
  taskGroups: TaskGroup[];
  onAddGroup: (name: string, color: string) => void;
  onRemoveGroup: (groupId: string) => void;
  onUpdateGroupName: (groupId: string, newName: string) => void;
  onAddTask: (groupId: string, title: string) => void;
  onToggleTask: (groupId: string, taskId: string) => void;
  onRemoveTask: (groupId: string, taskId: string) => void;
  onUpdateTaskTitle: (groupId: string, taskId: string, newTitle: string) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({
  taskGroups,
  onAddGroup,
  onRemoveGroup,
  onUpdateGroupName,
  onAddTask,
  onToggleTask,
  onRemoveTask,
  onUpdateTaskTitle
}) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [newTaskTitles, setNewTaskTitles] = useState<Record<string, string>>({});

  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', 
    '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899'
  ];

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
    soundService.playToggle();
  };

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      onAddGroup(newGroupName.trim(), selectedColor);
      setNewGroupName('');
      setSelectedColor('#3b82f6');
      setShowGroupModal(false);
      soundService.playAdd();
    }
  };

  const handleAddTask = (groupId: string) => {
    const title = newTaskTitles[groupId]?.trim();
    if (title) {
      onAddTask(groupId, title);
      setNewTaskTitles({ ...newTaskTitles, [groupId]: '' });
      soundService.playAdd();
    }
  };

  const startEditingGroup = (group: TaskGroup) => {
    setEditingGroupId(group.id);
    setEditingGroupName(group.name);
  };

  const saveGroupName = () => {
    if (editingGroupId && editingGroupName.trim()) {
      onUpdateGroupName(editingGroupId, editingGroupName.trim());
      setEditingGroupId(null);
      setEditingGroupName('');
      soundService.playSave();
    }
  };

  const startEditingTask = (task: TaskItem) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  const saveTaskTitle = (groupId: string) => {
    if (editingTaskId && editingTaskTitle.trim()) {
      onUpdateTaskTitle(groupId, editingTaskId, editingTaskTitle.trim());
      setEditingTaskId(null);
      setEditingTaskTitle('');
      soundService.playSave();
    }
  };

  const getGroupProgress = (group: TaskGroup) => {
    if (group.tasks.length === 0) return 0;
    const completed = group.tasks.filter(t => t.completed).length;
    return Math.round((completed / group.tasks.length) * 100);
  };

  return (
    <div className="task-manager-container">
      <div className="task-manager-header">
        <div>
          <h2>Gerenciador de Tarefas</h2>
          <p>Organize suas tarefas em grupos personalizados</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => { setShowGroupModal(true); soundService.playClick(); }}
        >
          <FolderPlus size={20} />
          Novo Grupo
        </button>
      </div>

      {taskGroups.length === 0 ? (
        <div className="empty-state">
          <Folder size={48} style={{ opacity: 0.3 }} />
          <h3>Nenhum grupo de tarefas ainda</h3>
          <p>Crie um grupo para começar a organizar suas tarefas</p>
          <button 
            className="btn-secondary" 
            onClick={() => setShowGroupModal(true)}
            style={{ marginTop: '1rem' }}
          >
            <FolderPlus size={18} />
            Criar Primeiro Grupo
          </button>
        </div>
      ) : (
        <div className="task-groups-list">
          {taskGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const progress = getGroupProgress(group);
            
            return (
              <div key={group.id} className="task-group-card">
                <div 
                  className="task-group-header"
                  onClick={() => toggleGroup(group.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="task-group-info">
                    <div 
                      className="task-group-color-indicator"
                      style={{ background: group.color }}
                    />
                    {editingGroupId === group.id ? (
                      <input
                        type="text"
                        value={editingGroupName}
                        onChange={(e) => setEditingGroupName(e.target.value)}
                        onBlur={saveGroupName}
                        onKeyPress={(e) => e.key === 'Enter' && saveGroupName()}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                        className="task-group-name-edit"
                      />
                    ) : (
                      <h3>{group.name}</h3>
                    )}
                    <span className="task-count">
                      {group.tasks.filter(t => t.completed).length}/{group.tasks.length}
                    </span>
                  </div>
                  
                  <div className="task-group-actions">
                    <button
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditingGroup(group);
                        soundService.playClick();
                      }}
                      title="Renomear grupo"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Excluir o grupo "${group.name}" e todas as suas tarefas?`)) {
                          onRemoveGroup(group.id);
                          soundService.playDelete();
                        }
                      }}
                      title="Excluir grupo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="task-group-progress-bar">
                  <div 
                    className="task-group-progress-fill"
                    style={{ 
                      width: `${progress}%`,
                      background: group.color
                    }}
                  />
                </div>

                {isExpanded && (
                  <div className="task-group-content">
                    <div className="task-input-row">
                      <input
                        type="text"
                        placeholder="Nova tarefa..."
                        value={newTaskTitles[group.id] || ''}
                        onChange={(e) => setNewTaskTitles({ 
                          ...newTaskTitles, 
                          [group.id]: e.target.value 
                        })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask(group.id)}
                        className="task-input"
                      />
                      <button
                        className="btn-icon-primary"
                        onClick={() => handleAddTask(group.id)}
                        disabled={!newTaskTitles[group.id]?.trim()}
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    {group.tasks.length === 0 ? (
                      <div className="no-tasks-message">
                        Nenhuma tarefa neste grupo ainda
                      </div>
                    ) : (
                      <div className="tasks-list">
                        {group.tasks.map((task) => (
                          <div key={task.id} className="task-item">
                            <div 
                              className="task-checkbox"
                              onClick={() => {
                                onToggleTask(group.id, task.id);
                                soundService.playToggle();
                              }}
                            >
                              {task.completed && <Check size={16} />}
                            </div>
                            
                            {editingTaskId === task.id ? (
                              <input
                                type="text"
                                value={editingTaskTitle}
                                onChange={(e) => setEditingTaskTitle(e.target.value)}
                                onBlur={() => saveTaskTitle(group.id)}
                                onKeyPress={(e) => e.key === 'Enter' && saveTaskTitle(group.id)}
                                autoFocus
                                className="task-title-edit"
                              />
                            ) : (
                              <span 
                                className={`task-title ${task.completed ? 'completed' : ''}`}
                                onDoubleClick={() => startEditingTask(task)}
                              >
                                {task.title}
                              </span>
                            )}

                            <div className="task-item-actions">
                              <button
                                className="icon-btn-small"
                                onClick={() => {
                                  startEditingTask(task);
                                  soundService.playClick();
                                }}
                                title="Editar tarefa"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                className="icon-btn-small"
                                onClick={() => {
                                  onRemoveTask(group.id, task.id);
                                  soundService.playDelete();
                                }}
                                title="Excluir tarefa"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Novo Grupo */}
      {showGroupModal && (
        <div className="modal-overlay" onClick={() => setShowGroupModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Novo Grupo de Tarefas</h2>
              <button className="modal-close" onClick={() => setShowGroupModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nome do Grupo</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
                  placeholder="Ex: Trabalhos da Faculdade, Projetos Pessoais..."
                  autoFocus
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Cor do Grupo</label>
                <div className="color-grid">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ background: color }}
                      onClick={() => {
                        setSelectedColor(color);
                        soundService.playClick();
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowGroupModal(false)}>
                Cancelar
              </button>
              <button 
                className="btn-primary" 
                onClick={handleAddGroup}
                disabled={!newGroupName.trim()}
              >
                Criar Grupo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
