import {
    OPEN_RESPONSE_MODAL,
    CLOSE_RESPONSE_MODAL,
    OPEN_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
    CLEAR_CONFIRMATION_MODAL,
    OPEN_TOASTER,
    CLOSE_TOASTER,
} from '../constants';

import {
    confirmedSaveEndpoint,
    confirmedUpdateEndpoint,
} from './api.actions';

export const openResponseModal = data => ({
    type: OPEN_RESPONSE_MODAL,
    payload: data,
});

export const closeResponseModal = () => ({
    type: CLOSE_RESPONSE_MODAL,
});

export const openConfirmationModal = (action, api, apiName) => {
    const createConfirmationContent = action => {
        switch (action) {
            case 'save': {
                return {
                    api,
                    apiName,
                    message: 'Are you sure you want to save?',
                    status: 'save',
                    title: 'Save',
                };
            }
            case 'update': {
                return {
                    api,
                    apiName,
                    message: 'Are you sure you want to update?',
                    status: 'update',
                    title: 'Update',
                };
            }
            case 'delete': {
                return {
                    message: 'Are you sure you want to delete? This can\'t be undone',
                    status: 'delete',
                    title: `Delete ${apiName ? apiName + '?' : ''}`,
                    apiName: apiName,
                };
            }
            default:
                return false;
        }
    };

    return {
        type: OPEN_CONFIRMATION_MODAL,
        payload: createConfirmationContent(action),
    };
};

export const closeConfirmationModal = () => ({
    type: CLOSE_CONFIRMATION_MODAL,
});

export const clearConfirmationModal = () => ({
    type: CLEAR_CONFIRMATION_MODAL,
});

export const showToaster = () => ({
    type: OPEN_TOASTER,
});

export const closeToaster = () => ({
    type: CLOSE_TOASTER,
});

export const afterCloseConfirmationModal = (status, api) => (dispatch, getState) => {
    switch (status) {
        case 'save': {
            return confirmedSaveEndpoint(dispatch, api);
        }
        case 'update': {
            return confirmedUpdateEndpoint(dispatch, api);
        }
        default:
            return false;
    }
};
