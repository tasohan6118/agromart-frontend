import React, { useState } from 'react';
import './CropCalendar.css'; // we'll create this file next

const CropCalendar = () => {
  // ─── State ────────────────────────────────────────
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      plantingDate: '2026-04-10',
      harvestDate: '2026-07-15',
      tasks: [
        { id: 101, text: 'Water daily', done: false, dueDate: '2026-04-12' },
        { id: 102, text: 'Fertilize', done: true, dueDate: '2026-05-01' },
      ],
    },
    {
      id: 2,
      name: 'Corn',
      plantingDate: '2026-05-01',
      harvestDate: '2026-08-20',
      tasks: [{ id: 201, text: 'Check for pests', done: false, dueDate: '2026-06-01' }],
    },
  ]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Form state for adding a new crop
  const [newCrop, setNewCrop] = useState({
    name: '',
    plantingDate: '',
    harvestDate: '',
  });

  // Task input for a specific crop
  const [taskInputs, setTaskInputs] = useState({});

  // ─── Helpers ──────────────────────────────────────
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDay = (year, month) => new Date(year, month, 1).getDay(); // 0 = Sun

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // ─── Handlers ─────────────────────────────────────
  const addCrop = (e) => {
    e.preventDefault();
    if (!newCrop.name || !newCrop.plantingDate || !newCrop.harvestDate) return;
    const newId = crops.length ? Math.max(...crops.map(c => c.id)) + 1 : 1;
    setCrops([
      ...crops,
      {
        id: newId,
        name: newCrop.name,
        plantingDate: newCrop.plantingDate,
        harvestDate: newCrop.harvestDate,
        tasks: [],
      },
    ]);
    setNewCrop({ name: '', plantingDate: '', harvestDate: '' });
  };

  const deleteCrop = (id) => {
    setCrops(crops.filter(c => c.id !== id));
  };

  const toggleTask = (cropId, taskId) => {
    setCrops(crops.map(crop => {
      if (crop.id !== cropId) return crop;
      return {
        ...crop,
        tasks: crop.tasks.map(task =>
          task.id === taskId ? { ...task, done: !task.done } : task
        ),
      };
    }));
  };

  const addTask = (cropId) => {
    const text = taskInputs[cropId]?.trim();
    if (!text) return;
    setCrops(crops.map(crop => {
      if (crop.id !== cropId) return crop;
      const newTaskId = crop.tasks.length ? Math.max(...crop.tasks.map(t => t.id)) + 1 : 1;
      return {
        ...crop,
        tasks: [...crop.tasks, { id: newTaskId, text, done: false, dueDate: new Date().toISOString().split('T')[0] }],
      };
    }));
    setTaskInputs(prev => ({ ...prev, [cropId]: '' }));
  };

  const deleteTask = (cropId, taskId) => {
    setCrops(crops.map(crop => {
      if (crop.id !== cropId) return crop;
      return { ...crop, tasks: crop.tasks.filter(t => t.id !== taskId) };
    }));
  };

  // ─── Calendar Rendering ──────────────────────────
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDay(currentYear, currentMonth);
    const today = new Date().toISOString().split('T')[0];

    // Build a set of dates that have crop events (planting or harvest)
    const eventDates = new Set();
    crops.forEach(crop => {
      eventDates.add(crop.plantingDate);
      eventDates.add(crop.harvestDate);
    });

    // Map date -> crop info for tooltip / styling
    const dateToCrops = {};
    crops.forEach(crop => {
      if (!dateToCrops[crop.plantingDate]) dateToCrops[crop.plantingDate] = [];
      dateToCrops[crop.plantingDate].push({ name: crop.name, type: 'plant' });
      if (!dateToCrops[crop.harvestDate]) dateToCrops[crop.harvestDate] = [];
      dateToCrops[crop.harvestDate].push({ name: crop.name, type: 'harvest' });
    });

    const days = [];
    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateStr === today;
      const events = dateToCrops[dateStr] || [];
      const hasEvent = events.length > 0;

      days.push(
        <div key={d} className={`calendar-day ${isToday ? 'today' : ''}`}>
          <span className="day-number">{d}</span>
          {hasEvent && (
            <div className="event-dots">
              {events.map((ev, idx) => (
                <span
                  key={idx}
                  className={`dot ${ev.type}`}
                  title={`${ev.name} – ${ev.type === 'plant' ? 'Planting' : 'Harvest'}`}
                ></span>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  // ─── Progress Calculation ────────────────────────
  const getProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const done = tasks.filter(t => t.done).length;
    return Math.round((done / tasks.length) * 100);
  };

  // ─── Render ────────────────────────────────────────
  return (
    <div className="crop-calendar">
      <h1>🌾 Crop Calendar</h1>

      {/* ─── Calendar ─────────────────────────────── */}
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>‹</button>
          <span>{monthName} {currentYear}</span>
          <button onClick={() => changeMonth(1)}>›</button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
          {renderCalendar()}
        </div>
        <div className="legend">
          <span><span className="dot plant"></span> Planting</span>
          <span><span className="dot harvest"></span> Harvest</span>
        </div>
      </div>

      {/* ─── Add Crop Form ─────────────────────────── */}
      <form className="add-crop-form" onSubmit={addCrop}>
        <input
          type="text"
          placeholder="Crop name"
          value={newCrop.name}
          onChange={e => setNewCrop({ ...newCrop, name: e.target.value })}
          required
        />
        <input
          type="date"
          value={newCrop.plantingDate}
          onChange={e => setNewCrop({ ...newCrop, plantingDate: e.target.value })}
          required
        />
        <input
          type="date"
          value={newCrop.harvestDate}
          onChange={e => setNewCrop({ ...newCrop, harvestDate: e.target.value })}
          required
        />
        <button type="submit" className="btn-primary">Add Crop</button>
      </form>

      {/* ─── Crop List ─────────────────────────────── */}
      <div className="crop-list">
        {crops.length === 0 && <p className="no-crops">No crops added yet.</p>}
        {crops.map(crop => {
          const progress = getProgress(crop.tasks);
          return (
            <div key={crop.id} className="crop-card">
              <div className="crop-info">
                <div className="crop-name">
                  {crop.name}
                  <span className="badge">
                    🌱 {formatDate(crop.plantingDate)} → 🧺 {formatDate(crop.harvestDate)}
                  </span>
                </div>
                <div className="crop-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="progress-label">
                    <span>Tasks done</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              </div>

              <div className="crop-actions">
                <button className="btn-danger btn-sm" onClick={() => deleteCrop(crop.id)}>Delete</button>
              </div>

              {/* Tasks */}
              <div className="task-section">
                <div className="task-list">
                  {crop.tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(crop.id, task.id)}
                      />
                      <span>{task.text}</span>
                      <span className="task-date">📅 {formatDate(task.dueDate)}</span>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => deleteTask(crop.id, task.id)}
                        style={{ marginLeft: '4px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="add-task">
                    <input
                      type="text"
                      placeholder="New task…"
                      value={taskInputs[crop.id] || ''}
                      onChange={e => setTaskInputs(prev => ({ ...prev, [crop.id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTask(crop.id); } }}
                    />
                    <button className="btn-primary btn-sm" onClick={() => addTask(crop.id)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropCalendar;