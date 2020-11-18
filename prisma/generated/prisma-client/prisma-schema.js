// @flow
export const typeDefs = /* GraphQL */ `type AggregateCurrency {
  count: Int!
}

type AggregateHeroku {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Currency {
  id: ID!
  name: String!
  nameEng: String
  nominal: Int!
  charCode: String!
  value: Float!
  updatedAt: DateTime!
  createdAt: DateTime!
}

type CurrencyConnection {
  pageInfo: PageInfo!
  edges: [CurrencyEdge]!
  aggregate: AggregateCurrency!
}

input CurrencyCreateInput {
  name: String!
  nameEng: String
  nominal: Int!
  charCode: String!
  value: Float!
}

type CurrencyEdge {
  node: Currency!
  cursor: String!
}

enum CurrencyOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  nameEng_ASC
  nameEng_DESC
  nominal_ASC
  nominal_DESC
  charCode_ASC
  charCode_DESC
  value_ASC
  value_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type CurrencyPreviousValues {
  id: ID!
  name: String!
  nameEng: String
  nominal: Int!
  charCode: String!
  value: Float!
  updatedAt: DateTime!
  createdAt: DateTime!
}

type CurrencySubscriptionPayload {
  mutation: MutationType!
  node: Currency
  updatedFields: [String!]
  previousValues: CurrencyPreviousValues
}

input CurrencySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CurrencyWhereInput
  AND: [CurrencySubscriptionWhereInput!]
  OR: [CurrencySubscriptionWhereInput!]
  NOT: [CurrencySubscriptionWhereInput!]
}

input CurrencyUpdateInput {
  name: String
  nameEng: String
  nominal: Int
  charCode: String
  value: Float
}

input CurrencyUpdateManyMutationInput {
  name: String
  nameEng: String
  nominal: Int
  charCode: String
  value: Float
}

input CurrencyWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  nameEng: String
  nameEng_not: String
  nameEng_in: [String!]
  nameEng_not_in: [String!]
  nameEng_lt: String
  nameEng_lte: String
  nameEng_gt: String
  nameEng_gte: String
  nameEng_contains: String
  nameEng_not_contains: String
  nameEng_starts_with: String
  nameEng_not_starts_with: String
  nameEng_ends_with: String
  nameEng_not_ends_with: String
  nominal: Int
  nominal_not: Int
  nominal_in: [Int!]
  nominal_not_in: [Int!]
  nominal_lt: Int
  nominal_lte: Int
  nominal_gt: Int
  nominal_gte: Int
  charCode: String
  charCode_not: String
  charCode_in: [String!]
  charCode_not_in: [String!]
  charCode_lt: String
  charCode_lte: String
  charCode_gt: String
  charCode_gte: String
  charCode_contains: String
  charCode_not_contains: String
  charCode_starts_with: String
  charCode_not_starts_with: String
  charCode_ends_with: String
  charCode_not_ends_with: String
  value: Float
  value_not: Float
  value_in: [Float!]
  value_not_in: [Float!]
  value_lt: Float
  value_lte: Float
  value_gt: Float
  value_gte: Float
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [CurrencyWhereInput!]
  OR: [CurrencyWhereInput!]
  NOT: [CurrencyWhereInput!]
}

input CurrencyWhereUniqueInput {
  id: ID
  name: String
  nameEng: String
  charCode: String
}

scalar DateTime

type Heroku {
  id: ID!
  result: String!
  updatedAt: DateTime!
  createdAt: DateTime!
}

type HerokuConnection {
  pageInfo: PageInfo!
  edges: [HerokuEdge]!
  aggregate: AggregateHeroku!
}

input HerokuCreateInput {
  result: String!
}

type HerokuEdge {
  node: Heroku!
  cursor: String!
}

enum HerokuOrderByInput {
  id_ASC
  id_DESC
  result_ASC
  result_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type HerokuPreviousValues {
  id: ID!
  result: String!
  updatedAt: DateTime!
  createdAt: DateTime!
}

type HerokuSubscriptionPayload {
  mutation: MutationType!
  node: Heroku
  updatedFields: [String!]
  previousValues: HerokuPreviousValues
}

input HerokuSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HerokuWhereInput
  AND: [HerokuSubscriptionWhereInput!]
  OR: [HerokuSubscriptionWhereInput!]
  NOT: [HerokuSubscriptionWhereInput!]
}

input HerokuUpdateInput {
  result: String
}

input HerokuUpdateManyMutationInput {
  result: String
}

input HerokuWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  result: String
  result_not: String
  result_in: [String!]
  result_not_in: [String!]
  result_lt: String
  result_lte: String
  result_gt: String
  result_gte: String
  result_contains: String
  result_not_contains: String
  result_starts_with: String
  result_not_starts_with: String
  result_ends_with: String
  result_not_ends_with: String
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [HerokuWhereInput!]
  OR: [HerokuWhereInput!]
  NOT: [HerokuWhereInput!]
}

input HerokuWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createCurrency(data: CurrencyCreateInput!): Currency!
  updateCurrency(data: CurrencyUpdateInput!, where: CurrencyWhereUniqueInput!): Currency
  updateManyCurrencies(data: CurrencyUpdateManyMutationInput!, where: CurrencyWhereInput): BatchPayload!
  upsertCurrency(where: CurrencyWhereUniqueInput!, create: CurrencyCreateInput!, update: CurrencyUpdateInput!): Currency!
  deleteCurrency(where: CurrencyWhereUniqueInput!): Currency
  deleteManyCurrencies(where: CurrencyWhereInput): BatchPayload!
  createHeroku(data: HerokuCreateInput!): Heroku!
  updateHeroku(data: HerokuUpdateInput!, where: HerokuWhereUniqueInput!): Heroku
  updateManyHerokus(data: HerokuUpdateManyMutationInput!, where: HerokuWhereInput): BatchPayload!
  upsertHeroku(where: HerokuWhereUniqueInput!, create: HerokuCreateInput!, update: HerokuUpdateInput!): Heroku!
  deleteHeroku(where: HerokuWhereUniqueInput!): Heroku
  deleteManyHerokus(where: HerokuWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  currency(where: CurrencyWhereUniqueInput!): Currency
  currencies(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Currency]!
  currenciesConnection(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CurrencyConnection!
  heroku(where: HerokuWhereUniqueInput!): Heroku
  herokus(where: HerokuWhereInput, orderBy: HerokuOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Heroku]!
  herokusConnection(where: HerokuWhereInput, orderBy: HerokuOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HerokuConnection!
  node(id: ID!): Node
}

type Subscription {
  currency(where: CurrencySubscriptionWhereInput): CurrencySubscriptionPayload
  heroku(where: HerokuSubscriptionWhereInput): HerokuSubscriptionPayload
}
`