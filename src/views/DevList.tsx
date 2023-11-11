import { useAuthStore } from "../store/"
import { Text, Button, Flex, Box, Icon, useDisclosure } from "@chakra-ui/react"
import { Row, createColumnHelper } from "@tanstack/react-table"
import Dev from "../interfaces/dev.interface"
import TableActions from "../components/Table/TableAction"
import Table from "../components/Table/Table"
import { TableIcon } from "../components/Table/TableIcon"
import { useState, useEffect } from "react"
import { TbUserPlus } from "react-icons/tb"
import AddDevModal from "./AddDevModal"
import useAlertDialogStore from "../store/useAlertDialogStore"

const DevList = () => {

  const { revokeAuthentication } = useAuthStore()
  const { openAlertDialog } = useAlertDialogStore()

  const [devs, setDevs] = useState<Dev[]>([]);

  // Add dev modal
  const {
    isOpen: isAddDevModalOpen,
    onOpen: onAddDevModalOpen,
    onClose: onAddDevModalClose,
  } = useDisclosure()

  useEffect(() => {
    getDevs()
  }, []);

  const getDevs = async () => {
    setTimeout(() => {
      // TODO: Remove mock data
      const devs: Dev[] = [
        {
          first_name: 'Nathalie',
          last_name: 'Zambrano',
          age: 23,
          country: 'Venezuela',
          email: 'Nathalie@fswd.com',
          created_at: '',
          updated_at: ''
        },
        {
          first_name: 'Andres',
          last_name: 'Chaparro',
          age: 23,
          country: 'Venezuela',
          email: 'Andres@fswd.com',
          created_at: '',
          updated_at: ''
        },
        {
          first_name: 'Jose',
          last_name: 'Orono',
          age: 27,
          country: 'Colombia',
          email: 'JoseO@fswd.com',
          created_at: '',
          updated_at: ''
        },
      ]
      setDevs(devs)
    }, 200);
  }

  const handleDeleteDev = async (dev: Dev) => {
    const result = await openAlertDialog({
      title: 'Confirm',
      body: `Are you sure you want to delete ${dev.first_name} ${dev.last_name}?`,
      confirmButtonText: 'Delete',
      confirmButtonColorScheme: 'red',
      cancelButtonText: 'Cancel'
    })
    if (result) {
      // TODO: Implement API call for deleting dev
    }
  }

  const columnHelper = createColumnHelper<Dev>()
  const devListTableColumns = [
    columnHelper.accessor('first_name', {
      header: 'First Name',
    }),
    columnHelper.accessor('last_name', {
      header: 'Last Name',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('age', {
      header: 'Age',
    }),
    columnHelper.accessor('country', {
      header: 'Status',
    }),
    {
      id: 'Actions',
      header: () => <TableIcon icon='refresh' onClick={getDevs} />,
      cell: (info: { row: Row<Dev> }) => <TableActions row={info.row} actions={[
        {
          name: 'View',
          onClick: (dev: Dev) => console.log('Action view', dev)
        },
        {
          name: 'Edit',
          onClick: (dev: Dev) => console.log('Action edit', dev)
        },
        {
          name: 'Delete',
          onClick: (dev: Dev) => handleDeleteDev(dev)
        },
      ]} />
    }
  ]

  return (
    <Flex flex={1} padding={5} flexDirection={'column'}>
      <Text fontSize={'xx-large'}>Dev list</Text>
      <Box>
        <Table<Dev> data={devs} columns={devListTableColumns} />
      </Box>
      {/* Logout button */}
      <Button marginTop={'auto'} alignSelf={'start'} onClick={revokeAuthentication}>Logout</Button>
      {/* Add dev button */}
      <Button position={'fixed'} bottom={'1em'} right={'1em'} rounded={'full'} height={'3em'} width={'3em'} colorScheme="blue" onClick={onAddDevModalOpen}>
        <Icon as={TbUserPlus} fontSize={'2xl'} />
      </Button>
      {/* Add dev modal */}
      <AddDevModal isOpen={isAddDevModalOpen} onClose={onAddDevModalClose} onAdd={getDevs} />
    </Flex>
  )
}

export default DevList