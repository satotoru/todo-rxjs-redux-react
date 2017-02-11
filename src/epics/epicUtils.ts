
export const mapToSuccess = (action, payload?) => {
  const type = `${action.type}_SUCCESS`;
  return payload ? { type, payload } : { type };
};

export const mapToFailure = (action, error: any) => {
  return {
    type: `${action.type}_FAIL`,
    payload: {
      error
    }
  };
};


