export enum Currency {
  INR = "INR",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  AUD = "AUD",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  SEK = "SEK",
  NZD = "NZD",
  MXN = "MXN",
  SGD = "SGD",
  HKD = "HKD",
  NOK = "NOK",
  KRW = "KRW",
  TRY = "TRY",
  RUB = "RUB",
  BRL = "BRL",
  ZAR = "ZAR",
  TWD = "TWD",
  DKK = "DKK",
  PLN = "PLN",
  THB = "THB",
  IDR = "IDR",
}

export enum RecordType {
  Expense = "Expense",
  Income = "Income",
  Transfer = "Transfer",
}

export enum RecordDirection {
  Right,
  Left,
}

export enum EndRecurrenceBy {
  Count,
  EndDate,
  NeverEnd,
}
