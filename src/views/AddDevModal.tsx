import { useEffect, useState } from 'react';
import { Button, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { TbCheck } from 'react-icons/tb'
import Dev from '../interfaces/dev.interface';

interface AddDevModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

const AddDevModal = ({ isOpen, onClose }: AddDevModalProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [dev, setDev] = useState<Dev>({
    first_name: '',
    last_name: '',
    age: null,
    email: '',
    country: '',
  });

  const handleSaveClick = async () => {
    setIsLoading(true)
    
    console.log(dev)

    // TODO: API integration and remove mock
    setTimeout(() => {  
      setIsLoading(false)
    }, 1000);

  }

  useEffect(() => {
    setIsFormValid(!!dev.first_name && !!dev.last_name && (!!dev.age && dev.age >= 18) && !!dev.email && !!dev.country)
  }, [dev]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'} scrollBehavior="inside" isCentered closeOnEsc={!isLoading} closeOnOverlayClick={!isLoading}>
      <ModalOverlay />
      <ModalContent>
        {/* Header */}
        <ModalHeader>
          Add dev
        </ModalHeader>
        {/* Close button */}
        <ModalCloseButton isDisabled={isLoading} />
        {/* Body */}
        <ModalBody>
          <Flex gap={'0.5em'}>
            {/* First name */}
            <FormControl isDisabled={isLoading}>
              <FormLabel>First name</FormLabel>
              <Input type="text" borderRadius={'1.5rem'} value={dev.first_name} onChange={(event) => setDev({...dev, first_name: event.target.value})} />
            </FormControl>
            {/* Last name */}
            <FormControl isDisabled={isLoading}>
              <FormLabel>Last name</FormLabel>
              <Input type="text" borderRadius={'1.5rem'} value={dev.last_name} onChange={(event) => setDev({...dev, last_name: event.target.value})} />
            </FormControl>
          </Flex>
          {/* Email */}
          <FormControl isDisabled={isLoading}>
            <FormLabel>Email</FormLabel>
            <Input type="email" borderRadius={'1.5rem'} value={dev.email} onChange={(event) => setDev({...dev, email: event.target.value})} />
          </FormControl>
          {/* Age */}
          <FormControl isDisabled={isLoading}>
            <FormLabel>Age</FormLabel>
            <Input type="number" borderRadius={'1.5rem'} value={dev.age || ''} onChange={(event) => setDev({...dev, age: parseInt(event.target.value)})} />
          </FormControl>
          {/* Country */}
          <FormControl isDisabled={isLoading}>
            <FormLabel>Country</FormLabel>
            <Input type="textr" borderRadius={'1.5rem'} value={dev.country} onChange={(event) => setDev({...dev, country: event.target.value})} />
          </FormControl>
        </ModalBody>
        {/* Footer */}
        <ModalFooter gap={'0.5em'}>
          <Button alignSelf={'end'} leftIcon={<Icon as={TbCheck} fontSize={'2xl'} />} colorScheme="blue" isLoading={isLoading} isDisabled={isLoading || !isFormValid} onClick={handleSaveClick}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddDevModal