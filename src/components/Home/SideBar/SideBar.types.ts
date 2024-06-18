export interface SideNavIconButtonProps {
  selected?: boolean;
  iconComponent: React.ReactNode;
  onClick: () => void;
  label?: string;
}
