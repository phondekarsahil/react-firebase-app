export const createProjectRequest = (payload) => ({
    type: 'CREATE_PROJECT_REQUEST',
    payload
});

export const createProjectSuccess = () => ({
    type: 'CREATE_PROJECT_SUCCESS',
});

export const syncProjects = (projects) => ({
    type: 'SYNC_PROJECTS',
    projects
});

export const getProjects = () => ({
    type: 'GET_PROJECTS',
});