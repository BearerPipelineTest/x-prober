import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS, GUTTER } from '../../Config'
import {
  NetworksStatsItem,
  StyledNetworkIdRow,
} from '../../NetworkStats/components/item'
import { NetworkStatsItemProps } from '../../NetworkStats/stores'
const StyledNodeGroupNetworks = styled.div`
  border-radius: ${BORDER_RADIUS};
  background: ${({ theme }) => theme['network.node.bg']};
  color: ${({ theme }) => theme['network.node.fg']};
  padding: ${GUTTER};
  margin-bottom: ${GUTTER};
`
const StyledNodeGroupNetwork = styled.div`
  border-bottom: 1px dashed ${({ theme }) => theme['network.node.border']};
  margin-bottom: calc(${GUTTER} / 2);
  padding-bottom: calc(${GUTTER} / 2);
  &:last-child {
    margin-bottom: 0;
    border-bottom: 0;
    padding-bottom: 0;
  }
  ${StyledNetworkIdRow} {
    :hover {
      background: ${({ theme }) => theme['network.node.row.bg']};
    }
  }
`
interface NodeNetworksProps {
  items: NetworkStatsItemProps[]
  timestamp: number
}
export const NodeNetworks: FC<NodeNetworksProps> = ({ items, timestamp }) => {
  const itemsCount = items.length
  const [data, setData] = useState({
    curr: { items, timestamp },
    prev: { items, timestamp },
  })
  useEffect(() => {
    setData((prevData) => ({
      curr: {
        items,
        timestamp,
      },
      prev: prevData.curr,
    }))
  }, [items, timestamp])
  if (!itemsCount) {
    return null
  }
  const { curr, prev } = data
  const seconds = curr.timestamp - prev.timestamp
  return (
    <StyledNodeGroupNetworks>
      {items.map(({ id, rx, tx }) => {
        if (!rx && !tx) {
          return null
        }
        const prevItem = prev.items.find((item) => item.id === id)
        const prevRx = prevItem?.rx || 0
        const prevTx = prevItem?.tx || 0
        return (
          <StyledNodeGroupNetwork key={id}>
            <NetworksStatsItem
              id={id}
              singleLine={false}
              totalRx={rx}
              rateRx={(rx - prevRx) / seconds}
              totalTx={tx}
              rateTx={(tx - prevTx) / seconds}
            />
          </StyledNodeGroupNetwork>
        )
      })}
    </StyledNodeGroupNetworks>
  )
}
