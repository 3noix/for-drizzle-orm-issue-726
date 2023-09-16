export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Prettify<T> = {[K in keyof T]: T[K];} & {};

export type Rename<T, U> = {
	[K in keyof U as K extends keyof T
		? T[K] extends string
			? T[K]
			: never
		: K]: K extends keyof U ? U[K] : never;
};
