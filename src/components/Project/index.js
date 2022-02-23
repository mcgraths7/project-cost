import React from 'react';

import { formatTitle, toUSD, calculateProjectTotal, formatDate, useWindowSize } from '../../util';
import TaskCard from '../Task';

const ProjectCard = ({
  project,
  tasks,
  setIsCreatingTask,
  setIsEditingProject,
  setIsEditingTask,
  setIsDeletingTask,
  setIsDeletingProject,
  setActiveProject,
  setActiveTask,
  ...props
}) => {
  const { width } = useWindowSize();
  const handleClickEdit = () => {
    setIsEditingProject(true);
    setActiveProject(project);
  };
  const handleClickCreate = () => {
    setIsCreatingTask(true);
    setActiveProject(project);
  };
  const handleClickDeleteProject = () => {
    setIsDeletingProject(true);
    setActiveProject(project);
  };

  const totalCost = calculateProjectTotal(tasks, project);
  return (
    <div key={project.id} {...props} className="card">
      <div className="flex row jst-sb gap-1 fullwidth">
        <div className={`flex gap-1 ${width > 768 ? 'row' : 'column'}`}>
          <h2>{formatTitle(project.title)}</h2>
          <div className="flex row gap-1">
            <button className="btn flex jst-center align-center btn-edit" onClick={handleClickEdit}>
              Edit Project
            </button>
            <button className="btn flex jst-center align-center btn-confirm" onClick={handleClickCreate}>
              Create New Task
            </button>
            <button className="btn flex jst-center align-center btn-cancel" onClick={handleClickDeleteProject}>
              Delete Project
            </button>
          </div>
        </div>
      </div>
      <div className="mt-1 mb-1 flex row gap-1">
        <p>{`Project Budget: ${toUSD(project.budget)}`}</p>
        <p className={`${totalCost > project.budget ? 'text-danger' : 'text-ok'} text-heavy`}>{`Total Cost: ${toUSD(
          totalCost
        )} ${
          totalCost > project.budget
            ? `($${(totalCost - project.budget).toFixed(2)} over budget)`
            : totalCost < project.budget
            ? `($${(project.budget - totalCost).toFixed(2)} under budget)`
            : ''
        }`}</p>
      </div>
      <div className="mt-1 mb-1 flex row gap-1">
        <p>{`Last Updated: ${formatDate(project.updated_at)}`}</p>
        <p>{`Created: ${formatDate(project.created_at)}`}</p>
      </div>
      <ul className="flex column gap-1">
        {tasks
          .filter((t) => t.project_id === project.id)
          .map((t) => (
            <TaskCard
              task={t}
              key={t.id}
              setIsEditingTask={setIsEditingTask}
              setIsDeletingTask={setIsDeletingTask}
              setActiveTask={setActiveTask}
            />
          ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
