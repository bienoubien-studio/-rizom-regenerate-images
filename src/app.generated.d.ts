import 'rizom';
import type { BaseDoc, LocalAPI, Navigation, User, Rizom } from 'rizom'

export type RelationValue<T> =
	| T[] // When depth > 0, fully populated docs
	| { id?: string; relationTo: string; relationId: string }[] // When depth = 0, relation objects
	| string[]
	| string; // When sending data to updateById

export type PagesDoc = BaseDoc &  {
  title?: string
	createdAt?: Date
	updatedAt?: Date
	editedBy?: string
}

export type UsersDoc = BaseDoc &  {
  name: string
	email: string
	roles: string[]
	createdAt?: Date
	updatedAt?: Date
	editedBy?: string
}




declare global {
  namespace App {
    interface Locals {
      session: import('lucia').Session | undefined;
      user: User | undefined;
      rizom: Rizom;
      api: LocalAPI;
      cacheEnabled: boolean;
      /** Available in panel, routes for sidebar */
      routes: Navigation;
      locale: string | undefined;
    }
  }
}
declare module 'rizom' {
	interface RegisterCollection {
		'pages': PagesDoc
		'users': UsersDoc;
	}
}