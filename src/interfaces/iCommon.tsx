export interface TableAction {
  ADD: string;
  EDIT: string;
  VIEW: string;
  ACCEPT: string;
  REJECT: string;
}

export interface FilterValue {
  date_from: any;
  date_to: any;
  search: string;
}

export interface ActionMenuItem {
  icon: string;
  actionKey: string;
}

export interface ListingActionProps {
  actionMenu: any;
  onActionClick: (event: object, actionKey: string, record: any) => void;
  record: any;
}
