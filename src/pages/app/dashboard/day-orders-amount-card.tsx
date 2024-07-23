import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmout } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">Pedidos (dia)</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {dayOrdersAmout && (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {/* {dayOrdersAmout.amount.toLocaleString('ptBR')} nao acabei */}
              </span>
              <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 dark:text-rose-400">-1%</span> em
                relação a ontem
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
