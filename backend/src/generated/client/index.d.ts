
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Program
 * 
 */
export type Program = $Result.DefaultSelection<Prisma.$ProgramPayload>
/**
 * Model CodeVersion
 * 
 */
export type CodeVersion = $Result.DefaultSelection<Prisma.$CodeVersionPayload>
/**
 * Model Execution
 * 
 */
export type Execution = $Result.DefaultSelection<Prisma.$ExecutionPayload>
/**
 * Model AIAnalysis
 * 
 */
export type AIAnalysis = $Result.DefaultSelection<Prisma.$AIAnalysisPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.program`: Exposes CRUD operations for the **Program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programs
    * const programs = await prisma.program.findMany()
    * ```
    */
  get program(): Prisma.ProgramDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.codeVersion`: Exposes CRUD operations for the **CodeVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CodeVersions
    * const codeVersions = await prisma.codeVersion.findMany()
    * ```
    */
  get codeVersion(): Prisma.CodeVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.execution`: Exposes CRUD operations for the **Execution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Executions
    * const executions = await prisma.execution.findMany()
    * ```
    */
  get execution(): Prisma.ExecutionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIAnalysis`: Exposes CRUD operations for the **AIAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIAnalyses
    * const aIAnalyses = await prisma.aIAnalysis.findMany()
    * ```
    */
  get aIAnalysis(): Prisma.AIAnalysisDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.0
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Program: 'Program',
    CodeVersion: 'CodeVersion',
    Execution: 'Execution',
    AIAnalysis: 'AIAnalysis'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "program" | "codeVersion" | "execution" | "aIAnalysis"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Program: {
        payload: Prisma.$ProgramPayload<ExtArgs>
        fields: Prisma.ProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findFirst: {
            args: Prisma.ProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findMany: {
            args: Prisma.ProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          create: {
            args: Prisma.ProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          createMany: {
            args: Prisma.ProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          delete: {
            args: Prisma.ProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          update: {
            args: Prisma.ProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          deleteMany: {
            args: Prisma.ProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgramUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          upsert: {
            args: Prisma.ProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          aggregate: {
            args: Prisma.ProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgram>
          }
          groupBy: {
            args: Prisma.ProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramCountAggregateOutputType> | number
          }
        }
      }
      CodeVersion: {
        payload: Prisma.$CodeVersionPayload<ExtArgs>
        fields: Prisma.CodeVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CodeVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CodeVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>
          }
          findFirst: {
            args: Prisma.CodeVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CodeVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>
          }
          findMany: {
            args: Prisma.CodeVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>[]
          }
          create: {
            args: Prisma.CodeVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>
          }
          createMany: {
            args: Prisma.CodeVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CodeVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>[]
          }
          delete: {
            args: Prisma.CodeVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>
          }
          update: {
            args: Prisma.CodeVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>
          }
          deleteMany: {
            args: Prisma.CodeVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CodeVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CodeVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>[]
          }
          upsert: {
            args: Prisma.CodeVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeVersionPayload>
          }
          aggregate: {
            args: Prisma.CodeVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCodeVersion>
          }
          groupBy: {
            args: Prisma.CodeVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CodeVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CodeVersionCountArgs<ExtArgs>
            result: $Utils.Optional<CodeVersionCountAggregateOutputType> | number
          }
        }
      }
      Execution: {
        payload: Prisma.$ExecutionPayload<ExtArgs>
        fields: Prisma.ExecutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExecutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExecutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>
          }
          findFirst: {
            args: Prisma.ExecutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExecutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>
          }
          findMany: {
            args: Prisma.ExecutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>[]
          }
          create: {
            args: Prisma.ExecutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>
          }
          createMany: {
            args: Prisma.ExecutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExecutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>[]
          }
          delete: {
            args: Prisma.ExecutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>
          }
          update: {
            args: Prisma.ExecutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>
          }
          deleteMany: {
            args: Prisma.ExecutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExecutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExecutionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>[]
          }
          upsert: {
            args: Prisma.ExecutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionPayload>
          }
          aggregate: {
            args: Prisma.ExecutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExecution>
          }
          groupBy: {
            args: Prisma.ExecutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExecutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExecutionCountArgs<ExtArgs>
            result: $Utils.Optional<ExecutionCountAggregateOutputType> | number
          }
        }
      }
      AIAnalysis: {
        payload: Prisma.$AIAnalysisPayload<ExtArgs>
        fields: Prisma.AIAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          findFirst: {
            args: Prisma.AIAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          findMany: {
            args: Prisma.AIAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          create: {
            args: Prisma.AIAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          createMany: {
            args: Prisma.AIAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          delete: {
            args: Prisma.AIAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          update: {
            args: Prisma.AIAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.AIAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.AIAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          aggregate: {
            args: Prisma.AIAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIAnalysis>
          }
          groupBy: {
            args: Prisma.AIAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    program?: ProgramOmit
    codeVersion?: CodeVersionOmit
    execution?: ExecutionOmit
    aIAnalysis?: AIAnalysisOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    programs: number
    executions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    programs?: boolean | UserCountOutputTypeCountProgramsArgs
    executions?: boolean | UserCountOutputTypeCountExecutionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgramsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExecutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionWhereInput
  }


  /**
   * Count Type ProgramCountOutputType
   */

  export type ProgramCountOutputType = {
    versions: number
    executions: number
  }

  export type ProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | ProgramCountOutputTypeCountVersionsArgs
    executions?: boolean | ProgramCountOutputTypeCountExecutionsArgs
  }

  // Custom InputTypes
  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramCountOutputType
     */
    select?: ProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeVersionWhereInput
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountExecutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionWhereInput
  }


  /**
   * Count Type ExecutionCountOutputType
   */

  export type ExecutionCountOutputType = {
    aiAnalyses: number
  }

  export type ExecutionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aiAnalyses?: boolean | ExecutionCountOutputTypeCountAiAnalysesArgs
  }

  // Custom InputTypes
  /**
   * ExecutionCountOutputType without action
   */
  export type ExecutionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionCountOutputType
     */
    select?: ExecutionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExecutionCountOutputType without action
   */
  export type ExecutionCountOutputTypeCountAiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    programs?: boolean | User$programsArgs<ExtArgs>
    executions?: boolean | User$executionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    programs?: boolean | User$programsArgs<ExtArgs>
    executions?: boolean | User$executionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      programs: Prisma.$ProgramPayload<ExtArgs>[]
      executions: Prisma.$ExecutionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    programs<T extends User$programsArgs<ExtArgs> = {}>(args?: Subset<T, User$programsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    executions<T extends User$executionsArgs<ExtArgs> = {}>(args?: Subset<T, User$executionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.programs
   */
  export type User$programsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    cursor?: ProgramWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * User.executions
   */
  export type User$executionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    where?: ExecutionWhereInput
    orderBy?: ExecutionOrderByWithRelationInput | ExecutionOrderByWithRelationInput[]
    cursor?: ExecutionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExecutionScalarFieldEnum | ExecutionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Program
   */

  export type AggregateProgram = {
    _count: ProgramCountAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  export type ProgramMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    language: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    language: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    language: number
    code: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgramMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    language?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    language?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    language?: true
    code?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Program to aggregate.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Programs
    **/
    _count?: true | ProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramMaxAggregateInputType
  }

  export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgram[P]>
      : GetScalarType<T[P], AggregateProgram[P]>
  }




  export type ProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithAggregationInput | ProgramOrderByWithAggregationInput[]
    by: ProgramScalarFieldEnum[] | ProgramScalarFieldEnum
    having?: ProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramCountAggregateInputType | true
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
  }

  export type ProgramGroupByOutputType = {
    id: string
    userId: string
    title: string
    language: string
    code: string
    createdAt: Date
    updatedAt: Date
    _count: ProgramCountAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  type GetProgramGroupByPayload<T extends ProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramGroupByOutputType[P]>
        }
      >
    >


  export type ProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    language?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    versions?: boolean | Program$versionsArgs<ExtArgs>
    executions?: boolean | Program$executionsArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    language?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    language?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    language?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgramOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "language" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["program"]>
  export type ProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    versions?: boolean | Program$versionsArgs<ExtArgs>
    executions?: boolean | Program$executionsArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Program"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      versions: Prisma.$CodeVersionPayload<ExtArgs>[]
      executions: Prisma.$ExecutionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      language: string
      code: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["program"]>
    composites: {}
  }

  type ProgramGetPayload<S extends boolean | null | undefined | ProgramDefaultArgs> = $Result.GetResult<Prisma.$ProgramPayload, S>

  type ProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgramFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramCountAggregateInputType | true
    }

  export interface ProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Program'], meta: { name: 'Program' } }
    /**
     * Find zero or one Program that matches the filter.
     * @param {ProgramFindUniqueArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramFindUniqueArgs>(args: SelectSubset<T, ProgramFindUniqueArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Program that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgramFindUniqueOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramFindFirstArgs>(args?: SelectSubset<T, ProgramFindFirstArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programs
     * const programs = await prisma.program.findMany()
     * 
     * // Get first 10 Programs
     * const programs = await prisma.program.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programWithIdOnly = await prisma.program.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramFindManyArgs>(args?: SelectSubset<T, ProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Program.
     * @param {ProgramCreateArgs} args - Arguments to create a Program.
     * @example
     * // Create one Program
     * const Program = await prisma.program.create({
     *   data: {
     *     // ... data to create a Program
     *   }
     * })
     * 
     */
    create<T extends ProgramCreateArgs>(args: SelectSubset<T, ProgramCreateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Programs.
     * @param {ProgramCreateManyArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramCreateManyArgs>(args?: SelectSubset<T, ProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Programs and returns the data saved in the database.
     * @param {ProgramCreateManyAndReturnArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Program.
     * @param {ProgramDeleteArgs} args - Arguments to delete one Program.
     * @example
     * // Delete one Program
     * const Program = await prisma.program.delete({
     *   where: {
     *     // ... filter to delete one Program
     *   }
     * })
     * 
     */
    delete<T extends ProgramDeleteArgs>(args: SelectSubset<T, ProgramDeleteArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Program.
     * @param {ProgramUpdateArgs} args - Arguments to update one Program.
     * @example
     * // Update one Program
     * const program = await prisma.program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramUpdateArgs>(args: SelectSubset<T, ProgramUpdateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Programs.
     * @param {ProgramDeleteManyArgs} args - Arguments to filter Programs to delete.
     * @example
     * // Delete a few Programs
     * const { count } = await prisma.program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramDeleteManyArgs>(args?: SelectSubset<T, ProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramUpdateManyArgs>(args: SelectSubset<T, ProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs and returns the data updated in the database.
     * @param {ProgramUpdateManyAndReturnArgs} args - Arguments to update many Programs.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgramUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgramUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Program.
     * @param {ProgramUpsertArgs} args - Arguments to update or create a Program.
     * @example
     * // Update or create a Program
     * const program = await prisma.program.upsert({
     *   create: {
     *     // ... data to create a Program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Program we want to update
     *   }
     * })
     */
    upsert<T extends ProgramUpsertArgs>(args: SelectSubset<T, ProgramUpsertArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramCountArgs} args - Arguments to filter Programs to count.
     * @example
     * // Count the number of Programs
     * const count = await prisma.program.count({
     *   where: {
     *     // ... the filter for the Programs we want to count
     *   }
     * })
    **/
    count<T extends ProgramCountArgs>(
      args?: Subset<T, ProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgramAggregateArgs>(args: Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    /**
     * Group by Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramGroupByArgs['orderBy'] }
        : { orderBy?: ProgramGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Program model
   */
  readonly fields: ProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    versions<T extends Program$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Program$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    executions<T extends Program$executionsArgs<ExtArgs> = {}>(args?: Subset<T, Program$executionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Program model
   */ 
  interface ProgramFieldRefs {
    readonly id: FieldRef<"Program", 'String'>
    readonly userId: FieldRef<"Program", 'String'>
    readonly title: FieldRef<"Program", 'String'>
    readonly language: FieldRef<"Program", 'String'>
    readonly code: FieldRef<"Program", 'String'>
    readonly createdAt: FieldRef<"Program", 'DateTime'>
    readonly updatedAt: FieldRef<"Program", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Program findUnique
   */
  export type ProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findUniqueOrThrow
   */
  export type ProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findFirst
   */
  export type ProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findFirstOrThrow
   */
  export type ProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findMany
   */
  export type ProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Programs to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program create
   */
  export type ProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a Program.
     */
    data: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
  }

  /**
   * Program createMany
   */
  export type ProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
  }

  /**
   * Program createManyAndReturn
   */
  export type ProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Program update
   */
  export type ProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a Program.
     */
    data: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
    /**
     * Choose, which Program to update.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program updateMany
   */
  export type ProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
  }

  /**
   * Program updateManyAndReturn
   */
  export type ProgramUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Program upsert
   */
  export type ProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the Program to update in case it exists.
     */
    where: ProgramWhereUniqueInput
    /**
     * In case the Program found by the `where` argument doesn't exist, create a new Program with this data.
     */
    create: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
    /**
     * In case the Program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
  }

  /**
   * Program delete
   */
  export type ProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter which Program to delete.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program deleteMany
   */
  export type ProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Programs to delete
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to delete.
     */
    limit?: number
  }

  /**
   * Program.versions
   */
  export type Program$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    where?: CodeVersionWhereInput
    orderBy?: CodeVersionOrderByWithRelationInput | CodeVersionOrderByWithRelationInput[]
    cursor?: CodeVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CodeVersionScalarFieldEnum | CodeVersionScalarFieldEnum[]
  }

  /**
   * Program.executions
   */
  export type Program$executionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    where?: ExecutionWhereInput
    orderBy?: ExecutionOrderByWithRelationInput | ExecutionOrderByWithRelationInput[]
    cursor?: ExecutionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExecutionScalarFieldEnum | ExecutionScalarFieldEnum[]
  }

  /**
   * Program without action
   */
  export type ProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
  }


  /**
   * Model CodeVersion
   */

  export type AggregateCodeVersion = {
    _count: CodeVersionCountAggregateOutputType | null
    _min: CodeVersionMinAggregateOutputType | null
    _max: CodeVersionMaxAggregateOutputType | null
  }

  export type CodeVersionMinAggregateOutputType = {
    id: string | null
    programId: string | null
    code: string | null
    language: string | null
    createdAt: Date | null
  }

  export type CodeVersionMaxAggregateOutputType = {
    id: string | null
    programId: string | null
    code: string | null
    language: string | null
    createdAt: Date | null
  }

  export type CodeVersionCountAggregateOutputType = {
    id: number
    programId: number
    code: number
    language: number
    createdAt: number
    _all: number
  }


  export type CodeVersionMinAggregateInputType = {
    id?: true
    programId?: true
    code?: true
    language?: true
    createdAt?: true
  }

  export type CodeVersionMaxAggregateInputType = {
    id?: true
    programId?: true
    code?: true
    language?: true
    createdAt?: true
  }

  export type CodeVersionCountAggregateInputType = {
    id?: true
    programId?: true
    code?: true
    language?: true
    createdAt?: true
    _all?: true
  }

  export type CodeVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodeVersion to aggregate.
     */
    where?: CodeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeVersions to fetch.
     */
    orderBy?: CodeVersionOrderByWithRelationInput | CodeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CodeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CodeVersions
    **/
    _count?: true | CodeVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CodeVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CodeVersionMaxAggregateInputType
  }

  export type GetCodeVersionAggregateType<T extends CodeVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateCodeVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCodeVersion[P]>
      : GetScalarType<T[P], AggregateCodeVersion[P]>
  }




  export type CodeVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeVersionWhereInput
    orderBy?: CodeVersionOrderByWithAggregationInput | CodeVersionOrderByWithAggregationInput[]
    by: CodeVersionScalarFieldEnum[] | CodeVersionScalarFieldEnum
    having?: CodeVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CodeVersionCountAggregateInputType | true
    _min?: CodeVersionMinAggregateInputType
    _max?: CodeVersionMaxAggregateInputType
  }

  export type CodeVersionGroupByOutputType = {
    id: string
    programId: string
    code: string
    language: string
    createdAt: Date
    _count: CodeVersionCountAggregateOutputType | null
    _min: CodeVersionMinAggregateOutputType | null
    _max: CodeVersionMaxAggregateOutputType | null
  }

  type GetCodeVersionGroupByPayload<T extends CodeVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CodeVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CodeVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CodeVersionGroupByOutputType[P]>
            : GetScalarType<T[P], CodeVersionGroupByOutputType[P]>
        }
      >
    >


  export type CodeVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    code?: boolean
    language?: boolean
    createdAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeVersion"]>

  export type CodeVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    code?: boolean
    language?: boolean
    createdAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeVersion"]>

  export type CodeVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    code?: boolean
    language?: boolean
    createdAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeVersion"]>

  export type CodeVersionSelectScalar = {
    id?: boolean
    programId?: boolean
    code?: boolean
    language?: boolean
    createdAt?: boolean
  }

  export type CodeVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "programId" | "code" | "language" | "createdAt", ExtArgs["result"]["codeVersion"]>
  export type CodeVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }
  export type CodeVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }
  export type CodeVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }

  export type $CodeVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CodeVersion"
    objects: {
      program: Prisma.$ProgramPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      programId: string
      code: string
      language: string
      createdAt: Date
    }, ExtArgs["result"]["codeVersion"]>
    composites: {}
  }

  type CodeVersionGetPayload<S extends boolean | null | undefined | CodeVersionDefaultArgs> = $Result.GetResult<Prisma.$CodeVersionPayload, S>

  type CodeVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CodeVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CodeVersionCountAggregateInputType | true
    }

  export interface CodeVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CodeVersion'], meta: { name: 'CodeVersion' } }
    /**
     * Find zero or one CodeVersion that matches the filter.
     * @param {CodeVersionFindUniqueArgs} args - Arguments to find a CodeVersion
     * @example
     * // Get one CodeVersion
     * const codeVersion = await prisma.codeVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CodeVersionFindUniqueArgs>(args: SelectSubset<T, CodeVersionFindUniqueArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CodeVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CodeVersionFindUniqueOrThrowArgs} args - Arguments to find a CodeVersion
     * @example
     * // Get one CodeVersion
     * const codeVersion = await prisma.codeVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CodeVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, CodeVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CodeVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeVersionFindFirstArgs} args - Arguments to find a CodeVersion
     * @example
     * // Get one CodeVersion
     * const codeVersion = await prisma.codeVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CodeVersionFindFirstArgs>(args?: SelectSubset<T, CodeVersionFindFirstArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CodeVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeVersionFindFirstOrThrowArgs} args - Arguments to find a CodeVersion
     * @example
     * // Get one CodeVersion
     * const codeVersion = await prisma.codeVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CodeVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, CodeVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CodeVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CodeVersions
     * const codeVersions = await prisma.codeVersion.findMany()
     * 
     * // Get first 10 CodeVersions
     * const codeVersions = await prisma.codeVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const codeVersionWithIdOnly = await prisma.codeVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CodeVersionFindManyArgs>(args?: SelectSubset<T, CodeVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CodeVersion.
     * @param {CodeVersionCreateArgs} args - Arguments to create a CodeVersion.
     * @example
     * // Create one CodeVersion
     * const CodeVersion = await prisma.codeVersion.create({
     *   data: {
     *     // ... data to create a CodeVersion
     *   }
     * })
     * 
     */
    create<T extends CodeVersionCreateArgs>(args: SelectSubset<T, CodeVersionCreateArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CodeVersions.
     * @param {CodeVersionCreateManyArgs} args - Arguments to create many CodeVersions.
     * @example
     * // Create many CodeVersions
     * const codeVersion = await prisma.codeVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CodeVersionCreateManyArgs>(args?: SelectSubset<T, CodeVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CodeVersions and returns the data saved in the database.
     * @param {CodeVersionCreateManyAndReturnArgs} args - Arguments to create many CodeVersions.
     * @example
     * // Create many CodeVersions
     * const codeVersion = await prisma.codeVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CodeVersions and only return the `id`
     * const codeVersionWithIdOnly = await prisma.codeVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CodeVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, CodeVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CodeVersion.
     * @param {CodeVersionDeleteArgs} args - Arguments to delete one CodeVersion.
     * @example
     * // Delete one CodeVersion
     * const CodeVersion = await prisma.codeVersion.delete({
     *   where: {
     *     // ... filter to delete one CodeVersion
     *   }
     * })
     * 
     */
    delete<T extends CodeVersionDeleteArgs>(args: SelectSubset<T, CodeVersionDeleteArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CodeVersion.
     * @param {CodeVersionUpdateArgs} args - Arguments to update one CodeVersion.
     * @example
     * // Update one CodeVersion
     * const codeVersion = await prisma.codeVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CodeVersionUpdateArgs>(args: SelectSubset<T, CodeVersionUpdateArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CodeVersions.
     * @param {CodeVersionDeleteManyArgs} args - Arguments to filter CodeVersions to delete.
     * @example
     * // Delete a few CodeVersions
     * const { count } = await prisma.codeVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CodeVersionDeleteManyArgs>(args?: SelectSubset<T, CodeVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodeVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CodeVersions
     * const codeVersion = await prisma.codeVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CodeVersionUpdateManyArgs>(args: SelectSubset<T, CodeVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodeVersions and returns the data updated in the database.
     * @param {CodeVersionUpdateManyAndReturnArgs} args - Arguments to update many CodeVersions.
     * @example
     * // Update many CodeVersions
     * const codeVersion = await prisma.codeVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CodeVersions and only return the `id`
     * const codeVersionWithIdOnly = await prisma.codeVersion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CodeVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, CodeVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CodeVersion.
     * @param {CodeVersionUpsertArgs} args - Arguments to update or create a CodeVersion.
     * @example
     * // Update or create a CodeVersion
     * const codeVersion = await prisma.codeVersion.upsert({
     *   create: {
     *     // ... data to create a CodeVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CodeVersion we want to update
     *   }
     * })
     */
    upsert<T extends CodeVersionUpsertArgs>(args: SelectSubset<T, CodeVersionUpsertArgs<ExtArgs>>): Prisma__CodeVersionClient<$Result.GetResult<Prisma.$CodeVersionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CodeVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeVersionCountArgs} args - Arguments to filter CodeVersions to count.
     * @example
     * // Count the number of CodeVersions
     * const count = await prisma.codeVersion.count({
     *   where: {
     *     // ... the filter for the CodeVersions we want to count
     *   }
     * })
    **/
    count<T extends CodeVersionCountArgs>(
      args?: Subset<T, CodeVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CodeVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CodeVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CodeVersionAggregateArgs>(args: Subset<T, CodeVersionAggregateArgs>): Prisma.PrismaPromise<GetCodeVersionAggregateType<T>>

    /**
     * Group by CodeVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CodeVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CodeVersionGroupByArgs['orderBy'] }
        : { orderBy?: CodeVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CodeVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodeVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CodeVersion model
   */
  readonly fields: CodeVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CodeVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CodeVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    program<T extends ProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProgramDefaultArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CodeVersion model
   */ 
  interface CodeVersionFieldRefs {
    readonly id: FieldRef<"CodeVersion", 'String'>
    readonly programId: FieldRef<"CodeVersion", 'String'>
    readonly code: FieldRef<"CodeVersion", 'String'>
    readonly language: FieldRef<"CodeVersion", 'String'>
    readonly createdAt: FieldRef<"CodeVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CodeVersion findUnique
   */
  export type CodeVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * Filter, which CodeVersion to fetch.
     */
    where: CodeVersionWhereUniqueInput
  }

  /**
   * CodeVersion findUniqueOrThrow
   */
  export type CodeVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * Filter, which CodeVersion to fetch.
     */
    where: CodeVersionWhereUniqueInput
  }

  /**
   * CodeVersion findFirst
   */
  export type CodeVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * Filter, which CodeVersion to fetch.
     */
    where?: CodeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeVersions to fetch.
     */
    orderBy?: CodeVersionOrderByWithRelationInput | CodeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodeVersions.
     */
    cursor?: CodeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodeVersions.
     */
    distinct?: CodeVersionScalarFieldEnum | CodeVersionScalarFieldEnum[]
  }

  /**
   * CodeVersion findFirstOrThrow
   */
  export type CodeVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * Filter, which CodeVersion to fetch.
     */
    where?: CodeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeVersions to fetch.
     */
    orderBy?: CodeVersionOrderByWithRelationInput | CodeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodeVersions.
     */
    cursor?: CodeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodeVersions.
     */
    distinct?: CodeVersionScalarFieldEnum | CodeVersionScalarFieldEnum[]
  }

  /**
   * CodeVersion findMany
   */
  export type CodeVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * Filter, which CodeVersions to fetch.
     */
    where?: CodeVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeVersions to fetch.
     */
    orderBy?: CodeVersionOrderByWithRelationInput | CodeVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CodeVersions.
     */
    cursor?: CodeVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeVersions.
     */
    skip?: number
    distinct?: CodeVersionScalarFieldEnum | CodeVersionScalarFieldEnum[]
  }

  /**
   * CodeVersion create
   */
  export type CodeVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a CodeVersion.
     */
    data: XOR<CodeVersionCreateInput, CodeVersionUncheckedCreateInput>
  }

  /**
   * CodeVersion createMany
   */
  export type CodeVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CodeVersions.
     */
    data: CodeVersionCreateManyInput | CodeVersionCreateManyInput[]
  }

  /**
   * CodeVersion createManyAndReturn
   */
  export type CodeVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * The data used to create many CodeVersions.
     */
    data: CodeVersionCreateManyInput | CodeVersionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodeVersion update
   */
  export type CodeVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a CodeVersion.
     */
    data: XOR<CodeVersionUpdateInput, CodeVersionUncheckedUpdateInput>
    /**
     * Choose, which CodeVersion to update.
     */
    where: CodeVersionWhereUniqueInput
  }

  /**
   * CodeVersion updateMany
   */
  export type CodeVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CodeVersions.
     */
    data: XOR<CodeVersionUpdateManyMutationInput, CodeVersionUncheckedUpdateManyInput>
    /**
     * Filter which CodeVersions to update
     */
    where?: CodeVersionWhereInput
    /**
     * Limit how many CodeVersions to update.
     */
    limit?: number
  }

  /**
   * CodeVersion updateManyAndReturn
   */
  export type CodeVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * The data used to update CodeVersions.
     */
    data: XOR<CodeVersionUpdateManyMutationInput, CodeVersionUncheckedUpdateManyInput>
    /**
     * Filter which CodeVersions to update
     */
    where?: CodeVersionWhereInput
    /**
     * Limit how many CodeVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodeVersion upsert
   */
  export type CodeVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the CodeVersion to update in case it exists.
     */
    where: CodeVersionWhereUniqueInput
    /**
     * In case the CodeVersion found by the `where` argument doesn't exist, create a new CodeVersion with this data.
     */
    create: XOR<CodeVersionCreateInput, CodeVersionUncheckedCreateInput>
    /**
     * In case the CodeVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CodeVersionUpdateInput, CodeVersionUncheckedUpdateInput>
  }

  /**
   * CodeVersion delete
   */
  export type CodeVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
    /**
     * Filter which CodeVersion to delete.
     */
    where: CodeVersionWhereUniqueInput
  }

  /**
   * CodeVersion deleteMany
   */
  export type CodeVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodeVersions to delete
     */
    where?: CodeVersionWhereInput
    /**
     * Limit how many CodeVersions to delete.
     */
    limit?: number
  }

  /**
   * CodeVersion without action
   */
  export type CodeVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeVersion
     */
    select?: CodeVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeVersion
     */
    omit?: CodeVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeVersionInclude<ExtArgs> | null
  }


  /**
   * Model Execution
   */

  export type AggregateExecution = {
    _count: ExecutionCountAggregateOutputType | null
    _avg: ExecutionAvgAggregateOutputType | null
    _sum: ExecutionSumAggregateOutputType | null
    _min: ExecutionMinAggregateOutputType | null
    _max: ExecutionMaxAggregateOutputType | null
  }

  export type ExecutionAvgAggregateOutputType = {
    executionTime: number | null
    exitCode: number | null
  }

  export type ExecutionSumAggregateOutputType = {
    executionTime: number | null
    exitCode: number | null
  }

  export type ExecutionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    programId: string | null
    language: string | null
    code: string | null
    input: string | null
    status: string | null
    stdout: string | null
    stderr: string | null
    executionTime: number | null
    exitCode: number | null
    createdAt: Date | null
  }

  export type ExecutionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    programId: string | null
    language: string | null
    code: string | null
    input: string | null
    status: string | null
    stdout: string | null
    stderr: string | null
    executionTime: number | null
    exitCode: number | null
    createdAt: Date | null
  }

  export type ExecutionCountAggregateOutputType = {
    id: number
    userId: number
    programId: number
    language: number
    code: number
    input: number
    status: number
    stdout: number
    stderr: number
    executionTime: number
    exitCode: number
    createdAt: number
    _all: number
  }


  export type ExecutionAvgAggregateInputType = {
    executionTime?: true
    exitCode?: true
  }

  export type ExecutionSumAggregateInputType = {
    executionTime?: true
    exitCode?: true
  }

  export type ExecutionMinAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    language?: true
    code?: true
    input?: true
    status?: true
    stdout?: true
    stderr?: true
    executionTime?: true
    exitCode?: true
    createdAt?: true
  }

  export type ExecutionMaxAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    language?: true
    code?: true
    input?: true
    status?: true
    stdout?: true
    stderr?: true
    executionTime?: true
    exitCode?: true
    createdAt?: true
  }

  export type ExecutionCountAggregateInputType = {
    id?: true
    userId?: true
    programId?: true
    language?: true
    code?: true
    input?: true
    status?: true
    stdout?: true
    stderr?: true
    executionTime?: true
    exitCode?: true
    createdAt?: true
    _all?: true
  }

  export type ExecutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Execution to aggregate.
     */
    where?: ExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Executions to fetch.
     */
    orderBy?: ExecutionOrderByWithRelationInput | ExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Executions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Executions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Executions
    **/
    _count?: true | ExecutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExecutionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExecutionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExecutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExecutionMaxAggregateInputType
  }

  export type GetExecutionAggregateType<T extends ExecutionAggregateArgs> = {
        [P in keyof T & keyof AggregateExecution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExecution[P]>
      : GetScalarType<T[P], AggregateExecution[P]>
  }




  export type ExecutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionWhereInput
    orderBy?: ExecutionOrderByWithAggregationInput | ExecutionOrderByWithAggregationInput[]
    by: ExecutionScalarFieldEnum[] | ExecutionScalarFieldEnum
    having?: ExecutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExecutionCountAggregateInputType | true
    _avg?: ExecutionAvgAggregateInputType
    _sum?: ExecutionSumAggregateInputType
    _min?: ExecutionMinAggregateInputType
    _max?: ExecutionMaxAggregateInputType
  }

  export type ExecutionGroupByOutputType = {
    id: string
    userId: string | null
    programId: string | null
    language: string
    code: string
    input: string | null
    status: string
    stdout: string | null
    stderr: string | null
    executionTime: number
    exitCode: number
    createdAt: Date
    _count: ExecutionCountAggregateOutputType | null
    _avg: ExecutionAvgAggregateOutputType | null
    _sum: ExecutionSumAggregateOutputType | null
    _min: ExecutionMinAggregateOutputType | null
    _max: ExecutionMaxAggregateOutputType | null
  }

  type GetExecutionGroupByPayload<T extends ExecutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExecutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExecutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExecutionGroupByOutputType[P]>
            : GetScalarType<T[P], ExecutionGroupByOutputType[P]>
        }
      >
    >


  export type ExecutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    language?: boolean
    code?: boolean
    input?: boolean
    status?: boolean
    stdout?: boolean
    stderr?: boolean
    executionTime?: boolean
    exitCode?: boolean
    createdAt?: boolean
    user?: boolean | Execution$userArgs<ExtArgs>
    program?: boolean | Execution$programArgs<ExtArgs>
    aiAnalyses?: boolean | Execution$aiAnalysesArgs<ExtArgs>
    _count?: boolean | ExecutionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["execution"]>

  export type ExecutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    language?: boolean
    code?: boolean
    input?: boolean
    status?: boolean
    stdout?: boolean
    stderr?: boolean
    executionTime?: boolean
    exitCode?: boolean
    createdAt?: boolean
    user?: boolean | Execution$userArgs<ExtArgs>
    program?: boolean | Execution$programArgs<ExtArgs>
  }, ExtArgs["result"]["execution"]>

  export type ExecutionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    programId?: boolean
    language?: boolean
    code?: boolean
    input?: boolean
    status?: boolean
    stdout?: boolean
    stderr?: boolean
    executionTime?: boolean
    exitCode?: boolean
    createdAt?: boolean
    user?: boolean | Execution$userArgs<ExtArgs>
    program?: boolean | Execution$programArgs<ExtArgs>
  }, ExtArgs["result"]["execution"]>

  export type ExecutionSelectScalar = {
    id?: boolean
    userId?: boolean
    programId?: boolean
    language?: boolean
    code?: boolean
    input?: boolean
    status?: boolean
    stdout?: boolean
    stderr?: boolean
    executionTime?: boolean
    exitCode?: boolean
    createdAt?: boolean
  }

  export type ExecutionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "programId" | "language" | "code" | "input" | "status" | "stdout" | "stderr" | "executionTime" | "exitCode" | "createdAt", ExtArgs["result"]["execution"]>
  export type ExecutionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Execution$userArgs<ExtArgs>
    program?: boolean | Execution$programArgs<ExtArgs>
    aiAnalyses?: boolean | Execution$aiAnalysesArgs<ExtArgs>
    _count?: boolean | ExecutionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExecutionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Execution$userArgs<ExtArgs>
    program?: boolean | Execution$programArgs<ExtArgs>
  }
  export type ExecutionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Execution$userArgs<ExtArgs>
    program?: boolean | Execution$programArgs<ExtArgs>
  }

  export type $ExecutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Execution"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      program: Prisma.$ProgramPayload<ExtArgs> | null
      aiAnalyses: Prisma.$AIAnalysisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      programId: string | null
      language: string
      code: string
      input: string | null
      status: string
      stdout: string | null
      stderr: string | null
      executionTime: number
      exitCode: number
      createdAt: Date
    }, ExtArgs["result"]["execution"]>
    composites: {}
  }

  type ExecutionGetPayload<S extends boolean | null | undefined | ExecutionDefaultArgs> = $Result.GetResult<Prisma.$ExecutionPayload, S>

  type ExecutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExecutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExecutionCountAggregateInputType | true
    }

  export interface ExecutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Execution'], meta: { name: 'Execution' } }
    /**
     * Find zero or one Execution that matches the filter.
     * @param {ExecutionFindUniqueArgs} args - Arguments to find a Execution
     * @example
     * // Get one Execution
     * const execution = await prisma.execution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExecutionFindUniqueArgs>(args: SelectSubset<T, ExecutionFindUniqueArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Execution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExecutionFindUniqueOrThrowArgs} args - Arguments to find a Execution
     * @example
     * // Get one Execution
     * const execution = await prisma.execution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExecutionFindUniqueOrThrowArgs>(args: SelectSubset<T, ExecutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Execution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionFindFirstArgs} args - Arguments to find a Execution
     * @example
     * // Get one Execution
     * const execution = await prisma.execution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExecutionFindFirstArgs>(args?: SelectSubset<T, ExecutionFindFirstArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Execution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionFindFirstOrThrowArgs} args - Arguments to find a Execution
     * @example
     * // Get one Execution
     * const execution = await prisma.execution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExecutionFindFirstOrThrowArgs>(args?: SelectSubset<T, ExecutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Executions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Executions
     * const executions = await prisma.execution.findMany()
     * 
     * // Get first 10 Executions
     * const executions = await prisma.execution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const executionWithIdOnly = await prisma.execution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExecutionFindManyArgs>(args?: SelectSubset<T, ExecutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Execution.
     * @param {ExecutionCreateArgs} args - Arguments to create a Execution.
     * @example
     * // Create one Execution
     * const Execution = await prisma.execution.create({
     *   data: {
     *     // ... data to create a Execution
     *   }
     * })
     * 
     */
    create<T extends ExecutionCreateArgs>(args: SelectSubset<T, ExecutionCreateArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Executions.
     * @param {ExecutionCreateManyArgs} args - Arguments to create many Executions.
     * @example
     * // Create many Executions
     * const execution = await prisma.execution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExecutionCreateManyArgs>(args?: SelectSubset<T, ExecutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Executions and returns the data saved in the database.
     * @param {ExecutionCreateManyAndReturnArgs} args - Arguments to create many Executions.
     * @example
     * // Create many Executions
     * const execution = await prisma.execution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Executions and only return the `id`
     * const executionWithIdOnly = await prisma.execution.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExecutionCreateManyAndReturnArgs>(args?: SelectSubset<T, ExecutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Execution.
     * @param {ExecutionDeleteArgs} args - Arguments to delete one Execution.
     * @example
     * // Delete one Execution
     * const Execution = await prisma.execution.delete({
     *   where: {
     *     // ... filter to delete one Execution
     *   }
     * })
     * 
     */
    delete<T extends ExecutionDeleteArgs>(args: SelectSubset<T, ExecutionDeleteArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Execution.
     * @param {ExecutionUpdateArgs} args - Arguments to update one Execution.
     * @example
     * // Update one Execution
     * const execution = await prisma.execution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExecutionUpdateArgs>(args: SelectSubset<T, ExecutionUpdateArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Executions.
     * @param {ExecutionDeleteManyArgs} args - Arguments to filter Executions to delete.
     * @example
     * // Delete a few Executions
     * const { count } = await prisma.execution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExecutionDeleteManyArgs>(args?: SelectSubset<T, ExecutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Executions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Executions
     * const execution = await prisma.execution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExecutionUpdateManyArgs>(args: SelectSubset<T, ExecutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Executions and returns the data updated in the database.
     * @param {ExecutionUpdateManyAndReturnArgs} args - Arguments to update many Executions.
     * @example
     * // Update many Executions
     * const execution = await prisma.execution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Executions and only return the `id`
     * const executionWithIdOnly = await prisma.execution.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExecutionUpdateManyAndReturnArgs>(args: SelectSubset<T, ExecutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Execution.
     * @param {ExecutionUpsertArgs} args - Arguments to update or create a Execution.
     * @example
     * // Update or create a Execution
     * const execution = await prisma.execution.upsert({
     *   create: {
     *     // ... data to create a Execution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Execution we want to update
     *   }
     * })
     */
    upsert<T extends ExecutionUpsertArgs>(args: SelectSubset<T, ExecutionUpsertArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Executions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionCountArgs} args - Arguments to filter Executions to count.
     * @example
     * // Count the number of Executions
     * const count = await prisma.execution.count({
     *   where: {
     *     // ... the filter for the Executions we want to count
     *   }
     * })
    **/
    count<T extends ExecutionCountArgs>(
      args?: Subset<T, ExecutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExecutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Execution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExecutionAggregateArgs>(args: Subset<T, ExecutionAggregateArgs>): Prisma.PrismaPromise<GetExecutionAggregateType<T>>

    /**
     * Group by Execution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExecutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExecutionGroupByArgs['orderBy'] }
        : { orderBy?: ExecutionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExecutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExecutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Execution model
   */
  readonly fields: ExecutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Execution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExecutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Execution$userArgs<ExtArgs> = {}>(args?: Subset<T, Execution$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    program<T extends Execution$programArgs<ExtArgs> = {}>(args?: Subset<T, Execution$programArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    aiAnalyses<T extends Execution$aiAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, Execution$aiAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Execution model
   */ 
  interface ExecutionFieldRefs {
    readonly id: FieldRef<"Execution", 'String'>
    readonly userId: FieldRef<"Execution", 'String'>
    readonly programId: FieldRef<"Execution", 'String'>
    readonly language: FieldRef<"Execution", 'String'>
    readonly code: FieldRef<"Execution", 'String'>
    readonly input: FieldRef<"Execution", 'String'>
    readonly status: FieldRef<"Execution", 'String'>
    readonly stdout: FieldRef<"Execution", 'String'>
    readonly stderr: FieldRef<"Execution", 'String'>
    readonly executionTime: FieldRef<"Execution", 'Int'>
    readonly exitCode: FieldRef<"Execution", 'Int'>
    readonly createdAt: FieldRef<"Execution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Execution findUnique
   */
  export type ExecutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * Filter, which Execution to fetch.
     */
    where: ExecutionWhereUniqueInput
  }

  /**
   * Execution findUniqueOrThrow
   */
  export type ExecutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * Filter, which Execution to fetch.
     */
    where: ExecutionWhereUniqueInput
  }

  /**
   * Execution findFirst
   */
  export type ExecutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * Filter, which Execution to fetch.
     */
    where?: ExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Executions to fetch.
     */
    orderBy?: ExecutionOrderByWithRelationInput | ExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Executions.
     */
    cursor?: ExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Executions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Executions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Executions.
     */
    distinct?: ExecutionScalarFieldEnum | ExecutionScalarFieldEnum[]
  }

  /**
   * Execution findFirstOrThrow
   */
  export type ExecutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * Filter, which Execution to fetch.
     */
    where?: ExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Executions to fetch.
     */
    orderBy?: ExecutionOrderByWithRelationInput | ExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Executions.
     */
    cursor?: ExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Executions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Executions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Executions.
     */
    distinct?: ExecutionScalarFieldEnum | ExecutionScalarFieldEnum[]
  }

  /**
   * Execution findMany
   */
  export type ExecutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * Filter, which Executions to fetch.
     */
    where?: ExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Executions to fetch.
     */
    orderBy?: ExecutionOrderByWithRelationInput | ExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Executions.
     */
    cursor?: ExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Executions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Executions.
     */
    skip?: number
    distinct?: ExecutionScalarFieldEnum | ExecutionScalarFieldEnum[]
  }

  /**
   * Execution create
   */
  export type ExecutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * The data needed to create a Execution.
     */
    data: XOR<ExecutionCreateInput, ExecutionUncheckedCreateInput>
  }

  /**
   * Execution createMany
   */
  export type ExecutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Executions.
     */
    data: ExecutionCreateManyInput | ExecutionCreateManyInput[]
  }

  /**
   * Execution createManyAndReturn
   */
  export type ExecutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * The data used to create many Executions.
     */
    data: ExecutionCreateManyInput | ExecutionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Execution update
   */
  export type ExecutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * The data needed to update a Execution.
     */
    data: XOR<ExecutionUpdateInput, ExecutionUncheckedUpdateInput>
    /**
     * Choose, which Execution to update.
     */
    where: ExecutionWhereUniqueInput
  }

  /**
   * Execution updateMany
   */
  export type ExecutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Executions.
     */
    data: XOR<ExecutionUpdateManyMutationInput, ExecutionUncheckedUpdateManyInput>
    /**
     * Filter which Executions to update
     */
    where?: ExecutionWhereInput
    /**
     * Limit how many Executions to update.
     */
    limit?: number
  }

  /**
   * Execution updateManyAndReturn
   */
  export type ExecutionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * The data used to update Executions.
     */
    data: XOR<ExecutionUpdateManyMutationInput, ExecutionUncheckedUpdateManyInput>
    /**
     * Filter which Executions to update
     */
    where?: ExecutionWhereInput
    /**
     * Limit how many Executions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Execution upsert
   */
  export type ExecutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * The filter to search for the Execution to update in case it exists.
     */
    where: ExecutionWhereUniqueInput
    /**
     * In case the Execution found by the `where` argument doesn't exist, create a new Execution with this data.
     */
    create: XOR<ExecutionCreateInput, ExecutionUncheckedCreateInput>
    /**
     * In case the Execution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExecutionUpdateInput, ExecutionUncheckedUpdateInput>
  }

  /**
   * Execution delete
   */
  export type ExecutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
    /**
     * Filter which Execution to delete.
     */
    where: ExecutionWhereUniqueInput
  }

  /**
   * Execution deleteMany
   */
  export type ExecutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Executions to delete
     */
    where?: ExecutionWhereInput
    /**
     * Limit how many Executions to delete.
     */
    limit?: number
  }

  /**
   * Execution.user
   */
  export type Execution$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Execution.program
   */
  export type Execution$programArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    where?: ProgramWhereInput
  }

  /**
   * Execution.aiAnalyses
   */
  export type Execution$aiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    cursor?: AIAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * Execution without action
   */
  export type ExecutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Execution
     */
    select?: ExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Execution
     */
    omit?: ExecutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionInclude<ExtArgs> | null
  }


  /**
   * Model AIAnalysis
   */

  export type AggregateAIAnalysis = {
    _count: AIAnalysisCountAggregateOutputType | null
    _min: AIAnalysisMinAggregateOutputType | null
    _max: AIAnalysisMaxAggregateOutputType | null
  }

  export type AIAnalysisMinAggregateOutputType = {
    id: string | null
    executionId: string | null
    errorType: string | null
    explanation: string | null
    possibleCause: string | null
    suggestedFix: string | null
    correctedCode: string | null
    optimizationSuggestions: string | null
    createdAt: Date | null
  }

  export type AIAnalysisMaxAggregateOutputType = {
    id: string | null
    executionId: string | null
    errorType: string | null
    explanation: string | null
    possibleCause: string | null
    suggestedFix: string | null
    correctedCode: string | null
    optimizationSuggestions: string | null
    createdAt: Date | null
  }

  export type AIAnalysisCountAggregateOutputType = {
    id: number
    executionId: number
    errorType: number
    explanation: number
    possibleCause: number
    suggestedFix: number
    correctedCode: number
    optimizationSuggestions: number
    createdAt: number
    _all: number
  }


  export type AIAnalysisMinAggregateInputType = {
    id?: true
    executionId?: true
    errorType?: true
    explanation?: true
    possibleCause?: true
    suggestedFix?: true
    correctedCode?: true
    optimizationSuggestions?: true
    createdAt?: true
  }

  export type AIAnalysisMaxAggregateInputType = {
    id?: true
    executionId?: true
    errorType?: true
    explanation?: true
    possibleCause?: true
    suggestedFix?: true
    correctedCode?: true
    optimizationSuggestions?: true
    createdAt?: true
  }

  export type AIAnalysisCountAggregateInputType = {
    id?: true
    executionId?: true
    errorType?: true
    explanation?: true
    possibleCause?: true
    suggestedFix?: true
    correctedCode?: true
    optimizationSuggestions?: true
    createdAt?: true
    _all?: true
  }

  export type AIAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalysis to aggregate.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIAnalyses
    **/
    _count?: true | AIAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIAnalysisMaxAggregateInputType
  }

  export type GetAIAnalysisAggregateType<T extends AIAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateAIAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIAnalysis[P]>
      : GetScalarType<T[P], AggregateAIAnalysis[P]>
  }




  export type AIAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithAggregationInput | AIAnalysisOrderByWithAggregationInput[]
    by: AIAnalysisScalarFieldEnum[] | AIAnalysisScalarFieldEnum
    having?: AIAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIAnalysisCountAggregateInputType | true
    _min?: AIAnalysisMinAggregateInputType
    _max?: AIAnalysisMaxAggregateInputType
  }

  export type AIAnalysisGroupByOutputType = {
    id: string
    executionId: string
    errorType: string
    explanation: string
    possibleCause: string | null
    suggestedFix: string
    correctedCode: string
    optimizationSuggestions: string | null
    createdAt: Date
    _count: AIAnalysisCountAggregateOutputType | null
    _min: AIAnalysisMinAggregateOutputType | null
    _max: AIAnalysisMaxAggregateOutputType | null
  }

  type GetAIAnalysisGroupByPayload<T extends AIAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], AIAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type AIAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    executionId?: boolean
    errorType?: boolean
    explanation?: boolean
    possibleCause?: boolean
    suggestedFix?: boolean
    correctedCode?: boolean
    optimizationSuggestions?: boolean
    createdAt?: boolean
    execution?: boolean | ExecutionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    executionId?: boolean
    errorType?: boolean
    explanation?: boolean
    possibleCause?: boolean
    suggestedFix?: boolean
    correctedCode?: boolean
    optimizationSuggestions?: boolean
    createdAt?: boolean
    execution?: boolean | ExecutionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    executionId?: boolean
    errorType?: boolean
    explanation?: boolean
    possibleCause?: boolean
    suggestedFix?: boolean
    correctedCode?: boolean
    optimizationSuggestions?: boolean
    createdAt?: boolean
    execution?: boolean | ExecutionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectScalar = {
    id?: boolean
    executionId?: boolean
    errorType?: boolean
    explanation?: boolean
    possibleCause?: boolean
    suggestedFix?: boolean
    correctedCode?: boolean
    optimizationSuggestions?: boolean
    createdAt?: boolean
  }

  export type AIAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "executionId" | "errorType" | "explanation" | "possibleCause" | "suggestedFix" | "correctedCode" | "optimizationSuggestions" | "createdAt", ExtArgs["result"]["aIAnalysis"]>
  export type AIAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    execution?: boolean | ExecutionDefaultArgs<ExtArgs>
  }
  export type AIAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    execution?: boolean | ExecutionDefaultArgs<ExtArgs>
  }
  export type AIAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    execution?: boolean | ExecutionDefaultArgs<ExtArgs>
  }

  export type $AIAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIAnalysis"
    objects: {
      execution: Prisma.$ExecutionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      executionId: string
      errorType: string
      explanation: string
      possibleCause: string | null
      suggestedFix: string
      correctedCode: string
      optimizationSuggestions: string | null
      createdAt: Date
    }, ExtArgs["result"]["aIAnalysis"]>
    composites: {}
  }

  type AIAnalysisGetPayload<S extends boolean | null | undefined | AIAnalysisDefaultArgs> = $Result.GetResult<Prisma.$AIAnalysisPayload, S>

  type AIAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIAnalysisCountAggregateInputType | true
    }

  export interface AIAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIAnalysis'], meta: { name: 'AIAnalysis' } }
    /**
     * Find zero or one AIAnalysis that matches the filter.
     * @param {AIAnalysisFindUniqueArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIAnalysisFindUniqueArgs>(args: SelectSubset<T, AIAnalysisFindUniqueArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AIAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIAnalysisFindUniqueOrThrowArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, AIAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AIAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindFirstArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIAnalysisFindFirstArgs>(args?: SelectSubset<T, AIAnalysisFindFirstArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AIAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindFirstOrThrowArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, AIAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AIAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIAnalyses
     * const aIAnalyses = await prisma.aIAnalysis.findMany()
     * 
     * // Get first 10 AIAnalyses
     * const aIAnalyses = await prisma.aIAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIAnalysisFindManyArgs>(args?: SelectSubset<T, AIAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AIAnalysis.
     * @param {AIAnalysisCreateArgs} args - Arguments to create a AIAnalysis.
     * @example
     * // Create one AIAnalysis
     * const AIAnalysis = await prisma.aIAnalysis.create({
     *   data: {
     *     // ... data to create a AIAnalysis
     *   }
     * })
     * 
     */
    create<T extends AIAnalysisCreateArgs>(args: SelectSubset<T, AIAnalysisCreateArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AIAnalyses.
     * @param {AIAnalysisCreateManyArgs} args - Arguments to create many AIAnalyses.
     * @example
     * // Create many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIAnalysisCreateManyArgs>(args?: SelectSubset<T, AIAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIAnalyses and returns the data saved in the database.
     * @param {AIAnalysisCreateManyAndReturnArgs} args - Arguments to create many AIAnalyses.
     * @example
     * // Create many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIAnalyses and only return the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, AIAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AIAnalysis.
     * @param {AIAnalysisDeleteArgs} args - Arguments to delete one AIAnalysis.
     * @example
     * // Delete one AIAnalysis
     * const AIAnalysis = await prisma.aIAnalysis.delete({
     *   where: {
     *     // ... filter to delete one AIAnalysis
     *   }
     * })
     * 
     */
    delete<T extends AIAnalysisDeleteArgs>(args: SelectSubset<T, AIAnalysisDeleteArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AIAnalysis.
     * @param {AIAnalysisUpdateArgs} args - Arguments to update one AIAnalysis.
     * @example
     * // Update one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIAnalysisUpdateArgs>(args: SelectSubset<T, AIAnalysisUpdateArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AIAnalyses.
     * @param {AIAnalysisDeleteManyArgs} args - Arguments to filter AIAnalyses to delete.
     * @example
     * // Delete a few AIAnalyses
     * const { count } = await prisma.aIAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIAnalysisDeleteManyArgs>(args?: SelectSubset<T, AIAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIAnalysisUpdateManyArgs>(args: SelectSubset<T, AIAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAnalyses and returns the data updated in the database.
     * @param {AIAnalysisUpdateManyAndReturnArgs} args - Arguments to update many AIAnalyses.
     * @example
     * // Update many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIAnalyses and only return the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, AIAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AIAnalysis.
     * @param {AIAnalysisUpsertArgs} args - Arguments to update or create a AIAnalysis.
     * @example
     * // Update or create a AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.upsert({
     *   create: {
     *     // ... data to create a AIAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends AIAnalysisUpsertArgs>(args: SelectSubset<T, AIAnalysisUpsertArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AIAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisCountArgs} args - Arguments to filter AIAnalyses to count.
     * @example
     * // Count the number of AIAnalyses
     * const count = await prisma.aIAnalysis.count({
     *   where: {
     *     // ... the filter for the AIAnalyses we want to count
     *   }
     * })
    **/
    count<T extends AIAnalysisCountArgs>(
      args?: Subset<T, AIAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIAnalysisAggregateArgs>(args: Subset<T, AIAnalysisAggregateArgs>): Prisma.PrismaPromise<GetAIAnalysisAggregateType<T>>

    /**
     * Group by AIAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: AIAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIAnalysis model
   */
  readonly fields: AIAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    execution<T extends ExecutionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExecutionDefaultArgs<ExtArgs>>): Prisma__ExecutionClient<$Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIAnalysis model
   */ 
  interface AIAnalysisFieldRefs {
    readonly id: FieldRef<"AIAnalysis", 'String'>
    readonly executionId: FieldRef<"AIAnalysis", 'String'>
    readonly errorType: FieldRef<"AIAnalysis", 'String'>
    readonly explanation: FieldRef<"AIAnalysis", 'String'>
    readonly possibleCause: FieldRef<"AIAnalysis", 'String'>
    readonly suggestedFix: FieldRef<"AIAnalysis", 'String'>
    readonly correctedCode: FieldRef<"AIAnalysis", 'String'>
    readonly optimizationSuggestions: FieldRef<"AIAnalysis", 'String'>
    readonly createdAt: FieldRef<"AIAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIAnalysis findUnique
   */
  export type AIAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis findUniqueOrThrow
   */
  export type AIAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis findFirst
   */
  export type AIAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalyses.
     */
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis findFirstOrThrow
   */
  export type AIAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalyses.
     */
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis findMany
   */
  export type AIAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalyses to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis create
   */
  export type AIAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a AIAnalysis.
     */
    data: XOR<AIAnalysisCreateInput, AIAnalysisUncheckedCreateInput>
  }

  /**
   * AIAnalysis createMany
   */
  export type AIAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIAnalyses.
     */
    data: AIAnalysisCreateManyInput | AIAnalysisCreateManyInput[]
  }

  /**
   * AIAnalysis createManyAndReturn
   */
  export type AIAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many AIAnalyses.
     */
    data: AIAnalysisCreateManyInput | AIAnalysisCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIAnalysis update
   */
  export type AIAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a AIAnalysis.
     */
    data: XOR<AIAnalysisUpdateInput, AIAnalysisUncheckedUpdateInput>
    /**
     * Choose, which AIAnalysis to update.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis updateMany
   */
  export type AIAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIAnalyses.
     */
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which AIAnalyses to update
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to update.
     */
    limit?: number
  }

  /**
   * AIAnalysis updateManyAndReturn
   */
  export type AIAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update AIAnalyses.
     */
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which AIAnalyses to update
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIAnalysis upsert
   */
  export type AIAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the AIAnalysis to update in case it exists.
     */
    where: AIAnalysisWhereUniqueInput
    /**
     * In case the AIAnalysis found by the `where` argument doesn't exist, create a new AIAnalysis with this data.
     */
    create: XOR<AIAnalysisCreateInput, AIAnalysisUncheckedCreateInput>
    /**
     * In case the AIAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIAnalysisUpdateInput, AIAnalysisUncheckedUpdateInput>
  }

  /**
   * AIAnalysis delete
   */
  export type AIAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter which AIAnalysis to delete.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis deleteMany
   */
  export type AIAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalyses to delete
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to delete.
     */
    limit?: number
  }

  /**
   * AIAnalysis without action
   */
  export type AIAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProgramScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    language: 'language',
    code: 'code',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum]


  export const CodeVersionScalarFieldEnum: {
    id: 'id',
    programId: 'programId',
    code: 'code',
    language: 'language',
    createdAt: 'createdAt'
  };

  export type CodeVersionScalarFieldEnum = (typeof CodeVersionScalarFieldEnum)[keyof typeof CodeVersionScalarFieldEnum]


  export const ExecutionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    programId: 'programId',
    language: 'language',
    code: 'code',
    input: 'input',
    status: 'status',
    stdout: 'stdout',
    stderr: 'stderr',
    executionTime: 'executionTime',
    exitCode: 'exitCode',
    createdAt: 'createdAt'
  };

  export type ExecutionScalarFieldEnum = (typeof ExecutionScalarFieldEnum)[keyof typeof ExecutionScalarFieldEnum]


  export const AIAnalysisScalarFieldEnum: {
    id: 'id',
    executionId: 'executionId',
    errorType: 'errorType',
    explanation: 'explanation',
    possibleCause: 'possibleCause',
    suggestedFix: 'suggestedFix',
    correctedCode: 'correctedCode',
    optimizationSuggestions: 'optimizationSuggestions',
    createdAt: 'createdAt'
  };

  export type AIAnalysisScalarFieldEnum = (typeof AIAnalysisScalarFieldEnum)[keyof typeof AIAnalysisScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    programs?: ProgramListRelationFilter
    executions?: ExecutionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    programs?: ProgramOrderByRelationAggregateInput
    executions?: ExecutionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    programs?: ProgramListRelationFilter
    executions?: ExecutionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProgramWhereInput = {
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    id?: StringFilter<"Program"> | string
    userId?: StringFilter<"Program"> | string
    title?: StringFilter<"Program"> | string
    language?: StringFilter<"Program"> | string
    code?: StringFilter<"Program"> | string
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    versions?: CodeVersionListRelationFilter
    executions?: ExecutionListRelationFilter
  }

  export type ProgramOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    language?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    versions?: CodeVersionOrderByRelationAggregateInput
    executions?: ExecutionOrderByRelationAggregateInput
  }

  export type ProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    userId?: StringFilter<"Program"> | string
    title?: StringFilter<"Program"> | string
    language?: StringFilter<"Program"> | string
    code?: StringFilter<"Program"> | string
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    versions?: CodeVersionListRelationFilter
    executions?: ExecutionListRelationFilter
  }, "id">

  export type ProgramOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    language?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgramCountOrderByAggregateInput
    _max?: ProgramMaxOrderByAggregateInput
    _min?: ProgramMinOrderByAggregateInput
  }

  export type ProgramScalarWhereWithAggregatesInput = {
    AND?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    OR?: ProgramScalarWhereWithAggregatesInput[]
    NOT?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Program"> | string
    userId?: StringWithAggregatesFilter<"Program"> | string
    title?: StringWithAggregatesFilter<"Program"> | string
    language?: StringWithAggregatesFilter<"Program"> | string
    code?: StringWithAggregatesFilter<"Program"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
  }

  export type CodeVersionWhereInput = {
    AND?: CodeVersionWhereInput | CodeVersionWhereInput[]
    OR?: CodeVersionWhereInput[]
    NOT?: CodeVersionWhereInput | CodeVersionWhereInput[]
    id?: StringFilter<"CodeVersion"> | string
    programId?: StringFilter<"CodeVersion"> | string
    code?: StringFilter<"CodeVersion"> | string
    language?: StringFilter<"CodeVersion"> | string
    createdAt?: DateTimeFilter<"CodeVersion"> | Date | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
  }

  export type CodeVersionOrderByWithRelationInput = {
    id?: SortOrder
    programId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    program?: ProgramOrderByWithRelationInput
  }

  export type CodeVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CodeVersionWhereInput | CodeVersionWhereInput[]
    OR?: CodeVersionWhereInput[]
    NOT?: CodeVersionWhereInput | CodeVersionWhereInput[]
    programId?: StringFilter<"CodeVersion"> | string
    code?: StringFilter<"CodeVersion"> | string
    language?: StringFilter<"CodeVersion"> | string
    createdAt?: DateTimeFilter<"CodeVersion"> | Date | string
    program?: XOR<ProgramScalarRelationFilter, ProgramWhereInput>
  }, "id">

  export type CodeVersionOrderByWithAggregationInput = {
    id?: SortOrder
    programId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    _count?: CodeVersionCountOrderByAggregateInput
    _max?: CodeVersionMaxOrderByAggregateInput
    _min?: CodeVersionMinOrderByAggregateInput
  }

  export type CodeVersionScalarWhereWithAggregatesInput = {
    AND?: CodeVersionScalarWhereWithAggregatesInput | CodeVersionScalarWhereWithAggregatesInput[]
    OR?: CodeVersionScalarWhereWithAggregatesInput[]
    NOT?: CodeVersionScalarWhereWithAggregatesInput | CodeVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CodeVersion"> | string
    programId?: StringWithAggregatesFilter<"CodeVersion"> | string
    code?: StringWithAggregatesFilter<"CodeVersion"> | string
    language?: StringWithAggregatesFilter<"CodeVersion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CodeVersion"> | Date | string
  }

  export type ExecutionWhereInput = {
    AND?: ExecutionWhereInput | ExecutionWhereInput[]
    OR?: ExecutionWhereInput[]
    NOT?: ExecutionWhereInput | ExecutionWhereInput[]
    id?: StringFilter<"Execution"> | string
    userId?: StringNullableFilter<"Execution"> | string | null
    programId?: StringNullableFilter<"Execution"> | string | null
    language?: StringFilter<"Execution"> | string
    code?: StringFilter<"Execution"> | string
    input?: StringNullableFilter<"Execution"> | string | null
    status?: StringFilter<"Execution"> | string
    stdout?: StringNullableFilter<"Execution"> | string | null
    stderr?: StringNullableFilter<"Execution"> | string | null
    executionTime?: IntFilter<"Execution"> | number
    exitCode?: IntFilter<"Execution"> | number
    createdAt?: DateTimeFilter<"Execution"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    program?: XOR<ProgramNullableScalarRelationFilter, ProgramWhereInput> | null
    aiAnalyses?: AIAnalysisListRelationFilter
  }

  export type ExecutionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    programId?: SortOrderInput | SortOrder
    language?: SortOrder
    code?: SortOrder
    input?: SortOrderInput | SortOrder
    status?: SortOrder
    stdout?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    executionTime?: SortOrder
    exitCode?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    program?: ProgramOrderByWithRelationInput
    aiAnalyses?: AIAnalysisOrderByRelationAggregateInput
  }

  export type ExecutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExecutionWhereInput | ExecutionWhereInput[]
    OR?: ExecutionWhereInput[]
    NOT?: ExecutionWhereInput | ExecutionWhereInput[]
    userId?: StringNullableFilter<"Execution"> | string | null
    programId?: StringNullableFilter<"Execution"> | string | null
    language?: StringFilter<"Execution"> | string
    code?: StringFilter<"Execution"> | string
    input?: StringNullableFilter<"Execution"> | string | null
    status?: StringFilter<"Execution"> | string
    stdout?: StringNullableFilter<"Execution"> | string | null
    stderr?: StringNullableFilter<"Execution"> | string | null
    executionTime?: IntFilter<"Execution"> | number
    exitCode?: IntFilter<"Execution"> | number
    createdAt?: DateTimeFilter<"Execution"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    program?: XOR<ProgramNullableScalarRelationFilter, ProgramWhereInput> | null
    aiAnalyses?: AIAnalysisListRelationFilter
  }, "id">

  export type ExecutionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    programId?: SortOrderInput | SortOrder
    language?: SortOrder
    code?: SortOrder
    input?: SortOrderInput | SortOrder
    status?: SortOrder
    stdout?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    executionTime?: SortOrder
    exitCode?: SortOrder
    createdAt?: SortOrder
    _count?: ExecutionCountOrderByAggregateInput
    _avg?: ExecutionAvgOrderByAggregateInput
    _max?: ExecutionMaxOrderByAggregateInput
    _min?: ExecutionMinOrderByAggregateInput
    _sum?: ExecutionSumOrderByAggregateInput
  }

  export type ExecutionScalarWhereWithAggregatesInput = {
    AND?: ExecutionScalarWhereWithAggregatesInput | ExecutionScalarWhereWithAggregatesInput[]
    OR?: ExecutionScalarWhereWithAggregatesInput[]
    NOT?: ExecutionScalarWhereWithAggregatesInput | ExecutionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Execution"> | string
    userId?: StringNullableWithAggregatesFilter<"Execution"> | string | null
    programId?: StringNullableWithAggregatesFilter<"Execution"> | string | null
    language?: StringWithAggregatesFilter<"Execution"> | string
    code?: StringWithAggregatesFilter<"Execution"> | string
    input?: StringNullableWithAggregatesFilter<"Execution"> | string | null
    status?: StringWithAggregatesFilter<"Execution"> | string
    stdout?: StringNullableWithAggregatesFilter<"Execution"> | string | null
    stderr?: StringNullableWithAggregatesFilter<"Execution"> | string | null
    executionTime?: IntWithAggregatesFilter<"Execution"> | number
    exitCode?: IntWithAggregatesFilter<"Execution"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Execution"> | Date | string
  }

  export type AIAnalysisWhereInput = {
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    id?: StringFilter<"AIAnalysis"> | string
    executionId?: StringFilter<"AIAnalysis"> | string
    errorType?: StringFilter<"AIAnalysis"> | string
    explanation?: StringFilter<"AIAnalysis"> | string
    possibleCause?: StringNullableFilter<"AIAnalysis"> | string | null
    suggestedFix?: StringFilter<"AIAnalysis"> | string
    correctedCode?: StringFilter<"AIAnalysis"> | string
    optimizationSuggestions?: StringNullableFilter<"AIAnalysis"> | string | null
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    execution?: XOR<ExecutionScalarRelationFilter, ExecutionWhereInput>
  }

  export type AIAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    executionId?: SortOrder
    errorType?: SortOrder
    explanation?: SortOrder
    possibleCause?: SortOrderInput | SortOrder
    suggestedFix?: SortOrder
    correctedCode?: SortOrder
    optimizationSuggestions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    execution?: ExecutionOrderByWithRelationInput
  }

  export type AIAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    executionId?: StringFilter<"AIAnalysis"> | string
    errorType?: StringFilter<"AIAnalysis"> | string
    explanation?: StringFilter<"AIAnalysis"> | string
    possibleCause?: StringNullableFilter<"AIAnalysis"> | string | null
    suggestedFix?: StringFilter<"AIAnalysis"> | string
    correctedCode?: StringFilter<"AIAnalysis"> | string
    optimizationSuggestions?: StringNullableFilter<"AIAnalysis"> | string | null
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    execution?: XOR<ExecutionScalarRelationFilter, ExecutionWhereInput>
  }, "id">

  export type AIAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    executionId?: SortOrder
    errorType?: SortOrder
    explanation?: SortOrder
    possibleCause?: SortOrderInput | SortOrder
    suggestedFix?: SortOrder
    correctedCode?: SortOrder
    optimizationSuggestions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AIAnalysisCountOrderByAggregateInput
    _max?: AIAnalysisMaxOrderByAggregateInput
    _min?: AIAnalysisMinOrderByAggregateInput
  }

  export type AIAnalysisScalarWhereWithAggregatesInput = {
    AND?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    OR?: AIAnalysisScalarWhereWithAggregatesInput[]
    NOT?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIAnalysis"> | string
    executionId?: StringWithAggregatesFilter<"AIAnalysis"> | string
    errorType?: StringWithAggregatesFilter<"AIAnalysis"> | string
    explanation?: StringWithAggregatesFilter<"AIAnalysis"> | string
    possibleCause?: StringNullableWithAggregatesFilter<"AIAnalysis"> | string | null
    suggestedFix?: StringWithAggregatesFilter<"AIAnalysis"> | string
    correctedCode?: StringWithAggregatesFilter<"AIAnalysis"> | string
    optimizationSuggestions?: StringNullableWithAggregatesFilter<"AIAnalysis"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AIAnalysis"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramCreateNestedManyWithoutUserInput
    executions?: ExecutionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramUncheckedCreateNestedManyWithoutUserInput
    executions?: ExecutionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUpdateManyWithoutUserNestedInput
    executions?: ExecutionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUncheckedUpdateManyWithoutUserNestedInput
    executions?: ExecutionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramCreateInput = {
    id?: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProgramsInput
    versions?: CodeVersionCreateNestedManyWithoutProgramInput
    executions?: ExecutionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: CodeVersionUncheckedCreateNestedManyWithoutProgramInput
    executions?: ExecutionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProgramsNestedInput
    versions?: CodeVersionUpdateManyWithoutProgramNestedInput
    executions?: ExecutionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: CodeVersionUncheckedUpdateManyWithoutProgramNestedInput
    executions?: ExecutionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramCreateManyInput = {
    id?: string
    userId: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeVersionCreateInput = {
    id?: string
    code: string
    language: string
    createdAt?: Date | string
    program: ProgramCreateNestedOneWithoutVersionsInput
  }

  export type CodeVersionUncheckedCreateInput = {
    id?: string
    programId: string
    code: string
    language: string
    createdAt?: Date | string
  }

  export type CodeVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type CodeVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeVersionCreateManyInput = {
    id?: string
    programId: string
    code: string
    language: string
    createdAt?: Date | string
  }

  export type CodeVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionCreateInput = {
    id?: string
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutExecutionsInput
    program?: ProgramCreateNestedOneWithoutExecutionsInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutExecutionInput
  }

  export type ExecutionUncheckedCreateInput = {
    id?: string
    userId?: string | null
    programId?: string | null
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutExecutionInput
  }

  export type ExecutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExecutionsNestedInput
    program?: ProgramUpdateOneWithoutExecutionsNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutExecutionNestedInput
  }

  export type ExecutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutExecutionNestedInput
  }

  export type ExecutionCreateManyInput = {
    id?: string
    userId?: string | null
    programId?: string | null
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
  }

  export type ExecutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisCreateInput = {
    id?: string
    errorType: string
    explanation: string
    possibleCause?: string | null
    suggestedFix: string
    correctedCode: string
    optimizationSuggestions?: string | null
    createdAt?: Date | string
    execution: ExecutionCreateNestedOneWithoutAiAnalysesInput
  }

  export type AIAnalysisUncheckedCreateInput = {
    id?: string
    executionId: string
    errorType: string
    explanation: string
    possibleCause?: string | null
    suggestedFix: string
    correctedCode: string
    optimizationSuggestions?: string | null
    createdAt?: Date | string
  }

  export type AIAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorType?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    possibleCause?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedFix?: StringFieldUpdateOperationsInput | string
    correctedCode?: StringFieldUpdateOperationsInput | string
    optimizationSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    execution?: ExecutionUpdateOneRequiredWithoutAiAnalysesNestedInput
  }

  export type AIAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    executionId?: StringFieldUpdateOperationsInput | string
    errorType?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    possibleCause?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedFix?: StringFieldUpdateOperationsInput | string
    correctedCode?: StringFieldUpdateOperationsInput | string
    optimizationSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisCreateManyInput = {
    id?: string
    executionId: string
    errorType: string
    explanation: string
    possibleCause?: string | null
    suggestedFix: string
    correctedCode: string
    optimizationSuggestions?: string | null
    createdAt?: Date | string
  }

  export type AIAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorType?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    possibleCause?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedFix?: StringFieldUpdateOperationsInput | string
    correctedCode?: StringFieldUpdateOperationsInput | string
    optimizationSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    executionId?: StringFieldUpdateOperationsInput | string
    errorType?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    possibleCause?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedFix?: StringFieldUpdateOperationsInput | string
    correctedCode?: StringFieldUpdateOperationsInput | string
    optimizationSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProgramListRelationFilter = {
    every?: ProgramWhereInput
    some?: ProgramWhereInput
    none?: ProgramWhereInput
  }

  export type ExecutionListRelationFilter = {
    every?: ExecutionWhereInput
    some?: ExecutionWhereInput
    none?: ExecutionWhereInput
  }

  export type ProgramOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExecutionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CodeVersionListRelationFilter = {
    every?: CodeVersionWhereInput
    some?: CodeVersionWhereInput
    none?: CodeVersionWhereInput
  }

  export type CodeVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    language?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    language?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    language?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramScalarRelationFilter = {
    is?: ProgramWhereInput
    isNot?: ProgramWhereInput
  }

  export type CodeVersionCountOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
  }

  export type CodeVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
  }

  export type CodeVersionMinOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProgramNullableScalarRelationFilter = {
    is?: ProgramWhereInput | null
    isNot?: ProgramWhereInput | null
  }

  export type AIAnalysisListRelationFilter = {
    every?: AIAnalysisWhereInput
    some?: AIAnalysisWhereInput
    none?: AIAnalysisWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AIAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExecutionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    language?: SortOrder
    code?: SortOrder
    input?: SortOrder
    status?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    executionTime?: SortOrder
    exitCode?: SortOrder
    createdAt?: SortOrder
  }

  export type ExecutionAvgOrderByAggregateInput = {
    executionTime?: SortOrder
    exitCode?: SortOrder
  }

  export type ExecutionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    language?: SortOrder
    code?: SortOrder
    input?: SortOrder
    status?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    executionTime?: SortOrder
    exitCode?: SortOrder
    createdAt?: SortOrder
  }

  export type ExecutionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    programId?: SortOrder
    language?: SortOrder
    code?: SortOrder
    input?: SortOrder
    status?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    executionTime?: SortOrder
    exitCode?: SortOrder
    createdAt?: SortOrder
  }

  export type ExecutionSumOrderByAggregateInput = {
    executionTime?: SortOrder
    exitCode?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ExecutionScalarRelationFilter = {
    is?: ExecutionWhereInput
    isNot?: ExecutionWhereInput
  }

  export type AIAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    executionId?: SortOrder
    errorType?: SortOrder
    explanation?: SortOrder
    possibleCause?: SortOrder
    suggestedFix?: SortOrder
    correctedCode?: SortOrder
    optimizationSuggestions?: SortOrder
    createdAt?: SortOrder
  }

  export type AIAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    executionId?: SortOrder
    errorType?: SortOrder
    explanation?: SortOrder
    possibleCause?: SortOrder
    suggestedFix?: SortOrder
    correctedCode?: SortOrder
    optimizationSuggestions?: SortOrder
    createdAt?: SortOrder
  }

  export type AIAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    executionId?: SortOrder
    errorType?: SortOrder
    explanation?: SortOrder
    possibleCause?: SortOrder
    suggestedFix?: SortOrder
    correctedCode?: SortOrder
    optimizationSuggestions?: SortOrder
    createdAt?: SortOrder
  }

  export type ProgramCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgramCreateWithoutUserInput, ProgramUncheckedCreateWithoutUserInput> | ProgramCreateWithoutUserInput[] | ProgramUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutUserInput | ProgramCreateOrConnectWithoutUserInput[]
    createMany?: ProgramCreateManyUserInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type ExecutionCreateNestedManyWithoutUserInput = {
    create?: XOR<ExecutionCreateWithoutUserInput, ExecutionUncheckedCreateWithoutUserInput> | ExecutionCreateWithoutUserInput[] | ExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutUserInput | ExecutionCreateOrConnectWithoutUserInput[]
    createMany?: ExecutionCreateManyUserInputEnvelope
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
  }

  export type ProgramUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgramCreateWithoutUserInput, ProgramUncheckedCreateWithoutUserInput> | ProgramCreateWithoutUserInput[] | ProgramUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutUserInput | ProgramCreateOrConnectWithoutUserInput[]
    createMany?: ProgramCreateManyUserInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type ExecutionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExecutionCreateWithoutUserInput, ExecutionUncheckedCreateWithoutUserInput> | ExecutionCreateWithoutUserInput[] | ExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutUserInput | ExecutionCreateOrConnectWithoutUserInput[]
    createMany?: ExecutionCreateManyUserInputEnvelope
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProgramUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgramCreateWithoutUserInput, ProgramUncheckedCreateWithoutUserInput> | ProgramCreateWithoutUserInput[] | ProgramUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutUserInput | ProgramCreateOrConnectWithoutUserInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutUserInput | ProgramUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgramCreateManyUserInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutUserInput | ProgramUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutUserInput | ProgramUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type ExecutionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExecutionCreateWithoutUserInput, ExecutionUncheckedCreateWithoutUserInput> | ExecutionCreateWithoutUserInput[] | ExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutUserInput | ExecutionCreateOrConnectWithoutUserInput[]
    upsert?: ExecutionUpsertWithWhereUniqueWithoutUserInput | ExecutionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExecutionCreateManyUserInputEnvelope
    set?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    disconnect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    delete?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    update?: ExecutionUpdateWithWhereUniqueWithoutUserInput | ExecutionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExecutionUpdateManyWithWhereWithoutUserInput | ExecutionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExecutionScalarWhereInput | ExecutionScalarWhereInput[]
  }

  export type ProgramUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgramCreateWithoutUserInput, ProgramUncheckedCreateWithoutUserInput> | ProgramCreateWithoutUserInput[] | ProgramUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutUserInput | ProgramCreateOrConnectWithoutUserInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutUserInput | ProgramUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgramCreateManyUserInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutUserInput | ProgramUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutUserInput | ProgramUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type ExecutionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExecutionCreateWithoutUserInput, ExecutionUncheckedCreateWithoutUserInput> | ExecutionCreateWithoutUserInput[] | ExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutUserInput | ExecutionCreateOrConnectWithoutUserInput[]
    upsert?: ExecutionUpsertWithWhereUniqueWithoutUserInput | ExecutionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExecutionCreateManyUserInputEnvelope
    set?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    disconnect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    delete?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    update?: ExecutionUpdateWithWhereUniqueWithoutUserInput | ExecutionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExecutionUpdateManyWithWhereWithoutUserInput | ExecutionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExecutionScalarWhereInput | ExecutionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProgramsInput = {
    create?: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgramsInput
    connect?: UserWhereUniqueInput
  }

  export type CodeVersionCreateNestedManyWithoutProgramInput = {
    create?: XOR<CodeVersionCreateWithoutProgramInput, CodeVersionUncheckedCreateWithoutProgramInput> | CodeVersionCreateWithoutProgramInput[] | CodeVersionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: CodeVersionCreateOrConnectWithoutProgramInput | CodeVersionCreateOrConnectWithoutProgramInput[]
    createMany?: CodeVersionCreateManyProgramInputEnvelope
    connect?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
  }

  export type ExecutionCreateNestedManyWithoutProgramInput = {
    create?: XOR<ExecutionCreateWithoutProgramInput, ExecutionUncheckedCreateWithoutProgramInput> | ExecutionCreateWithoutProgramInput[] | ExecutionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutProgramInput | ExecutionCreateOrConnectWithoutProgramInput[]
    createMany?: ExecutionCreateManyProgramInputEnvelope
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
  }

  export type CodeVersionUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<CodeVersionCreateWithoutProgramInput, CodeVersionUncheckedCreateWithoutProgramInput> | CodeVersionCreateWithoutProgramInput[] | CodeVersionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: CodeVersionCreateOrConnectWithoutProgramInput | CodeVersionCreateOrConnectWithoutProgramInput[]
    createMany?: CodeVersionCreateManyProgramInputEnvelope
    connect?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
  }

  export type ExecutionUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<ExecutionCreateWithoutProgramInput, ExecutionUncheckedCreateWithoutProgramInput> | ExecutionCreateWithoutProgramInput[] | ExecutionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutProgramInput | ExecutionCreateOrConnectWithoutProgramInput[]
    createMany?: ExecutionCreateManyProgramInputEnvelope
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutProgramsNestedInput = {
    create?: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgramsInput
    upsert?: UserUpsertWithoutProgramsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgramsInput, UserUpdateWithoutProgramsInput>, UserUncheckedUpdateWithoutProgramsInput>
  }

  export type CodeVersionUpdateManyWithoutProgramNestedInput = {
    create?: XOR<CodeVersionCreateWithoutProgramInput, CodeVersionUncheckedCreateWithoutProgramInput> | CodeVersionCreateWithoutProgramInput[] | CodeVersionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: CodeVersionCreateOrConnectWithoutProgramInput | CodeVersionCreateOrConnectWithoutProgramInput[]
    upsert?: CodeVersionUpsertWithWhereUniqueWithoutProgramInput | CodeVersionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: CodeVersionCreateManyProgramInputEnvelope
    set?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    disconnect?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    delete?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    connect?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    update?: CodeVersionUpdateWithWhereUniqueWithoutProgramInput | CodeVersionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: CodeVersionUpdateManyWithWhereWithoutProgramInput | CodeVersionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: CodeVersionScalarWhereInput | CodeVersionScalarWhereInput[]
  }

  export type ExecutionUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ExecutionCreateWithoutProgramInput, ExecutionUncheckedCreateWithoutProgramInput> | ExecutionCreateWithoutProgramInput[] | ExecutionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutProgramInput | ExecutionCreateOrConnectWithoutProgramInput[]
    upsert?: ExecutionUpsertWithWhereUniqueWithoutProgramInput | ExecutionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ExecutionCreateManyProgramInputEnvelope
    set?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    disconnect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    delete?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    update?: ExecutionUpdateWithWhereUniqueWithoutProgramInput | ExecutionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ExecutionUpdateManyWithWhereWithoutProgramInput | ExecutionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ExecutionScalarWhereInput | ExecutionScalarWhereInput[]
  }

  export type CodeVersionUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<CodeVersionCreateWithoutProgramInput, CodeVersionUncheckedCreateWithoutProgramInput> | CodeVersionCreateWithoutProgramInput[] | CodeVersionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: CodeVersionCreateOrConnectWithoutProgramInput | CodeVersionCreateOrConnectWithoutProgramInput[]
    upsert?: CodeVersionUpsertWithWhereUniqueWithoutProgramInput | CodeVersionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: CodeVersionCreateManyProgramInputEnvelope
    set?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    disconnect?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    delete?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    connect?: CodeVersionWhereUniqueInput | CodeVersionWhereUniqueInput[]
    update?: CodeVersionUpdateWithWhereUniqueWithoutProgramInput | CodeVersionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: CodeVersionUpdateManyWithWhereWithoutProgramInput | CodeVersionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: CodeVersionScalarWhereInput | CodeVersionScalarWhereInput[]
  }

  export type ExecutionUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<ExecutionCreateWithoutProgramInput, ExecutionUncheckedCreateWithoutProgramInput> | ExecutionCreateWithoutProgramInput[] | ExecutionUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: ExecutionCreateOrConnectWithoutProgramInput | ExecutionCreateOrConnectWithoutProgramInput[]
    upsert?: ExecutionUpsertWithWhereUniqueWithoutProgramInput | ExecutionUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: ExecutionCreateManyProgramInputEnvelope
    set?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    disconnect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    delete?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    connect?: ExecutionWhereUniqueInput | ExecutionWhereUniqueInput[]
    update?: ExecutionUpdateWithWhereUniqueWithoutProgramInput | ExecutionUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: ExecutionUpdateManyWithWhereWithoutProgramInput | ExecutionUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: ExecutionScalarWhereInput | ExecutionScalarWhereInput[]
  }

  export type ProgramCreateNestedOneWithoutVersionsInput = {
    create?: XOR<ProgramCreateWithoutVersionsInput, ProgramUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutVersionsInput
    connect?: ProgramWhereUniqueInput
  }

  export type ProgramUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<ProgramCreateWithoutVersionsInput, ProgramUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutVersionsInput
    upsert?: ProgramUpsertWithoutVersionsInput
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutVersionsInput, ProgramUpdateWithoutVersionsInput>, ProgramUncheckedUpdateWithoutVersionsInput>
  }

  export type UserCreateNestedOneWithoutExecutionsInput = {
    create?: XOR<UserCreateWithoutExecutionsInput, UserUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExecutionsInput
    connect?: UserWhereUniqueInput
  }

  export type ProgramCreateNestedOneWithoutExecutionsInput = {
    create?: XOR<ProgramCreateWithoutExecutionsInput, ProgramUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutExecutionsInput
    connect?: ProgramWhereUniqueInput
  }

  export type AIAnalysisCreateNestedManyWithoutExecutionInput = {
    create?: XOR<AIAnalysisCreateWithoutExecutionInput, AIAnalysisUncheckedCreateWithoutExecutionInput> | AIAnalysisCreateWithoutExecutionInput[] | AIAnalysisUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutExecutionInput | AIAnalysisCreateOrConnectWithoutExecutionInput[]
    createMany?: AIAnalysisCreateManyExecutionInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type AIAnalysisUncheckedCreateNestedManyWithoutExecutionInput = {
    create?: XOR<AIAnalysisCreateWithoutExecutionInput, AIAnalysisUncheckedCreateWithoutExecutionInput> | AIAnalysisCreateWithoutExecutionInput[] | AIAnalysisUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutExecutionInput | AIAnalysisCreateOrConnectWithoutExecutionInput[]
    createMany?: AIAnalysisCreateManyExecutionInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutExecutionsNestedInput = {
    create?: XOR<UserCreateWithoutExecutionsInput, UserUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExecutionsInput
    upsert?: UserUpsertWithoutExecutionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExecutionsInput, UserUpdateWithoutExecutionsInput>, UserUncheckedUpdateWithoutExecutionsInput>
  }

  export type ProgramUpdateOneWithoutExecutionsNestedInput = {
    create?: XOR<ProgramCreateWithoutExecutionsInput, ProgramUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutExecutionsInput
    upsert?: ProgramUpsertWithoutExecutionsInput
    disconnect?: ProgramWhereInput | boolean
    delete?: ProgramWhereInput | boolean
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutExecutionsInput, ProgramUpdateWithoutExecutionsInput>, ProgramUncheckedUpdateWithoutExecutionsInput>
  }

  export type AIAnalysisUpdateManyWithoutExecutionNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutExecutionInput, AIAnalysisUncheckedCreateWithoutExecutionInput> | AIAnalysisCreateWithoutExecutionInput[] | AIAnalysisUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutExecutionInput | AIAnalysisCreateOrConnectWithoutExecutionInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutExecutionInput | AIAnalysisUpsertWithWhereUniqueWithoutExecutionInput[]
    createMany?: AIAnalysisCreateManyExecutionInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutExecutionInput | AIAnalysisUpdateWithWhereUniqueWithoutExecutionInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutExecutionInput | AIAnalysisUpdateManyWithWhereWithoutExecutionInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type AIAnalysisUncheckedUpdateManyWithoutExecutionNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutExecutionInput, AIAnalysisUncheckedCreateWithoutExecutionInput> | AIAnalysisCreateWithoutExecutionInput[] | AIAnalysisUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutExecutionInput | AIAnalysisCreateOrConnectWithoutExecutionInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutExecutionInput | AIAnalysisUpsertWithWhereUniqueWithoutExecutionInput[]
    createMany?: AIAnalysisCreateManyExecutionInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutExecutionInput | AIAnalysisUpdateWithWhereUniqueWithoutExecutionInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutExecutionInput | AIAnalysisUpdateManyWithWhereWithoutExecutionInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type ExecutionCreateNestedOneWithoutAiAnalysesInput = {
    create?: XOR<ExecutionCreateWithoutAiAnalysesInput, ExecutionUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: ExecutionCreateOrConnectWithoutAiAnalysesInput
    connect?: ExecutionWhereUniqueInput
  }

  export type ExecutionUpdateOneRequiredWithoutAiAnalysesNestedInput = {
    create?: XOR<ExecutionCreateWithoutAiAnalysesInput, ExecutionUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: ExecutionCreateOrConnectWithoutAiAnalysesInput
    upsert?: ExecutionUpsertWithoutAiAnalysesInput
    connect?: ExecutionWhereUniqueInput
    update?: XOR<XOR<ExecutionUpdateToOneWithWhereWithoutAiAnalysesInput, ExecutionUpdateWithoutAiAnalysesInput>, ExecutionUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProgramCreateWithoutUserInput = {
    id?: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: CodeVersionCreateNestedManyWithoutProgramInput
    executions?: ExecutionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: CodeVersionUncheckedCreateNestedManyWithoutProgramInput
    executions?: ExecutionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutUserInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutUserInput, ProgramUncheckedCreateWithoutUserInput>
  }

  export type ProgramCreateManyUserInputEnvelope = {
    data: ProgramCreateManyUserInput | ProgramCreateManyUserInput[]
  }

  export type ExecutionCreateWithoutUserInput = {
    id?: string
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
    program?: ProgramCreateNestedOneWithoutExecutionsInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutExecutionInput
  }

  export type ExecutionUncheckedCreateWithoutUserInput = {
    id?: string
    programId?: string | null
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutExecutionInput
  }

  export type ExecutionCreateOrConnectWithoutUserInput = {
    where: ExecutionWhereUniqueInput
    create: XOR<ExecutionCreateWithoutUserInput, ExecutionUncheckedCreateWithoutUserInput>
  }

  export type ExecutionCreateManyUserInputEnvelope = {
    data: ExecutionCreateManyUserInput | ExecutionCreateManyUserInput[]
  }

  export type ProgramUpsertWithWhereUniqueWithoutUserInput = {
    where: ProgramWhereUniqueInput
    update: XOR<ProgramUpdateWithoutUserInput, ProgramUncheckedUpdateWithoutUserInput>
    create: XOR<ProgramCreateWithoutUserInput, ProgramUncheckedCreateWithoutUserInput>
  }

  export type ProgramUpdateWithWhereUniqueWithoutUserInput = {
    where: ProgramWhereUniqueInput
    data: XOR<ProgramUpdateWithoutUserInput, ProgramUncheckedUpdateWithoutUserInput>
  }

  export type ProgramUpdateManyWithWhereWithoutUserInput = {
    where: ProgramScalarWhereInput
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyWithoutUserInput>
  }

  export type ProgramScalarWhereInput = {
    AND?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    OR?: ProgramScalarWhereInput[]
    NOT?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    id?: StringFilter<"Program"> | string
    userId?: StringFilter<"Program"> | string
    title?: StringFilter<"Program"> | string
    language?: StringFilter<"Program"> | string
    code?: StringFilter<"Program"> | string
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
  }

  export type ExecutionUpsertWithWhereUniqueWithoutUserInput = {
    where: ExecutionWhereUniqueInput
    update: XOR<ExecutionUpdateWithoutUserInput, ExecutionUncheckedUpdateWithoutUserInput>
    create: XOR<ExecutionCreateWithoutUserInput, ExecutionUncheckedCreateWithoutUserInput>
  }

  export type ExecutionUpdateWithWhereUniqueWithoutUserInput = {
    where: ExecutionWhereUniqueInput
    data: XOR<ExecutionUpdateWithoutUserInput, ExecutionUncheckedUpdateWithoutUserInput>
  }

  export type ExecutionUpdateManyWithWhereWithoutUserInput = {
    where: ExecutionScalarWhereInput
    data: XOR<ExecutionUpdateManyMutationInput, ExecutionUncheckedUpdateManyWithoutUserInput>
  }

  export type ExecutionScalarWhereInput = {
    AND?: ExecutionScalarWhereInput | ExecutionScalarWhereInput[]
    OR?: ExecutionScalarWhereInput[]
    NOT?: ExecutionScalarWhereInput | ExecutionScalarWhereInput[]
    id?: StringFilter<"Execution"> | string
    userId?: StringNullableFilter<"Execution"> | string | null
    programId?: StringNullableFilter<"Execution"> | string | null
    language?: StringFilter<"Execution"> | string
    code?: StringFilter<"Execution"> | string
    input?: StringNullableFilter<"Execution"> | string | null
    status?: StringFilter<"Execution"> | string
    stdout?: StringNullableFilter<"Execution"> | string | null
    stderr?: StringNullableFilter<"Execution"> | string | null
    executionTime?: IntFilter<"Execution"> | number
    exitCode?: IntFilter<"Execution"> | number
    createdAt?: DateTimeFilter<"Execution"> | Date | string
  }

  export type UserCreateWithoutProgramsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    executions?: ExecutionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProgramsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    executions?: ExecutionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProgramsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
  }

  export type CodeVersionCreateWithoutProgramInput = {
    id?: string
    code: string
    language: string
    createdAt?: Date | string
  }

  export type CodeVersionUncheckedCreateWithoutProgramInput = {
    id?: string
    code: string
    language: string
    createdAt?: Date | string
  }

  export type CodeVersionCreateOrConnectWithoutProgramInput = {
    where: CodeVersionWhereUniqueInput
    create: XOR<CodeVersionCreateWithoutProgramInput, CodeVersionUncheckedCreateWithoutProgramInput>
  }

  export type CodeVersionCreateManyProgramInputEnvelope = {
    data: CodeVersionCreateManyProgramInput | CodeVersionCreateManyProgramInput[]
  }

  export type ExecutionCreateWithoutProgramInput = {
    id?: string
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutExecutionsInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutExecutionInput
  }

  export type ExecutionUncheckedCreateWithoutProgramInput = {
    id?: string
    userId?: string | null
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutExecutionInput
  }

  export type ExecutionCreateOrConnectWithoutProgramInput = {
    where: ExecutionWhereUniqueInput
    create: XOR<ExecutionCreateWithoutProgramInput, ExecutionUncheckedCreateWithoutProgramInput>
  }

  export type ExecutionCreateManyProgramInputEnvelope = {
    data: ExecutionCreateManyProgramInput | ExecutionCreateManyProgramInput[]
  }

  export type UserUpsertWithoutProgramsInput = {
    update: XOR<UserUpdateWithoutProgramsInput, UserUncheckedUpdateWithoutProgramsInput>
    create: XOR<UserCreateWithoutProgramsInput, UserUncheckedCreateWithoutProgramsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgramsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgramsInput, UserUncheckedUpdateWithoutProgramsInput>
  }

  export type UserUpdateWithoutProgramsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executions?: ExecutionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProgramsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executions?: ExecutionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CodeVersionUpsertWithWhereUniqueWithoutProgramInput = {
    where: CodeVersionWhereUniqueInput
    update: XOR<CodeVersionUpdateWithoutProgramInput, CodeVersionUncheckedUpdateWithoutProgramInput>
    create: XOR<CodeVersionCreateWithoutProgramInput, CodeVersionUncheckedCreateWithoutProgramInput>
  }

  export type CodeVersionUpdateWithWhereUniqueWithoutProgramInput = {
    where: CodeVersionWhereUniqueInput
    data: XOR<CodeVersionUpdateWithoutProgramInput, CodeVersionUncheckedUpdateWithoutProgramInput>
  }

  export type CodeVersionUpdateManyWithWhereWithoutProgramInput = {
    where: CodeVersionScalarWhereInput
    data: XOR<CodeVersionUpdateManyMutationInput, CodeVersionUncheckedUpdateManyWithoutProgramInput>
  }

  export type CodeVersionScalarWhereInput = {
    AND?: CodeVersionScalarWhereInput | CodeVersionScalarWhereInput[]
    OR?: CodeVersionScalarWhereInput[]
    NOT?: CodeVersionScalarWhereInput | CodeVersionScalarWhereInput[]
    id?: StringFilter<"CodeVersion"> | string
    programId?: StringFilter<"CodeVersion"> | string
    code?: StringFilter<"CodeVersion"> | string
    language?: StringFilter<"CodeVersion"> | string
    createdAt?: DateTimeFilter<"CodeVersion"> | Date | string
  }

  export type ExecutionUpsertWithWhereUniqueWithoutProgramInput = {
    where: ExecutionWhereUniqueInput
    update: XOR<ExecutionUpdateWithoutProgramInput, ExecutionUncheckedUpdateWithoutProgramInput>
    create: XOR<ExecutionCreateWithoutProgramInput, ExecutionUncheckedCreateWithoutProgramInput>
  }

  export type ExecutionUpdateWithWhereUniqueWithoutProgramInput = {
    where: ExecutionWhereUniqueInput
    data: XOR<ExecutionUpdateWithoutProgramInput, ExecutionUncheckedUpdateWithoutProgramInput>
  }

  export type ExecutionUpdateManyWithWhereWithoutProgramInput = {
    where: ExecutionScalarWhereInput
    data: XOR<ExecutionUpdateManyMutationInput, ExecutionUncheckedUpdateManyWithoutProgramInput>
  }

  export type ProgramCreateWithoutVersionsInput = {
    id?: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProgramsInput
    executions?: ExecutionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutVersionsInput = {
    id?: string
    userId: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    executions?: ExecutionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutVersionsInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutVersionsInput, ProgramUncheckedCreateWithoutVersionsInput>
  }

  export type ProgramUpsertWithoutVersionsInput = {
    update: XOR<ProgramUpdateWithoutVersionsInput, ProgramUncheckedUpdateWithoutVersionsInput>
    create: XOR<ProgramCreateWithoutVersionsInput, ProgramUncheckedCreateWithoutVersionsInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutVersionsInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutVersionsInput, ProgramUncheckedUpdateWithoutVersionsInput>
  }

  export type ProgramUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProgramsNestedInput
    executions?: ExecutionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executions?: ExecutionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type UserCreateWithoutExecutionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExecutionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    programs?: ProgramUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExecutionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExecutionsInput, UserUncheckedCreateWithoutExecutionsInput>
  }

  export type ProgramCreateWithoutExecutionsInput = {
    id?: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProgramsInput
    versions?: CodeVersionCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateWithoutExecutionsInput = {
    id?: string
    userId: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: CodeVersionUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramCreateOrConnectWithoutExecutionsInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutExecutionsInput, ProgramUncheckedCreateWithoutExecutionsInput>
  }

  export type AIAnalysisCreateWithoutExecutionInput = {
    id?: string
    errorType: string
    explanation: string
    possibleCause?: string | null
    suggestedFix: string
    correctedCode: string
    optimizationSuggestions?: string | null
    createdAt?: Date | string
  }

  export type AIAnalysisUncheckedCreateWithoutExecutionInput = {
    id?: string
    errorType: string
    explanation: string
    possibleCause?: string | null
    suggestedFix: string
    correctedCode: string
    optimizationSuggestions?: string | null
    createdAt?: Date | string
  }

  export type AIAnalysisCreateOrConnectWithoutExecutionInput = {
    where: AIAnalysisWhereUniqueInput
    create: XOR<AIAnalysisCreateWithoutExecutionInput, AIAnalysisUncheckedCreateWithoutExecutionInput>
  }

  export type AIAnalysisCreateManyExecutionInputEnvelope = {
    data: AIAnalysisCreateManyExecutionInput | AIAnalysisCreateManyExecutionInput[]
  }

  export type UserUpsertWithoutExecutionsInput = {
    update: XOR<UserUpdateWithoutExecutionsInput, UserUncheckedUpdateWithoutExecutionsInput>
    create: XOR<UserCreateWithoutExecutionsInput, UserUncheckedCreateWithoutExecutionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExecutionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExecutionsInput, UserUncheckedUpdateWithoutExecutionsInput>
  }

  export type UserUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    programs?: ProgramUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProgramUpsertWithoutExecutionsInput = {
    update: XOR<ProgramUpdateWithoutExecutionsInput, ProgramUncheckedUpdateWithoutExecutionsInput>
    create: XOR<ProgramCreateWithoutExecutionsInput, ProgramUncheckedCreateWithoutExecutionsInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutExecutionsInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutExecutionsInput, ProgramUncheckedUpdateWithoutExecutionsInput>
  }

  export type ProgramUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProgramsNestedInput
    versions?: CodeVersionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: CodeVersionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type AIAnalysisUpsertWithWhereUniqueWithoutExecutionInput = {
    where: AIAnalysisWhereUniqueInput
    update: XOR<AIAnalysisUpdateWithoutExecutionInput, AIAnalysisUncheckedUpdateWithoutExecutionInput>
    create: XOR<AIAnalysisCreateWithoutExecutionInput, AIAnalysisUncheckedCreateWithoutExecutionInput>
  }

  export type AIAnalysisUpdateWithWhereUniqueWithoutExecutionInput = {
    where: AIAnalysisWhereUniqueInput
    data: XOR<AIAnalysisUpdateWithoutExecutionInput, AIAnalysisUncheckedUpdateWithoutExecutionInput>
  }

  export type AIAnalysisUpdateManyWithWhereWithoutExecutionInput = {
    where: AIAnalysisScalarWhereInput
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyWithoutExecutionInput>
  }

  export type AIAnalysisScalarWhereInput = {
    AND?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
    OR?: AIAnalysisScalarWhereInput[]
    NOT?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
    id?: StringFilter<"AIAnalysis"> | string
    executionId?: StringFilter<"AIAnalysis"> | string
    errorType?: StringFilter<"AIAnalysis"> | string
    explanation?: StringFilter<"AIAnalysis"> | string
    possibleCause?: StringNullableFilter<"AIAnalysis"> | string | null
    suggestedFix?: StringFilter<"AIAnalysis"> | string
    correctedCode?: StringFilter<"AIAnalysis"> | string
    optimizationSuggestions?: StringNullableFilter<"AIAnalysis"> | string | null
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
  }

  export type ExecutionCreateWithoutAiAnalysesInput = {
    id?: string
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutExecutionsInput
    program?: ProgramCreateNestedOneWithoutExecutionsInput
  }

  export type ExecutionUncheckedCreateWithoutAiAnalysesInput = {
    id?: string
    userId?: string | null
    programId?: string | null
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
  }

  export type ExecutionCreateOrConnectWithoutAiAnalysesInput = {
    where: ExecutionWhereUniqueInput
    create: XOR<ExecutionCreateWithoutAiAnalysesInput, ExecutionUncheckedCreateWithoutAiAnalysesInput>
  }

  export type ExecutionUpsertWithoutAiAnalysesInput = {
    update: XOR<ExecutionUpdateWithoutAiAnalysesInput, ExecutionUncheckedUpdateWithoutAiAnalysesInput>
    create: XOR<ExecutionCreateWithoutAiAnalysesInput, ExecutionUncheckedCreateWithoutAiAnalysesInput>
    where?: ExecutionWhereInput
  }

  export type ExecutionUpdateToOneWithWhereWithoutAiAnalysesInput = {
    where?: ExecutionWhereInput
    data: XOR<ExecutionUpdateWithoutAiAnalysesInput, ExecutionUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type ExecutionUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExecutionsNestedInput
    program?: ProgramUpdateOneWithoutExecutionsNestedInput
  }

  export type ExecutionUncheckedUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramCreateManyUserInput = {
    id?: string
    title: string
    language: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExecutionCreateManyUserInput = {
    id?: string
    programId?: string | null
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
  }

  export type ProgramUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: CodeVersionUpdateManyWithoutProgramNestedInput
    executions?: ExecutionUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: CodeVersionUncheckedUpdateManyWithoutProgramNestedInput
    executions?: ExecutionUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneWithoutExecutionsNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutExecutionNestedInput
  }

  export type ExecutionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutExecutionNestedInput
  }

  export type ExecutionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeVersionCreateManyProgramInput = {
    id?: string
    code: string
    language: string
    createdAt?: Date | string
  }

  export type ExecutionCreateManyProgramInput = {
    id?: string
    userId?: string | null
    language: string
    code: string
    input?: string | null
    status: string
    stdout?: string | null
    stderr?: string | null
    executionTime: number
    exitCode?: number
    createdAt?: Date | string
  }

  export type CodeVersionUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeVersionUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeVersionUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExecutionsNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutExecutionNestedInput
  }

  export type ExecutionUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutExecutionNestedInput
  }

  export type ExecutionUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    input?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    executionTime?: IntFieldUpdateOperationsInput | number
    exitCode?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisCreateManyExecutionInput = {
    id?: string
    errorType: string
    explanation: string
    possibleCause?: string | null
    suggestedFix: string
    correctedCode: string
    optimizationSuggestions?: string | null
    createdAt?: Date | string
  }

  export type AIAnalysisUpdateWithoutExecutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorType?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    possibleCause?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedFix?: StringFieldUpdateOperationsInput | string
    correctedCode?: StringFieldUpdateOperationsInput | string
    optimizationSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateWithoutExecutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorType?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    possibleCause?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedFix?: StringFieldUpdateOperationsInput | string
    correctedCode?: StringFieldUpdateOperationsInput | string
    optimizationSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyWithoutExecutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorType?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    possibleCause?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedFix?: StringFieldUpdateOperationsInput | string
    correctedCode?: StringFieldUpdateOperationsInput | string
    optimizationSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}