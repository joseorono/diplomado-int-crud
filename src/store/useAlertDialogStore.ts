import { create } from 'zustand';

interface AlertDialogContent {
  title: string
  body: string
  cancelButtonText?: string
  cancelButtonColorScheme?: string
  confirmButtonText?: string,
  confirmButtonColorScheme?: string
}

interface AlertDialogStore {
  isAlertDialogOpen: boolean
  alertDialogContent: AlertDialogContent
  openAlertDialog: (content: AlertDialogContent) => Promise<boolean>
  closeAlertDialog: (result: boolean) => void
}

const defaultAlertDialogContent: AlertDialogContent = {
  body: '',
  title: '',
  cancelButtonText: 'Cancel',
  cancelButtonColorScheme: 'gray',
  confirmButtonText: 'Confirm',
  confirmButtonColorScheme: 'gray'
}

const useAlertDialogStore = create<AlertDialogStore>((set) => {

  let promiseResolve: ((result: boolean) => void) | null;

  return ({
    isAlertDialogOpen: false,

    alertDialogContent: defaultAlertDialogContent,

    openAlertDialog: (content: AlertDialogContent) => {
      return new Promise((resolve) => {
        promiseResolve = resolve
        set({
          isAlertDialogOpen: true,
          alertDialogContent: content
        });
      })
    },

    closeAlertDialog: (result: boolean) => {
      set(() => {
        // Resolve promise
        if (promiseResolve)
          promiseResolve(result);
        // Update state
        return ({
          isAlertDialogOpen: false,
          alertDialogContent: defaultAlertDialogContent
        })
      });
    },
  })

});

export default useAlertDialogStore;