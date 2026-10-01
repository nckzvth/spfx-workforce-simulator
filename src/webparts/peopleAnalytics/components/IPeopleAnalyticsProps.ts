/**
 * SPFx Web Part Properties Interface
 * Standard SPFx contract that will be passed into the component.
 */
export interface IPeopleAnalyticsProps {
  description: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName: string;
  userEmail?: string;
  siteTitle?: string;
  onRefreshData?: () => void;
}
