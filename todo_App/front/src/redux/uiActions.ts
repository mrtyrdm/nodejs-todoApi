const updateAction = (payload) => {
    return {
        type: 'UPDATE',
        payload,
    };
};

export default updateAction;