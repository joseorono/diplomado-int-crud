import { Icon } from "@chakra-ui/react"
import { LuPlus, LuRefreshCw } from "react-icons/lu"

interface TableIconProps {
  onClick: () => void
  icon: 'refresh' | 'add'
}

export const TableIcon = ({ onClick, icon }: TableIconProps) => {
  const icons = {
    refresh: LuRefreshCw,
    add: LuPlus,
  }
  return (
    <Icon as={icons[icon]} fontSize={'md'} cursor={'pointer'} onClick={onClick} />
  )
}