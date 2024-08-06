type calcInterestRateProps = {
    totalVal: number,
    monthVal: number,
    intRate: number
}

type calcInterestRateReturn = {
    totalIntRateSum: string,
    monthsPayed: number,
    paymentsPerMonth: {
        balance: string,
        interestRate: string,
        adjustedBalance: number,
        portion: number,
        monthToPay: number
    }[]
}

export const calcInterestRate = ({totalVal, monthVal, intRate}: calcInterestRateProps): calcInterestRateReturn  => {
    console.log(totalVal, monthVal, intRate)
    const paymentPerMonth = monthVal
    let valueToPay = totalVal
    let totalIntRateSum = 0
    let monthsPayed = 0
    const paymentsPerMonth = []

    while(valueToPay > 0){
        monthsPayed+=1
        const intRateToPay = valueToPay*(1+(intRate/100)) - valueToPay
        totalIntRateSum += intRateToPay
        paymentsPerMonth.push({
          balance: valueToPay.toFixed(2),
          interestRate: (valueToPay/100).toFixed(2),
          adjustedBalance: +valueToPay.toFixed(2) + +(valueToPay/100).toFixed(2),
          portion: +valueToPay.toFixed(2) + +(valueToPay/100).toFixed(2) < paymentPerMonth ? +valueToPay.toFixed(2) + +(valueToPay/100).toFixed(2) : paymentPerMonth,
          monthToPay: monthsPayed
        })
        valueToPay = (valueToPay + intRateToPay) - (paymentPerMonth) 
    }

    return {
      totalIntRateSum: totalIntRateSum.toFixed(2),
      monthsPayed,
      paymentsPerMonth
    }
}