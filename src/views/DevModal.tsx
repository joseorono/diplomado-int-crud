import { useEffect, useState } from 'react';
import { Text, Button, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { TbCheck } from 'react-icons/tb'
import Dev from '../interfaces/dev.interface';
import { postDevs, putDevs } from '../api/devs';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

interface AddDevModalProps {
  isOpen: boolean
  onClose: () => void
  onRefresh: () => void
  dev?: Dev
}

const DevModal = ({ isOpen, onClose, onRefresh, dev }: AddDevModalProps) => {

  console.log('dev', dev)

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const defaultDevForm = {
    first_name: dev?.first_name || '',
    last_name: dev?.last_name || '',
    age: dev?.age || null,
    email: dev?.email || '',
    country: dev?.country || '',
  }
  const [devForm, setDevForm] = useState<Dev>(defaultDevForm);

  useEffect(() => {
    setDevForm(defaultDevForm)
  }, [isOpen]);

  const handleSaveClick = async () => {
    try {
      setIsLoading(true)
      const response: AxiosResponse = await postDevs(devForm);
      setIsLoading(false)

      if (response.status !== 201) {
        toast.error(response.data);
        return;
      }

      toast.success("Dev created");
      onRefresh()
      onClose()
    } catch (error) {
      setIsLoading(false)
      toast.error("Error creting dev");
    }
  }

  const handleUpdateClick = async () => {
    try {
      if (!dev?.id) return

      setIsLoading(true)
      const response: AxiosResponse = await putDevs(dev.id.toString(), devForm);
      setIsLoading(false)

      if (response.status !== 200) {
        toast.error(response.data);
        return;
      }

      toast.success("Dev updated");
      onRefresh()
      onClose()
    } catch (error) {
      setIsLoading(false)
      toast.error("Error updating dev");
    }
  }

  useEffect(() => {
    setIsFormValid(!!devForm.first_name && !!devForm.last_name && !!devForm.email)
  }, [devForm]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'} scrollBehavior="inside" isCentered closeOnEsc={!isLoading} closeOnOverlayClick={!isLoading}>
      <ModalOverlay />
      <ModalContent>
        {/* Header */}
        <ModalHeader>
          {dev ? 'Update dev' : 'Add dev'}
        </ModalHeader>
        {/* Close button */}
        <ModalCloseButton isDisabled={isLoading} />
        {/* Body */}
        <ModalBody>
          <Flex gap={'0.5em'}>
            {/* First name */}
            <FormControl isDisabled={isLoading}>
              <FormLabel>
                First name
                <Text color='#CC0000' as={'span'}>*</Text>
              </FormLabel>
              <Input type="text" borderRadius={'1.5rem'} value={devForm.first_name} onChange={(event) => setDevForm({ ...devForm, first_name: event.target.value })} />
            </FormControl>
            {/* Last name */}
            <FormControl isDisabled={isLoading}>
              <FormLabel>
                Last name
                <Text color='#CC0000' as={'span'}>*</Text>
              </FormLabel>
              <Input type="text" borderRadius={'1.5rem'} value={devForm.last_name} onChange={(event) => setDevForm({ ...devForm, last_name: event.target.value })} />
            </FormControl>
          </Flex>
          {/* Email */}
          <FormControl isDisabled={isLoading}>
            <FormLabel>
              Email
              <Text color='#CC0000' as={'span'}>*</Text>
            </FormLabel>
            <Input type="email" borderRadius={'1.5rem'} value={devForm.email} onChange={(event) => setDevForm({ ...devForm, email: event.target.value })} />
          </FormControl>
          {/* Age */}
          <FormControl isDisabled={isLoading}>
            <FormLabel>
              Age
              <Text color='#CC0000' as={'span'}>*</Text>
            </FormLabel>
            <Input type="number" borderRadius={'1.5rem'} value={devForm.age || ''} onChange={(event) => setDevForm({ ...devForm, age: parseInt(event.target.value) })} />
          </FormControl>
          {/* Country */}
          <FormControl isDisabled={isLoading}>
            <FormLabel>Country</FormLabel>
            <Input type="textr" borderRadius={'1.5rem'} value={devForm.country} onChange={(event) => setDevForm({ ...devForm, country: event.target.value })} />
          </FormControl>
        </ModalBody>
        {/* Footer */}
        <ModalFooter gap={'0.5em'}>
          <Button alignSelf={'end'} leftIcon={<Icon as={TbCheck} fontSize={'2xl'} />} colorScheme="blue" isLoading={isLoading} isDisabled={isLoading || !isFormValid} onClick={dev ? handleUpdateClick : handleSaveClick}>
            {dev ? 'Update' : 'Save'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DevModal