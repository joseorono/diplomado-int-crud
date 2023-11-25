import { useAuthStore } from "../store/"
import { Text, Button, Flex, Box, Icon, useDisclosure } from "@chakra-ui/react"
import { Row, createColumnHelper } from "@tanstack/react-table"
import Dev from "../interfaces/dev.interface"
import TableActions from "../components/Table/TableAction"
import Table from "../components/Table/Table"
import { TableIcon } from "../components/Table/TableIcon"
import { useState, useEffect } from "react"
import { TbUserPlus } from "react-icons/tb"
import DevModal from "./DevModal"
import useAlertDialogStore from "../store/useAlertDialogStore"
import { toast } from "react-toastify"
import { AxiosResponse } from "axios"
import { deleteDev, getDevs } from "../api/devs"

const DevList = () => {

  const { revokeAuthentication } = useAuthStore()
  const { openAlertDialog } = useAlertDialogStore()

  const [devs, setDevs] = useState<Dev[]>([]);
  const [selectedDev, setSelectedDev] = useState<Dev>();

  // Add dev modal
  const {
    isOpen: isDevModalOpen,
    onOpen: onDevModalOpen,
    onClose: onDevModalClose,
  } = useDisclosure()

  useEffect(() => {
    getDevList()
  }, []);

  const getDevList = async () => {
    const response: AxiosResponse = await getDevs();

    if (response.status !== 200) {
      toast.error(response.data);
      return;
    }

    setDevs(response.data)
  }

  const handleDeleteDev = async (dev: Dev) => {
    const result = await openAlertDialog({
      title: 'Confirm',
      body: `Are you sure you want to delete dev ${dev.first_name} ${dev.last_name}?`,
      confirmButtonText: 'Delete',
      confirmButtonColorScheme: 'red',
      cancelButtonText: 'Cancel'
    })
    if (result) {
      try {
        if (!dev?.id) return
        const response: AxiosResponse = await deleteDev(dev.id.toString());
        if (response.status !== 204) {
          toast.error(response.data);
          return;
        }
        toast.success("Dev deleted");
        getDevList()
      } catch (error) {
        toast.error("Error deleting dev");
      }
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
          name: 'Edit',
          onClick: (dev: Dev) => {
            setSelectedDev(dev)
            onDevModalOpen()
          }
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
      <Button position={'fixed'} bottom={'1em'} right={'1em'} rounded={'full'} height={'3em'} width={'3em'} colorScheme="blue" onClick={onDevModalOpen}>
        <Icon as={TbUserPlus} fontSize={'2xl'} />
      </Button>
      {/* Add dev modal */}
      <DevModal
        isOpen={isDevModalOpen}
        onClose={() => {
          onDevModalClose()
          setSelectedDev(undefined)
        }}
        onRefresh={getDevList}
        dev={selectedDev} />
    </Flex>
  )
}

export default DevList