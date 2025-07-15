import 'rizom';
import type { Session } from 'better-auth';
import type { Navigation, User, Rizom } from 'rizom/types'

declare global {
  namespace App {
    interface Locals {
      session: Session | undefined;
      user: User | undefined;
      rizom: Rizom;
      cacheEnabled: boolean;
      /** Available in panel, routes for sidebar */
      routes: Navigation;
      locale: string | undefined;
    }
  }
}
