import React from 'react';
import { Watch } from 'react-loader-spinner';
import { formatTitle } from '../../util';

const CustomForm = ({ label, register, loading, errors, ...props }) => {
  const { onSubmit, handleSubmit, projectTitle, taskTitle, budget, materialCost, laborCost } = props;
  return (
    <form className="flex column jst-center align-center gap-1" onSubmit={handleSubmit(onSubmit)}>
      <h3>{formatTitle(label)}</h3>
      {typeof projectTitle !== 'undefined' && (
        <div className="flex column fullwidth">
          <fieldset className="flex row text-align-left align-center jst-sb gap-1">
            <label htmlFor="project_title">Title</label>
            <input
              type="text"
              name="project_title"
              defaultValue={projectTitle}
              placeholder="Project Title"
              {...register('projectTitle', { required: 'This field is required' })}
            />
          </fieldset>
          {errors?.projectTitle && <p className="text-align-right text-error">{errors.projectTitle.message}</p>}
        </div>
      )}
      {typeof taskTitle !== 'undefined' && (
        <div className="flex column fullwidth">
          <fieldset className="flex row text-align-left align-center jst-sb gap-1">
            <label htmlFor="task_title">Title</label>
            <input
              type="text"
              name="task_title"
              defaultValue={taskTitle}
              placeholder="Task Title"
              {...register('taskTitle', { required: 'This field is required' })}
            />
          </fieldset>
          {errors?.taskTitle && <p className="text-align-right text-error">{errors.taskTitle.message}</p>}
        </div>
      )}
      {typeof budget !== 'undefined' && (
        <div className="flex column fullwidth">
          <fieldset className="flex row text-align-left align-center jst-sb gap-1">
            <label htmlFor="project_budget">Budget</label>
            <input
              type="number"
              name="project_budget"
              defaultValue={budget}
              {...register('projectBudget', {
                required: 'This field is required',
                min: { value: 0, message: 'Cannot be lower than 0' },
                max: { value: 10000000, message: 'Cannot exceed 10000000' },
              })}
            />
          </fieldset>
          {errors?.projectBudget && <p className="text-align-right text-error">{errors.projectBudget.message}</p>}
        </div>
      )}
      {typeof materialCost !== 'undefined' && (
        <div className="flex column fullwidth">
          <fieldset className="flex row text-align-left align-center jst-sb gap-1">
            <label htmlFor="material_cost">Material Cost</label>
            <input
              type="number"
              name="material_cost"
              defaultValue={materialCost}
              {...register('materialCost', { required: true, min: 0, max: 10000000 })}
            />
          </fieldset>
          {errors?.materialCost && <p className="text-align-right text-error">{errors.materialCost.message}</p>}
        </div>
      )}
      {typeof laborCost !== 'undefined' && (
        <div className="flex column fullwidth">
          <fieldset className="flex row text-align-left align-center jst-sb gap-1">
            <label htmlFor="labor_cost">Labor Cost</label>
            <input
              type="number"
              name="labor_cost"
              defaultValue={laborCost}
              {...register('laborCost', { required: true, min: 0, max: 10000000 })}
            />
          </fieldset>
          {errors?.laborCost && <p className="text-align-right text-error">{errors.laborCost.message}</p>}
        </div>
      )}
      <button type="submit" className="btn btn-confirm flex jst-center">
        {loading ? <Watch height={25} width={25} /> : '✔️'}
      </button>
    </form>
  );
};

export default CustomForm;
