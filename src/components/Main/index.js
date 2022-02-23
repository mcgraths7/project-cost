import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { GET_PROJECTS_AND_TASKS } from '../../apollo/queries';
import {
  CREATE_PROJECT,
  CREATE_TASK,
  UPDATE_PROJECT,
  UPDATE_TASK,
  DELETE_PROJECT,
  DELETE_TASK,
} from '../../apollo/mutations';
import ProjectCard from '../Project';
import CustomModal from '../Modal/Custom';
import CustomForm from '../Form/Custom';
import { Watch } from 'react-loader-spinner';

const Main = () => {
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [activeProject, setActiveProject] = useState({});
  const [activeTask, setActiveTask] = useState({});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const clearState = () => {
    setIsCreatingTask(false);
    setIsEditingProject(false);
    setIsEditingTask(false);
    setIsDeletingProject(false);
    setIsDeletingTask(false);
    setIsCreatingProject(false);
    setActiveProject({});
    setActiveTask({});
    reset();
  };

  const { loading: projectsAndTasksLoading, error, data } = useQuery(GET_PROJECTS_AND_TASKS);

  const [createProject, { loading: createProjectLoading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS_AND_TASKS, 'GetProjectsAndTasks'],
    onCompleted: () => clearState(),
  });

  const [createTask, { loading: createTaskLoading }] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_PROJECTS_AND_TASKS, 'GetProjectsAndTasks'],
    onCompleted: () => {
      clearState();
    },
  });

  const [updateProject, { loading: updateProjectLoading }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [GET_PROJECTS_AND_TASKS, 'GetProjectsAndTasks'],
    onCompleted: () => {
      clearState();
    },
  });
  const [updateTask, { loading: updateTaskLoading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_PROJECTS_AND_TASKS, 'GetProjectsAndTasks'],
    onCompleted: () => {
      clearState();
    },
  });
  const [deleteProject, { loading: deleteProjectLoading }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [GET_PROJECTS_AND_TASKS, 'GetProjectsAndTasks'],
    onCompleted: () => {
      clearState();
    },
  });

  const [deleteTask, { loading: deleteTaskLoading }] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_PROJECTS_AND_TASKS, 'GetProjectsAndTasks'],
    onCompleted: () => {
      clearState();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      const { projects: dataProjects, tasks: dataTasks } = data;
      setProjects(dataProjects);
      setTasks(dataTasks);
    }
  }, [data]);

  const onSubmit = (formData) => {
    const { taskTitle, laborCost, materialCost, projectTitle, projectBudget } = formData;
    if (isCreatingProject) createProject({ variables: { title: projectTitle, budget: projectBudget } });
    if (isCreatingTask)
      createTask({
        variables: {
          projectId: activeProject.id,
          materialCost: materialCost,
          laborCost: laborCost,
          title: taskTitle,
        },
      });
    if (isEditingProject)
      updateProject({
        variables: { title: projectTitle, budget: projectBudget, projectId: activeProject.id },
      });
    if (isEditingTask) {
      updateTask({
        variables: {
          taskId: activeTask.id,
          title: taskTitle,
          laborCost: laborCost,
          materialCost: materialCost,
        },
      });
    }
    if (isDeletingProject) {
      deleteProject({ variables: { projectId: activeProject.id } });
    }
    if (isDeletingTask) {
      deleteTask({ variables: { taskId: activeTask.id } });
    }
  };

  if (projectsAndTasksLoading)
    return (
      <div className="tall container flex column align-center jst-center">
        <Watch />
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <div className="container flex column gap-1">
      <button className="btn btn-confirm abs-top-right" onClick={() => setIsCreatingProject(true)}>
        New Project
      </button>
      <CustomModal isOpen={isCreatingProject} clearState={clearState} contentLabel="Create new project">
        <CustomForm
          projectTitle=""
          budget=""
          register={register}
          label="Create Project"
          loading={createProjectLoading}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </CustomModal>
      <CustomModal isOpen={isCreatingTask} clearState={clearState} contentLabel="Create new task">
        <CustomForm
          taskTitle=""
          laborCost={0}
          materialCost={0}
          register={register}
          handleSubmit={handleSubmit}
          label="Create New Task"
          onSubmit={onSubmit}
          loading={createTaskLoading}
          errors={errors}
        />
      </CustomModal>
      <CustomModal isOpen={isEditingProject} clearState={clearState} contentLabel="Edit project">
        <CustomForm
          projectTitle={activeProject.title}
          budget={activeProject.budget}
          register={register}
          label="Edit Project"
          loading={updateProjectLoading}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </CustomModal>
      <CustomModal isOpen={isEditingTask} clearState={clearState} contentLabel="Edit task">
        <CustomForm
          taskTitle={activeTask.title}
          laborCost={activeTask.laborCost}
          materialCost={activeTask.materialCost}
          register={register}
          label="Edit Task"
          loading={updateTaskLoading}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </CustomModal>
      <CustomModal isOpen={isDeletingTask} clearState={clearState} contentLabel="Delete task">
        <CustomForm
          register={register}
          label={`Delete task ${activeTask.title}?`}
          loading={deleteTaskLoading}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </CustomModal>
      <CustomModal isOpen={isDeletingProject} clearState={clearState} contentLabel="Delete Project">
        <CustomForm
          register={register}
          label={`Delete project ${activeProject.title}?`}
          loading={deleteProjectLoading}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </CustomModal>
      {projects &&
        projects.map((p) => (
          <ProjectCard
            project={p}
            tasks={tasks.filter((t) => t.project_id === p.id)}
            key={p.id}
            // setModalIsOpen={setModalIsOpen}
            setIsCreatingTask={setIsCreatingTask}
            setIsEditingProject={setIsEditingProject}
            setIsEditingTask={setIsEditingTask}
            setIsDeletingProject={setIsDeletingProject}
            setIsDeletingTask={setIsDeletingTask}
            setActiveProject={setActiveProject}
            setActiveTask={setActiveTask}
          />
        ))}
    </div>
  );
};

export default Main;
