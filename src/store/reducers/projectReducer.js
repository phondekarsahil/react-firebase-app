const initState = {
  projects: []
}

const projectReducer = (state = initState, action) => {
  switch (action.type){
    case 'SYNC_PROJECTS':
      return {
        ...state,
        projects: action.projects
      }
    default:
      return state;
  }
};

export default projectReducer;