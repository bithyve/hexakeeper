export const RESET_REDUX_STORE = 'RESET_REDUX_STORE';
export const UPDATE_VERSION_HISTORY = 'UPDATE_VERSION_HISTORY';
export const MIGRATE_LABELS_329 = 'MIGRATE_LABELS_329';

export const resetReduxStore = () => ({
  type: RESET_REDUX_STORE,
});

export const updateVersionHistory = (previousVersion, newVersion) => ({
  type: UPDATE_VERSION_HISTORY,
  payload: { previousVersion, newVersion },
});

export const migrateLabelsToBip329 = (previousVersion, newVersion) => ({
  type: MIGRATE_LABELS_329,
  payload: { previousVersion, newVersion },
});
