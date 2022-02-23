import { gql } from '@apollo/client';

export const GET_PROJECTS_AND_TASKS = gql`
  query GetProjectsAndTasks {
    projects(order_by: { id: asc }) {
      id
      title
      budget
      created_at
      updated_at
    }
    tasks(order_by: { updated_at: desc }) {
      id
      title
      project_id
      material_cost
      labor_cost
      created_at
      updated_at
    }
  }
`;
