import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { Watch } from 'react-loader-spinner';

const CreateProjectModal = ({ isOpen, clearState, customStyles, handleSubmit, onSubmit, loading }) => {
  Modal.setAppElement('#modal-root');
  const { register } = useForm();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={clearState}
      style={customStyles}
      contentLabel="New Project Dialog"
      ariaHideApp={false} // not ideal, but the app isn't picking up my modal root
    >
      <form className="flex column jst-center align-center gap-1" onSubmit={handleSubmit(onSubmit)}>
        <h3>New Project</h3>
        <fieldset className="flex row text-align-left align-center jst-sb gap-1">
          <label htmlFor="title">Title</label>
          <input type="text" name="project_title" placeholder="Title" {...register('projectTitle')} />
        </fieldset>
        <fieldset className="flex row text-align-left align-center jst-sb gap-1">
          <label htmlFor="projectBudget">Budget</label>
          <input type="number" name="project_budget" defaultValue={0} {...register('projectBudget')} />
        </fieldset>
        <button type="submit" className="btn btn-confirm flex jst-center">
          {loading ? <Watch height={25} width={25} /> : '✔️'}
        </button>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
