const calculateProjectTotal = (tasks, project) => {
  return tasks
    .filter((t) => t.project_id === project.id)
    .reduce((total, task) => {
      return (total += task.material_cost + task.labor_cost);
    }, 0);
};

export default calculateProjectTotal;
