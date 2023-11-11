import { AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, AlertDialog as ChakraAlertDialog } from '@chakra-ui/react'
import { RefObject, useRef } from 'react'
import useAlertDialogStore from '../store/useAlertDialogStore'

const AlertDialog = () => {

  const cancelButtonRef: RefObject<any> = useRef()

  const { isAlertDialogOpen, closeAlertDialog, alertDialogContent } = useAlertDialogStore()

  return (
    <ChakraAlertDialog
      isOpen={isAlertDialogOpen}
      leastDestructiveRef={cancelButtonRef}
      onClose={() => closeAlertDialog(false)}
      isCentered
      scrollBehavior='inside'
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {/* Header */}
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {alertDialogContent.title}
          </AlertDialogHeader>
          {/* Body */}
          <AlertDialogBody whiteSpace='pre-line'>
            {alertDialogContent.body}
          </AlertDialogBody>
          {/* Footer */}
          <AlertDialogFooter>
            {/* Confirm button */}
            {alertDialogContent.confirmButtonText &&
              <Button colorScheme={alertDialogContent.confirmButtonColorScheme} onClick={() => closeAlertDialog(true)}>
                {alertDialogContent.confirmButtonText}
              </Button>
            }
            {/* Cancel button */}
            {alertDialogContent.cancelButtonText &&
              <Button ref={cancelButtonRef} colorScheme={alertDialogContent.cancelButtonColorScheme} onClick={() => closeAlertDialog(false)} ml={3}>
                {alertDialogContent.cancelButtonText}
              </Button>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>)
}

export default AlertDialog