import React from 'react';

import { toUSD, formatTitle, formatDate } from '../../util';

const TaskCard = ({ task, setIsEditingTask, setIsDeletingTask, setActiveTask, ...props }) => {
  const formattedTask = {
    id: task.id,
    title: task.title,
    laborCost: task.labor_cost,
    materialCost: task.material_cost,
  };
  const handleDeleteTask = (e) => {
    e.preventDefault();
    setActiveTask(formattedTask);
    setIsDeletingTask(true);
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    setActiveTask(formattedTask);
    setIsEditingTask(true);
  };
  return (
    <li className="card flex row jst-sb align-center" {...props}>
      <div>
        <h3>{formatTitle(task.title)}</h3>
        <p>{`Material Cost: ${toUSD(task.material_cost)}`}</p>
        <p>{`Labor Cost: ${toUSD(task.labor_cost)}`}</p>
        <p>{`Total Cost: ${toUSD(task.labor_cost + task.material_cost)}`}</p>
        <p>{`Created: ${formatDate(task.created_at)}`}</p>
        <p>{`Last Updated: ${formatDate(task.updated_at)}`}</p>
      </div>
      <div className="flex column gap-1">
        <button className="btn btn-edit " onClick={handleEditTask}>
          Edit Task
        </button>
        <button className="btn btn-cancel flex row align-center jst-center" onClick={handleDeleteTask}>
          Delete Task
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
