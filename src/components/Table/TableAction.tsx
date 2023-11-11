import { Menu, MenuButton, Button, Icon, MenuList, MenuItem } from "@chakra-ui/react"
import { Row } from "@tanstack/react-table"
import { LuMoreVertical } from "react-icons/lu"

interface TableAction<TData> {
  name: string
  onClick: (data: TData) => void
  hidden?: boolean
}

interface TableActionsProps<TData> {
  row: Row<TData>
  actions: TableAction<TData>[]
}

const TableActions = <TData extends object>({ row, actions }: TableActionsProps<TData>) => {
  return (
    <Menu>
      <MenuButton minWidth={'1em'} alignItems={'center'} justifyContent={'center'} variant={'link'} as={Button} onClick={(event) => event.stopPropagation()}>
        <Icon as={LuMoreVertical} />
      </MenuButton>
      <MenuList paddingX={'0.25em'}>
        {actions.map(action => {
          if (action.hidden) return
          return (
            <MenuItem
              borderRadius={'3xl'}
              key={action.name}
              onClick={(event) => {
                event.stopPropagation()
                action.onClick(row.original)
              }}
            >
              {action.name}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default TableActions