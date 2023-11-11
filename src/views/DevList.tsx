import { Text, Button, Flex, Box } from "@chakra-ui/react"
import useAuthStore from "../store/useAuthStore"
import { Row, createColumnHelper } from "@tanstack/react-table"
import Dev from "../interfaces/dev.interface"
import TableActions from "../components/Table/TableAction"
import Table from "../components/Table/Table"
import { TableIcon } from "../components/Table/TableIcon"
import { useState, useEffect } from "react"

const DevList = () => {

  const { revokeAuthentication } = useAuthStore()

  const [devs, setDevs] = useState<Dev[]>([]);

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
          onClick: (person: Dev) => console.log('Action view', person)
        },
        {
          name: 'Edit',
          onClick: (person: Dev) => console.log('Action edit', person)
        },
        {
          name: 'Delete',
          onClick: (person: Dev) => console.log('Action delete', person)
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
      <Button marginTop={'auto'} alignSelf={'end'} onClick={revokeAuthentication}>Logout</Button>
    </Flex>
  )
}

export default DevList