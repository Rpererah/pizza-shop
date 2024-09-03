import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmout } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })
  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">Pedidos (mês)</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthOrdersAmout && (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {monthOrdersAmout.amount.toLocaleString('pt-BR')}
              </span>
              <p className="text-xs text-muted-foreground">
                {monthOrdersAmout.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      +{monthOrdersAmout.diffFromLastMonth}%
                    </span>
                    Em relacao ao mes passado
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {monthOrdersAmout.diffFromLastMonth}%{' '}
                    </span>
                    Em relacao ao mes passado
                  </>
                )}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
