import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Buy groceries', completed: true },
    { id: 2, text: 'Go to the gym', completed: false },
    { id: 3, text: 'Go for a walk', completed: true }
  ]);
  const [newTask, setNewTask] = useState('');
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <motion.div 
      className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress Bar */}
      <motion.div 
        className="h-1 bg-gray-100"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>

      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
          <span className="text-sm text-gray-500">
            {completedTasks} of {tasks.length} completed
          </span>
        </div>

        {/* Add Task Input */}
        <motion.div 
          className="flex gap-2 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            onClick={addTask}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
          </motion.button>
        </motion.div>

        {/* Task List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
                className="relative group"
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
              >
                <div 
                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-colors ${
                    task.completed ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <motion.div 
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 mr-4 ${
                      task.completed ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    {task.completed && (
                      <motion.svg 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-4 h-4 text-white" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          fill="currentColor" 
                          d="M9 16.17l-3.59-3.59L4 14l5 5 10-10-1.41-1.41z"
                        />
                      </motion.svg>
                    )}
                  </motion.div>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.text}
                  </span>
                  <AnimatePresence>
                    {hoveredTask === task.id && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="p-1 text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}