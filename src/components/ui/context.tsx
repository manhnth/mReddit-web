// import { ThemeProvider } from "next-themes";
import { ThemeProvider } from '@/lib/ThemeContext';
import React, { ReactNode, useCallback, useContext, useReducer } from 'react';

interface State {
  displaySidebar: boolean;
  displayModal: boolean;
  modalView: string;
  sidebarView: string;
}

const initialState = {
  displaySidebar: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  sidebarView: 'CART_VIEW',
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    }
  | {
      type: 'SET_SIDEBAR_VIEW';
      view: SIDEBAR_VIEWS;
    };

type MODAL_VIEWS =
  | 'SIGUP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGOT_VIEW'
  | 'CREATE_PRODUCT_VIEW'
  | 'UPDATE_PRODUCT_VIEW';

type SIDEBAR_VIEWS = 'CART_VIEW' | 'CHECKOUT_VIEW' | 'PAYMENT_METHOD_VIEW';

export const UIContext = React.createContext<State | any>(initialState);

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      };
    }
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }
  }
}

export const UIProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = useCallback(
    () => dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch]
  );
  const closeSidebar = useCallback(
    () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch]
  );
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: 'CLOSE_SIDEBAR' })
        : dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  );
  const setSidebarView = (view: SIDEBAR_VIEWS) =>
    dispatch({ type: 'SET_SIDEBAR_VIEW', view });

  const openModal = () => dispatch({ type: 'OPEN_MODAL' });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });
  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view });

  const value = {
    ...state,
    openModal,
    closeModal,
    setModalView,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    setSidebarView,
  };

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: React.FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
);
