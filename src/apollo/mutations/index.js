import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $budget: numeric!) {
    insert_projects_one(object: { title: $title, budget: $budget }) {
      id
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($projectId: Int!, $title: String!, $budget: numeric!) {
    update_projects_by_pk(pk_columns: { id: $projectId }, _set: { title: $title, budget: $budget }) {
      id
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: Int!) {
    delete_projects_by_pk(id: $projectId) {
      id
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($projectId: Int!, $title: String!, $materialCost: numeric!, $laborCost: numeric!) {
    insert_tasks_one(
      object: { labor_cost: $laborCost, material_cost: $materialCost, project_id: $projectId, title: $title }
    ) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: Int!, $title: String!, $materialCost: numeric!, $laborCost: numeric!) {
    update_tasks_by_pk(
      pk_columns: { id: $taskId }
      _set: { title: $title, material_cost: $materialCost, labor_cost: $laborCost }
    ) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: Int!) {
    delete_tasks_by_pk(id: $taskId) {
      id
    }
  }
`;
